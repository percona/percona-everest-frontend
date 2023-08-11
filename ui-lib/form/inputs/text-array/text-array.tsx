import React, { ReactNode } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import { TextArrayProps } from './text-array.types';
import { Messages } from './text-array.messages';

export const TextArray = ({ fieldName, fieldKey, label, placeholder }: TextArrayProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  const defaultFields = fields.length ? fields : [];
  const errorMessage = (index) => {
    const message =
      errors?.[fieldName]?.[index]?.[fieldKey];
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
          data-testid="add-text-input-button"
          startIcon={<AddIcon />}
          sx={{
            width: 'fit-content',
            alignSelf: 'end',
            ml: 'auto'
          }}
          onClick={() => {
            append({
              [fieldKey]: '',
            });
          }}
        >
          {Messages.addNew}
        </Button>
      </Stack>
      {defaultFields.map((field, index) => (
        <TextInput
          control={control}
          name={`${fieldName}.${index}.${fieldKey}`}
          key={`${fieldName}_${field.id}`}
          textFieldProps={{
            variant: 'outlined',
            placeholder,
            error:
              errors?.[fieldName]?.[index]
                ?.fieldKey !== undefined,
            helperText: errorMessage(index),
            sx: {
              width: '100%',
              '&:not(:last-child)': {
                mb: 1,
              }
            },
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    data-testid={`delete-text-input-${index}-button`}
                    onClick={() => remove(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      ))}
    </>
  );
}
