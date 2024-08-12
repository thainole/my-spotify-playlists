import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const UserNotLogged = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-[500px] w-[70%] h-80 rounded-[2rem] border-4 border-solid border-white flex justify-around items-center flex-col flex-nowrap">
        <Image
          src={
            'https://spotiy-playlist-retriever-experimental.vercel.app/_next/static/media/sad_emoji.41405e6f.svg'
          }
          width={160}
          height={150}
          alt="sad emoji"
          priority
          className="w-auto h-auto"
        />
        <button
          onClick={() => signIn()}
          className="shadow-primary w-2/3 h-16 rounded-xl bg-white border-0 text-black text-2xl active:scale-[0.99]"
        >
          Sign In
        </button>
      </div>
    </section>
  );
};

export default UserNotLogged;
