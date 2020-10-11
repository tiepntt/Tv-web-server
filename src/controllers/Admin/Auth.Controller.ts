import { nextTick } from "process";
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

  res.json( {
    status : 200,
    message: "authentication done ",
    token: token,
  });
};
export const Logout = async ( req, res ) =>
{
  if(!req.header) {
    res.send(HandelStatus(401, "Bạn chưa đăng nhập"));
    return;
  }
  var token = req.headers.token;
  if (!token) {
    res.send( HandelStatus( 401, "Bạn chưa đăng nhập" ) );
    return;
  }
  var payload = await jwt.verify(
    token,
    process.env.TOKEN_SECRET_TV,
    (err, verifiedJwt) => {
      if (err) {
        res.send( HandelStatus( 401, err.message ) );
        return;
      } else {
        jwt.destroy( verifiedJwt );
        res.send(HandelStatus(200))
      }
    }
  );
};

export const Register = (req, res) => {};
export const ResetPassWord = (req, res) => {};
export const CheckToken = async ( req, res, next ) =>
{
  if(!req.header) {
    res.send(HandelStatus(401, "Bạn chưa đăng nhập"));
    return;
  }
  var token = req.headers.token;
  if (!token) {
    res.send( HandelStatus( 401, "Bạn chưa đăng nhập" ) );
    return;
  }
  var payload = await jwt.verify(
    token,
    process.env.TOKEN_SECRET_TV,
    (err, verifiedJwt) => {
      if (err) {
        res.send( HandelStatus( 401, err.message ) );
        return;
      } else {
        res.locals.userLogin = verifiedJwt;
        res.locals.userId = verifiedJwt.userId;
        next();
      }
    }
  );
};
export const CheckIsCreateOrEditUser = async ( req, res, next ) =>
{
  var user = res.locals.userLogin;
  if ( !user.role || !user.role.isCreateOrEditUser )
  {
    res.send(HandelStatus(303, "Bạn không có quyền làm điều này"))
    return;
  }
  next();
}
export const CheckIsCreateOrEditStudent = async ( req, res, next ) =>
{
  var user = res.locals.userLogin;
  if ( !user.role || !user.role.isCreateOrEditStudent )
  {
    res.send(HandelStatus(303, "Bạn không có quyền làm điều này"))
    return;
  }
  next();
}
export const CheckIsCreateOrEditBook= async ( req, res, next ) =>
{
  var user = res.locals.userLogin;
  if ( !user.role || !user.role.isCreateOrEditBook )
  {
    res.send(HandelStatus(303, "Bạn không có quyền làm điều này"))
    return;
  }
  next();
}
export const CheckIsCreateOrEditSheet= async ( req, res, next ) =>
{
  var user = res.locals.userLogin;
  if ( !user.role || !user.role.isCreateOrEditSheet )
  {
    res.send(HandelStatus(303, "Bạn không có quyền làm điều này"))
    return;
  }
  next();
}
export const CheckIsSendEmail= async ( req, res, next ) =>
{
  var user = res.locals.userLogin;
  if ( !user.role || !user.role.isSendEmail )
  {
    res.send(HandelStatus(303, "Bạn không có quyền làm điều này"))
    return;
  }
  next();
}


