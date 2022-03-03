import { useEffect } from 'react';
import { Alert as RNAlert } from 'react-native';
import { Alert } from '../utils/alert';

const triggerAlert = ({ title, message = null, buttons }: Alert) => {
  const mappedButtons = buttons.map(({ label, action, role = 'default' }) => ({
    text: label,
    onPress: action,
    style: role,
  }));
  RNAlert.alert(title, message, mappedButtons);
};

export const useAlert = (alertData: Alert) => {
  useEffect(() => {
    if (alertData?.isPresented?.value) {
      triggerAlert(alertData);
      alertData.isPresented.setValue(false);
    }
  }, [alertData?.isPresented?.value]);
};
