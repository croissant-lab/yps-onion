'use client';

import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { useUserForm } from '@/components/features/forms/UserForm/hooks';
import { Input } from '@/components/forms/Input';
import { FormProvider } from 'react-hook-form';

export const UserForm = () => {
  const formData = useUserForm();
  return <UserFormInner {...formData} />;
};

type Props = ReturnType<typeof useUserForm>;

export const UserFormInner = ({ methods, onSubmit }: Props) => {
  const isLoading = methods.formState.isSubmitting;

  return (
    <div className="w-96 space-y-9">
      <div>
        <Typography type="h2">ユーザー登録</Typography>
        <Typography type="description">
          YPSのユーザー情報を登録します。
        </Typography>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <Input label="ユーザー名" id="userName" />
          <Button type="submit" isLoading={isLoading}>
            登録
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
