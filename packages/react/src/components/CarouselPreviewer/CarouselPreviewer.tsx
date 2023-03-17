import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'

import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Box, BoxProps, IconButton, styled } from '@mui/material'
import { ReactNode, useEffect, useRef } from 'react'
import { EffectCoverflow, Mousewheel, Navigation } from 'swiper'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

export interface CarouselPreviewerProps extends Pick<BoxProps, 'sx' | 'className'> {
  index?: number
  onIndexChange?: (index: number) => void
  data: { key?: string | number; url: string; type?: 'img' | 'video' | 'audio' }[]
  effect?: 'coverflow'
  renderItem?: (data: CarouselPreviewerProps['data'][0]) => ReactNode
}

export default function CarouselPreviewer({
  index,
  data,
  effect,
  onIndexChange,
  renderItem,
  ...props
}: CarouselPreviewerProps) {
  const swiper = useRef<SwiperRef>(null)

  const prev = useRef<HTMLDivElement>(null)
  const next = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof index === 'number') swiper.current?.swiper.slideTo(index)
  }, [index])

  return (
    <_Swiper
      {...props}
      key={effect}
      ref={swiper}
      modules={[Mousewheel, Navigation, EffectCoverflow]}
      spaceBetween={10}
      slidesPerView="auto"
      effect={effect}
      mousewheel
      navigation={{ prevEl: prev.current, nextEl: next.current }}
      direction="horizontal"
      sx={{ height: 200, ...props.sx }}
      centeredSlides={effect === 'coverflow'}
      grabCursor
      coverflowEffect={{ rotate: 0, stretch: 0, depth: 200, slideShadows: true }}
      onRealIndexChange={({ realIndex }) => onIndexChange?.(realIndex)}
      onInit={swiper => {
        if (typeof swiper.params.navigation === 'object') {
          swiper.params.navigation.prevEl = prev.current
          swiper.params.navigation.nextEl = next.current
        }
        swiper.navigation.init()
        swiper.navigation.update()
      }}
    >
      {data.map(item => (
        <_SwiperSlide key={item.key || item.url}>
          {renderItem ? renderItem(item) : <ItemRenderer {...item} />}
        </_SwiperSlide>
      ))}

      <Box className="swiper-nav-button swiper-nav-prev" ref={prev}>
        <IconButton color="inherit" onClick={() => swiper.current?.swiper.slidePrev()}>
          <ArrowBackIosNew fontSize="inherit" />
        </IconButton>
      </Box>
      <Box className="swiper-nav-button swiper-nav-next" ref={next}>
        <IconButton color="inherit" onClick={() => swiper.current?.swiper.slideNext()}>
          <ArrowForwardIos fontSize="inherit" />
        </IconButton>
      </Box>
    </_Swiper>
  )
}

function ItemRenderer({ url, type }: CarouselPreviewerProps['data'][0]) {
  return type && ['video', 'audio'].includes(type) ? (
    <Box sx={{ display: 'inline-flex', maxWidth: '100%', height: '100%', alignItems: 'center' }}>
      <Box
        component={type}
        src={url}
        controls
        sx={{
          display: 'block',
          maxWidth: '100%',
          height: type === 'video' ? '100%' : undefined,
          borderRadius: 1,
        }}
      />
    </Box>
  ) : (
    <Box component="img" src={url} sx={{ display: 'block', maxWidth: '100%', height: '100%', borderRadius: 1 }} />
  )
}

const _Swiper = styled(Swiper)`
  user-select: none;

  > .swiper-nav-button {
    position: absolute;
    z-index: 10;
    color: white;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);

    &.swiper-button-disabled {
      display: none;
    }
  }

  > .swiper-nav-prev {
    left: 0;
  }

  > .swiper-nav-next {
    right: 0;
  }
`

const _SwiperSlide = styled(SwiperSlide)`
  width: auto;
`
