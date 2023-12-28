import { FormDialog } from 'components/form-dialog';
import {
  CreateEditEndpointModalProps,
  EndpointFormFields,
  EndpointFormType,
  endpointDefaultValues,
  endpointSchema,
} from './create-edit-modal.types';
import { TextInput } from '@percona/ui-lib';

export const CreateEditEndpointModal = ({
  open,
  handleClose,
  isLoading = false,
  handleSubmit,
}: CreateEditEndpointModalProps) => {
  const onSubmit = (data: EndpointFormType) => {
    handleSubmit(data);
  };

  return (
    <FormDialog
      isOpen={open}
      closeModal={handleClose}
      submitting={isLoading}
      onSubmit={onSubmit}
      defaultValues={endpointDefaultValues}
      headerMessage="Add monitoring endpoint"
      schema={endpointSchema}
      submitMessage="Add"
    >
      <TextInput name={EndpointFormFields.name} label="Name" isRequired />
      <TextInput name={EndpointFormFields.url} label="Endpoint" isRequired />
      <TextInput name={EndpointFormFields.user} label="User" isRequired />
      <TextInput
        name={EndpointFormFields.password}
        label="Password"
        isRequired
      />
      <TextInput name={EndpointFormFields.apiKey} label="API Key" isRequired />
    </FormDialog>
  );
};
