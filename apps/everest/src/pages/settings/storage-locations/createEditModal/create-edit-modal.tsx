import { Checkbox, MenuItem } from '@mui/material';
import { TextInput, SelectInput, AutoCompleteInput } from '@percona/ui-lib';
import { useMemo } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { FormDialog } from 'components/form-dialog/form-dialog';
import { BackupStorage, StorageType } from 'shared-types/backupStorages.types';
import { Messages } from '../storage-locations.messages';
import {
  storageLocationDefaultValues,
  storageLocationEditValues,
  StorageLocationsFields,
  storageLocationsSchema,
} from '../storage-locations.types';
import { CreateEditModalStorageProps } from './create-edit-modal.types';
import { useNamespaces } from '../../../../hooks/api/namespaces/useNamespaces';

export const CreateEditModalStorage = ({
  open,
  handleCloseModal,
  handleSubmitModal,
  selectedStorageLocation,
  isLoading = false,
}: CreateEditModalStorageProps) => {
  const isEditMode = !!selectedStorageLocation;
  const schema = useMemo(
    () =>
      isEditMode
        ? storageLocationsSchema.partial({
            accessKey: true,
            secretKey: true,
          })
        : storageLocationsSchema,
    [isEditMode]
  );
  const { data: namespaces = [], isFetching: isNamespacesFetching } =
    useNamespaces();

  const defaultValues = useMemo(
    () =>
      selectedStorageLocation
        ? storageLocationEditValues(selectedStorageLocation)
        : storageLocationDefaultValues,
    [selectedStorageLocation]
  );

  const onSubmit: SubmitHandler<BackupStorage> = (data) => {
    handleSubmitModal(isEditMode, data);
  };

  return (
    <FormDialog
      isOpen={open}
      closeModal={handleCloseModal}
      submitting={isLoading}
      headerMessage={Messages.createEditModal.addEditModal(isEditMode)}
      onSubmit={onSubmit}
      submitMessage={Messages.createEditModal.addEditButton(isEditMode)}
      schema={schema}
      defaultValues={defaultValues}
    >
      <TextInput
        name={StorageLocationsFields.name}
        label={Messages.name}
        isRequired
        labelProps={{ sx: { mt: 0 } }}
      />
      <TextInput
        name={StorageLocationsFields.description}
        label={Messages.description}
      />
      <AutoCompleteInput
        name={StorageLocationsFields.namespaces}
        label={Messages.namespaces}
        loading={isNamespacesFetching}
        textFieldProps={{helperText: Messages.createEditModal.helperText.namespaces}}
        autoCompleteProps={{
          multiple: true,
          disableCloseOnSelect: true,
          placeholder: isEditMode ? '************' : Messages.createEditModal.placeholders.namespaces,
          renderOption: (props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          ),
        }}
        options={namespaces}
      />
      <SelectInput
        name={StorageLocationsFields.type}
        label={Messages.type}
        selectFieldProps={{ disabled: isEditMode }}
        isRequired
      >
        <MenuItem value={StorageType.S3}>{Messages.s3}</MenuItem>
        {/* <MenuItem value={StorageType.GCS}>{Messages.gcs}</MenuItem> */}
        {/* <MenuItem value={StorageType.AZURE}>{Messages.azure}</MenuItem> */}
      </SelectInput>
      <TextInput
        name={StorageLocationsFields.bucketName}
        label={Messages.bucketName}
        isRequired
      />
      <TextInput
        name={StorageLocationsFields.region}
        label={Messages.region}
        isRequired
      />
      <TextInput
        name={StorageLocationsFields.url}
        label={Messages.url}
        isRequired
      />
      <TextInput
        textFieldProps={{
          placeholder: isEditMode ? '************' : undefined,
        }}
        name={StorageLocationsFields.accessKey}
        label={Messages.accessKey}
        isRequired
      />
      <TextInput
        textFieldProps={{
          placeholder: isEditMode ? '************' : undefined,
        }}
        name={StorageLocationsFields.secretKey}
        label={Messages.secretKey}
        isRequired
      />
    </FormDialog>
  );
};
