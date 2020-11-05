import { Expose } from "class-transformer";

export class BookInputDto {
  @Expose()
  id: number;
  @Expose()
  idBook: string;
  @Expose()
  name: string;
  @Expose()
  price: number;
  @Expose()
  amount: number;
}
export class BookTitleDto {
  @Expose()
  id: number;
  @Expose()
  idBook: string;
  @Expose()
  name: string;
  @Expose()
  price: number;
  @Expose()
  amount: number;
}
