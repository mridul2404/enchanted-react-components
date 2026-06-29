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
 * Figma Code Connect — Tag component
 *
 * Figma component set:
 *   https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC?node-id=23760-19030
 *
 * HOW THIS FILE WORKS
 * ─────────────────────────────────────────────────────────────────────────
 * `figma.connect()` links this React component to its Figma counterpart.
 * When a designer opens the Tag node in Figma Dev Mode, the "Code" tab
 * will show a live React snippet driven by the variant they have selected.
 *
 * Figma property → React prop mapping:
 *   "variant" (enum)  →  variant  (TagVariants)
 *
 * The `label` prop has no Figma property equivalent (it is free text in
 * the design), so we use `figma.string('Label')` to pull it from the
 * Figma layer named "Label", or fall back to the placeholder "Label".
 * ─────────────────────────────────────────────────────────────────────────
 */

import React from 'react';
import figma from '@figma/code-connect';
import Tag, { TagVariants } from './Tag';

figma.connect(
  Tag,
  'https://www.figma.com/design/hSgxFly4e92zns5LJXAsNB/HCLED-Components-V3--POC?node-id=23760-19030',
  {
    props: {
      /**
       * Maps the Figma "variant" property (exact string from Inspect panel)
       * to the TagVariants enum used in React.
       *
       * Figma values  →  React values
       * ─────────────────────────────
       * "neutral"     →  TagVariants.NEUTRAL
       * "error"       →  TagVariants.ERROR
       * "information" →  TagVariants.INFORMATION
       * "warning"     →  TagVariants.WARNING
       * "success"     →  TagVariants.SUCCESS
       */
      variant: figma.enum('variant', {
        neutral: TagVariants.NEUTRAL,
        error: TagVariants.ERROR,
        information: TagVariants.INFORMATION,
        warning: TagVariants.WARNING,
        success: TagVariants.SUCCESS,
      }),
    },

    /**
     * The `example` function renders the JSX snippet shown in Figma Dev Mode.
     * Only the props that differ from defaultProps need to appear; here we
     * always show `variant` and a static `label` placeholder.
     */
    example: ({ variant }) => {
      return (
        <Tag
          variant={variant}
          label="Label"
        />
      );
    },
  },
);
