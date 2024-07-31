import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import { test } from 'vitest';
import * as stories from './index.stories';

const { Basic } = composeStories(stories);

test('/{{ inputs.path }}', async () => {
  render(<Basic />);
});
