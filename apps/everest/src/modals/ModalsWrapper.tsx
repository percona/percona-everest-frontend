import { RestoreDbModal } from 'components/restore-db-modal/RestoreDbModal';
import { useMainStore } from 'stores/useMainStore';

export const ModalsWrapper = () => {
  const isOpenRestoreDbModal = useMainStore(
    (state) => state.isOpenRestoreDbModal
  );
  return <div>{isOpenRestoreDbModal && <RestoreDbModal />}</div>;
};
