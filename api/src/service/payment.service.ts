

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

    //TODO: Implement Confirming order
    return true;

  } else
    return false;
  
}
