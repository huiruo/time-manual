import React from 'react';

export const isBrowser =
  typeof window === 'object' &&
  typeof document === 'object' &&
  document.nodeType === 9 &&
  !!document.head?.append;


export function isReactText(children: any) {
  return ['string', 'number'].includes(typeof children);
}

export function forwardRef(component: React.ForwardRefRenderFunction<any, any>) {
  return React.forwardRef(component) as any;
}
