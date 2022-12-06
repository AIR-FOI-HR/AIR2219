

export const processPayment = async (req: Request): Promise<{}> => {
    const response = await fetch('https://dummy-payment-provider.vercel.app/api/createOrder', {
    method: 'POST',
    body: JSON.stringify(req),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 3ELBMYXvPXZKSrejHvJT'
    }
  });

  const JSONResponse = await response.json();
  console.log(JSONResponse);
  

  if (JSONResponse.state == 'PENDING'){
    //
    //TODO: Save the response to the database (todo when the database is completed)
    //
    return JSONResponse.id;

  } else
      return false;
  
}


export const confirmOrder = async (id: string): Promise<{}> => {
  const response = await fetch('https://dummy-payment-provider.vercel.app/api/confirmOrder/' + id, {
  method: 'PUT',
  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 3ELBMYXvPXZKSrejHvJT'
  }
});

const JSONResponse = await response.json();
console.log(JSONResponse);


if (JSONResponse.state == 'COMPLETED'){
  return true;

} else
    return false;

}
