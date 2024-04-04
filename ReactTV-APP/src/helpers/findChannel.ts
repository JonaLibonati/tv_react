import { Channel } from "../entities/vite-env";

export const findChannel = (
  channels: Channel[],
  strChannel: string
): Channel => {
  const channel = channels.find((channel) => channel.number === strChannel);

  return channel!;
};
