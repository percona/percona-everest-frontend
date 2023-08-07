import { Button } from '@mui/material';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import { fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import { z } from 'zod';
import { CreateEditModal } from './create-edit-modal';

enum DataFields {
  name = 'name',
}

const defaultValues = {
  [DataFields.name]: 'Test',
};

const schema = z.object({
  [DataFields.name]: z.string().nonempty(),
});

type DataType = z.infer<typeof schema>;

const Wrapper = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: DataType) => {
    alert(data);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <CreateEditModal
        isOpen={open}
        closeModal={handleClose}
        headerMessage="Add name"
        onSubmit={onSubmit}
        submitMessage="Add"
        schema={schema}
        defaultValues={defaultValues}
      >
        <TextInput name={DataFields.name} label="Name" isRequired />
      </CreateEditModal>
    </div>
  );
};

it('should render correctly', () => {
  render(<Wrapper />);
  const openModalButton = screen.getByText('Open Modal');
  fireEvent.click(openModalButton);
  expect(screen.getByText('Add name')).toBeInTheDocument();
});

it('should render with correct fields', () => {
  render(<Wrapper />);
  const openModalButton = screen.getByText('Open Modal');
  fireEvent.click(openModalButton);
  expect(screen.getByText('Name')).toBeInTheDocument();
});
