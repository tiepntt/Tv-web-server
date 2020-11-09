import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from "fs";

export class HungarianStatesAndCities1564393283405
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const queries = fs
      .readFileSync(__dirname + "/data.sql")
      .toString()
      .replace(/(\r\n|\n|\r)/gm, " ") // remove newlines
      .replace(/\s+/g, " ")
      .split(";");
    for (let i = 0; i < queries.length; i++) {
      let qr = queries[i] + ";";
      if (
        qr.includes("--") ||
        qr.includes("/*") ||
        !qr.includes(";") ||
        qr == ";"
      ) {
        continue;
      } else {
        await queryRunner.stream(qr);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("");
  }
}
