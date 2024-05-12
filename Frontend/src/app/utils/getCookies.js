"use server"
import { cookies } from 'next/headers';

/**
 * Fuction to get stored Cookies.
 * @function
 * @async
 * @returns {Object} The stored Cookies.
 *
 * @example
 * //get stored cookies
 * const cookies = getCookies();
 * 
 */

async function getCookies() {
    const cookieStore = cookies();
    console.log(cookieStore.get("access_token"));
    if(cookieStore.has('access_token') && cookieStore.has('username')) {
        return {
            access_token: cookieStore.get('access_token').value,
            username: cookieStore.get('username').value,
            user_id: (cookieStore.has('user_id') && cookieStore.get('user_id').value),
        };
    }
    return null;
    
}

export default getCookies;