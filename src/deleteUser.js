const AWS = require("aws-sdk");

const deleteUser = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const {email} = event.pathParameters;
  const PK= "VA-USUARIO#"+email;
  
  var params = {
    TableName: "villa_apuestas_database",
    Key:{
        "PK": PK,
        "SK": email
    },
};
  
  
  await dynamodb.delete(params, function(err, data) {
        if (err) {
          console.error(params);
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            // updateItem succeeded
        }
      })
    .promise();

  return {
    status: 200,
    body: {
      message: 'Deleted usuario'+PK+' exitosamente'
    }
  };
};

module.exports = {
    deleteUser,
};