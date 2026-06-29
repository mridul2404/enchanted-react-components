/* ======================================================================== *
 * Copyright 2024 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */

/**
 * Tag — a read-only, non-interactive status indicator.
 *
 * Created from the Figma component set:
 * https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC?node-id=23760-19030
 *
 * Figma variants → React `variant` prop:
 *   variant=neutral      → TagVariants.NEUTRAL
 *   variant=error        → TagVariants.ERROR
 *   variant=information  → TagVariants.INFORMATION
 *   variant=warning      → TagVariants.WARNING
 *   variant=success      → TagVariants.SUCCESS
 */

import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { Components, Theme } from '@mui/material';
import Typography from '../Typography';
import {
  neutralGrey, red, blue, yellow, green,
} from '../colors';

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

/** Maps 1-to-1 with the Figma `variant` property on the Tag component set. */
export enum TagVariants {
  NEUTRAL = 'neutral',
  ERROR = 'error',
  INFORMATION = 'information',
  WARNING = 'warning',
  SUCCESS = 'success',
}

export enum TagTestIds {
  TAG_ROOT = 'TagRoot',
  TAG_LABEL = 'TagLabel',
}

// ---------------------------------------------------------------------------
// Color tokens (background / text) per variant
// ---------------------------------------------------------------------------

const TAG_COLOR_MAP: Record<TagVariants, { bg: string; text: string; border: string }> = {
  [TagVariants.NEUTRAL]: {
    bg: neutralGrey.NG100 as string,
    text: neutralGrey.NG700 as string,
    border: neutralGrey.NG300 as string,
  },
  [TagVariants.ERROR]: {
    bg: red.RED100 as string,
    text: red.RED800 as string,
    border: red.RED300 as string,
  },
  [TagVariants.INFORMATION]: {
    bg: blue.BLUE100 as string,
    text: blue.BLUE800 as string,
    border: blue.BLUE300 as string,
  },
  [TagVariants.WARNING]: {
    bg: yellow.YELLOW100 as string,
    text: yellow.YELLOW800 as string,
    border: yellow.YELLOW300 as string,
  },
  [TagVariants.SUCCESS]: {
    bg: green.GREEN100 as string,
    text: green.GREEN800 as string,
    border: green.GREEN300 as string,
  },
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export type TagProps = Omit<BoxProps, 'children'> & {
  /** Status variant — maps directly to the Figma `variant` property. */
  variant?: TagVariants;
  /** The visible text label rendered inside the tag. */
  label: string;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Tag = ({ variant = TagVariants.NEUTRAL, label, ...rest }: TagProps) => {
  const colors = TAG_COLOR_MAP[variant];

  return (
    <Box
      component="span"
      data-testid={TagTestIds.TAG_ROOT}
      data-variant={variant}
      {...rest}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20px',
        padding: '0 6px',
        borderRadius: '2px',
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.bg,
        boxSizing: 'border-box',
        ...rest.sx,
      }}
    >
      <Typography
        variant="caption"
        data-testid={TagTestIds.TAG_LABEL}
        sx={{ color: colors.text, lineHeight: 1 }}
      >
        {label}
      </Typography>
    </Box>
  );
};

Tag.defaultProps = {
  variant: TagVariants.NEUTRAL,
};

// ---------------------------------------------------------------------------
// MUI theme overrides (kept for completeness — styles live above in sx)
// ---------------------------------------------------------------------------

export const getMuiTagThemeOverrides = (): Components<Omit<Theme, 'components'>> => {
  // Tag is not a native MUI component so no MuiTag key is registered.
  // Styles are applied inline via sx on Box.  This export is provided so
  // consumers can extend / override via the theme if needed.
  return {};
};

export default Tag;
