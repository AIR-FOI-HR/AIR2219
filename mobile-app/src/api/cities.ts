import apiOrigin from "./api"
import { City } from "./models/response/City";

export const getAllCities = async (): Promise<City[]> => {
    let data;
    try{
        data = await fetch(`${apiOrigin}/cities`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                }
        });
    }catch(error){
        console.log(error);
        throw error;
    }
    
    return await data.json() as City[];
}