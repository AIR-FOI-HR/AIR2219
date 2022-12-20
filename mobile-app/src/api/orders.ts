import apiOrigin from "./api"
import { Restroom } from "./models/response/Restroom";

export const createOrder = async (cardInfo:{cardNumber:string,cvv:string,expiryDate:string},restroomData:Restroom) => {
    let data;
    try{
        data = await fetch(`${apiOrigin}/payments/createOrder`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'    
          },
          body:JSON.stringify({
            restroomId:`${restroomData.id}`,
            amount:`${restroomData.price}`,
            currency:`EUR`,
            email:'obican@mail.com', //TO DO ------- Get e-mail of current user -------
            cardNumber:`${cardInfo['cardNumber']}`,
            cvv:`${cardInfo['cvv']}`,
            expiryDate:`${cardInfo['expiryDate']}`,
          }),
          })

    }catch(error){
        console.log(error);
        throw error;
    }
    return await data.json();
}