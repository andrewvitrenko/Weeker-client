import React, { FC } from 'react';
import { InputAdornment } from '@mui/material';
import { useField } from 'formik';
import { COMPONENT_ICONS } from 'src/constants';

import * as Styled from './FormField.styled';
import { IFormFieldProps } from './FormField.types';

export const FormField: FC<IFormFieldProps> = ({
  startIcon,
  endIcon,
  name,
  ...props
}) => {
  const [{ value }, { touched, error }, { setValue, setTouched }] =
    useField<string>(name);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    setValue(e.target.value);
  };

  return (
    <Styled.Input
      value={value}
      helperText={touched && error}
      onChange={onChange}
      error={touched && !!error}
      name={name}
      {...props}
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">
            {COMPONENT_ICONS[startIcon]}
          </InputAdornment>
        ),
        endAdornment: endIcon && (
          <InputAdornment position="end">
            {COMPONENT_ICONS[endIcon]}
          </InputAdornment>
        ),
      }}
    />
  );
};
