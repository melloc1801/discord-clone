import '../styles/global.css';
import type { AppProps } from 'next/app';
import localFont from '@next/font/local';

const ggSans = localFont({
  src: [
    {
      path: '../assets/fonts/ggsans/ggsans-Normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/ggsans/ggsans-NormalItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/ggsans/ggsans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/ggsans/ggsans-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/ggsans/ggsans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-ggsans',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${ggSans.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
