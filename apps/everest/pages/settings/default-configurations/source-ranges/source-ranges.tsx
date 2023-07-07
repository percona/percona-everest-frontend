import React from 'react';
import { Button, TextField, IconButton, InputAdornment } from '@mui/material';
import { useFieldArray } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DefaultConfigurationsFields } from '../default-configurations.types';
import { Messages } from './source-ranges.messages';
import { SourceRangesProps } from './source-ranges.types';
export const SourceRanges = ({ methods }: SourceRangesProps) => {
  const {
    control,
    formState: { errors },
    register,
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: DefaultConfigurationsFields.sourceRanges,
  });

  return (
    <>
      <Button
        variant="text"
        size="medium"
        startIcon={<AddIcon />}
        sx={{ width: 'fit-content', alignSelf: 'end' }}
        onClick={() => {
          append({
            sourceRange: '',
          });
        }}
      >
        {Messages.addNew}
      </Button>
      {fields.map((field, index) => (
        <TextField
          {...field}
          key={field.id}
          name={`${DefaultConfigurationsFields.sourceRanges}.${index}.sourceRange`}
          {...register(
            `${DefaultConfigurationsFields.sourceRanges}.${index}.sourceRange`
          )}
          variant="outlined"
          placeholder={Messages.sourceRangePlaceholder}
          error={
            errors?.[DefaultConfigurationsFields.sourceRanges]?.[index]
              ?.sourceRange !== undefined
          }
          helperText={
            errors?.[DefaultConfigurationsFields.sourceRanges]?.[index]
              ?.sourceRange
              ? Messages.sourceRangeError
              : ''
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton data-testid="delete-button">
                  <DeleteIcon
                    onClick={() => {
                      remove(index);
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            'data-testid': 'text-source-range',
          }}
        />
      ))}
    </>
  );
};
