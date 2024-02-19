import React, { useEffect } from 'react';
import {
  Button,
  HStack,
  List,
  ProgressView,
  Text,
  VStack,
} from 'swiftui-react-native';

export const ProgressSection = () => {
  const [progress, setProgress] = React.useState(0);
  const [downloading, setDownloading] = React.useState(false);

  useEffect(() => {
    if (downloading) {
      let randomIncrement = Math.floor(Math.random() * 20) + 1;
      const interval = setInterval(() => {
        setProgress((progress) => {
          if (progress + randomIncrement > 100) {
            setDownloading(false);
            return 0;
          }
          return progress + randomIncrement;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [downloading]);

  return (
    <List style={{ flex: 1 }}>
      <VStack alignment="leading" spacing={10}>
        <HStack>
          <Text>Linear</Text>
          <Button title="Download" action={() => setDownloading(true)} />
        </HStack>
        <ProgressView value={progress} total={100} />
      </VStack>
      <VStack alignment="leading" spacing={10} style={{ width: '100%' }}>
        <Text>Indeterminate</Text>
        <ProgressView tint="systemBlue" />
      </VStack>
    </List>
  );
};
