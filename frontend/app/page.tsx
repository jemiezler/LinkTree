"use client";

// import ColorThief from "color-thief";

import getBrandVisual from "../utils/social.icon";
import { Link } from "@heroui/link";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";

export default function Home() {
  const [user, setUser] = useState<User>({
    name: "",
    role: "",
    image: "",
    link: [],
  });

  useEffect(() => {
    fetch("http://localhost:3001/user/6831769f6a564084f3764e5c/link")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  console.log(user);

  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col items-center  md:w-[400px] bg-[#0B0B0B] shadow-lg h-full my-10 mx-10 rounded-[20px]">
        <div className="relative w-full h-[40%] bg-slate-400 flex flex-col justify-center items-center overflow-hidden rounded-t-[20px]">
          {user.image &&
            <img src={user.image} className="w-full h-full object-cover" />
          }

          <div className="absolute flex flex-col  w-fit h-fit top-4 right-4  gap-4 justify-center items-center">
            <Button isIconOnly aria-label="Like" className="flex w-[50px] h-[50px] bg-white rounded-full">

            </Button>
            <div className="flex w-[50px] h-[50px] bg-white rounded-full " />
          </div>

          <div className="absolute top-2  w-full h-full bg-gradient-custom">
            <div className="flex flex-col justify-end items-center text-black w-full h-full py-5">
              <h1 className="font-sans text-3xl font-bold text-white">
                {user.name}
              </h1>
              <p className="text-2xl font-normal text-white">{user.role}</p>
            </div>
          </div>
        </div>

        {/* <div className="w-[325px] max-h-[300px] mx-auto grid grid-cols-2 gap-8 my-5 overflow-y-scroll scrollbar-hide"> */}
        <div className="w-[325px] mx-auto grid lg:grid-cols-2 grid-col gap-8 my-5  ">
          {user.link &&
            user.link.map((link, index) => {
              // Make sure getBrandVisual is defined or imported above this component
              const { icon, gradient } = getBrandVisual(link.link);
              return (
                <div key={index}>
                  <div className="bg-black rounded-xl mx-5 lg:mx-0">
                    <a href={link.link} target="_blank" rel="noopener noreferrer">
                      <Button
                        href={link.link}
                        variant="ghost"
                        className="flex flex-row lg:flex-col items-start lg:items-center justify-center gap-3 rounded-xl py-4 lg:py-8 border-2 hover:shadow-md transition duration-200 w-full h-full bg-transparent"
                      >
                        <span className="hidden lg:block text-4xl text-white">
                          {icon}
                        </span>
                        <span className="text-xl font-normal text-white pt-1 lg:pt-2">
                          {link.name}
                        </span>
                      </Button>
                    </a>
                  </div>
                </div>
              );
            })
          }
        </div>

        <footer className="flex justify-center bottom-0 items-end py-3">
          <h1 className=" font-sans text-xl font-bold pb-5 text-white">
            HLLC 2025
          </h1>
        </footer>
      </div>
    </div>
  );
}
