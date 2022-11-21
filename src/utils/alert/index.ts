import { BooleanBinding } from '../binding';

export type Alert = {
  isPresented: BooleanBinding;
  title: string;
  message?: string;
  actions?: {
    title: string;
    action?: () => void;
    role?: 'default' | 'cancel' | 'destructive';
  }[];
};
