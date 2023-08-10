import { Button } from '@mui/material';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import React, { useState } from 'react';
import { z } from 'zod';
import { FormDialog } from './form-dialog';

enum DataFields {
  name = 'name',
}

const defaultValues = {
  [DataFields.name]: '',
};

const schema = z.object({
  [DataFields.name]: z.string().nonempty(),
});

type DataType = z.infer<typeof schema>;

export const BasicFormDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: DataType) => {
    alert(data.name);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <FormDialog
        isOpen={open}
        closeModal={handleClose}
        headerMessage="Add name"
        onSubmit={onSubmit}
        submitMessage="Add"
        schema={schema}
        defaultValues={defaultValues}
      >
        <TextInput name={DataFields.name} label="Name" isRequired />
      </FormDialog>
    </>
  );
};
