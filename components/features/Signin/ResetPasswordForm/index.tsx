'use client';

import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { useResetPasswordForm } from '@/components/features/Signin/ResetPasswordForm/hooks';
import { Input } from '@/components/forms/Input';
import Link from 'next/link';
import { FormProvider } from 'react-hook-form';

export const ResetPasswordForm = () => {
  const formData = useResetPasswordForm();
  return <ResetPasswordFormInner {...formData} />;
};

type Props = ReturnType<typeof useResetPasswordForm>;

export const ResetPasswordFormInner = ({ methods, onSubmit }: Props) => {
  const isLoading = methods.formState.isSubmitting;
  return (
    <Card className="flex w-96 flex-col gap-5 p-8">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <Input label="メールアドレス" id="mail" disabled={isLoading} />
          <Button type="submit" isLoading={isLoading}>
            パスワードリセット
          </Button>
        </form>
      </FormProvider>
      <div className="flex w-full flex-col gap-2 text-right text-gray-500 text-sm">
        <div>
          <Link className="hover:underline" href="/login">
            ログイン画面に戻る
          </Link>
        </div>
      </div>
    </Card>
  );
};
