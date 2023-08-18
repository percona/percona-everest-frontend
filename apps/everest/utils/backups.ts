import { BACKUP_STATE_TO_STATUS } from "../constants";
import { BackupStatus } from "../types/backups.types";

export const mapBackupState = (backupState: string) => BACKUP_STATE_TO_STATUS[backupState] || BackupStatus.UNKNOWN;
