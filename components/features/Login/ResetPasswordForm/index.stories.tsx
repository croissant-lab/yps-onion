import { useResetPasswordForm } from '@/components/features/Login/ResetPasswordForm/hooks';
import type { Meta, StoryObj } from '@storybook/react';
import { ResetPasswordForm } from '.';

const meta = {
  title: 'features/Login/ResetPasswordForm',
  component: ResetPasswordForm,
  decorators: [
    (Story) => {
      const hooks = useResetPasswordForm();
      return <Story {...hooks} />;
    },
  ],
} satisfies Meta<typeof ResetPasswordForm>;
export default meta;

export const Basic: StoryObj<typeof meta> = {};