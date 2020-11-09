export const StaticData = {
  Role: [
    {
      name: "Manager",
      code: "Manager",
      isSendEmail: true,
      isCreateOrEditSheet: true,
      isCreateOrEditBook: true,
      isCreateOrEditStudent: true,
      createOrEditUser: true,
    },
    {
      name: "Ban chủ nhiệm",
      code: "BCN",
      isSendEmail: true,
      isCreateOrEditSheet: true,
      isCreateOrEditBook: true,
      isCreateOrEditStudent: true,
    },
    { name: "Thành viên", code: "TV" },
    {
      name: "Nhập Liệu",
      code: "NL",
      isSendEmail: false,
      isCreateOrEditBook: true,
      isCreateOrEditStudent: true,
    },
    { name: "Sự kiện", code: "SK" },
  ],

  Department: [
    { name: "Ban chủ nhiệm", Code: "BCN" },
    { name: "Phục vụ bạn đọc", Code: "PVBĐ" },
    { name: "Tổ chức sự kiện", Code: "TCSK" },
    { name: "Thông - Kỹ thuật", Code: "TT-KT" },
  ],
  Faculty: [
    { name: "Đang cập nhật" },
    { name: "Công nghệ thông tin" },
    { name: "Khoa học máy tính" },
    { name: "Điện tử viễn thông" },
    { name: "Công nghệ nông nghiệp" },
    { name: "Công nghệ hàng không vũ trụ" },
    { name: "Công nghệ xây dựng - giao thông" },
    { name: "Cơ kĩ thuật và tự động hóa" },
    { name: "Vật lý kĩ thuật & công nghệ Nano" },
  ],
  user: [
    {
      name: "admin",
      password: "123qwe",
      username: "admin",
      roleId: 1,
      departmentId: 1,
    },
  ],
};
