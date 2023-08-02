import { BackupStorageType } from '../storage-locations.types';

export interface CreateEditModalStorageProps {
  open: boolean;
  handleCloseModal: () => void;
  handleSubmitModal: (isEdit: boolean, data: BackupStorageType) => void;
  selectedStorageLocation?: BackupStorageType;
}
