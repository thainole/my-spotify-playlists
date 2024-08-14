export type Nullable<T> = T | null | undefined;

export type BaseItem = {
  id: string;
  name: string;
};

export type Image = {
  url: string;
};

export type Playlist = BaseItem & {
  owner: { display_name: string };
  images: Image[];
  description?: string;
  tracks: { items: { track: Track }[] };
};

export type Track = BaseItem & {
  preview_url?: Nullable<string>;
  album: BaseItem;
  artists: BaseItem[];
};

export type Artist = BaseItem & {
  genres: Array<string>;
  images: Array<Image>;
};
