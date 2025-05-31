'use client';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import SignInForm from './SignInForm';
import { createUserwithEmailandPassword } from '@/config/auth';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

function SignUpForm() {
  const [showSignIn, setShowSignIn] = useState(false);

  if (showSignIn) return <SignInForm />;

  return (
    <div className="sm:p-10  mx-auto h-full flex flex-col items-center justify-center p-8 m-4 w-full max-w-md rounded-lg bg-white dark:bg-black shadow-lg text-black dark:text-white">
      <h1 className="text-3xl font-semibold mb-6 text-center">Sign Up</h1>

      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={SignUpSchema}
        onSubmit={async (values, { resetForm }) => {
          await createUserwithEmailandPassword(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Field
                name="name"
                type="text"
                autoComplete="off"
                placeholder="Enter your name"
                className="border-2 border-amber-600/50 dark:border-amber-200/50 rounded-sm p-2 placeholder:text-amber-600/50 dark:placeholder:text-amber-200/50 bg-transparent"
              />
              {errors.name && touched.name && (
                <div className="text-red-600 text-sm mt-1">{errors.name}</div>
              )}
            </div>

            <div className="flex flex-col">
              <Field
                name="email"
                type="email"
                autoComplete="off"
                placeholder="Enter your email"
                className="border-2 border-amber-600/50 dark:border-amber-200/50 rounded-sm p-2 placeholder:text-amber-600/50 dark:placeholder:text-amber-200/50 bg-transparent"
              />
              {errors.email && touched.email && (
                <div className="text-red-600 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            <div className="flex flex-col">
              <Field
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter your password"
                className="border-2 border-amber-600/50 dark:border-amber-200/50 rounded-sm p-2 placeholder:text-amber-600/50 dark:placeholder:text-amber-200/50 bg-transparent"
              />
              {errors.password && touched.password && (
                <div className="text-red-600 text-sm mt-1">{errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="bg-amber-600/70 hover:bg-amber-600 text-white font-medium rounded-sm py-2 px-4 mt-2 transition"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>

      <p className="mt-4 text-sm text-center">
        Already have an account?{' '}
        <span
          onClick={() => setShowSignIn(true)}
          className="text-amber-600 dark:text-amber-200/70 font-medium cursor-pointer hover:underline"
        >
          Sign In
        </span>
      </p>
    </div>
  );
}

export default SignUpForm;
