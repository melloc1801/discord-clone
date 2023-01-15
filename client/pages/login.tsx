import React from 'react';
import { AuthLayout } from '../layouts/AuthLayout/AuthLayout';
import { Field } from '../components/Field';
import Link from 'next/link';
import { Button } from '../components/Button';

export default function Login() {
  return (
    <AuthLayout>
      <form className="relative p-8 bg-discord-gray-700 rounded max-w-lg w-full shadow-md">
        <div className="mb-5">
          <h1 className="mb-2 font-bold text-2xl text-center text-white">
            Welcome back!
          </h1>
          <p className="text-discord-gray-300 text-center">
            We&apos;re so excited to see you again!
          </p>
        </div>
        <div className="mb-2">
          <div className="mb-5">
            <Field label="Email" required />
          </div>
          <div className="mb-5">
            <Field label="Password" required />
            <Link
              className="mt-1 text-discord-blue-400 text-sm hover:underline font-medium"
              href="/password-reset"
            >
              Forgot your password?
            </Link>
          </div>
          <Button>Log In</Button>
        </div>
        <div className="text-sm text-discord-gray-400">
          Need an account?
          <Link
            className="inline-block text-discord-blue-400 ml-1 hover:underline font-medium"
            href="/signup"
          >
            Register
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
