// pages/page.tsx

import { useEffect, useRef, useState } from 'react';
import AnimationWrapper from '@/components/ui/animation-wrapper';
import { Header } from '@/components/ui/header-on-page';
import Gallery from '@/components/ui/gallery';

export default function Page(){

  return (
    <AnimationWrapper>
      <div>
        <Header
          title="Photography"
          subtitle="A moment in time and space, captured and rendered for its perceived beauty."
        />
        <Gallery/>
      </div>
    </AnimationWrapper>
  );
};

