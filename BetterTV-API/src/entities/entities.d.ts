import { Request, Response } from "express";

// ### TYPES ###
export type Configs = {
  PORT: number;
  API_VERSION: string;
};

export type TvController = {
  alive: (req: Request, res: Response) => Response;
  shutdownWindow: (req: Request, res: Response) => Response;
  getChannels: (req: Request, res: Response) => Promise<Response>;
  shutdownComputer: (req: Request, res: Response) => Response;
};

export type Channel = {
  id: string;
  number: string;
  thumbUrl: string;
  name: string;
  url: string;
};

// ### INTERFACES ###
