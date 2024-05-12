  "use server"
  import { cookies } from 'next/headers';

  /**
   * Function to store cookies.
   * @function
   * @async
   * @param   {Object} cookieData   The token to be stored in the cookies [Required]
   *
   * @example
   * //store cookies
   * token = "token"
   * storeCookies(token);
   */

  async function storeCookies(cookieData) {
    // Calculate the expiration time based on the provided token expiration date
    const expirationDate = new Date(cookieData.token_expiration_date);
    
    // Format the expiration date in RFC 1123 (HTTP-date) format
    const expires = expirationDate.toUTCString();
            cookies().set('access_token', cookieData.access_token, {
                path: '/',
                maxAge: expirationDate.getHours() - new Date().getHours(), // Expires in 4 hours
                httpOnly: true,
                secure: false,
                expires: expires, // Set the Expires attribute
            }),
            cookies().set('user_id', cookieData.user.id, {
              path: '/',
              maxAge: expirationDate.getHours() - new Date().getHours(), // Expires in 4 hours
              httpOnly: true,
              secure: false,
              expires: expires, // Set the Expires attribute
          }),
            cookies().set('username', cookieData.user.username, {
                path: '/',
                maxAge: expirationDate.getHours() - new Date().getHours(), // Expires in 4 hours
                httpOnly: true,
                secure: false,
                expires: expires, // Set the Expires attribute
            });
  }

  export default storeCookies;