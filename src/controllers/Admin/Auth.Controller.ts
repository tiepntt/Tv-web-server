import { nextTick } from "process";
import { getRepository } from "typeorm";
import { UserService } from "../../CRUD/User/user";
import { User } from "../../entity/User/User";
import { HandelStatus } from "../HandelAction";

let jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  let account = req.body.account;
  if (!account) return HandelStatus(400);
  let user = await UserService.getUserByAccount(
    account.username,
    account.password
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
  let token = jwt.sign(payload, process.env.TOKEN_SECRET_TV, {
    expiresIn: 14400, // expires in 24 hours
  });

  res.json({
    status: 200,
    message: "authentication done ",
    token: token,
  });
};
const Logout = async (req, res) => {
  if (!req.header) {
    res.send(HandelStatus(401, "Bạn chưa đăng nhập"));
    return;
  }
  let token = req.headers.token;
  if (!token) {
    res.send(HandelStatus(401, "Bạn chưa đăng nhập"));
    return;
  }
  let payload = await jwt.verify(
    token,
    process.env.TOKEN_SECRET_TV,
    (err, verifiedJwt) => {
      if (err) {
        res.send(HandelStatus(401, err.message));
        return;
      } else {
        jwt.destroy(verifiedJwt);
        res.send(HandelStatus(200));
      }
    }
  );
};
const removeToken = async (token) => {
  let payload = await jwt.verify(
    token,
    process.env.TOKEN_SECRET_TV,
    (err, verifiedJwt) => {
      if (err) {
        return;
      } else {
        jwt.destroy(verifiedJwt);
      }
    }
  );
  return HandelStatus(401, "Bạn cần đăng nhập");
};

const Register = (req, res) => {};
const ResetPassWord = (req, res) => {};
export const CheckToken = async (req, res, next) => {
  if (!req.header) {
    res.send(HandelStatus(401, "Bạn chưa đăng nhập"));
    return;
  }
  let token = req.headers.token;
  if (!token) {
    res.send(HandelStatus(401, "Bạn chưa đăng nhập"));
    return;
  }
  let payload = await jwt.verify(
    token,
    process.env.TOKEN_SECRET_TV,
    (err, verifiedJwt) => {
      if (err) {
        res.send(HandelStatus(401, err.message));
        return;
      } else {
        res.locals.userLogin = verifiedJwt;
        res.locals.userId = verifiedJwt.userId;
        next();
      }
    }
  );
};
export const CheckIsCreateOrEditUser = async (req, res, next) => {
  let user = res.locals.userLogin;
  let userRepo = getRepository(User);
  let userGet = await userRepo
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.role", "role")
    .where("user.Id =:id", { id: user.userId })
    .getOne();
  if (!user.role || !user.role.isCreateOrEditUser) {
    if (!userGet || userGet.role.isCreateOrEditUser) {
      await removeToken(req.header.token);
      return res.send(HandelStatus(401));
    }
    res.send(HandelStatus(303, "Bạn không có quyền làm điều này"));
    return;
  }
  next();
};
export const CheckIsCreateOrEditStudent = async (req, res, next) => {
  let user = res.locals.userLogin;
  let userRepo = getRepository(User);
  let userGet = await userRepo
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.role", "role")
    .where("user.Id =:id", { id: user.userId })
    .getOne();
  if (!user.role || !user.role.isCreateOrEditStudent) {
    if (!userGet || userGet.role.isCreateOrEditStudent) {
      await removeToken(req.header.token);
      return res.send(HandelStatus(401));
    }
    res.send(HandelStatus(303, "Bạn không có quyền làm điều này"));
    return;
  }
  next();
};
export const CheckIsCreateOrEditBook = async (req, res, next) => {
  let user = res.locals.userLogin;
  let userRepo = getRepository(User);
  let userGet = await userRepo
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.role", "role")
    .where("user.Id =:id", { id: user.userId })
    .getOne();
  if (!user.role || !user.role.isCreateOrEditBook) {
    if (!userGet || userGet.role.isCreateOrEditUser) {
      await removeToken(req.header.token);
      return res.send(HandelStatus(401));
    }
    res.send(HandelStatus(303, "Bạn không có quyền làm điều này"));
    return;
  }
  next();
};
export const CheckIsCreateOrEditSheet = async (req, res, next) => {
  let user = res.locals.userLogin;
  let userRepo = getRepository(User);
  let userGet = await userRepo
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.role", "role")
    .where("user.Id =:id", { id: user.userId })
    .getOne();
  if (!user.role || !user.role.isCreateOrEditSheet) {
    if (!userGet || userGet.role.isCreateOrEditUser) {
      await removeToken(req.header.token);
      return res.send(HandelStatus(401));
    }
    res.send(HandelStatus(303, "Bạn không có quyền làm điều này"));
    return;
  }
  next();
};
export const CheckIsSendEmail = async (req, res, next) => {
  let user = res.locals.userLogin;
  let userRepo = getRepository(User);
  let userGet = await userRepo
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.role", "role")
    .where("user.Id =:id", { id: user.userId })
    .getOne();
  if (!user.role || !user.role.isSendEmail) {
    if (!userGet || userGet.role.isCreateOrEditUser) {
      await removeToken(req.header.token);
      return res.send(HandelStatus(401));
    }
    res.send(HandelStatus(303, "Bạn không có quyền làm điều này"));
    return;
  }
  next();
};
export const AuthController = {
  Login,
  Logout,
  removeToken,
};
