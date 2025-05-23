"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { chunk } from "lodash";
import { useEffect , useState } from "react";




type Link = {
  name: string;
  link: string;
};

type User = {
  name: string;
  role: string;
  image: string;
  link: Link[];
};

export default function Home() {
  const [user, setUser] = useState<User>({ name: '', role: '', image: '', link: [] });


  useEffect(() => {
    fetch ("http://localhost:3001/user/68302720fb7bed40c0d57cbe/link").then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  console.log(user)

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col items-center sm:w-screen md:w-[400px] bg-white rounded-md shadow-lg h-full">
        <div className="relative w-full h-[40%] bg-slate-400 flex flex-col justify-center items-center overflow-hidden">
          <img src={user.image} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white" />
          {/* Text */}
        </div>
        <div className="flex flex-col justify-center items-center text-black w-full">
          <h1 className="font-sans text-3xl font-bold text-black">{user.name}</h1>
          <p className="text-2xl font-medium text-black">{user.role}</p>
        </div>

        <div className="w-[325px] mx-auto grid grid-cols-2 gap-11 my-5 ">
          {user.link.map((link, index) => (
            <Link
              key={index}
              isExternal
              href={link.link}
              className=" flex flex-col items-center justify-center gap-1 border-2 rounded-xl py-8 hover:shadow-md  transition duration-200"
            >
              <img src={`https://www.google.com/s2/favicons?sz=256&domain_url=${link.link}`} alt={link.name} className="w-10 h-10" />
              <span className="text-xl font-medium text-black pt-2">{link.name}</span>
            </Link>
          ))}
        </div>

        <footer className="flex justify-center bottom-0 items-end ">
          <h1 className=" font-sans text-xl font-bold pb-5 text-black"> HLLC 2025</h1>
        </footer>
      </div>
    </div>
  );
}
