export const HandelStatus = (
  status: number,
  message?: string,
  result?: object
) => {
  switch (status) {
    case 201:
    case 200:
      return { status: status, message: message || "Thành công", result };
    case 204:
      return { status: status, message: message || "Thiếu dữ liệu" };
    case 200:
      return { status: status, message: message || "Thành công" };
    case 302:
      return { status: status, message: message || "Đã tồn tại" };
    case 303: {
      return {
        status: status,
        message: message || "Bạn không phải thành viên nhập liệu.",
      };
    }
    case 404:
      return { status: status, message: message || "Không tồn tại" };
    case 401:
      return { status: status, message: message || "Đăng nhập thất bại" };
    case 500:
      return { status: status, message: message || "Thất bại" };
  }
};
