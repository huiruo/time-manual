import { createContext, useContext } from 'react';
import { PopoverContext } from '@/utils/types';

export const popoverContext = createContext({} as PopoverContext);

export const PopoverProvider = popoverContext.Provider;

export function usePopoverContext() {
  return useContext(popoverContext);
}
