const AWS = require("aws-sdk");


const getUserbyemail = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  
    const {email} = event.pathParameters;
    const PK= "VA-USUARIO#"+email;
   
  const result = await dynamodb.get({ 
    TableName: "villa_apuestas_database",
    Key: {"PK": PK},

}).promise(); 

  const user = result.Item;

  return {
    status: 200,
    body:  user,
    
  };
};

module.exports = {
  getUserbyemail,
};