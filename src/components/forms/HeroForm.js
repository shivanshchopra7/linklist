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
      <div className="flex justify-center items-center  ">
      <form
        onSubmit={handleSubmit}
        className="flex items-center max-w-lg w-full rounded-full shadow-xl bg-black  shadow-purple-700/10 py-3 px-8"
        style={{
          boxShadow: '0px 0px 30px 15px rgba(128, 0, 128, 0.5)'  
        }}
      >
        <span className="text-white font-semibold text-lg mr-1">droppp.link/</span>
        
        <input
  type="text"
  placeholder="your-username"
  className="custom-input" // Add the custom class here
/>
      
        <button
          type="submit"
          className="bg-[#7511F5] text-white font-semibold rounded-full py-2 px-8 ml-4 text-md hover:bg-[#7511F8] transition-colors duration-200"
        >
          Claim
        </button>
      </form>
    </div>
    
    
    )
}


// value={username} onChange={(ev) => setUsername(ev.target.value)}