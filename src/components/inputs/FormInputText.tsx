import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

interface formInputProps {
    name: string;
    label: string;
    type: string;
    variant: 'filled' | 'standard' | 'outlined' | undefined;
    control: any;
}

export const FormInputText = ({name, label, type, variant, control}: formInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <TextField
                    helperText={error ? error.message : null}
                    type={type}
                    margin="normal"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    autoFocus
                    label={label}
                    variant={variant}
                />
            )}
        />
    );
};
