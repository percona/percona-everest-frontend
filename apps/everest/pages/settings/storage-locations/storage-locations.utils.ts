import { QueryClient } from 'react-query';

interface DataObject {
  id?: string;
  [key: string]: string | undefined;
}

export const updateDataAfterCreate =
  <T extends DataObject>(updatedBackupStorage: T) =>
  (queryClient: QueryClient, queryKey: string) => {
    queryClient.setQueryData([queryKey], (oldData?: T[]) => {
      return (oldData || []).map((value) =>
        value.id === updatedBackupStorage.id ? updatedBackupStorage : value
      );
    });
  };
