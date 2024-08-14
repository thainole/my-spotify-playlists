'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Artist } from '../types';
import { SectionContainer, UserNotLogged } from '../components';

const TopArtistPage = () => {
  const { data } = useSession();

  const [loading, setLoading] = useState(false);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    if (data?.token) {
      const fetchTopArtists = async () => {
        try {
          setLoading(true);

          const response = await fetch(
            'https://api.spotify.com/v1/me/top/artists',
            {
              headers: {
                Authorization: `Bearer ${data?.token.access_token}`,
              },
            }
          );
          const res = await response.json();
          setArtists(res.items);
        } catch {
          //
        } finally {
          setLoading(false);
        }
      };

      fetchTopArtists();
    }
  }, [data?.token]);

  if (data) {
    if (loading) {
      return <h1 className="text-center mt-5">Loading...</h1>;
    } else
      return (
        <SectionContainer>
          <>
            <h2 className="text-3xl truncate font-mono text-center mb-6">
              My Top Artists
            </h2>

            <div className="flex flex-row flex-wrap items-start justify-center gap-y-11 gap-x-14">
              {artists.length > 0 &&
                artists.map((artist) => {
                  return (
                    <div
                      className="flex flex-col items-center justify-center gap-y-2 w-[120px]"
                      key={artist.id}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={artist.images[0].url}
                        alt={artist.name}
                        className="object-cover w-full h-[120px]"
                      />
                      <div>
                        <p className="text-center">{artist.name}</p>
                        <p className="text-xs text-center opacity-75 italic">
                          {artist.genres.join(', ')}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        </SectionContainer>
      );
  } else {
    <UserNotLogged />;
  }
};

export default TopArtistPage;
