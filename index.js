import express from "express";
const app = express();
import bodyParser from "body-parser";
import AnswerModel from "./models/AnswerModel.js";
import mongoose from "mongoose";
import "dotenv/config";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("bot");
});

app.post("/", async (req, res) => {
  // let ans = req.body.question
  // console.log(ans)
  let ans = await AnswerModel.check(req.body.question);
  console.log(ans);
  res.render("bot", {
    ans,
  });
});

mongoose.connect(process.env.DB_CONN, () => {
  console.log("Connected to database.");
});

app.listen(3000);
