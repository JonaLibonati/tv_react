import Router from "express";
import { TvController } from "../../controllers/tvControllers";

const tvRouter = Router();

tvRouter
  .get("/alive", TvController.alive)
  .get("/shutdown/window", TvController.shutdownWindow)
  .get("/shutdown/computer", TvController.shutdownComputer)
  .get("/channels", TvController.getChannels);

export default tvRouter;
