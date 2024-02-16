import express from "express";
const router = express.Router();
import data from "../data.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./helper.js";

router.get("/", (req, res) => {
  res.json({ message: "this is auth page!" });
});

router.post("/register", (req, res) => {
  const userData = req.body;
  console.log(userData);
  if (data.filter((user) => user.username == userData.username).length == 0) {
    res.status(201).json({ message: userData });
  } else {
    res.status(400).json({ messege: "try diffrent username" });
  }
});

router.post("/login", (req, res) => {
  const userData = req.body;
  console.log(userData);

  if (
    data.filter((user) => user.username == userData.username)[0].password ==
    userData.password
  ) {
    const userInfo = data.filter(
      (user) => user.username == userData.username
    )[0];
    const accessToken = generateAccessToken(userInfo);
    const refreshToken = generateRefreshToken(userInfo);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    res.json({ accessToken });
  } else {
    res.status(400).json({ messege: "wrong info" });
  }
});

router.post("/refresh_token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(401);
  }
  const verifyedRefreshToken = verifyRefreshToken(refreshToken);
  if (verifyedRefreshToken == null) {
    return res.statusCode(403);
  } else {
    return res.json({ accessToken: verifyRefreshToken });
  }
});

router.delete("/logout", (req, res) => {
  res.cookie("refreshToken", "", {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
    expires: new Date(0),
  });
  res.statusCode(204);
});

export default router;
