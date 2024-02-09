import React from 'react';
import {
  ForEach,
  HStack,
  Image,
  List,
  SystemName,
  UIColor,
} from 'swiftui-react-native';

export const ImageSection = () => {
  const sfSymbols: {
    name: SystemName;
    color: UIColor;
  }[] = [
    { name: 'trash', color: 'systemOrange' },
    { name: 'plus', color: 'systemBlue' },
    { name: 'phone', color: 'systemPurple' },
    { name: 'arrow.right', color: 'systemGreen' },
    { name: 'person.fill', color: 'teal' },
  ];

  return (
    <>
      {/* Images using a URI as a source */}
      <List>
        <List.Section header="Images (URI + Assets)">
          <HStack spacing={6}>
            {ForEach(Array(5).fill(0), (_, i) => (
              <Image
                key={i}
                source={{ uri: 'https://picsum.photos/200/300/?random' }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                }}
              />
            ))}
          </HStack>
        </List.Section>
      </List>
      {/* SF Symbols */}
      <List>
        <List.Section header="Images (SF Symbols)">
          <HStack spacing={15}>
            {ForEach(sfSymbols, (symbol, i) => (
              <Image
                key={i}
                systemName={symbol.name}
                modifiers={(v) => v.imageScale('large')}
              />
            ))}
          </HStack>
        </List.Section>
      </List>
    </>
  );
};
