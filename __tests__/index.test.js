const { handler } = require('../index');

describe('Lambda Handler', () => {
  test('should return successful response with correct format', async () => {
    // Arrange
    const event = { 
      // Mock event object if needed
      httpMethod: 'GET',
      path: '/test'
    };
    const context = {};
    
    // Act
    const response = await handler(event, context);
    
    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.headers).toEqual({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const body = JSON.parse(response.body);
    expect(body).toHaveProperty('message', 'Hello from Lambda!');
    expect(body).toHaveProperty('timestamp');
    expect(new Date(body.timestamp)).toBeInstanceOf(Date); // Validates timestamp format
  });

  test('should handle errors gracefully', async () => {
    // Arrange
    const event = null; // This should trigger an error
    const context = {};
    
    // Act
    const response = await handler(event, context);
    
    // Assert
    expect(response.statusCode).toBe(500);
    expect(response.headers).toEqual({
      'Content-Type': 'application/json'
    });

    const body = JSON.parse(response.body);
    expect(body).toHaveProperty('message', 'Internal Server Error');
    expect(body).toHaveProperty('error');
  });
}); 