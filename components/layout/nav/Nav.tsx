'use client';

import './NavBar.css';

import { HTMLAttributes, ReactNode, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Button } from '../../base/button/Button';
import { IconArticle } from './icons/IconArticle';
import { IconContact } from './icons/IconContact';

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
      style={{
        textDecoration: 'none',
      }}
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
  const pathname = usePathname();

  const getIsLinkActive = getIsLinkActiveWithRouterPathName(pathname);
  const isPostsActive = useMemo(() => {
    return getIsLinkActive(ROUTES.posts) || getIsLinkActive(ROUTES.home);
  }, [getIsLinkActive]);

  return (
    <nav {...props} className="nav-root">
      <LinkWrapper
        href={ROUTES.posts}
        name="posts"
        label="Posts"
        isLinkActive={isPostsActive}
        IconActive={
          <IconArticle outlined={false} size={'2rem'} title="Posts" />
        }
        IconInactive={
          <IconArticle outlined={true} size={'2rem'} title="Posts" />
        }
      />
      <LinkWrapper
        href={ROUTES.about}
        name="about"
        label="About"
        isLinkActive={getIsLinkActive(ROUTES.about)}
        IconActive={
          <IconContact outlined={false} size={'2rem'} title="About" />
        }
        IconInactive={
          <IconContact outlined={false} size={'2rem'} title="About" />
        }
      />
    </nav>
  );
};

export default Nav;
