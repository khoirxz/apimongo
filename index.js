import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRouters from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRouters);
const CONNECTION_URI = `mongodb+srv://khoirmern:mern12345@cluster0.ukvsk.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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
