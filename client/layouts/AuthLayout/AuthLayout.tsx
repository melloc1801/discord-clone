import React from 'react';
import bg from '../../assets/img/signin-bg.svg';
import Image from 'next/image';
import Head from 'next/head';

export type AuthLayoutProps = {
  children: React.ReactNode;
};
export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Discord</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative max-w-screen w-screen max-h-screen h-screen overflow-hidden flex items-center justify-center p-4">
        <Image
          className="absolute w-screen h-screen"
          src={bg}
          alt="background"
        />
        {children}
      </main>
    </>
  );
};
