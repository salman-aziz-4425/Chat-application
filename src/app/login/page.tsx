'use client';

import * as React from 'react';


const Login = () => {
  return (
    <div className="flex justify-center h-[38rem] ">
      <div className="flex flex-col w-[19rem] md:w-[28rem]  max-w-[47.8rem] pt-20 items-center">
        <h1 className="font-bold text-[2.5rem] mb-14">Login</h1>
        <input
          className="px-4 py-[12px] w-full mb-4 border border-black"
          placeholder="Email"
        />
        <input
          className="px-4 py-[12px] w-full mb-4 border border-black"
          placeholder="Password"
        />
        <div className="flex items-start w-full">
          <p className="text-base">FORGOT YOUR PASSWORD?</p>
        </div>
        <div className="flex py-8 flex-col items-center">
          <button className="bg-black text-white p-2 w-full">Sign in</button>
          <h3 className="text-xl font-light pt-4 w-full">Create Account</h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
