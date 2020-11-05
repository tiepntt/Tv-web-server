import { getRepository } from "typeorm"
import { HandelStatus } from "../../controllers/HandelAction";
import { Department } from "../../entity/User/Department"

export const getAll = async () =>
{
    let departments = await getRepository(Department).find();
    return HandelStatus( 200, null, departments );
}