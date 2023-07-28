import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormGroup,
  MenuItem,
} from '@mui/material';
import { SelectInput } from '@percona/ui-lib.form.inputs.select';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  StorageLocationsFields,
  storageLocationsSchema,
  StorageLocationType,
  StorageLocationTypes,
} from '../storage-locations.types';
import { DialogTitle } from './DialogTitle';

interface CreateEditModalStorageProps {
  open: boolean;
  handleCloseModal: () => void;
  handleSubmitModal: (isEdit: boolean, data: StorageLocationType) => void;
  selectedStorageLocation?: StorageLocationType;
}

export const CreateEditModalStorage = ({
  open,
  handleCloseModal,
  handleSubmitModal,
  selectedStorageLocation,
}: CreateEditModalStorageProps) => {
  const isEditMode = !!selectedStorageLocation;

  const { control, handleSubmit } = useForm<StorageLocationType>({
    mode: 'onChange',
    resolver: zodResolver(storageLocationsSchema),
    defaultValues: {
      [StorageLocationsFields.name]: selectedStorageLocation
        ? selectedStorageLocation[StorageLocationsFields.name]
        : '',
      [StorageLocationsFields.secretKey]: selectedStorageLocation
        ? selectedStorageLocation[StorageLocationsFields.secretKey]
        : '',
      [StorageLocationsFields.type]: StorageLocationTypes.s3,
      [StorageLocationsFields.endpoint]: selectedStorageLocation
        ? selectedStorageLocation[StorageLocationsFields.endpoint]
        : '',
      [StorageLocationsFields.description]: selectedStorageLocation
        ? selectedStorageLocation[StorageLocationsFields.description]
        : '',
      [StorageLocationsFields.accessKey]: selectedStorageLocation
        ? selectedStorageLocation[StorageLocationsFields.accessKey]
        : '',
      [StorageLocationsFields.bucketName]: selectedStorageLocation
        ? selectedStorageLocation[StorageLocationsFields.bucketName]
        : '',
    },
  });

  const onSubmit: SubmitHandler<StorageLocationType> = (data) => {
    handleSubmitModal(isEditMode, data);
  };

  return (
    <Dialog open={open} onClose={() => handleCloseModal()}>
      <DialogTitle
        id={'storage-dialog-title'}
        onClose={() => handleCloseModal()}
      >
        {isEditMode ? 'Edit' : 'Add'} Storage Location
      </DialogTitle>
      <DialogContent sx={{ width: '480px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <TextInput
              name={StorageLocationsFields.name}
              control={control}
              label="Name"
              isRequired
            />
            <SelectInput
              name={StorageLocationsFields.type}
              label="Type"
              control={control}
              isRequired
            >
              <MenuItem value={StorageLocationTypes.s3}>Amazon S3</MenuItem>
              <MenuItem value={StorageLocationTypes.gcs}>
                Google Cloud Storage
              </MenuItem>
              <MenuItem value={StorageLocationTypes.azure}>
                Azure Cloud Storage
              </MenuItem>
            </SelectInput>
            <TextInput
              name={StorageLocationsFields.bucketName}
              control={control}
              label={'Bucket Name'}
            />
            <TextInput
              name={StorageLocationsFields.accessKey}
              control={control}
              label="Access Key"
              isRequired
            />
            <TextInput
              name={StorageLocationsFields.secretKey}
              control={control}
              label="Secret Key"
              isRequired
            />
            <TextInput
              name={StorageLocationsFields.endpoint}
              control={control}
              label="Endpoit"
              isRequired
            />
          </FormGroup>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCloseModal()}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          {isEditMode ? 'Edit' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
