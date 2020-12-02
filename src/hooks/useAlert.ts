import { useEffect } from 'react';
import { Alert } from 'react-native';

type AlertButtons = {
  text: string;
  onPress: () => void;
};

type AlertData = {
  title: string;
  message: string;
  buttons: Array<AlertButtons>;
};

export const useAlert = (isPresented: boolean, alert: AlertData) => {
  useEffect(() => {
    if (isPresented) {
      Alert.alert(alert.title, alert.message, alert.buttons);
    }
  }, [isPresented]);
};
