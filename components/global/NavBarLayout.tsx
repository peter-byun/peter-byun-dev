import { ReactNode, useCallback, useMemo } from 'react';
import { css } from '@emotion/react';
import { Logo } from './Logo';
import { useRecoilState } from 'recoil';
import { headerState } from '../../states/global/header-state';
import { useRouter } from 'next/router';
import { useRouteChange } from '../../utility-hooks/use-route-change';
import { Button } from '../base/Button';
import Nav from './Nav';
export function NavBarLayout({ children }: { children: ReactNode }) {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const [header, setHeader] = useRecoilState(headerState);
  const router = useRouter();

  const handleBackClick = useCallback(() => {
    router.back();
  }, [router]);

  useRouteChange({
    onRouteChange: () => {
      setHeader({});
    },
  });

  return (
    <>
      <section css={logoWrapperCss}>
        <Logo />
      </section>

      <main css={mainSectionCss}>
        {header.title ? (
          <header css={headerCss}>
            <Button
              className="button-back"
              custom={true}
              onClick={handleBackClick}
              css={backButtonCss}
            ></Button>

            <div
              css={css`
                width: 100%;

                text-align: center;
                font-weight: bold;
              `}
            >
              {header.title}
            </div>
          </header>
        ) : null}
        {children}
      </main>

      <footer css={copyrightFooterCss}>
        <small>
          © 2022 - {currentYear} Dong Hyuk Byun. All Rights Reserved.
        </small>
      </footer>

      <Nav></Nav>

      <div css={bottomFillerCss}></div>
    </>
  );
}

const logoWrapperCss = css`
  display: flex;
  justify-content: flex-start;
  padding-top: 1rem;
  width: 45rem;
  max-width: 100%;

  margin-bottom: 6px;
`;
const mainSectionCss = css`
  min-height: 75vh;
  height: 100%;
`;
const copyrightFooterCss = css`
  text-align: center;
  margin: 8vh 0 0 0;
`;

const headerCss = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 100%;

  padding: 0.5rem 0.5rem 1rem 0.5rem;

  gap: 5px;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const backButtonCss = css`
  width: 1.2rem;
  height: 1.2rem;
  background-image: url(/assets/icons/left-arrow.png);
  background-size: cover;
  background-color: transparent;
  background-position: center;
  background-repeat: no-repeat;

  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
`;

const bottomFillerCss = css`
  width: 1rem;
  height: 14vh;
`;
