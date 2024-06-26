import React from 'react';
import {
  HStack,
  Image,
  List,
  Rectangle,
  Spacer,
  Text,
  ZStack,
} from 'swiftui-react-native';

export const FilterSection = () => {
  return (
    <List style={{ flex: 1 }}>
      <HStack padding={{ vertical: 10 }}>
        <Text>Mask</Text>
        <Spacer />
        <Rectangle fill="pink" />
        <Image systemName="arrow.right" />
        <Rectangle fill="pink" mask="hi" />
      </HStack>
      <HStack padding={{ vertical: 10 }}>
        <Text>Blur</Text>
        <Spacer />
        <Rectangle fill="mint" />
        <Image systemName="arrow.right" />
        <Rectangle fill="mint" blur={5} />
      </HStack>
      <HStack padding={{ vertical: 10 }}>
        <Text>Contrast</Text>
        <Spacer />
        <Rectangle fill="red" />
        <Image systemName="arrow.right" />
        <Rectangle fill="red" contrast={0.7} />
      </HStack>
      <HStack padding={{ vertical: 10 }}>
        <Text>Saturation</Text>
        <Spacer />
        <Rectangle fill="green" />
        <Image systemName="arrow.right" />
        <Rectangle fill="green" saturation={1} />
      </HStack>
      <HStack padding={{ vertical: 10 }}>
        <Text>Grayscale</Text>
        <Spacer />
        <Rectangle fill="accentColor" />
        <Image systemName="arrow.right" />
        <Rectangle fill="accentColor" grayscale={0.7} />
      </HStack>
      <HStack padding={{ vertical: 10 }}>
        <Text>Brightness</Text>
        <Spacer />
        <Rectangle fill="red" />
        <Image systemName="arrow.right" />
        <Rectangle fill="red" brightness={0.3} />
      </HStack>
      <HStack padding={{ vertical: 10 }}>
        <Text>Blend Mode</Text>
        <Spacer />
        <Rectangle fill="accentColor" />
        <Image systemName="arrow.right" />
        <Rectangle fill="accentColor" blendMode="difference" />
      </HStack>
      <ZStack
        frame={{ height: 500 }}
        compositingGroup
        shadow={{
          color: 'gray',
          radius: 15,
          x: -10,
          y: 10,
        }}
      >
        <Image
          systemName={'lanyardcard.fill' as any}
          fontSize={400}
          foregroundStyle={{
            linearGradient: {
              colors: ['gray', 'white'],
              startPoint: 'bottomLeading',
              endPoint: 'topTrailing',
            },
          }}
        />
        <Image
          systemName="applelogo"
          fontSize={170}
          padding={{ top: 100 }}
          blendMode="destinationOut"
        />
      </ZStack>
    </List>
  );
};
