import { RestoreDbModal } from 'components/restore-db-modal/RestoreDbModal';
import { useBackupsStore } from 'stores/useBackupsStore';

export const ModalsWrapper = () => {
  const isOpenRestoreDbModal = useBackupsStore(
    (state) => state.isOpenRestoreDbModal
  );
  return <div>{isOpenRestoreDbModal && <RestoreDbModal />}</div>;
};
