import React, { useEffect } from 'react';
import {
  Button,
  HStack,
  List,
  ProgressView,
  Spacer,
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
      <VStack>
        <HStack padding={{ vertical: 20 }} frame={{ width: 300 }}>
          <Text>Linear</Text>
          <Spacer />
          <Button
            frame={{ width: 100 }}
            buttonStyle="borderedProminent"
            title={downloading ? 'Cancel' : 'Download'}
            action={() => setDownloading(!downloading)}
          />
        </HStack>
        <ProgressView value={progress} total={100} padding={{ bottom: 20 }} />
      </VStack>
      <VStack spacing={20} padding={{ vertical: 10 }}>
        <HStack frame={{ width: 300 }}>
          <Text>Indeterminate</Text>
          <Spacer />
        </HStack>
        <ProgressView tint="blue" />
      </VStack>
    </List>
  );
};
