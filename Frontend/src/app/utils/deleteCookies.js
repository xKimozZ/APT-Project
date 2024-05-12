"use server"
import { cookies } from 'next/headers';

async function deleteCookies(){
    cookies().delete('access_token');
    cookies().delete('username');
    cookies().delete('email');
    cookies().delete('avatar');
    cookies().delete("background")
}

export default deleteCookies;