import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem } from '@mui/material';
import { SelectInput } from '@percona/ui-lib.form.inputs.select';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GeneralCreateEditModal } from '../../../../components/general-create-edit-modal/general-create-edit-modal';
import {
  BackupStorage,
  StorageType,
} from '../../../../types/backupStorages.types';
import { Messages } from '../storage-locations.messages';
import {
  StorageLocationsFields,
  storageLocationsSchema,
} from '../storage-locations.types';

interface CreateEditModalStorageProps {
  open: boolean;
  handleCloseModal: () => void;
  handleSubmitModal: (isEdit: boolean, data: BackupStorage) => void;
  selectedStorageLocation?: BackupStorage;
}

export const CreateEditModalStorage = ({
  open,
  handleCloseModal,
  handleSubmitModal,
  selectedStorageLocation,
}: CreateEditModalStorageProps) => {
  const isEditMode = !!selectedStorageLocation;

  const { control, handleSubmit } = useForm<BackupStorage>({
    mode: 'onChange',
    resolver: zodResolver(
      storageLocationsSchema.omit({
        accessKey: isEditMode ? true : undefined,
        secretKey: isEditMode ? true : undefined,
      })
    ),
    defaultValues: {
      [StorageLocationsFields.name]: selectedStorageLocation
        ? selectedStorageLocation.name
        : '',
      [StorageLocationsFields.type]: StorageType.S3,
      [StorageLocationsFields.url]: selectedStorageLocation
        ? selectedStorageLocation.url
        : '',
      [StorageLocationsFields.description]: selectedStorageLocation
        ? selectedStorageLocation.description
        : '',
      [StorageLocationsFields.region]: selectedStorageLocation
        ? selectedStorageLocation.region
        : '',
      [StorageLocationsFields.accessKey]: selectedStorageLocation
        ? selectedStorageLocation.accessKey
        : '',
      [StorageLocationsFields.secretKey]: selectedStorageLocation
        ? selectedStorageLocation[StorageLocationsFields.secretKey]
        : '',
      [StorageLocationsFields.bucketName]: selectedStorageLocation
        ? selectedStorageLocation.bucketName
        : '',
    },
  });

  const onSubmit: SubmitHandler<BackupStorage> = (data) => {
    handleSubmitModal(isEditMode, { ...data, id: selectedStorageLocation?.id });
  };

  return (
    <GeneralCreateEditModal
      isOpen={open}
      closeModal={handleCloseModal}
      headerMessage={Messages.createEditModal.addEditModal(isEditMode)}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      submitMessage={Messages.createEditModal.addEditButton(isEditMode)}
    >
      <TextInput
        name={StorageLocationsFields.name}
        control={control}
        label={Messages.name}
        isRequired
      />
      <SelectInput
        name={StorageLocationsFields.type}
        label={Messages.type}
        control={control}
        selectFieldProps={{ disabled: isEditMode }}
        isRequired
      >
        <MenuItem value={StorageType.S3}>{Messages.s3}</MenuItem>
        <MenuItem value={StorageType.GCS}>{Messages.gcs}</MenuItem>
        <MenuItem value={StorageType.AZURE}>{Messages.azure}</MenuItem>
      </SelectInput>
      <TextInput
        name={StorageLocationsFields.bucketName}
        control={control}
        label={Messages.bucketName}
        isRequired
      />
      <TextInput
        name={StorageLocationsFields.region}
        control={control}
        label={Messages.region}
        isRequired
      />
      <TextInput
        name={StorageLocationsFields.description}
        control={control}
        label={Messages.description}
      />
      <TextInput
        name={StorageLocationsFields.url}
        control={control}
        label={Messages.url}
        isRequired
      />
      {!isEditMode && (
        <>
          <TextInput
            name={StorageLocationsFields.accessKey}
            control={control}
            label={Messages.accessKey}
            isRequired
          />
          <TextInput
            name={StorageLocationsFields.secretKey}
            control={control}
            label={Messages.secretKey}
            isRequired
          />
        </>
      )}
    </GeneralCreateEditModal>
  );
};
