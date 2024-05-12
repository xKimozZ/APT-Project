"use server"
import { cookies } from 'next/headers';

async function deleteCookies(){
    cookies().delete('access_token');
    cookies().delete('username');
    cookies().delete('user_id');
}

export default deleteCookies;