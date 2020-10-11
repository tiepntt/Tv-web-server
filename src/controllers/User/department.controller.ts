import { getAll } from "../../CRUD/User/Department";

export const GetAllDepartment = async ( req, res ) =>
{
    let result = await getAll();
    res.send(result)
}