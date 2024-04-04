import { createContext, useEffect, useState } from "react";
import {
  Channel,
  TvContextProps,
  TvContext as TvContextT,
} from "../entities/vite-env";
import { findChannel } from "../helpers/findChannel";

export const TvContext = createContext<TvContextT | null>(null);

export const TvProvider: React.FunctionComponent<TvContextProps> = ({
  children,
}) => {
  // Controls TV
  const [tvMuted, setTvMuted] = useState<boolean>(false);

  // Channels TV
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [channelChanged, setChannelChanged] = useState<boolean>(false);

  // Search Channel TV
  const [stringSearch, setStringSearch] = useState<string>("");

  // Fns
  const handleTvMute = (bool: boolean): void => {
    setTvMuted(bool);
  };

  const handleChannels = (channels: Channel[]): void => {
    setChannels(channels);
  };

  const handleActiveChannel = (channel: Channel): void => {
    setChannelChanged(true);
    setActiveChannel(channel);
  };

  const handleStringSearch = (str: string): void => {
    setStringSearch((prev) => prev + str);
    return;
  };

  // UseEffects
  useEffect(() => {
    if (!activeChannel) {
      handleActiveChannel(channels[0]);
    }
  }, [channels]);

  useEffect(() => {
    if (channelChanged) {
      const timeout = setTimeout(() => {
        setChannelChanged(false);
      }, 2500);

      return () => clearTimeout(timeout);
    }
  }, [activeChannel]);

  useEffect(() => {
    console.log("Channels: ", channels);
    console.log("Active Channel: ", activeChannel);
  }, [channels, activeChannel]);

  useEffect(() => {
    if (stringSearch?.length === 4) {
      // Search Channel
      const timeout = setTimeout(() => {
        const channel = findChannel(channels, stringSearch);

        if (!channel) {
          setStringSearch("");
          return;
        }

        setActiveChannel(channel);
        setStringSearch("");
        return;
      }, 2000);

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      const channel = findChannel(channels, stringSearch);

      if (!channel) {
        setStringSearch("");
        return;
      }

      setActiveChannel(channel);
      setStringSearch("");
      return;
    }, 2000);

    return () => clearTimeout(timeout);
  }, [stringSearch]);

  return (
    <TvContext.Provider
      value={{
        tvMuted,
        activeChannel,
        channels,
        channelChanged,
        stringSearch,
        handleTvMute,
        handleChannels,
        handleActiveChannel,
        handleStringSearch,
      }}
    >
      {children}
    </TvContext.Provider>
  );
};
