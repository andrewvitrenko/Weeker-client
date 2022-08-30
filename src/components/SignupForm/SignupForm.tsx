import React, { FC, useCallback } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormField from '../common/components/FormField';
import DefaultButton from '../common/components/DefaultButton';
import { FormContainer, FormButtons } from '../common/styles';
import { ISignupForm } from './SignupForm.types';
import * as Styled from './SignupForm.styled';
import { initialValues } from './constants';
import { validationSchema } from './utils';
import { useSigunpMutation } from '../../services';
import { setToken } from '../../store/reducers';
import { ROUTES } from '../../constants';

export const SignupForm: FC = () => {
  const dispatch = useDispatch();
  const [signup] = useSigunpMutation();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async ({ email, name, password, surname, phone }: ISignupForm) => {
      try {
        const { token } = await signup({
          email,
          name,
          surname,
          password,
          phone,
        }).unwrap();
        dispatch(setToken(token));
        navigate(ROUTES.HOME, { replace: true });
      } catch (e) {}
    },
    [signup, dispatch, navigate],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      validateOnChange
    >
      {({ handleSubmit }) => (
        <FormContainer onSubmit={handleSubmit}>
          <Styled.InputWrapper>
            <FormField required name="name" label="Name" />
            <FormField required name="surname" label="Surname" />
          </Styled.InputWrapper>
          <FormField required name="email" type="email" label="Email" />
          <FormField name="phone" label="Phone" />
          <FormField
            required
            name="password"
            type="password"
            label="Password"
          />
          <FormField
            required
            name="confirmPassword"
            type="password"
            label="Confirm Password"
          />

          <FormButtons>
            <DefaultButton type="submit" text="signup" endIcon="send" />
          </FormButtons>
        </FormContainer>
      )}
    </Formik>
  );
};
