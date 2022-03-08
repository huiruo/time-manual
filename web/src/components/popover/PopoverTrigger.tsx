import React, { FC, ReactNode } from 'react';
import { Box } from '@fower/react';
import { usePopoverContext } from './context';
import { isBrowser, isReactText } from './util';
import { PopoverRenderProps } from '@/utils/types';

export interface PopoverTriggerProps {
  children: ((props: PopoverRenderProps) => ReactNode) | ReactNode
}

export const PopoverTrigger: FC<PopoverTriggerProps> = (props) => {
  const { children, ...rest } = props;
  const {
    setOpen,
    isOpen,
    isDisabled,
    triggerProps,
    getRenderProps,
    setTriggerWidth,
    popoverProps,
  } = usePopoverContext();

  const childrenElement =
    typeof children === 'function' ? (children as any)(getRenderProps()) : children;

  const finalTriggerProps: any = {
    ref: (element: any) => {
      if (isBrowser && element) {
        const { width } = window.getComputedStyle(element);
        setTriggerWidth(width);
      }
      triggerProps.ref(element);
    },
  };

  // TODO: maybe should handle hover
  if (popoverProps.trigger !== 'manual') {
    finalTriggerProps.onClick = () => {
      if (isDisabled) return;
      setOpen(!isOpen);
    };
  }

  let trigger;

  if (isReactText(children)) {
    trigger = (
      <Box
        className='bone-popover-trigger'
        cursorNotAllowed={!!isDisabled}
        inlineFlex={true}
        {...finalTriggerProps}
        {...rest}
      >
        {childrenElement}
      </Box>
    );
  } else {
    trigger = React.cloneElement(childrenElement, {
      ...finalTriggerProps,
    });
  }

  return trigger;
};
