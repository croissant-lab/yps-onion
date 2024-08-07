import { Animation } from '@/components/layouts/Animation';
import { Center } from '@/components/layouts/Center';

async function initialize() {
  const { user } = await serverFetch<GetSelf>('/auth/self');
  if (!user) {
    return { name: '', uid: '', picture: '' };
  }
  return user;
}

export const {{ inputs.component | pascal }}Page = async() => {
  await initialize();
  return (
    < {{ inputs.component | pascal }}PageInner/>
  );
};

type Props = {}

export const {{ inputs.component | pascal }}PageInner = ({}: Props) => {
  return (
    <Animation>
    <Center>
      <div>aaa</div>
    </Center>
  </Animation>
  );
};

