import { ReactNode } from 'react';

import {
  DeepPartial,
  FieldValues,
  SubmitHandler,
  ValidationMode,
} from 'react-hook-form';
import { ZodObject, ZodRawShape } from 'zod';

export type AsyncDefaultValues<T> = (payload?: unknown) => Promise<T>;
export interface GeneralCreateEditModalProps<T extends FieldValues> {
  isOpen: boolean;
  closeModal: () => void;
  headerMessage: string;
  schema: ZodObject<ZodRawShape>;
  defaultValues?: DeepPartial<T> | AsyncDefaultValues<T>;
  onSubmit: SubmitHandler<T>;
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
