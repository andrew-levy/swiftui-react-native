import React, { useEffect, useState } from 'react';
import { Text } from '../Text';
import { UIColor } from '../../themes/colors';
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { PickerProps } from '.';
import { SLIDE_TEXT_SIZE } from './Constants';

const { Value, timing } = Animated;

export const PickerSlide = ({ items, selection, onSelect }: PickerProps) => {
  const [dimensions, setDimensions] = useState(null);
  const translateX = useState(new Value(0))[0];
  const opacities = items.map((_) => new Value(0));

  useEffect(() => {
    if (dimensions) {
      let start = (dimensions.width / items.length) * selection;
      if (selection === 0) start += 2;
      if (selection === items.length - 1) start -= 2;
      slide(start);
      setOpacities();
    }
  }, [dimensions, selection]);

  const setOpacities = () => {
    items.forEach((_, i) => {
      if (i === selection || i === selection - 1 || i === items.length - 1)
        opacities[i].setValue(0);
      else opacities[i].setValue(1);
    });
  };

  const slide = (slideValue) => {
    timing(translateX, {
      toValue: slideValue,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <View
        style={styles.container}
        onLayout={(e) => setDimensions(e.nativeEvent.layout)}
      >
        {items.length &&
          items.map((item, i) => (
            <React.Fragment key={i}>
              <TouchableOpacity
                style={[
                  styles.item,
                  {
                    flexBasis: `${100 / items.length}%`,
                  },
                ]}
                onPress={() => onSelect(i)}
                key={i}
              >
                <Text fontSize={SLIDE_TEXT_SIZE} fontWeight='bold'>
                  {item}
                </Text>
              </TouchableOpacity>
              <Animated.View
                style={[
                  styles.divider,
                  {
                    opacity: opacities[i],
                  },
                ]}
              />
            </React.Fragment>
          ))}
        <Animated.View
          style={[
            styles.slider,
            {
              width: dimensions ? dimensions.width / items.length : 0,
              height: dimensions ? dimensions.height - 5 : 0,
              transform: [
                {
                  translateX: translateX,
                },
              ],
            },
          ]}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColor.systemGray6,
    borderRadius: 6,
    flexDirection: 'row',
    padding: 3,
  },
  slider: {
    position: 'absolute',
    backgroundColor: UIColor.white,
    top: 2,
    zIndex: -1,
    borderRadius: 6,
    shadowColor: UIColor.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  divider: {
    top: 5,
    height: 15,
    borderRightWidth: 1,
    width: 0,
    borderRightColor: UIColor.systemGray4,
  },
  item: {
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
});

// // TODO: Refactor with tap and pan gesture handler

// // For tap, get the x position and get the selected index (width/total)
// // Update the position withTiming, cross bridge and update state
// // Update opacity value

// // For slide, get direction of slide, if greater than certain amount
// // If allowed, slide over 1 in that direction, update state
// // Update opacity value

// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import {
//   PanGestureHandler,
//   State,
//   TapGestureHandler,
// } from 'react-native-gesture-handler';
// import Animated, {
//   add,
//   block,
//   Clock,
//   clockRunning,
//   cond,
//   debug,
//   Easing,
//   eq,
//   greaterOrEq,
//   greaterThan,
//   not,
//   set,
//   startClock,
//   stopClock,
//   timing,
//   useCode,
//   useValue,
//   Value,
// } from 'react-native-reanimated';
// import {
//   onGestureEvent,
//   usePanGestureHandler,
//   clamp,
//   snapPoint,
// } from 'react-native-redash/lib/module/v1';

// import { PickerProps } from './Picker';
// import { UIColor } from '../../themes/colors';
// import { Text } from '../Text';
// import { withDecay } from './AnimationHelpers';
// import { SLIDE_TEXT_SIZE } from './Constants';

// const WIDTH = 300;

// export const PickerSlide = ({ items, selection, onSelect }: PickerProps) => {
//   const tapState = useValue(State.UNDETERMINED);
//   const tapX = useValue(0);
//   const panState = useValue(State.UNDETERMINED);
//   const panX = useValue(0);
//   const velocityX = useValue(0);
//   const slideValue = useValue(0);
//   const sliderWidth = useValue(WIDTH);
//   const totalItems = useValue(items.length);
//   const itemWidth = useValue(WIDTH / items.length);

//   const offset = useValue(0);

//   const snapPoints = new Array(items.length)
//     .fill(0)
//     .map((_, i) => (WIDTH / items.length) * i);

//   const tapGestureHandler = onGestureEvent({
//     state: tapState,
//     x: tapX,
//   });

//   const panGestureHandler = onGestureEvent({
//     state: panState,
//     translationX: panX,
//     velocityX,
//   });

//   const init = new Value(0);
//   const tempPosition = new Value(0);
//   const clock = new Clock();
//   const state = {
//     finished: new Value(0),
//     position: new Value(0),
//     time: new Value(0),
//     frameTime: new Value(0),
//   };
//   const config = {
//     toValue: new Value(0),
//     duration: new Value(2000),
//     easing: Easing.bezier(0.22, 1, 0.36, 1),
//   };

//   const translateX = block([
//     cond(not(init), [set(tempPosition, offset), set(init, 1)]),
//     cond(eq(panState, State.BEGAN), set(offset, tempPosition)),
//     cond(eq(panState, State.ACTIVE), [
//       set(tempPosition, add(offset, panX)),
//       set(config.toValue, snapPoint(tempPosition, velocityX, snapPoints)),
//       debug('to,', config.toValue),
//       // cond(not(clockRunning(clock)), [startClock(clock)]),
//       // timing(clock, state, config),
//       // cond(state.finished, stopClock(clock)),
//     ]),
//     state.position,
//   ]);

//   // const {
//   //   gestureHandler,
//   //   translation,
//   //   velocity,
//   //   state,
//   // } = usePanGestureHandler();

//   // const panTranslateX = clamp(
//   //   withDecay({
//   //     value: translation.x,
//   //     velocity: velocity.x,
//   //     state,
//   //     snapPoints,
//   //     offset: new Animated.Value(0),
//   //   }),
//   //   0,
//   //   WIDTH
//   // );

//   // useCode(
//   //   // based on tap x position, calculate new slideValue
//   //   // dont forget to update state
//   //   // () => block([cond(eq(tapState, State.END), set(panTranslateX, 100))]),
//   //   () => debug('tapX: ', tapX),
//   //   [tapState, tapX]
//   // );

//   //   // based on pan x direction (+/-), calculate new slideValue
//   //   // dont forget to update state
//   // useCode(
//   //   () => [
//   //     cond(greaterThan(panX, 0), set(slideValue, add(panX, 20))),
//   //     debug('pan: ', panX),
//   //   ],
//   //   // () => debug('panX: ', panX),
//   //   [panState, panX]
//   // );

//   return (
//     <TapGestureHandler {...tapGestureHandler}>
//       <Animated.View>
//         <PanGestureHandler {...panGestureHandler}>
//           <Animated.View style={styles.container}>
//             {items.length &&
//               items.map((item, i) => (
//                 <React.Fragment key={i}>
//                   <View
//                     style={[
//                       styles.item,
//                       {
//                         flexBasis: `${100 / items.length}%`,
//                       },
//                     ]}
//                     key={i}
//                   >
//                     <Text
//                       fontSize={SLIDE_TEXT_SIZE}
//                       fontWeight={selection === i ? 'bold' : 'normal'}
//                     >
//                       {item}
//                     </Text>
//                   </View>
//                 </React.Fragment>
//               ))}

//             <Animated.View
//               style={[
//                 styles.slider,
//                 {
//                   width: WIDTH / items.length,
//                   transform: [
//                     {
//                       translateX,
//                     },
//                   ],
//                 },
//               ]}
//             />
//           </Animated.View>
//         </PanGestureHandler>
//       </Animated.View>
//     </TapGestureHandler>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: UIColor.systemGray6,
//     borderRadius: 6,
//     flexDirection: 'row',
//     padding: 3,
//   },
//   slider: {
//     position: 'absolute',
//     height: '100%',
//     backgroundColor: UIColor.white,
//     top: 2,
//     zIndex: -1,
//     borderRadius: 6,
//     shadowColor: UIColor.black,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   divider: {
//     top: 5,
//     height: 15,
//     borderRightWidth: 1,
//     width: 0,
//     borderRightColor: UIColor.systemGray4,
//   },
//   item: {
//     paddingVertical: 5,
//     paddingHorizontal: 20,
//   },
// });
