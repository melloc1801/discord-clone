import '../styles/global.css';
import type { AppProps } from 'next/app';
import localFont from '@next/font/local';

const ggSans = localFont({
  src: [
    {
      path: '../assets/fonts/ggsans/ggsans-Normal.woff2',
      weight: '400',
    },
    {
      path: '../assets/fonts/ggsans/ggsans-Medium.woff2',
      weight: '500',
    },
    {
      path: '../assets/fonts/ggsans/ggsans-Semibold.woff2',
      weight: '600',
    },
    {
      path: '../assets/fonts/ggsans/ggsans-Bold.woff2',
      weight: '700',
    },
    {
      path: '../assets/fonts/ggsans/ggsans-ExtraBold.woff2',
      weight: '800',
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={ggSans.className}>
      <Component {...pageProps} />
    </div>
  );
}
