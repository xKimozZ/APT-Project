

async function handler(url, method, body, token="") {
    try {
      const base_url = 'http://localhost:8081';
      const headers = token !== "" ? {"Content-Type": "application/json","Authorization": `Bearer ${token}`} : {"Content-Type": "application/json"}

  
      // Conditionally include the body only when it's provided and the method is not 'GET'
      const requestOptions = {
        method: `${method}`,
        headers: headers,
        body: method !== ('GET' || 'DELETE') && body ? JSON.stringify(body) : undefined
      };
  
      const response = await fetch(`${base_url}${url}`, requestOptions);
  
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw for further handling
    }
  };

  class APIError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.name = 'APIError';
      this.statusCode = statusCode;
    }
  }

  
  export default handler;
