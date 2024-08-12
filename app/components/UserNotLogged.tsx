import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import loginImg from '../../public/images/login.jpg';

const UserNotLogged = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-[450px] w-[90%] px-2 py-6 gap-y-5 rounded-[2rem] border-4 border-solid border-white flex justify-around items-center flex-col flex-nowrap">
        <Image
          src={loginImg}
          width={150}
          height={150}
          alt="enjoying music"
          priority
          className="w-auto h-auto"
        />
        <h1 className="text-xl sm:text-2xl font-mono text-center">
          Check your Spotify playlists!
        </h1>
        <button
          onClick={() => signIn()}
          className="shadow-primary font-sans font-semibold tracking-wider flex flex-row justify-center items-center gap-x-3 w-2/3 py-3 sm:py-4 rounded-xl bg-white border-0 text-black text-lg sm:text-2xl active:scale-[0.99]"
        >
          Sign In
          <Image
            src={
              'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png'
            }
            width={20}
            height={20}
            alt="spotify"
            priority
            className="w-auto h-auto"
          />
        </button>
      </div>
    </section>
  );
};

export default UserNotLogged;
