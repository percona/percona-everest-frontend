import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button, IconButton, InputAdornment, Stack, Typography, } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Messages } from './text-array.messages';
import TextInput from '../text';
const TextArray = ({ fieldName, fieldKey, label, placeholder, }) => {
    const { control, formState: { errors }, } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: fieldName,
    });
    const defaultFields = fields.length ? fields : [];
    const error = (index) => 
    // @ts-ignore
    errors?.[fieldName]?.[index]?.[fieldKey];
    return (_jsxs(_Fragment, { children: [_jsxs(Stack, { direction: "row", children: [label && (_jsx(Typography
                    // @ts-ignore
                    , { 
                        // @ts-ignore
                        variant: "sectionHeading", sx: { mt: 4, mb: 0.5 }, children: label })), _jsx(Button, { variant: "text", size: "medium", "data-testid": "add-text-input-button", startIcon: _jsx(AddIcon, {}), sx: {
                            width: 'fit-content',
                            alignSelf: 'end',
                            ml: 'auto',
                        }, onClick: () => {
                            append({
                                [fieldKey]: '',
                            });
                        }, children: Messages.addNew })] }), defaultFields.map((field, index) => (_jsx(TextInput, { control: control, name: `${fieldName}.${index}.${fieldKey}`, textFieldProps: {
                    variant: 'outlined',
                    placeholder,
                    error: !!error(index),
                    helperText: error(index) ? error(index)?.message : '',
                    sx: {
                        width: '100%',
                        '&:not(:last-child)': {
                            mb: 1,
                        },
                    },
                    InputProps: {
                        endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { "data-testid": `delete-text-input-${index}-button`, onClick: () => remove(index), children: _jsx(DeleteOutlineOutlinedIcon, {}) }) })),
                    },
                } }, `${fieldName}_${field.id}`)))] }));
};
export default TextArray;
//# sourceMappingURL=text-array.js.map