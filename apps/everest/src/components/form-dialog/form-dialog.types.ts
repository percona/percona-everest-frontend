import { ReactNode } from 'react';

import { DefaultValues, FieldValues, ValidationMode } from 'react-hook-form';
import { ZodObject, ZodRawShape } from 'zod';

export interface FormDialogProps<T extends FieldValues> {
  isOpen: boolean;
  closeModal: () => void;
  headerMessage: string;
  schema: ZodObject<ZodRawShape>;
  defaultValues?: DefaultValues<T>;
  values?: T;
  onSubmit: (data: T) => void;
  children: ReactNode;
  cancelMessage?: string;
  submitMessage: string;
  validationMode?: keyof ValidationMode;
  size?: 'L' | 'XL' | 'XXL';
  subHead2?: string;
  submitting?: boolean;
  dataTestId?: string;
}
