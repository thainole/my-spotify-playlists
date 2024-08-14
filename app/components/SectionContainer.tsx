import React, { ReactNode } from 'react';
import BackIcon from './icons/BackIcon';
import { useRouter } from 'next/navigation';

const SectionContainer = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <section className="m-5 px-8 py-4 rounded-[2rem] border-4 border-solid border-white">
      <button onClick={() => router.back()}>
        <BackIcon />
      </button>
      {children}
    </section>
  );
};

export default SectionContainer;
