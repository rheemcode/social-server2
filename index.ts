import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/posts.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.set("port", process.env.PORT || 5000);

app.use(cors());
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/posts", routes);

app.listen(app.get("port"), () => {
  console.log("server is listening at " + app.get("port"));
});
