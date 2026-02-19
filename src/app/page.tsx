import type { ReactElement } from 'react';

import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { Hero } from '@/components/sections/hero';
import { Skills } from '@/components/sections/skills';
import { Work } from '@/components/sections/work';

export default function Page(_: PageProps<'/'>): ReactElement {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Work />
      <Contact />
    </>
  );
}
