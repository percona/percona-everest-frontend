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
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: DefaultConfigurationsFields.sourceRanges,
  });

  const defaultFields = fields.length ? fields : [''];
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
      {defaultFields.map((field, index) => (
        <TextField
          id={field.id}
          key={`${field.sourceRange}_${index}`}
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
          helperText={errorMessage(index)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  data-testid="delete-button"
                  onClick={() =>
                    fields.length === 1 && index === 0
                      ? update(0, { sourceRange: '' })
                      : remove(index)
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            'data-testid': `text-source-range-${index}`,
          }}
        />
      ))}
    </>
  );
};
