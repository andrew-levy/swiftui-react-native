import React from 'react';
import { HStack, Image, List, ListRow, useUIColor } from 'swiftui-react-native';

export const ImageSection = () => {
  const UIColor = useUIColor();
  const sfSymbols = [
    { name: 'trash', color: UIColor.systemOrange },
    { name: 'plus', color: UIColor.systemBlue },
    { name: 'phone', color: UIColor.systemPurple },
    { name: 'arrow.right', color: UIColor.systemGreen },
    { name: 'person.fill', color: UIColor.systemTeal },
  ];

  return (
    <>
      {/* Images using a URI as a source */}
      <List inset header='Images (URI + Assets)'>
        <ListRow>
          <HStack spacing={6}>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Image
                  key={i}
                  source={{ uri: 'https://picsum.photos/200/300/?random' }}
                  frame={{ width: 50, height: 50 }}
                  cornerRadius={100}
                />
              ))}
          </HStack>
        </ListRow>
      </List>
      {/* SF Symbols */}
      <List inset header='Images (SF Symbols)'>
        <ListRow>
          <HStack spacing={6}>
            {sfSymbols.map((symbol, i) => (
              <Image
                key={i}
                systemName={symbol.name}
                foregroundColor={symbol.color}
                fontSize={50}
              />
            ))}
          </HStack>
        </ListRow>
      </List>
    </>
  );
};
