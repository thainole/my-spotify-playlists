'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

type Playlist = {
  name: string;
  id: string;
  images: PlaylistImage[];
};

type PlaylistImage = {
  url: string;
};

export default function Home() {
  const { data } = useSession();

  const [loading, setLoading] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [hasMorePlaylists, setHasMorePlaylists] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          'https://api.spotify.com/v1/me/playlists',
          {
            headers: {
              Authorization: `Bearer ${data?.token.access_token}`,
            },
          }
        );
        const res = await response.json();
        setPlaylists(res.items);
        setHasMorePlaylists(!!res.next);
      } catch {
        //
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [data?.token]);

  const loadMore = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/playlists?limit=50&offset=${playlists.length}`,
        {
          headers: {
            Authorization: `Bearer ${data?.token.access_token}`,
          },
        }
      );
      const res = await response.json();
      setPlaylists([...playlists, ...res.items]);
      setHasMorePlaylists(!!res.next);
    } catch {
      //
    }
  };

  if (data) {
    if (loading) {
      return <h1>Loading...</h1>;
    } else
      return (
        <section className="flex flex-col items-center justify-center">
          <div className="min-w-[19rem] h-[22rem] rounded-[2rem] border-4 border-solid border-white flex justify-around items-center flex-col flex-nowrap mt-10 mb-16">
            <div className="mt-8 w-full flex flex-col flex-nowrap justify-around items-center">
              <Image
                src={
                  data.user?.image ||
                  'https://spotiy-playlist-retriever-experimental.vercel.app/_next/static/media/user_img.6db01878.svg'
                }
                width={80}
                height={80}
                priority
                alt="Defualt user image"
                className="rounded-full"
              />
              <p className="text-white font-normal text-xl mt-5 mb-2">
                Signed in as
              </p>
              <span className="bold-txt font-mono text-lg">
                {data?.user?.name}
              </span>
            </div>

            <p
              className="opacity-40 mt-5 mb-5 underline cursor-pointer"
              onClick={() => signOut()}
            >
              Sign Out
            </p>
          </div>

          {playlists && playlists.length > 0 && (
            <section className="flex flex-col gap-y-7 items-center mx-8 p-8 rounded-[2rem] border-4 border-solid border-white">
              <h2 className="text-xl mb-4">My Playlists</h2>
              <div className="flex flex-wrap gap-8 justify-center">
                {playlists.map((playlist) => (
                  <div key={playlist.id} className="w-28">
                    <p className="truncate mb-1.5 text-sm">{playlist.name}</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        playlist.images.length > 0
                          ? playlist.images[0].url
                          : 'https://spotiy-playlist-retriever-experimental.vercel.app/_next/static/media/user_img.6db01878.svg'
                      }
                      alt={playlist.name}
                      className="object-cover w-full h-28"
                    />
                  </div>
                ))}
              </div>
              {hasMorePlaylists && (
                <button
                  onClick={loadMore}
                  className="bg-green-500 rounded-lg py-2 px-6 self-center"
                >
                  Load More
                </button>
              )}
            </section>
          )}
        </section>
      );
  } else {
    return (
      <div className="max-w-[19rem] h-80 rounded-[2rem] border-4 border-solid border-white flex justify-around items-center flex-col flex-nowrap mt-10 ml-10">
        <Image
          src={
            'https://spotiy-playlist-retriever-experimental.vercel.app/_next/static/media/sad_emoji.41405e6f.svg'
          }
          width={160}
          height={150}
          alt="sad emoji"
          priority
        />
        <button
          onClick={() => signIn()}
          className="shadow-primary w-56 h-16 rounded-xl bg-white border-0 text-black text-3xl active:scale-[0.99]"
        >
          Sign In
        </button>
      </div>
    );
  }
}
