// import Navbar from "@/components/Navbar";
// import Link from "next/link";
// import React from "react";

// function Login() {
//   return (
//     <div className="flex">
//       <div className="w-3/5 h-[100vh] flex justify-center items-center">
//         <img src="/pealenLogo.svg" alt="" className="w-[300px]" />
//       </div>
//       <div className="w-2/5 flex flex-col justify-center items-start">
//         <h1 className="text-3xl font-semibold text-[#1f285b]">Admin Login</h1>
//         <input
//           type="text"
//           placeholder="Username"
//           className="w-[300px] outline-none border-[1px] rounded-lg bg-transparent  border-[#bfbfc4] p-2 mt-5"
//         />
//         <input
//           type="text"
//           placeholder="Password"
//           className="w-[300px] outline-none border-[1px] rounded-lg bg-transparent  border-[#bfbfc4] p-2 mt-5"
//         />
//         <Link href={"/dashboard"}>
//           <button className="w-[300px] h-[40px] rounded-lg bg-[#20b24c] text-white flex justify-center items-center mt-5">
//             Submit
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Login;

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { login } from "@/api/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login: setAuth } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(username, password);
      console.log(data);

      setAuth(data.adminDetails, data.token);
      router.push("/dashboard/courses");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex">
      <div className="w-3/5 h-[100vh] flex justify-center items-center">
        <img src="/pealenLogo.svg" alt="Logo" className="w-[300px]" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-2/5 flex flex-col justify-center items-start"
      >
        <h1 className="text-3xl font-semibold text-[#1f285b]">Admin Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-[300px] outline-none border-[1px] rounded-lg bg-transparent border-[#bfbfc4] p-2 mt-5"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[300px] outline-none border-[1px] rounded-lg bg-transparent border-[#bfbfc4] p-2 mt-5"
        />
        <button
          type="submit"
          className="w-[300px] h-[40px] rounded-lg bg-[#20b24c] text-white flex justify-center items-center mt-5"
        >
          Submit
        </button>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </form>
    </div>
  );
}
