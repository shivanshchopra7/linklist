'use client';
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
export default function HeroForm({user}) {
 const router = useRouter();
  useEffect(() => {
      if (
        'localStorage' in window && 
        window.localStorage.getItem('desiredUsername')
      ) {
        const username = window.localStorage.getItem('desiredUsername');
        window.localStorage.removeItem('desiredUsername');
        redirect('/account?desiredUsername=' + username);
      }
  }, []);
   async function handleSubmit(ev) {
ev.preventDefault();
const form = ev.target;
const input = form.querySelector('input');
const username = input.value;
if(username.length > 0) {
   
    if (user) {
        router.push('/account?desiredUsername=' + username);
    } else {
      window.localStorage.setItem('desiredUsername', username);
      await signIn('google');  
    }
   
}

console.log(input.value);


// console.log({username});
   }
    return(
        <form
        onSubmit={handleSubmit}
        className="inline-flex items-center shadow-lg shadow-gray-700/20">
  <span className="bg-white py-4 pl-4">linklist.to/</span>
  <input  type="text" className="py-4" placeholder="username"/>
  <button 
  
  type="submit" className="bg-blue-500 text-white py-4 px-6">Join for Free</button>
</form>
    )
}


// value={username} onChange={(ev) => setUsername(ev.target.value)}