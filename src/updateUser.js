const AWS = require("aws-sdk");


const updateUserbyemail = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  
    const {email} = event.pathParameters;
    const PK= "VA-USUARIO#"+email;

    const { name, phone } =JSON.parse( event.body);
   // COLOCAR LOS ATRIBUTOS NECESARIOS


    var params = {
      TableName: "villa_apuestas_database",
      Key:{
          "PK": PK,
          "SK": email
      },
      UpdateExpression: "SET phone = :phone", 
      ExpressionAttributeValues: {
        ":phone": phone
      },
      ReturnValues: 'ALL_NEW' 
  };

     await dynamodb.update(params, function(err, data) {
  if (err) {
    console.error(params);
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
      // updateItem succeeded
  }
}


).promise(); 
;

  return {
    status: 200,
    body:  JSON.stringify({message: "Usuario Actualizado exitosamente"}),
    
  };
};


module.exports = {
    updateUserbyemail,
};