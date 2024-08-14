'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  UserNotLogged,
  PlayIcon,
  PauseIcon,
  Tooltip,
  SectionContainer,
} from '../components';
import { useParams } from 'next/navigation';
import { Nullable, Playlist } from '../types';

export default function PlaylistPage() {
  const { data } = useSession();
  const { playlistId } = useParams();

  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState<null | Playlist>(null);
  const [audio, setAudio] = useState<any>();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (data?.token && playlistId) {
      const fetchPlaylists = async () => {
        try {
          setLoading(true);

          const response = await fetch(
            `https://api.spotify.com/v1/playlists/${playlistId}`,
            {
              headers: {
                Authorization: `Bearer ${data?.token.access_token}`,
              },
            }
          );
          const res = await response.json();
          setPlaylist(res);
        } catch {
          //
        } finally {
          setLoading(false);
        }
      };

      fetchPlaylists();
    }
  }, [data?.token, playlistId]);

  const onPlayNewTrack = (trackAudio: Nullable<string>) => {
    if (!trackAudio) return;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    const newAudio = new Audio(trackAudio);
    setAudio(newAudio);
    newAudio.play();
    setIsPaused(false);
  };

  const onTogglePlayPause = () => {
    if (!audio) return;

    !audio.paused ? audio.pause() : audio.play();
    setIsPaused(audio.paused);
  };

  if (data) {
    if (loading) {
      return <h1 className="text-center mt-5">Loading...</h1>;
    } else
      return (
        <>
          {playlist && (
            <SectionContainer>
              <>
                {/* Playlist info */}
                <div className="w-full flex flex-col items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      playlist.images.length > 0
                        ? playlist.images[0].url
                        : 'https://spotiy-playlist-retriever-experimental.vercel.app/_next/static/media/user_img.6db01878.svg'
                    }
                    alt={playlist.name}
                    className="object-cover w-32 h-32 mb-2"
                  />
                  <div className="w-3/4">
                    <h2 className="text-3xl truncate font-mono text-center">
                      {playlist.name}
                    </h2>
                    <p className="text-sm truncate text-center">
                      {playlist.description || ''}
                    </p>
                    <p className="text-xs truncate text-center">
                      Made with love by {playlist.owner.display_name}
                    </p>
                  </div>
                </div>

                {/* Tracks */}

                <h4 className="mb-2 mt-5 text-xl">Tracks:</h4>
                {playlist.tracks.items.map(({ track }, index) => (
                  <div
                    key={track.id}
                    className="flex flex-row justify-between items-start"
                  >
                    <div className="flex flex-row gap-x-2 mb-2 ml-2">
                      <span>{index + 1}.</span>
                      <div>
                        <p>{track.name}</p>
                        <p className="text-sm opacity-75">
                          {track.artists.map((a) => a.name).join(', ')}
                        </p>
                        <p className="text-sm opacity-75 italic">
                          {track.album.name}
                        </p>
                      </div>
                    </div>

                    {track.preview_url && (
                      <Tooltip message="Cick here to listen a preview of the song">
                        <button
                          data-tooltip-target="tooltip-default"
                          onClick={() => {
                            if (!audio || audio.src !== track.preview_url) {
                              onPlayNewTrack(track.preview_url);
                            } else {
                              onTogglePlayPause();
                            }
                          }}
                          className={`rounded-full border-2 border-white p-0.5 ${
                            audio && audio.src === track.preview_url
                              ? 'bg-green-500'
                              : 'bg-transparent'
                          }`}
                        >
                          {audio &&
                          audio.src === track.preview_url &&
                          !isPaused ? (
                            <PauseIcon />
                          ) : (
                            <PlayIcon />
                          )}
                        </button>
                      </Tooltip>
                    )}
                  </div>
                ))}
              </>
            </SectionContainer>
          )}
        </>
      );
  } else {
    return <UserNotLogged />;
  }
}
