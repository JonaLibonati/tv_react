import express from "express";
import TvRouter from "./routes/v1/tvRoutes";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/tv", TvRouter);

app.use((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(404).json({ message: "Route not found" });
});

export default app;
