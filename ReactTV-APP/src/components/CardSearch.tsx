import { TvContext } from "../contexts/TvContext";
import { useContext, useMemo } from "react";
import { findChannel } from "../helpers/findChannel";

export const CardSearch = () => {
  const { channels, stringSearch } = useContext(TvContext)!;

  const channel = useMemo(() => {
    return findChannel(channels, stringSearch);
  }, [stringSearch]);

  return (
    <section className="flex items-center justify-center absolute top-0 w-full h-full shadow-md">
      <article className="flex flex-row items-center justify-start absolute bg-white bg-opacity-85 rounded-lg h-[10rem] w-[18rem] p-2">
        <img
          className="rounded-lg w-20 h-full object-cover my-2"
          src={
            channel
              ? channel.thumbUrl
              : "https://www.freevector.com/uploads/vector/preview/3990/FreeVector-No-Signal-TV.jpg"
          }
          alt={channel ? channel.name : "no-channel"}
        ></img>
        <p className="ml-2 text-6xl font-bold">{stringSearch}</p>
      </article>
    </section>
  );
};
