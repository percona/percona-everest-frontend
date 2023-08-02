import { QueryClient } from 'react-query';

interface DataObject {
  id?: string;
  [key: string]: string | undefined;
}

export const updateDataAfterEdit =
  (queryClient: QueryClient, queryKey: string) =>
  <T extends DataObject>(updatedObject: T) => {
    queryClient.setQueryData([queryKey], (oldData?: T[]) => {
      return (oldData || []).map((value) =>
        value.id === updatedObject.id ? updatedObject : value
      );
    });
  };

export const updateDataAfterCreate =
  (queryClient: QueryClient, queryKey: string) =>
  <T extends DataObject>(createdObject: T) => {
    queryClient.setQueryData([queryKey], (oldData?: T[]) => {
      return [createdObject, ...(oldData || [])];
    });
  };

export const updateDataAfterDelete =
  (queryClient: QueryClient, queryKey: string) =>
  <T extends DataObject>(_: T, objectId: string) => {
    queryClient.setQueryData([queryKey], (oldData?: T[]) => {
      return (oldData || []).filter((value) => value.id !== objectId);
    });
  };
