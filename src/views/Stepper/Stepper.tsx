import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Button } from '../Button';
import { Text } from '../Text';
import { Modifiers } from '../../utils/modifiers';
import { Binding } from '../../utils/binding';
import { useColorScheme } from '../../hooks/useColorScheme';
import { useLifecycle } from '../../hooks/useLifecycle';
import { getPadding } from '../../utils/padding';
import { getFrame } from '../../utils/frame';
import { getBorder } from '../../utils/border';
import { getShadow } from '../../utils/shadow';
import { getCornerRadius } from '../../utils/cornerRadius';
import { getTransform } from '../../utils/transform';
import { getColor } from '../../utils/colors';
import { useAlert } from '../../hooks/useAlert';

const { SFSymbol } =
  Platform.select({
    ios: () => require('react-native-sfsymbols'),
    default: () => null,
  })() || {};

type StepperProps = Modifiers & {
  step?: number;
  range?: [number, number];
  value: Binding<number>;
  onChange?: (value?: number) => void;
};

export const Stepper: React.FC<StepperProps> = ({
  value,
  step = 1,
  range = [-100, 100],
  backgroundColor,
  style,
  padding,
  cornerRadius,
  rotationEffect,
  scaleEffect,
  shadow,
  border,
  opacity,
  frame,
  zIndex,
  alert,
  onAppear,
  onDisappear,
  onChange,
}) => {
  useAlert(alert);
  useLifecycle(onAppear, onDisappear);
  const colorScheme = useColorScheme();
  useEffect(() => {
    const [min, max] = range;
    if (value.value < min) {
      value.setValue(min);
    } else if (value.value > max) {
      value.setValue(max);
    }
  }, [value]);

  return (
    <View
      style={[
        styles.container,
        {
          opacity,
          zIndex,
          backgroundColor: getColor(
            backgroundColor,
            colorScheme,
            'systemGray5'
          ),
          ...getCornerRadius(cornerRadius),
          ...getPadding(padding),
          ...getFrame(frame),
          ...getBorder(border),
          ...getShadow(shadow),
          ...getTransform(scaleEffect, rotationEffect),
        },
        style,
      ]}
    >
      <View style={styles.button}>
        <Button
          disabled={value.value <= range[0]}
          style={styles.alignCenter}
          action={() => {
            if (value.value - step >= range[0]) {
              const newValue = value.value - step;
              value.setValue(newValue);
              if (onChange) onChange(newValue);
            }
          }}
        >
          {SFSymbol ? (
            <SFSymbol
              name="minus"
              color={getColor('systemGray', colorScheme)}
              style={{ width: 20, height: 20 }}
            />
          ) : (
            <Text style={styles.alignCenter}>-</Text>
          )}
        </Button>
      </View>
      <View
        style={[
          styles.separator,
          { borderRightColor: getColor('systemGray2', colorScheme) },
        ]}
      />
      <View style={styles.button}>
        <Button
          disabled={value.value >= range[1]}
          style={styles.alignCenter}
          action={() => {
            if (value.value + step <= range[1]) {
              const newValue = value.value + step;
              value.setValue(newValue);
              if (onChange) onChange(newValue);
            }
          }}
        >
          {SFSymbol ? (
            <SFSymbol
              name="plus"
              color={getColor('systemGray', colorScheme)}
              style={{ width: 20, height: 20 }}
            />
          ) : (
            <Text style={styles.alignCenter}>+</Text>
          )}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 100,
    padding: 5,
  },
  separator: {
    borderRightWidth: 1,
    height: 15,
    width: 0,
  },
  button: {
    flex: 1,
  },
  alignCenter: {
    alignItems: 'center',
  },
});
