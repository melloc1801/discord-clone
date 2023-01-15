import { Field } from '../components/Field';
import Link from 'next/link';
import { Button } from '../components/Button';
import { AuthLayout } from '../layouts/AuthLayout/AuthLayout';
import React from 'react';

export default function Register() {
  return (
    <AuthLayout>
      <form className="relative p-8 bg-discord-gray-700 rounded max-w-lg w-full shadow-md">
        <div className="mb-5">
          <h1 className="font-bold text-2xl text-center text-white">
            Create an account!
          </h1>
        </div>
        <div className="mb-2">
          <div className="mb-5">
            <Field label="Email" required />
          </div>
          <div className="mb-5">
            <Field label="Username" required />
          </div>
          <div className="mb-5">
            <Field label="Password" required />
          </div>
          <Button>Create</Button>
        </div>
        <Link
          className="inline-block text-discord-blue-400 text-sm  ml-1 underline font-medium"
          href="/login"
        >
          Already have an account?
        </Link>
      </form>
    </AuthLayout>
  );
}
