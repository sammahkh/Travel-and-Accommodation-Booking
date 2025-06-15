import { TextField } from '@mui/material';

const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  helperText,
  ...props
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      margin="normal"
      required
      error={error}
      helperText={helperText}
      {...props}
    />
  );
};

export default InputField;
