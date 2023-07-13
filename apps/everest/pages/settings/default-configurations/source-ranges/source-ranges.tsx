import React from 'react';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { useFieldArray } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import { DefaultConfigurationsFields } from '../default-configurations.types';
import { Messages } from './source-ranges.messages';
import { SourceRangesProps } from './source-ranges.types';

export const SourceRanges = ({ methods }: SourceRangesProps) => {
  const {
    control,
    formState: { errors },
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: DefaultConfigurationsFields.sourceRanges,
  });

  const defaultFields = fields.length ? fields : [];
  const errorMessage = (index) => {
    const message =
      errors?.[DefaultConfigurationsFields.sourceRanges]?.[index]?.sourceRange;
    return message?.message ? message?.message : '';
  };

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
      {defaultFields.map((sourceRange, index) => (
        <TextInput
          control={control}
          name={`${DefaultConfigurationsFields.sourceRanges}.${index}.sourceRange`}
          key={`${sourceRange.sourceRange}_${sourceRange.id}`}
          textFieldProps={{
            variant: 'outlined',
            placeholder: Messages.sourceRangePlaceholder,
            error:
              errors?.[DefaultConfigurationsFields.sourceRanges]?.[index]
                ?.sourceRange !== undefined,
            helperText: errorMessage(index),
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    data-testid="delete-button"
                    onClick={() => remove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
            inputProps: { 'data-testid': `text-source-range-${index}` },
          }}
        />
      ))}
    </>
  );
};
