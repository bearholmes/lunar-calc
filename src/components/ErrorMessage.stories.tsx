import type { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from './ErrorMessage';

const meta = {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Error message to display',
    },
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LeapMonthError: Story = {
  args: {
    message: '윤달이 아닌 것 같네요',
  },
};

export const YearRangeError: Story = {
  args: {
    message: '1800년부터 2101년까지만 확인 가능합니다.',
  },
};
