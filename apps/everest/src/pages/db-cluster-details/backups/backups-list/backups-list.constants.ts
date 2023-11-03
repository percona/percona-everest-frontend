import { BaseStatus } from '@/components/status-field/status-field.types';
import { BackupStatus } from '@/types/backups.types';

export const BACKUP_STATUS_TO_BASE_STATUS: Record<BackupStatus, BaseStatus> = {
  [BackupStatus.OK]: 'success',
  [BackupStatus.FAILED]: 'error',
  [BackupStatus.IN_PROGRESS]: 'pending',
  [BackupStatus.UNKNOWN]: 'unknown',
};
