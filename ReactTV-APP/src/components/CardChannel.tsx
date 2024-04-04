import { TvContext } from "../contexts/TvContext";
import { useContext } from "react";

export const CardChannel = (): JSX.Element => {
  const { activeChannel } = useContext(TvContext)!;
  return (
    <section className="absolute top-0 w-full h-full shadow-md">
      <article className="flex flex-col items-center justify-center absolute bottom-12 left-2 bg-white bg-opacity-85 rounded-lg p-2">
        <h2 className="font-bold text-2xl text-black text-center">
          {activeChannel?.number}
        </h2>

        <img
          className="rounded-lg w-full h-24 object-cover my-2"
          src={activeChannel?.thumbUrl}
          alt={activeChannel?.name}
        ></img>

        <p className="font-bold text-xl text-black text-center">
          {activeChannel?.name}
        </p>
      </article>
    </section>
  );
};
