exports.handler = async (event, context) => {
    try {
      // Create response object
      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          // Enable CORS if needed
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: 'Hello from Lambda!',
          // You can include the incoming event data if needed
          // event: event,
          timestamp: new Date().toISOString(),
        }),
      };
  
      return response;
    } catch (error) {
      console.error('Error:', error);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Internal Server Error',
          error: error.message,
        }),
      };
    }
  };