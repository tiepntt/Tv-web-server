import { MailConfig } from "../../service/gmail/email";

export const changePasswordForm = (params: {
  password?: string;
  to: string;
  name?: string;
}) => {
  let form = new MailConfig();
  form.to = params.to;
  form.html = `
    <p>
      Chào ${params.name}! <br>
      Mật khẩu của bạn đã được thay đổi thành <b>${params.password}</b>. <br>
      Vui lòng đăng nhập lại và tiếp tục sử dụng dịch vụ của Thư viện Hội Sinh viên! <br>
      <b>Lưu ý</b> : Không chia sẻ mật khẩu cho bất cứ cá nhân nào!<br>
      Xin cảm ơn !! 
    </p>
    `;
  form.subject = `Reset Password at ${new Date().toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  })}`;
  return form;
};
export const CreateAccountEmail = (params: {
  password?: string;
  to: string;
  name?: string;
  username?: string;
  genCode?: string;
}) => {
  let form = new MailConfig();
  form.to = params.to;
  form.html = `
   <p>
      Chào ${params.name}! <br>
      Bạn đã được trở thành thành viên <b> ${params.genCode}</b> của <b>CLB Thư viện Hội Sinh viên - UET!</b> <br>
      Giờ đây, bạn có thể theo dõi các hoạt động và thông báo của Ban chủ nhiệm bằng cách : <br>
      <div>
      B1 : Tải app Thư viện (dành cho android) <br>
      B2 : Đăng nhập và sử dụng dịch vụ của app với tài khoản : <br>
        <div style = "background-color:#EEDEDB; width : auto; display : inline-block; padding : 10px ; border-radius : 10px ; font-weight : bold">
          <div>username : ${params.username}</div>
          <div>password : ${params.password}</div>
        </div>
        
      <div>
      <b>Lưu ý</b> : Không chia sẻ mật khẩu cho bất cứ cá nhân nào!<br
      <div/>
      Xin cảm ơn !! 
      </div>
    </p>
    `;
  form.subject = `Create Account ${new Date().toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  })}`;
  return form;
};
