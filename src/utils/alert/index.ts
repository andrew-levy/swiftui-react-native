import { BooleanBinding } from '../binding';

export type Alert = {
  isPresented: BooleanBinding;
  title: string;
  message?: string;
  buttons?: {
    label: string;
    action?: () => void;
    role?: 'default' | 'cancel' | 'destructive';
  }[];
};
