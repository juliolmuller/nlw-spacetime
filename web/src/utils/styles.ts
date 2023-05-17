import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'

export const robotoFont = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
})

export const baiJamjureeFont = BaiJamjuree({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-bai-jamjuree',
})
