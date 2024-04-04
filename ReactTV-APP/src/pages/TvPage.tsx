import { useContext, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { TvContext } from "../contexts/TvContext";
import { getChannels } from "../api/getChannels";
import { Channel } from "../entities/vite-env";
import { closeWindow } from "../api/closeWindow";
import { changeChannel } from "../helpers/changeChannel";
import { CardChannel } from "../components/CardChannel";
import { CardSearch } from "../components/CardSearch";
import { shutdownComputer } from "../api/shutdownComputer";

export const TvPage = (): JSX.Element => {
  // Contexts
  const {
    channels,
    activeChannel,
    tvMuted,
    channelChanged,
    stringSearch,
    handleChannels,
    handleActiveChannel,
    handleStringSearch,
  } = useContext(TvContext)!;

  // Refs
  const handleKeyDownRef = useRef<((e: KeyboardEvent) => Promise<void>) | null>(
    null
  );

  // fns
  const onGetChannels = async (): Promise<void> => {
    const request = await getChannels();
    const channels: Channel[] = request.data.data;

    handleChannels(channels);
    return;
  };

  const handlePressEscape = async (): Promise<void> => {
    await closeWindow();
    return;
  };

  const handlePressPlus = async (): Promise<void> => {
    await shutdownComputer();
    return;
  };

  // UseEffects
  useEffect(() => {
    onGetChannels();
  }, []);

  useEffect(() => {
    const keyPress = async (e: KeyboardEvent): Promise<void> => {
      e.preventDefault();
      const keyPressed = e.key;
      if (keyPressed === "Escape") {
        handlePressEscape();
      } else if (keyPressed === "+") {
        handlePressPlus();
      } else if (keyPressed === "ArrowRight" || keyPressed === "ArrowLeft") {
        const newActiveChannel = changeChannel(
          keyPressed,
          channels,
          activeChannel!
        );
        handleActiveChannel(newActiveChannel);
      } else if (
        Number(keyPressed) ||
        (keyPressed === "0" && stringSearch.length < 4)
      ) {
        handleStringSearch(keyPressed);
      }

      return;
    };

    handleKeyDownRef.current = keyPress;
    window?.addEventListener("keydown", handleKeyDownRef.current, true);

    return () => {
      window?.removeEventListener("keydown", handleKeyDownRef.current!, true);
    };
  }, [channels, activeChannel, stringSearch]);

  return (
    <main className="relative w-screen h-screen select-none pointer-events-none">
      {activeChannel?.url.includes(".txt.boats/cvatt.html") ||
      activeChannel?.url.includes(".php") ? (
        <iframe
          allow="encrypted-media"
          height={window.innerHeight}
          width={window.innerWidth}
          src={activeChannel?.url}
        ></iframe>
      ) : (
        <ReactPlayer
          height={window.innerHeight}
          width={window.innerWidth}
          url={activeChannel?.url}
          playing={true}
          muted={tvMuted}
          controls={false}
        ></ReactPlayer>
      )}

      {stringSearch ? <CardSearch></CardSearch> : null}

      {channelChanged ? <CardChannel></CardChannel> : null}
    </main>
  );
};
