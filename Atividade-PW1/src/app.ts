import express from "express";
const app = express();

import Routes from "./router/routes";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", Routes);

app.listen(3000, () => {
  console.log("Server ON! http://localhost:3000/");
});