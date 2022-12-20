import apiOrigin from "./api"
import { Restroom } from "./models/response/Restroom";

export const getRestroomById = async (id: string): Promise<Restroom> => {
    let data;
    try{
        data = await fetch(`${apiOrigin}/restrooms/${id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                }
        });
    }catch(error){
        console.log(error);
        throw error;
    }
    
    return await data.json() as Restroom;
}

export const getRestroomsByCityId = async (id: string): Promise<Restroom[]> => {
    let data;
    try{
        data = await fetch(`${apiOrigin}/restrooms/byCity/${id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                }
        });
    }catch(error){
        console.log(error);
        throw error;
    }
    
    return await data.json() as Restroom[];
}