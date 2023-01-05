import apiOrigin from "./api"
import { User } from "./models/response/User";

export const getUserById = async (id: string): Promise<User> => {
    let data;
    try{
        data = await fetch(`${apiOrigin}/users/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id:`${id}`,
            }),

        });
    }catch(error){
        console.log(error);
        throw error;
    }
    
    return await data.json() as User;
}

export const updateUserInfo = async (userInfo:User) => {
    let data;
    try{
        data = await fetch(`${apiOrigin}/users`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'    
          },
          body:JSON.stringify({
            id: `${userInfo.id}`,
            firstName: `${userInfo.firstName}`,
            lastName: `${userInfo.lastName}`,
            email: `${userInfo.email}`,
            phone: `${userInfo.phone}`,
          }),
          })

    }catch(error){
        console.log(error);
        throw error;
    }
    return await data.json();
}