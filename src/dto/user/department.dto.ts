import { Expose } from "class-transformer";

export class DepartmentTitleDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  Code: string;
}
