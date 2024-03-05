import { ChangeEvent, useState } from "react";
import axios from "axios";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Login() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const getUserName = (e: ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
   };

   const getPassword = (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
   };

   async function displayInfo(e: ChangeEvent<HTMLInputElement>) {
      e.preventDefault();
      console.log(username);
      console.log(password);
      const response = await axios.post("http://localhost:3000/user/checkusername", { username });

      if (response.data.isUnique) {
         console.log(`username is unique ${response.data.isUnique}`);
         await axios.post("http://localhost:3000/user/signup", { username, password, role: "admin" });
         console.log(`Signup successful`);
      } else {
         console.log(`username already exist ${response.data.isUnique}`);
         alert("username already exist");
      }

      return;
   }

   return (
      <>
         <div className="flex items-center h-full min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border border-red-400">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
               <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up to Password Manager</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
               <form className="space-y-6" action="#" method="POST">
                  <div>
                     <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        User name
                     </label>
                     <div className="mt-2">
                        <input onChange={getUserName} id="username" name="username" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                     </div>
                  </div>

                  <div>
                     <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                           Password
                        </label>
                     </div>
                     <div className="mt-2">
                        <input onChange={getPassword} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                     </div>
                  </div>

                  <div>
                     <button onClick={displayInfo} type="button" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Sign UP
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
}
