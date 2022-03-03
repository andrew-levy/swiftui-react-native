import { Binding } from '../binding';

export type Alert = {
  isPresented: Binding<boolean>;
  title: string;
  message?: string;
  buttons?: {
    label: string;
    action?: () => void;
    role?: 'default' | 'cancel' | 'destructive';
  }[];
};
