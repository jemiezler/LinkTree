"use client";

// import ColorThief from "color-thief";

import getBrandVisual from "../utils/social.icon";
import { Link } from "@heroui/link";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

export default function Home() {
  const [user, setUser] = useState<User>({
    name: "",
    role: "",
    image: "",
    link: [],
  });

  useEffect(() => {
    fetch("http://localhost:3001/user/68302720fb7bed40c0d57cbe/link")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const [themes, setThemes] = useState(false);
  console.log(themes);
  return (
    <div className="flex justify-center items-center">
      <div
        className={`flex flex-col items-center md:w-[400px] border-4 
  ${
    themes
      ? "bg-white text-black border-white shadow-2xl shadow-white"
      : "bg-[#0B0B0B] text-white border-slate-950 shadow-2xl shadow-black/50"
  } 
  h-screen my-10 mx-10 rounded-[20px]`}
        ${themes ? "bg-white text-black border-slate-300 shadow-2xl shadow-slate-400/40"
            : "bg-[#0B0B0B] text-white border-slate-950 shadow-2xl shadow-black/50"} 
        h-full my-10 mx-10 rounded-[20px]`}
      >
        <div className="relative w-full h-[40%] flex flex-col justify-center items-center overflow-hidden rounded-t-[20px]">
          <img src={user.image} className="w-full h-screen object-cover" />
          <div
            className={`absolute top-2  w-full h-full ${themes ? "bg-gradient-while" : "bg-gradient-dark"}`}
          >
            <div className="flex flex-col justify-end items-center text-black w-full h-full py-5">
              <h1
                className={`font-sans text-3xl font-bold ${themes ? "text-black" : "text-white"}`}
              >
                {user.name}
              </h1>
              <p
                className={`text-2xl font-normal ${themes ? "text-black" : "text-white"}`}
              >
                {user.role}
              </p>
            </div>
            <div className="absolute flex flex-col  w-fit h-fit top-2 right-4  gap-4 justify-center items-center">
              <Button
                isIconOnly
                aria-label="Themes"
                variant="solid"
                className={`flex w-[50px] h-[50px] ${themes ? "bg-white" : "bg-black"} rounded-full`}
                onPress={() => {
                  console.log("onPress! themes before:", themes);
                  setThemes(!themes);
                }}
              >
                {themes ? (
                  <FaMoon size={32} color="black" />
                ) : (
                  <IoSunny size={32} color="white" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="w-[325px] max-h-[300px] mx-auto grid grid-cols-2 gap-8 my-5 overflow-y-scroll scrollbar-hide">
          {/* <div className="w-[325px] mx-auto grid lg:grid-cols-2 grid-col gap-8 my-5  "> */}
          {user.link.map((link, index) => {
            const { icon, gradient } = getBrandVisual(link.link);
            return (
              <div key={index}>
                <div
                  className={`${themes ? "bg-white" : "bg-black"} rounded-xl mx-5 lg:mx-0`}
                >
                  <a href={link.link} target="_blank" rel="noopener noreferrer">
                    <Button
                      href={link.link}
                      variant="ghost"
                      className={`flex flex-row lg:flex-col items-start lg:items-center justify-center gap-3 rounded-xl py-4 lg:py-8 ${themes ? " border-2 border-black" : "border-2 border-white"}   hover:shadow-md transition duration-200 w-full h-full`}
                    >
                      <span
                        className={` text-4xl absolute left-3 top-3  flex justify-center items-center  lg:static lg:left-auto lg:top-auto lg:translate-x-0  ${themes ? "text-black" : "text-white"}`}
                      >
                        {icon}
                      </span>
                      <span
                        className={`text-xl font-normal justify-center items-center ${themes ? "text-black" : "text-white"}`}
                      >
                        {link.name}
                      </span>
                    </Button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <footer className="flex justify-center bottom-0 items-end py-3">
          <h1
            className={`font-sans text-xl font-bold pb-5 ${themes ? "text-black" : "text-white"}`}
          >
            HLLC 2025
          </h1>
        </footer>
      </div>
    </div>
  );
}
