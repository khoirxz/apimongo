import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRouters from "./routes/posts.js";
import userRouters from "./routes/users.js";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/posts", postRouters);
app.use("/user", userRouters);
const CONNECTION_URI = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is runiing on http://localhost:" + PORT + "/");
    });
  })
  .catch((error) => {
    console.log(error);
  });
mongoose.set("useFindAndModify", false);
