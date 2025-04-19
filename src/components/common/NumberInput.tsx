import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type NumberInputProps = Omit<TextFieldProps, "onChange"> & {
  onChange: (value: string) => void;
  mode?: "decimal" | "integer";
};

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  mode = "integer",
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    const valid =
      mode === "integer"
        ? /^\d*$/.test(newValue)
        : /^\d*\.?\d*$/.test(newValue);

    if (valid) {
      onChange(newValue);
    }
  };

  return (
    <TextField
      variant='outlined'
      value={value}
      onChange={handleChange}
      slotProps={{
        htmlInput: {
          inputMode: mode === "decimal" ? "decimal" : "numeric",
        },
      }}
      {...props}
    />
  );
};

export default NumberInput;
