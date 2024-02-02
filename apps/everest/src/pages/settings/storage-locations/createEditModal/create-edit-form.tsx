import {
  Checkbox,
  createFilterOptions,
  Divider,
  MenuItem,
} from '@mui/material';
import { TextInput, SelectInput, AutoCompleteInput } from '@percona/ui-lib';
import { useFormContext } from 'react-hook-form';
import { StorageType } from 'shared-types/backupStorages.types';
import { Messages } from '../storage-locations.messages';
import { StorageLocationsFields } from '../storage-locations.types';
import { useNamespaces } from '../../../../hooks/api/namespaces/useNamespaces';

interface CreateEditFormWrapperProps {
  isEditMode: boolean;
}
export const CreateEditStorageFormWrpapper = ({
  isEditMode,
}: CreateEditFormWrapperProps) => {
  const { data: namespaces = [], isFetching: isNamespacesFetching } =
    useNamespaces();
  const { setValue, watch } = useFormContext();
  const namespacesFieldValue = watch(StorageLocationsFields.namespaces);

  return (
    <>
      <TextInput
        name={StorageLocationsFields.name}
        label={Messages.name}
        isRequired
        labelProps={{ sx: { mt: 0 } }}
      />
      <TextInput
        name={StorageLocationsFields.description}
        label={Messages.description}
      />
      <AutoCompleteInput
        name={StorageLocationsFields.namespaces}
        label={Messages.namespaces}
        loading={isNamespacesFetching}
        textFieldProps={{
          helperText: Messages.createEditModal.helperText.namespaces,
        }}
        autoCompleteProps={{
          multiple: true,
          disableCloseOnSelect: true,
          placeholder: isEditMode
            ? '************'
            : Messages.createEditModal.placeholders.namespaces,
          filterOptions: (options, params) => {
            const filter = createFilterOptions<string>();
            const filtered = filter(options, params);
            return [Messages.createEditModal.selectAll, ...filtered];
          },
          onChange: (_event, newValue) => {
            if (
              Array.isArray(newValue) &&
              newValue.find(
                (option) => option === Messages.createEditModal.selectAll
              )
            ) {
              return setValue(
                StorageLocationsFields.namespaces,
                namespacesFieldValue.length === namespaces.length
                  ? []
                  : namespaces
              );
            }
            setValue(StorageLocationsFields.namespaces, newValue);
          },
          renderOption: (props, option, { selected }) => {
            return (
              <li {...props}>
                <Checkbox
                  style={{ marginRight: 8 }}
                  checked={
                    option === Messages.createEditModal.selectAll
                      ? namespaces.length === namespacesFieldValue.length
                      : selected
                  }
                />
                {option}
              </li>
            );
          },
        }}
        options={namespaces}
      />
      <Divider sx={{ mt: 4 }} />
      <SelectInput
        name={StorageLocationsFields.type}
        label={Messages.type}
        selectFieldProps={{ disabled: isEditMode }}
        isRequired
      >
        <MenuItem value={StorageType.S3}>{Messages.s3}</MenuItem>
        {/* <MenuItem value={StorageType.GCS}>{Messages.gcs}</MenuItem> */}
        {/* <MenuItem value={StorageType.AZURE}>{Messages.azure}</MenuItem> */}
      </SelectInput>
      <TextInput
        name={StorageLocationsFields.bucketName}
        label={Messages.bucketName}
        isRequired
      />
      <TextInput
        name={StorageLocationsFields.region}
        label={Messages.region}
        isRequired
      />
      <TextInput
        name={StorageLocationsFields.url}
        label={Messages.url}
        isRequired
      />
      <TextInput
        textFieldProps={{
          placeholder: isEditMode ? '************' : undefined,
        }}
        name={StorageLocationsFields.accessKey}
        label={Messages.accessKey}
        isRequired
      />
      <TextInput
        textFieldProps={{
          placeholder: isEditMode ? '************' : undefined,
        }}
        name={StorageLocationsFields.secretKey}
        label={Messages.secretKey}
        isRequired
      />
    </>
  );
};
