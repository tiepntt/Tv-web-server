import { getUserByAccount } from "../../CRUD/User/user";
import { HandelStatus } from "../HandelAction";

var jwt = require("jsonwebtoken");

export const Login = async (req, res) => {
  if (!req.body.account) {
    res.send(HandelStatus(401));
  }

  var account = req.body.account;

  var user = await getUserByAccount(
    account.username || "",
    account.password || "null"
  );
  if (!user) {
    res.send(HandelStatus(401));
    return;
  }
  const payload = {
    userId: user.id,
    role: user.role,
    check: true,
  };
  var token = jwt.sign(payload, process.env.TOKEN_SECRET_TV, {
    expiresIn: 1440, // expires in 24 hours
  });

  res.json({
    message: "authentication done ",
    token: token,
  });
};
export const Logout = (req, res) => {};

export const Register = (req, res) => {};
export const ResetPassWord = (req, res) => {};
