import express from "express";
import { app } from "./app";

const port = 3004;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
