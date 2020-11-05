import { Expose } from "class-transformer";

export class FacutlyDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
}
