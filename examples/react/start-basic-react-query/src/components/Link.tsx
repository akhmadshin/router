import React from 'react';
import { Link as TanstackLink } from '@tanstack/react-router'
import type { PropsWithChildren } from 'react';
import type { LinkProps } from '@tanstack/react-router';

type Props = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  placeholderData?: object;
}
export const Link: React.FC<PropsWithChildren<Props>> = ({ children, onClick, placeholderData, ...props }) => {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    window.placeholderData = placeholderData;
  }

  return (
    <TanstackLink
      viewTransition={true}
      onClick={handleClick}
      preload={false}
      {...props}
    >
      {children}
    </TanstackLink>
  )
}