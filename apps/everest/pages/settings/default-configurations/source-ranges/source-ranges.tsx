import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Messages } from './source-ranges.messages';
import { SourceRangesProps } from './source-ranges.types';

export const SourceRanges = ({ fieldName, label }: SourceRangesProps) => {
  const methods = useFormContext();
  const {
    control,
    formState: { errors },
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  const defaultFields = fields.length ? fields : [];
  const errorMessage = (index) => {
    const message =
      errors?.[fieldName]?.[index]?.sourceRange;
    return message?.message ? message?.message : '';
  };

  return (
    <>
      <Stack direction='row'>
        {label && (
          <Typography
            // @ts-ignore
            variant="sectionHeading"
            sx={{ mt: 4, mb: 0.5 }}
          >
            {label}
          </Typography>
        )}
        <Button
          variant="text"
          size="medium"
          startIcon={<AddIcon />}
          sx={{
            width: 'fit-content',
            alignSelf: 'end',
            ml: 'auto'
          }}
          onClick={() => {
            append({
              sourceRange: '',
            });
          }}
        >
          {Messages.addNew}
        </Button>
      </Stack>
      {defaultFields.map((sourceRange, index) => (
        <TextInput
          control={control}
          name={`${fieldName}.${index}.sourceRange`}
          key={`${fieldName}_${sourceRange.id}`}
          textFieldProps={{
            variant: 'outlined',
            placeholder: Messages.sourceRangePlaceholder,
            error:
              errors?.[fieldName]?.[index]
                ?.sourceRange !== undefined,
            helperText: errorMessage(index),
            sx: {
              '&:not(:last-child)': {
                mb: 1,
              }
            },
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
