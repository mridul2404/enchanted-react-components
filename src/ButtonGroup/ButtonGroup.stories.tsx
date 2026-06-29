import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { ButtonGroup, ButtonGroupProps } from './ButtonGroup';

const meta: Meta<ButtonGroupProps> = {
  title: 'Inputs/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    docs: {
      description: {
        component:
          'ButtonGroup clusters related action buttons, sharing variant, orientation, size, and disabled state across all child buttons.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['contained', 'outlined'],
      description: 'Visual style applied to every button in the group.',
      table: { defaultValue: { summary: 'outlined' } },
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction of the group.',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    inverseColors: {
      control: 'boolean',
      description: 'Inverts the colour scheme for use on dark backgrounds.',
      table: { defaultValue: { summary: 'false' } },
    },
    showEndIcon: {
      control: 'boolean',
      description: 'Toggles an end-icon on every button.',
      table: { defaultValue: { summary: 'false' } },
    },
    showMidButton: {
      control: 'boolean',
      description: 'Show or hide the middle button.',
      table: { defaultValue: { summary: 'true' } },
    },
    showEndButton: {
      control: 'boolean',
      description: 'Show or hide the last button.',
      table: { defaultValue: { summary: 'true' } },
    },
    startButtonLabel: {
      control: 'text',
      description: 'Label for the first button.',
      table: { defaultValue: { summary: 'Button' } },
    },
    midButtonLabel: {
      control: 'text',
      description: 'Label for the middle button.',
      table: { defaultValue: { summary: 'Button' } },
    },
    endButtonLabel: {
      control: 'text',
      description: 'Label for the last button.',
      table: { defaultValue: { summary: 'Button' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all buttons in the group.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonGroupProps>;

// ─── Default args shared across stories ──────────────────────────────────────
const defaultArgs: ButtonGroupProps = {
  variant: 'outlined',
  orientation: 'horizontal',
  inverseColors: false,
  showEndIcon: false,
  showMidButton: true,
  showEndButton: true,
  startButtonLabel: 'Button',
  midButtonLabel: 'Button',
  endButtonLabel: 'Button',
};

// ─── Playground (all controls active) ────────────────────────────────────────
export const Playground: Story = {
  args: { ...defaultArgs },
};

// ─── Variant ─────────────────────────────────────────────────────────────────
export const Outlined: Story = {
  args: { ...defaultArgs, variant: 'outlined' },
};

export const Contained: Story = {
  args: { ...defaultArgs, variant: 'contained' },
};

// ─── Orientation ─────────────────────────────────────────────────────────────
export const Horizontal: Story = {
  args: { ...defaultArgs, orientation: 'horizontal' },
};

export const Vertical: Story = {
  args: { ...defaultArgs, orientation: 'vertical' },
};

// ─── End Icon ─────────────────────────────────────────────────────────────────
export const OutlinedWithEndIcon: Story = {
  args: { ...defaultArgs, variant: 'outlined', showEndIcon: true },
};

export const ContainedWithEndIcon: Story = {
  args: { ...defaultArgs, variant: 'contained', showEndIcon: true },
};

// ─── Button count variants ────────────────────────────────────────────────────
export const TwoButtons: Story = {
  name: 'Two Buttons (no mid)',
  args: { ...defaultArgs, showMidButton: false },
};

export const SingleButton: Story = {
  name: 'Single Button',
  args: { ...defaultArgs, showMidButton: false, showEndButton: false },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  args: { ...defaultArgs, disabled: true },
};

export const DisabledContained: Story = {
  args: { ...defaultArgs, variant: 'contained', disabled: true },
};

// ─── Inverse Colors (dark background required) ────────────────────────────────
const withDarkBackground = (Story: React.ComponentType) => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        padding: 4,
        display: 'inline-flex',
        borderRadius: 1,
      }}
    >
      <Story />
    </Box>
  );
};

export const InverseOutlined: Story = {
  name: 'Inverse / Outlined',
  args: { ...defaultArgs, inverseColors: true, variant: 'outlined' },
  decorators: [withDarkBackground],
};

export const InverseContained: Story = {
  name: 'Inverse / Contained',
  args: { ...defaultArgs, inverseColors: true, variant: 'contained' },
  decorators: [withDarkBackground],
};

export const InverseWithEndIcon: Story = {
  name: 'Inverse / With End Icon',
  args: {
    ...defaultArgs,
    inverseColors: true,
    variant: 'outlined',
    showEndIcon: true,
  },
  decorators: [withDarkBackground],
};

export const InverseVertical: Story = {
  name: 'Inverse / Vertical',
  args: {
    ...defaultArgs,
    inverseColors: true,
    orientation: 'vertical',
  },
  decorators: [withDarkBackground],
};
