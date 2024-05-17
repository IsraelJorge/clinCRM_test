import type { Preview } from '@storybook/react'

import { DialogProvider } from '@/providers/dialog-provider'

import '@/styles/global.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <DialogProvider>
        <Story />
      </DialogProvider>
    ),
  ],
}

export default preview
