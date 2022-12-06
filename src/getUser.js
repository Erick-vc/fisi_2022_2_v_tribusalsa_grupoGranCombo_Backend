const AWS = require("aws-sdk");


const getUserbyemail = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  
    const {email} = event.pathParameters;
    const PK= "VA-USUARIO#"+email;
   

    var params = {
      TableName: "villa_apuestas_database",
      Key:{
          "PK": PK,
          "SK": email
      }
  };

  const result = await dynamodb.get(params, function(err, data) {
  if (err) {
    console.error(params);
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
      // GetItem succeeded
  }
}


).promise(); 

  const user = result.Item;

  return {
    status: 200,
    body:  user,
    
  };
};

module.exports = {
  getUserbyemail,
};