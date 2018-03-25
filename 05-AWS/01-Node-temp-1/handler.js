'use strict';

module.exports.hello = (event, context, callback) => {

  console.log(event.pathParameters.name)

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      
      message:  'Hello ' + event.pathParameters.name + ' from here....' 
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};




// message: 'Go Serverless v1.0! Your function executed successfully!',
