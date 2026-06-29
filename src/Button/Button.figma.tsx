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
 * Figma Code Connect — Button component
 *
 * Figma component set:
 *   https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC?node-id=1338-465763
 *
 * HOW THIS FILE WORKS
 * ─────────────────────────────────────────────────────────────────────────
 * This file connects the existing Button React component to its Figma
 * counterpart.  When a designer selects any Button variant in Figma Dev
 * Mode, the "Code" tab will display a React snippet that reflects the
 * exact variant/color/size combination they have chosen.
 *
 * Figma property name  →  React prop
 * ─────────────────────────────────────────────────────────────────────────
 * "variant"            →  variant          (ButtonVariants enum)
 * "color"              →  color            (string: primary | neutral | error)
 * "size"               →  size             (string: small | medium)
 * "disabled"           →  disabled         (boolean)
 * "inversecolors"      →  inversecolors    (boolean)
 *
 * The "state" property (default / hover / focus / hover & focus) is a
 * purely visual Figma state.  It has no equivalent React prop; we use
 * `figma.boolean` only for actionable boolean toggles.
 * ─────────────────────────────────────────────────────────────────────────
 */

import React from 'react';
import figma from '@figma/code-connect';
import Button, { ButtonVariants } from './Button';

/**
 * Augment MUI's ButtonPropsColorOverrides so that 'neutral' is a valid
 * `color` value in TypeScript.  The Enchanted Button already uses it at
 * runtime through MUI's OverridableStringUnion mechanism, but without this
 * augmentation the compiler rejects it in the Code Connect example function.
 */
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

figma.connect(
  Button,
  'https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC?node-id=1338-465763',
  {
    props: {
      /**
       * "variant" Figma property  →  variant React prop
       *
       * Figma values  →  React values
       * ─────────────────────────────────────────────────
       * "contained"   →  ButtonVariants.CONTAINED
       * "outlined"    →  ButtonVariants.OUTLINED
       * "text"        →  ButtonVariants.TEXT
       */
      variant: figma.enum('variant', {
        contained: ButtonVariants.CONTAINED,
        outlined: ButtonVariants.OUTLINED,
        text: ButtonVariants.TEXT,
      }),

      /**
       * "color" Figma property  →  color React prop
       *
       * Figma values  →  React values
       * ─────────────────────────────────────────────────
       * "primary"     →  "primary"   (default — omitted from snippet)
       * "neutral"     →  "neutral"
       * "error"       →  "error"
       */
      color: figma.enum('color', {
        primary: 'primary',
        neutral: 'neutral',
        error: 'error',
      }),

      /**
       * "size" Figma property  →  size React prop
       *
       * Figma values  →  React values
       * ─────────────────────────────────────────────────
       * "medium"      →  "medium"    (default — omitted from snippet)
       * "small"       →  "small"
       */
      size: figma.enum('size', {
        medium: 'medium',
        small: 'small',
      }),

      /**
       * "disabled" Figma boolean property  →  disabled React prop
       *
       * Figma values   →  React values
       * ─────────────────────────────────────────────────
       * True           →  true
       * False          →  false   (default — omitted from snippet)
       */
      disabled: figma.boolean('disabled', {
        true: true,
        false: false,
      }),

      /**
       * "inversecolors" Figma boolean property  →  inversecolors React prop
       *
       * Figma values   →  React values
       * ─────────────────────────────────────────────────
       * True           →  true
       * False          →  false   (default — omitted from snippet)
       */
      inversecolors: figma.boolean('inversecolors', {
        true: true,
        false: false,
      }),
    },

    /**
     * The `example` function renders the JSX snippet shown in Figma Dev Mode.
     * Only props that differ from defaultProps are shown (primary/medium/false
     * are defaults and can be omitted from the snippet for clarity).
     */
    example: ({
      variant, color, size, disabled, inversecolors,
    }) => {
      return (
        <Button
          variant={variant}
          color={color}
          size={size}
          disabled={disabled}
          inversecolors={inversecolors}
        >
          Button
        </Button>
      );
    },
  },
);
