import { useMemo } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { FormDialog } from 'components/form-dialog/form-dialog';
import { BackupStorage } from 'shared-types/backupStorages.types';
import { Messages } from '../storage-locations.messages';
import {
  storageLocationDefaultValues,
  storageLocationEditValues,
  storageLocationsSchema,
} from '../storage-locations.types';
import { CreateEditModalStorageProps } from './create-edit-modal.types';
import { CreateEditStorageFormWrpapper } from './create-edit-form-wrapper';

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
      <CreateEditStorageFormWrpapper isEditMode={isEditMode} />
    </FormDialog>
  );
};
