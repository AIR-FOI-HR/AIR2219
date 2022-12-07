import apiOrigin from "./api"
import { Restroom } from "./models/response/Restroom";

export const getRestroomById = async (id: string): Promise<Restroom> => {
    const data = await fetch(`${apiOrigin}/restrooms/${id}`, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return await data.json() as Restroom;
}