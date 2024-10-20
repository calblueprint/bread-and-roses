import localFont from 'next/font/local';

const BespokeSans = localFont({
  src: [
    {
      path: '../public/fonts/BespokeSans_Complete/Fonts/OTF/BespokeSans-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/BespokeSans_Complete/Fonts/OTF/BespokeSans-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/BespokeSans_Complete/Fonts/OTF/BespokeSans-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/BespokeSans_Complete/Fonts/OTF/BespokeSans-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/BespokeSans_Complete/Fonts/OTF/BespokeSans-Italic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
});

const BespokeSerif = localFont({
  src: [
    {
      path: '../public/fonts/BespokeSerif_Complete/Fonts/OTF/BespokeSerif-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/BespokeSerif_Complete/Fonts/OTF/BespokeSerif-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/BespokeSerif_Complete/Fonts/OTF/BespokeSerif-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/BespokeSerif_Complete/Fonts/OTF/BespokeSerif-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/BespokeSerif_Complete/Fonts/OTF/BespokeSerif-Italic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
});

const ClashGrotesk = localFont({
  src: [
    {
      path: '../public/fonts/ClashGrotesk_Complete/Fonts/OTF/ClashGrotesk-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/ClashGrotesk_Complete/Fonts/OTF/ClashGrotesk-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/ClashGrotesk_Complete/Fonts/OTF/ClashGrotesk-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/ClashGrotesk_Complete/Fonts/OTF/ClashGrotesk-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export { BespokeSans, BespokeSerif, ClashGrotesk };
