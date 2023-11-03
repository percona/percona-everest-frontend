import { BackupStorage } from '@/types/backupStorages.types';

export interface CreateEditModalStorageProps {
  open: boolean;
  handleCloseModal: () => void;
  handleSubmitModal: (isEdit: boolean, data: BackupStorage) => void;
  selectedStorageLocation?: BackupStorage;
  isLoading?: boolean;
}
