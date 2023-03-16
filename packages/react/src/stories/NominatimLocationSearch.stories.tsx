import { Box } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { isNil } from 'lodash'
import { useEffect, useState } from 'react'

import { NominatimLocationSearch } from '..'

export default {
  title: 'Example/NominatimLocationSearch',
  component: NominatimLocationSearch,
  argTypes: {
    size: {
      options: [undefined, 'small', 'medium'],
    },
  },
} as ComponentMeta<typeof NominatimLocationSearch>

const DEFAULT_LOCATION = {
  id: 307973665,
  longitude: '102',
  latitude: '25',
  name: '云南省, 中国',
}

const Template: ComponentStory<typeof NominatimLocationSearch> = ({ ...args }) => {
  const [value, setValue] = useState<any>()

  useEffect(() => {
    setValue(args.multiple ? [DEFAULT_LOCATION] : DEFAULT_LOCATION)
  }, [args.multiple])

  return (
    <Box>
      <Box>
        <NominatimLocationSearch
          {...args}
          value={args.multiple ? (isNil(value) ? [] : !Array.isArray(value) ? [value] : value) : value ?? null}
          onChange={(_, value) => setValue(value)}
        />
      </Box>
      <Box sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
        <code>{JSON.stringify(value, null, 2)}</code>
      </Box>
    </Box>
  )
}

export const Default = Template.bind({})

Default.args = {
  size: undefined,
  multiple: false,
  freeSolo: false,
}
