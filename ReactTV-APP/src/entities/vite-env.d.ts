/// <reference types="vite/client" />

import ReactPlayer from "react-player";

// TYPES
export type Channel = {
  id: string;
  number: string;
  thumbUrl: string;
  name: string;
  url: string;
};

export type TvContext = {
  tvMuted: boolean;
  activeChannel: Channel | null;
  channels: Channel[];
  channelChanged: boolean;
  stringSearch: string;
  handleTvMute: (bool: boolean) => void;
  handleChannels: (channels: Channel[]) => void;
  handleActiveChannel: (channel: Channel) => void;
  handleStringSearch: (str: string) => void;
};

// INTERFACES

export interface TvContextProps {
  children: React.ReactNode;
}
