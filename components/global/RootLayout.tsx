import { Global, css } from '@emotion/react';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import { bgColor1 } from '../../styles/variables';
import { ACss } from '../base/A';

export function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60 * 3,
            cacheTime: 1000 * 60 * 60 * 6,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Head>
          <title>Blog - Peter Byun</title>
        </Head>
        <Global
          styles={css`
            @font-face {
              font-family: 'GmarketSansMedium';
              src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff')
                format('woff');
              font-weight: normal;
              font-style: normal;
            }
            @font-face {
              font-family: 'GmarketSansMedium';
              src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff')
                format('woff');
              font-weight: bold;
              font-style: normal;
            }

            body {
              color: white;
              background-color: ${bgColor1};
              padding: 0;
              margin: 0;
              height: 100%;
              font-family:
                GmarketSansMedium,
                -apple-system,
                BlinkMacSystemFont,
                Segoe UI,
                Roboto,
                Oxygen,
                Ubuntu,
                Cantarell,
                Fira Sans,
                Droid Sans,
                Helvetica Neue,
                sans-serif;

              #__next {
                display: flex;
                flex-direction: column;
                align-items: center;

                height: 100%;

                padding: 0 1rem;
                :has(.post-root) {
                  padding: 0;
                  svg#blog-logo {
                    margin-left: 1rem;
                  }
                }
              }
            }

            main {
              width: 100%;
            }
            a {
              white-space: pre-line;
              word-break: break-word;
              ${ACss}
            }

            h1 {
              font-size: 1.2rem;
              margin: 0;
            }

            h1,
            h2,
            h3 {
              color: inherit;
            }

            * {
              box-sizing: border-box;
            }

            dd {
              margin-left: 1rem;
            }
          `}
        />

        {children}
      </RecoilRoot>

      <Analytics />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
