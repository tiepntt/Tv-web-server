import { Expose, Type } from "class-transformer";
import { Faculty } from "../../entity/Student/Faculty";
import { FacutlyDto } from "./faculty.dto";

export class StudentInpuDto {
  @Expose()
  id: number;
  @Expose()
  idStudent: string;
  @Expose()
  name: string;
  @Expose()
  born: Date;
  @Expose()
  grade: string;
  @Expose()
  note: string;
  @Expose()
  facultyId: number;
}
export class StudentGetDto {
  @Expose()
  id: number;
  @Expose()
  idStudent: string;
  @Expose()
  name: string;
  @Expose()
  born: Date;
  @Expose()
  grade: string;
  @Expose()
  note: string;
  @Expose()
  @Type((o) => FacutlyDto)
  faculty: FacutlyDto;
}
export class StudentSearchBookDto {
  @Expose()
  id: number;
  @Expose()
  idStudent: string;
  @Expose()
  name: string;
  @Expose()
  born: Date;
  @Expose()
  grade: string;
  @Expose()
  note: string;
  @Expose()
  @Type((o) => FacutlyDto)
  faculty: FacutlyDto;
}
