import { useMemo } from 'react';
import { TextInput } from '@percona/ui-lib';
import { FormDialog } from 'components/form-dialog';
import {
  CreateEditEndpointModalProps,
  EndpointFormFields,
  EndpointFormType,
  endpointDefaultValues,
  endpointSchema,
} from './create-edit-modal.types';

export const CreateEditEndpointModal = ({
  open,
  handleClose,
  isLoading = false,
  handleSubmit,
  selectedEndpoint,
}: CreateEditEndpointModalProps) => {
  const isEditMode = !!selectedEndpoint;

  const defaultValues = useMemo(
    () =>
      selectedEndpoint
        ? { ...endpointDefaultValues, ...selectedEndpoint }
        : endpointDefaultValues,
    [selectedEndpoint]
  );

  const onSubmit = (data: EndpointFormType) => {
    handleSubmit(isEditMode, data);
  };

  return (
    <FormDialog
      isOpen={open}
      closeModal={handleClose}
      submitting={isLoading}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      headerMessage="Add monitoring endpoint"
      schema={endpointSchema}
      submitMessage="Add"
    >
      <TextInput
        name={EndpointFormFields.name}
        label="Name"
        isRequired
        textFieldProps={{ disabled: isEditMode }}
      />
      <TextInput name={EndpointFormFields.url} label="Endpoint" isRequired />
      <TextInput name={EndpointFormFields.user} label="User" />
      <TextInput name={EndpointFormFields.password} label="Password" />
      <TextInput name={EndpointFormFields.apiKey} label="API Key" isRequired />
    </FormDialog>
  );
};
