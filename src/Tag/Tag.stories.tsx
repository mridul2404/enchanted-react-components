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
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Grid } from '@mui/material';
import Typography from '../Typography';
import Tag, { TagVariants } from './Tag';

export default {
  title: 'Data display/Tag',
  component: Tag,
  argTypes: {
    variant: {
      description: 'Status variant of the Tag — maps to Figma `variant` property.',
      options: [
        TagVariants.NEUTRAL,
        TagVariants.ERROR,
        TagVariants.INFORMATION,
        TagVariants.WARNING,
        TagVariants.SUCCESS,
      ],
      control: { type: 'radio' },
      if: { arg: 'interactive' },
      table: {
        defaultValue: { summary: TagVariants.NEUTRAL },
      },
    },
    label: {
      description: 'Text content displayed inside the Tag.',
      if: { arg: 'interactive' },
      table: {
        defaultValue: { summary: 'Label' },
      },
    },
  },
} as Meta<typeof Tag>;

// ---------------------------------------------------------------------------
// Interactive story
// ---------------------------------------------------------------------------

const InteractiveExampleTemplate: StoryFn<typeof Tag> = (args) => { return <Tag {...args} />; };

export const InteractiveExample = InteractiveExampleTemplate.bind({});
InteractiveExample.parameters = {
  options: { showPanel: true },
};
InteractiveExample.args = {
  ...Tag.defaultProps,
  // @ts-ignore - interactive attribute disables non-interactive controls in Storybook, not part of TagProps
  interactive: true,
  variant: TagVariants.NEUTRAL,
  label: 'Neutral',
};

// ---------------------------------------------------------------------------
// Visual test — all variants side-by-side
// ---------------------------------------------------------------------------

const VisualTestTemplate: StoryFn<typeof Tag> = () => {
  return (
    <Grid container spacing={2} alignItems="flex-start">
      {Object.values(TagVariants).map((variant) => {
        return (
          <Grid item key={variant}>
            <Grid container direction="column" spacing={1} alignItems="center">
              <Grid item>
                <Tag
                  variant={variant}
                  label={variant.charAt(0).toUpperCase() + variant.slice(1)}
                />
              </Grid>
              <Grid item>
                <Typography variant="caption" sx={{ color: 'rgba(0, 0, 0, 0.60)' }}>
                  {variant}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export const VisualTest = VisualTestTemplate.bind({});
VisualTest.parameters = {
  options: { showPanel: false },
};
