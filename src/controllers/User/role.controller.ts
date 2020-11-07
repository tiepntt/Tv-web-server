import { getAll } from "../../CRUD/User/Role"

export const getAllRoles = async ( req, res ) =>
{
    let result = await getAll();
    res.send( result );
}