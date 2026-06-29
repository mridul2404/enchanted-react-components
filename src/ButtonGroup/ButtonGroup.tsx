import React, { FC, ReactNode } from 'react';
import MuiButtonGroup, { ButtonGroupProps as MuiButtonGroupProps } from '@mui/material/ButtonGroup';
import MuiButton from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';

/** Built-in chevron used as the default end-icon when showEndIcon is true */
const ChevronIcon: FC = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export interface ButtonGroupProps
  extends Omit<MuiButtonGroupProps, 'variant' | 'orientation'> {
  /** Visual style of every button in the group */
  variant?: 'contained' | 'outlined';
  /** Layout direction of the group */
  orientation?: 'horizontal' | 'vertical';
  /** Inverts the colour scheme – designed for dark/coloured backgrounds */
  inverseColors?: boolean;
  /** When true, each button renders an end icon */
  showEndIcon?: boolean;
  /** When false, the middle button is hidden */
  showMidButton?: boolean;
  /** When false, the last button is hidden */
  showEndButton?: boolean;
  /** Label for the first button */
  startButtonLabel?: string;
  /** Label for the middle button */
  midButtonLabel?: string;
  /** Label for the last button */
  endButtonLabel?: string;
  /**
   * Custom icon node shown at the end of each button when showEndIcon is true.
   * Falls back to the built-in chevron when omitted.
   */
  endIcon?: ReactNode;
}

const ButtonGroup: FC<ButtonGroupProps> = ({
  variant = 'outlined',
  orientation = 'horizontal',
  inverseColors = false,
  showEndIcon = false,
  showMidButton = true,
  showEndButton = true,
  startButtonLabel = 'Button',
  midButtonLabel = 'Button',
  endButtonLabel = 'Button',
  endIcon,
  sx,
  children,
  ...rest
}) => {
  const inverseColorSx: SxProps<Theme> = inverseColors
    ? {
      ...(variant === 'contained'
        ? {
          '& .MuiButton-contained': {
            backgroundColor: 'common.white',
            color: 'primary.main',
            borderColor: 'common.white',
            '&:hover': { backgroundColor: 'grey.100' },
            '&:active': { backgroundColor: 'grey.200' },
          },
        }
        : {
          '& .MuiButton-outlined': {
            color: 'common.white',
            borderColor: 'rgba(255,255,255,0.5)',
            '&:hover': {
              borderColor: 'common.white',
              backgroundColor: 'rgba(255,255,255,0.08)',
            },
          },
          '& .MuiButtonGroup-grouped:not(:last-of-type)': {
            borderColor: 'rgba(255,255,255,0.5)',
          },
        }),
    }
    : {};

  const resolvedEndIcon: ReactNode = showEndIcon
    ? (endIcon ?? <ChevronIcon />)
    : undefined;

  return (
    <MuiButtonGroup
      variant={variant}
      orientation={orientation}
      sx={{ ...inverseColorSx, ...sx }}
      {...rest}
    >
      {children ?? (
        <>
          <MuiButton endIcon={resolvedEndIcon}>{startButtonLabel}</MuiButton>

          {showMidButton && (
            <MuiButton endIcon={resolvedEndIcon}>{midButtonLabel}</MuiButton>
          )}

          {showEndButton && (
            <MuiButton endIcon={resolvedEndIcon}>{endButtonLabel}</MuiButton>
          )}
        </>
      )}
    </MuiButtonGroup>
  );
};

export { ButtonGroup };
export default ButtonGroup;
