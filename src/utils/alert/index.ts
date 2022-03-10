import { BooleanBinding } from '../binding';

export type Alert = {
  isPresented: BooleanBinding;
  title: string;
  message?: string;
  buttons?: {
    title: string;
    action?: () => void;
    role?: 'default' | 'cancel' | 'destructive';
  }[];
};
