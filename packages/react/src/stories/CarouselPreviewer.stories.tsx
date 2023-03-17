import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CarouselPreviewer } from '..'

export default {
  title: 'Example/CarouselPreviewer',
  component: CarouselPreviewer,
  argTypes: {
    effect: {
      options: [undefined, 'coverflow'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof CarouselPreviewer>

const Template: ComponentStory<typeof CarouselPreviewer> = ({ ...args }) => {
  return <CarouselPreviewer {...args} />
}

export const Default = Template.bind({})

Default.args = {
  effect: undefined,
  data: [
    {
      url: 'https://api.esquirehk.com/var/site/storage/images/_aliases/img_804_w/lifestyle/travel/swiss-jungfrau-travel-must-go/3016631-2-chi-HK/_1.jpg',
    },
    {
      url: 'https://www.travelliker.com.hk/img/upload/img/swiss.jpg',
    },
    {
      url: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/349000/349519-Graubunden.jpg',
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsOCMA_nI6f8EctuiT4AQjaBI9SvNAKg-0JpX1yYzinJl_nO0OwjooSzyXlWEwI8-LL_0&usqp=CAU',
    },
  ],
}
