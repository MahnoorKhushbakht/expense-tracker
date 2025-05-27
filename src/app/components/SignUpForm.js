'use client';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import SignInForm from './SignInForm';
import { createUserwithEmailandPassword } from '@/config/auth'

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

function SignUpForm() {
  const [showSignIn, setShowSignIn] = useState(false);

  if (showSignIn) return <SignInForm />;

  return (
    <div className="flex flex-col p-20 rounded-lg m-10 justify-center items-center w-96 h-auto text-white/70 dark:text-black/70">
      <h1 className="text-3xl text-black/70 dark:text-white/70 mb-5">Sign Up</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignUpSchema}
        onSubmit={ async (values, { resetForm }) => {
          console.log(values);
          await createUserwithEmailandPassword(values)
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col">
            <Field
              name="email"
              type="email"
            autoComplete="off"
              placeholder="Enter your email"
              className="text-white border-amber-600/50 dark:border-amber-200/50 border-2 rounded-sm p-2 mb-2 dark:placeholder:text-amber-200/50 placeholder:text-amber-600/50"
            />
            {errors.email && touched.email && <div className="mb-2 text-red-600">{errors.email}</div>}

            <Field
              name="password"
              autoComplete="new-password"
              type="password"
              placeholder="Enter your password"
              className="text-white border-amber-600/50 dark:border-amber-200/50 border-2 rounded-sm p-2 dark:placeholder:text-amber-200/50 placeholder:text-amber-600/50"
            />
            {errors.password && touched.password && (
              <div className="mb-2 text-red-600">{errors.password}</div>
            )}

            <button
              type="submit"
              className="bg-amber-600/50 text-white/70 rounded-sm shadow-sm py-2 px-4 mt-5 mb-5"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>

      <p className="text-black/70 dark:text-white/70 w-full">
        Already have an account?{' '}
        <a
          onClick={() => setShowSignIn(true)}
          className="text-amber-600 dark:text-amber-200/50 cursor-pointer"
        >
          Sign In
        </a>
      </p>
    </div>
  );
}

export default SignUpForm;
