import { Channel } from "../entities/vite-env";

export const changeChannel = (
  key: string,
  channels: Channel[],
  activeChannel: Channel
): Channel => {
  let channel: Channel | null = null;
  const actualIndex = channels.indexOf(activeChannel);

  if (key === "ArrowRight") {
    const newIndex =
      actualIndex + 1 > channels.length - 1 ? 0 : actualIndex + 1;
    channel = channels[newIndex];
  }

  if (key === "ArrowLeft") {
    const newIndex =
      actualIndex - 1 < 0 ? channels.length - 1 : actualIndex - 1;
    channel = channels[newIndex];
  }

  return channel!;
};
