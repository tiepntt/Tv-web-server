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
