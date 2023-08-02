import { MenuItem } from '@mui/material';
import { SelectInput } from '@percona/ui-lib.form.inputs.select';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import React, { useMemo } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { GeneralCreateEditModal } from '../../../../components/general-create-edit-modal/general-create-edit-modal';
import { BackupStorage } from '../../../../types/backupStorages.types';
import { Messages } from '../storage-locations.messages';
import {
  storageLocationDefaultValues,
  storageLocationEditValues,
  StorageLocationsFields,
  storageLocationsSchema,
  StorageType,
} from '../storage-locations.types';
import { CreateEditModalStorageProps } from './create-edit-modal.types';

export const CreateEditModalStorage = ({
  open,
  handleCloseModal,
  handleSubmitModal,
  selectedStorageLocation,
}: CreateEditModalStorageProps) => {
  const isEditMode = !!selectedStorageLocation;

  const schema = useMemo(
    () =>
      isEditMode
        ? storageLocationsSchema.omit({
            accessKey: true,
            secretKey: true,
          })
        : storageLocationsSchema,
    [isEditMode]
  );

  const defaultValues = useMemo(
    () =>
      selectedStorageLocation
        ? storageLocationEditValues(selectedStorageLocation)
        : storageLocationDefaultValues,
    [selectedStorageLocation]
  );

  const onSubmit: SubmitHandler<BackupStorage> = (data) => {
    handleSubmitModal(isEditMode, { ...data, id: selectedStorageLocation?.id });
  };

  return (
    <GeneralCreateEditModal
      isOpen={open}
      closeModal={handleCloseModal}
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
      />
      <SelectInput
        name={StorageLocationsFields.type}
        label={Messages.type}
        selectFieldProps={{ disabled: isEditMode }}
        isRequired
      >
        <MenuItem value={StorageType.S3}>{Messages.s3}</MenuItem>
        <MenuItem value={StorageType.GCS}>{Messages.gcs}</MenuItem>
        <MenuItem value={StorageType.AZURE}>{Messages.azure}</MenuItem>
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
        name={StorageLocationsFields.description}
        label={Messages.description}
      />
      <TextInput
        name={StorageLocationsFields.url}
        label={Messages.url}
        isRequired
      />
      {!isEditMode && (
        <>
          <TextInput
            name={StorageLocationsFields.accessKey}
            label={Messages.accessKey}
            isRequired
          />
          <TextInput
            name={StorageLocationsFields.secretKey}
            label={Messages.secretKey}
            isRequired
          />
        </>
      )}
    </GeneralCreateEditModal>
  );
};
