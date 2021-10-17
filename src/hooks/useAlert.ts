import { useEffect } from 'react';
import { Alert } from 'react-native';

export const useAlert = (
  isPresented: boolean,
  alert: {
    title: string;
    message: string;
    buttons: Array<{
      text: string;
      onPress: () => void;
    }>;
  }
) => {
  useEffect(() => {
    if (isPresented) {
      Alert.alert(alert.title, alert.message, alert.buttons);
    }
  }, [isPresented]);
};
