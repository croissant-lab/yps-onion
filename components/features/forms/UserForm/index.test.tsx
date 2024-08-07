import { UserFormInner } from '@/components/features/forms/UserForm';
import { useUserForm } from '@/components/features/forms/UserForm/hooks';
import { composeStories } from '@storybook/react';
import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import * as actions from './actions';
import * as stories from './index.stories';

const user = userEvent.setup();

const { Basic } = composeStories(stories);

describe('UserForm Components', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  describe('Email Error', () => {
    test('Required', async () => {
      render(<Basic />);
      const userInput = screen.getByLabelText('ユーザー名');
      fireEvent.focus(userInput);
      fireEvent.blur(userInput);
      expect(await screen.findByText('必須項目です')).toBeInTheDocument();
    });
    test('Min Length', async () => {
      render(<Basic />);
      const userInput = screen.getByLabelText('ユーザー名');
      const submit = screen.getByText('登録');
      await userEvent.type(userInput, 'a');
      await userEvent.click(submit);
      expect(
        await screen.findByText('2〜20文字で入力してください'),
      ).toBeInTheDocument();
    });
    test('Max Length', async () => {
      render(<Basic />);
      const userInput = screen.getByLabelText('ユーザー名');
      const submit = screen.getByText('登録');
      userEvent.click(userInput);
      await userEvent.paste('a'.repeat(20));
      fireEvent.blur(userInput);
      await waitFor(() => {
        expect(
          screen.queryByText('2〜20文字で入力してください'),
        ).not.toBeInTheDocument();
      });
      await userEvent.type(userInput, 'a');
      await userEvent.click(submit);
      expect(
        await screen.findByText('2〜20文字で入力してください'),
      ).toBeInTheDocument();
    });
  });
  describe('Submit', () => {
    const onSubmitMock = vi.fn();
    test('Submit validation', async () => {
      const { result } = renderHook(() => useUserForm());
      render(
        <UserFormInner
          methods={result.current.methods}
          onSubmit={onSubmitMock}
        />,
      );
      const userInput = screen.getByText('ユーザー名');
      const submitButton = screen.getByText('登録');
      await user.click(submitButton);
      expect(onSubmitMock).not.toHaveBeenCalled();

      await user.type(userInput, '0123456789');
      await user.click(submitButton);

      // react-hook-formの利用しない引数も含まれるためexpect.objectContaining, expect.arrayContainingで判定しない
      expect(onSubmitMock.mock.calls[0][0]).toStrictEqual({
        userName: '0123456789',
      });
    });
    test('signUpUser Args Check', async () => {
      const signUpUserSpy = vi
        .spyOn(actions, 'signUpUser')
        .mockResolvedValue(true);
      const { result } = renderHook(() => useUserForm());
      render(
        <UserFormInner
          methods={result.current.methods}
          onSubmit={result.current.onSubmit}
        />,
      );
      const userInput = screen.getByText('ユーザー名');
      const submitButton = screen.getByText('登録');
      await user.click(submitButton);
      expect(onSubmitMock).not.toHaveBeenCalled();

      await user.type(userInput, '0123456789');
      await user.click(submitButton);

      expect(signUpUserSpy).toHaveBeenCalledOnce();
      expect(signUpUserSpy).toHaveBeenCalledWith({
        userName: '0123456789',
        userId: 'test-user-id',
      });
    });
  });
  describe('Submit Operation', () => {
    test('Submit Success', async () => {
      vi.spyOn(actions, 'signUpUser').mockResolvedValue(true);
      const redirectSpy = vi.spyOn(actions, 'successRedirect');
      render(<Basic />);
      const userInput = screen.getByLabelText('ユーザー名');
      await userEvent.type(userInput, 'user');
      const submit = screen.getByText('登録');
      await userEvent.click(submit);
      expect(
        await screen.findByText('ユーザー登録が完了しました'),
      ).toBeInTheDocument();
      expect(redirectSpy).toHaveBeenCalledOnce();
    });
    test('Submit Fail', async () => {
      vi.spyOn(actions, 'signUpUser').mockResolvedValue(false);
      const redirectSpy = vi.spyOn(actions, 'successRedirect');
      render(<Basic />);
      const userInput = screen.getByLabelText('ユーザー名');
      await userEvent.type(userInput, 'user');
      const submit = screen.getByText('登録');
      await userEvent.click(submit);
      expect(
        await screen.findByText('ユーザー登録に失敗しました'),
      ).toBeInTheDocument();
      expect(redirectSpy).not.toHaveBeenCalled();
    });
  });
});
