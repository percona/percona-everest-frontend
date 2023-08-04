import { ReactNode } from 'react';

import { DefaultValues, FieldValues, ValidationMode } from 'react-hook-form';
import { ZodObject, ZodRawShape } from 'zod';

export interface CreateEditModalProps<T extends FieldValues> {
  isOpen: boolean;
  closeModal: () => void;
  headerMessage: string;
  schema: ZodObject<ZodRawShape>;
  defaultValues?: DefaultValues<T>;
  onSubmit: (data: T) => void;
  children: ReactNode;
  cancelMessage?: string;
  submitMessage: string;
  validationMode?: keyof ValidationMode;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}