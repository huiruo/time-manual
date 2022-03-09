import React, { FC, ReactNode } from 'react';
import { Box } from '@fower/react';
import { usePopoverContext } from './context';
import { forwardRef } from './util';
import { PopoverRenderProps } from '@/utils/types';
import { FowerHTMLProps } from '@fower/core';

export interface PopoverContentProps extends FowerHTMLProps<'div'> {
  /**
   * set width base trigger width
   * 是否跟随 trigger 元素宽度
   */
  useTriggerWidth?: boolean
  children: ((props: PopoverRenderProps) => ReactNode) | ReactNode
}

export const PopoverContent: FC<PopoverContentProps> = forwardRef(
  (props: PopoverContentProps, ref) => {

    const { children, useTriggerWidth, ...rest } = props;

    const { isOpen, layerProps, renderLayer, getRenderProps, triggerWidth } = usePopoverContext();

    const widthProps: any = {};
    if (triggerWidth && useTriggerWidth) {
      widthProps.w = triggerWidth + '!important';
    }

    return (
      <>
        {renderLayer(
          <>
            {isOpen && (
              <Box
                ref={ref}
                shadow={true}
                bgWhite={true}
                rounded={true}
                zIndex-1000={true}
                {...layerProps}
                {...rest}
                {...widthProps}
              >
                {typeof children === 'function' ? (children as any)(getRenderProps()) : children}
              </Box>
            )}
          </>,
        )}
      </>
    );
  },
);
