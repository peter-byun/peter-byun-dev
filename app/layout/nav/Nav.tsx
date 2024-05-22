'use client';

import { HTMLAttributes, ReactNode, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Article as ArticleIconActive } from '@emotion-icons/material/Article';
import { Article as ArticleIconInactive } from '@emotion-icons/material-outlined/Article';
import { ContactMail as AboutIconActive } from '@emotion-icons/material/ContactMail';
import { ContactMail as AboutIconInactive } from '@emotion-icons/material-outlined/ContactMail';

import { css } from '@emotion/react';
import { bgColor2, textActive, textInactive } from '../../../styles/variables';
import { Button } from '../../../components/base/button/Button';

const ROUTES = {
  home: '/',
  posts: '/posts',
  about: '/about',
} as const;

type LinkWrapperProps = {
  name: string;
  label: string;
  href: string;
  isLinkActive: boolean;
  IconActive: ReactNode;
  IconInactive: ReactNode;
};

const LinkWrapper = (props: LinkWrapperProps) => {
  const { label, href, isLinkActive, IconActive, IconInactive } = props;

  const linkWrapperClass = useMemo(() => {
    return isLinkActive ? 'link-wrapper active' : 'link-wrapper';
  }, [isLinkActive]);

  return (
    <Link
      href={href}
      css={css`
        text-decoration: none;
      `}
    >
      <Button className={linkWrapperClass} custom={true} tabIndex={-1}>
        {isLinkActive ? IconActive : IconInactive}
        {label}
      </Button>
    </Link>
  );
};

const getIsLinkActiveWithRouterPathName =
  (routerPathName: string) => (pathName: string) => {
    return routerPathName === pathName;
  };

const Nav = (props: HTMLAttributes<HTMLDivElement>) => {
  const router = useRouter();

  const getIsLinkActive = getIsLinkActiveWithRouterPathName(router.pathname);
  const isPostsActive = useMemo(() => {
    return getIsLinkActive(ROUTES.posts) || getIsLinkActive(ROUTES.home);
  }, [getIsLinkActive]);

  return (
    <nav {...props} className="nav-root" css={navCss}>
      <LinkWrapper
        href={ROUTES.posts}
        name="posts"
        label="Posts"
        isLinkActive={isPostsActive}
        IconActive={<ArticleIconActive size={'2rem'} title="Posts" />}
        IconInactive={<ArticleIconInactive size={'2rem'} title="Posts" />}
      />
      <LinkWrapper
        href={ROUTES.about}
        name="about"
        label="About"
        isLinkActive={getIsLinkActive(ROUTES.about)}
        IconActive={<AboutIconActive size={'2rem'} title="About" />}
        IconInactive={<AboutIconInactive size={'2rem'} title="About" />}
      />
    </nav>
  );
};

export default Nav;

const navCss = css`
  background-color: ${bgColor2};
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 6rem;
  padding: 1rem 0;
  border: 1px solid #5c5c5c;
  border-width: 1px 1px 0 1px;
  border-radius: 2rem 2rem 0rem 0rem;
  box-shadow: 0px 0px 2px 2px rgb(0 0 0 / 20%);

  .link-wrapper {
    appearance: none;
    border: none;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    color: ${textInactive};
    background-color: transparent;

    padding: 0.5rem;
    border-radius: 0.5rem;

    font-size: 0.8rem;

    cursor: pointer;

    &:hover {
      color: ${textActive};
    }

    &.active {
      color: ${textInactive};
    }
  }
`;
