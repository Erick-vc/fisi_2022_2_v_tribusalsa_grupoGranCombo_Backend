const AWS = require("aws-sdk");

const createUser = async (event) => {
    // conexión a aws
  const dynamodb = new AWS.DynamoDB.DocumentClient();
   // el request  
  const { email, name,username,date_of_birth,dni,gender,password,phone } =JSON.parse( event.body);
  // objeto a enviar

  const PK="VA-USUARIO#"+email;
  const SK=email;
  const GSI1_PK=PK;
  const GSI1_SK=username;
  const credits=0;

  const user = {
    PK,
    SK,
    username,
    name,
    credits,
    date_of_birth,
    dni,
    gender,
    password,
    phone,
    GSI1_PK,
    GSI1_SK,
  };



  await dynamodb
    .put({
      TableName: "villa_apuestas_database",
      Item: user,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(user),
  };
};

module.exports = {
    createUser,
};