import configs from "../config";
import { exec, spawn } from "child_process";
import { TvController as TvControllerT } from "../entities/entities";
import { channels } from "../helpers/channels";

export const TvController: TvControllerT = {
  alive: (_, res) => {
    try {
      return res.status(200).json({
        author: "Diego Libonati",
        name: "BetterTV API",
        version: configs.API_VERSION,
      });
    } catch (e: unknown) {
      if (typeof e === "string") {
        return res.status(400).send({ error: e.toUpperCase() });
      } else if (e instanceof Error) {
        return res.status(400).send({ error: e.message, name: e.name });
      }

      return res.status(400).send({ error: e });
    }
  },
  shutdownWindow: (_, res) => {
    try {
      exec(
        'tasklist /fi "ImageName eq Electron.exe" /fo list',
        (error, stdout, stderr) => {
          if (error) {
            return res.status(400).json({
              window: false,
              error: error,
            });
          }

          const pids: string[] = [];
          const stringList = stdout.split("PID:");

          stringList.map((string) => {
            if (parseInt(string.trim())) {
              pids.push(string.trim());
            }
          });

          // Cerrar el proceso de Chrome
          pids.forEach((pid) => {
            exec(`taskkill /pid ${pid} /f`, (error, stdout, stderr) => {
              console.log("Proceso de Chrome cerrado");
            });
          });
        }
      );

      return res.status(200).json({
        data: true,
      });
    } catch (e: unknown) {
      if (typeof e === "string") {
        return res.status(400).send({ error: e.toUpperCase() });
      } else if (e instanceof Error) {
        return res.status(400).send({ error: e.message, name: e.name });
      }

      return res.status(400).send({ error: e });
    }
  },
  shutdownComputer: (_, res) => {
    try {
      spawn("shutdown", ["-s", "-f"]);
      return res.status(200).json({
        data: true,
      });
    } catch (e: unknown) {
      if (typeof e === "string") {
        return res.status(400).send({ error: e.toUpperCase() });
      } else if (e instanceof Error) {
        return res.status(400).send({ error: e.message, name: e.name });
      }

      return res.status(400).send({ error: e });
    }
  },
  getChannels: async (_, res) => {
    try {
      // Checkear canales con ?get
      const finalChannels = await Promise.all(
        channels.map(async (channel) => {
          if (channel.url.includes("?get")) {
            let value = 0;
            let validUrl = false;
            let url = "";
            while (!validUrl) {
              try {
                url = `https://flow${value}.txt.boats/cvatt.html${channel.url}`;

                await fetch(url);

                channel.url = url;
                validUrl = true;
              } catch {
                value = value + 1;
              }
            }

            return channel;
          }
          return channel;
        })
      );

      return res.status(200).json({
        data: finalChannels,
      });
    } catch (e: unknown) {
      if (typeof e === "string") {
        return res.status(400).send({ error: e.toUpperCase() });
      } else if (e instanceof Error) {
        return res.status(400).send({ error: e.message, name: e.name });
      }

      return res.status(400).send({ error: e });
    }
  },
};
