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
import { Messages } from '../monitoring-endpoints.messages';

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
      size="XL"
      isOpen={open}
      closeModal={handleClose}
      submitting={isLoading}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      headerMessage={Messages.addEditDialogHeader(isEditMode)}
      schema={endpointSchema}
      submitMessage="Add"
    >
      <TextInput
        name={EndpointFormFields.name}
        label={Messages.fieldLabels.name}
        isRequired
        textFieldProps={{ disabled: isEditMode }}
      />
      <TextInput
        name={EndpointFormFields.url}
        label={Messages.fieldLabels.endpoint}
        isRequired
      />
      <TextInput
        name={EndpointFormFields.user}
        label={Messages.fieldLabels.user}
        isRequired
      />
      <TextInput
        name={EndpointFormFields.password}
        label={Messages.fieldLabels.password}
        isRequired
        textFieldProps={{ type: 'password' }}
      />
    </FormDialog>
  );
};
