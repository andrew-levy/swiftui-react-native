import React from 'react';
import { View } from 'react-native';
import { ForEach, HStack, Image } from 'swiftui-react-native';

export const ImageSection = () => {
  const sfSymbols = [
    { name: 'trash', color: 'systemOrange' },
    { name: 'plus', color: 'systemBlue' },
    { name: 'phone', color: 'systemPurple' },
    { name: 'arrow.right', color: 'systemGreen' },
    { name: 'person.fill', color: 'teal' },
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <HStack spacing={15}>
        {ForEach(sfSymbols, (symbol, i) => (
          <Image
            key={i}
            systemName={symbol.name as any}
            imageScale="large"
            foregroundStyle="systemBlue"
            bold
          />
        ))}
      </HStack>
    </View>
  );
};
