"use client";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { Avatar, Button } from "@heroui/react";
import { subtitle, title } from "@/components/primitives";
import Addnewlink from "../edit/components/addnewlink";
import Deletelink from "../edit/components/deletelink";
import Editlink from "../edit/components/editlink";
import { useEffect, useState } from "react";

import getBrandVisual from "../../utils/social.icon";

export const profile = {
  name: "User",
  link: [
    {
      name: "Youtube",
      link: "https://www.youtube.com/",
    },
    {
      name: "Facebook",
      link: "https://www.facebook.com/",
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/",
    },
    {
      name: "Github",
      link: "https://www.github.com/",
    },
  ],
};

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

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-7 py-8 md:py-10 px-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl">
        <div className="flex gap-4 items-center">
          <Avatar className="w-60 h-60" radius="sm" src={user.image} />
        </div>
        <div className="grid grid-cols-1">
          <Link
            href="/edit/accountsetting"
            className={buttonStyles({
              size: "md",
              radius: "sm",
            })}
          >
            Edit profile
          </Link>
        </div>
        <div className="w-[220px] mx-auto grid grid-cols-2 gap-4">
          {user.link.map((link, index) => {
            const { icon, gradient } = getBrandVisual(link.link);
            return (
              <Link
                key={index}
                isExternal
                href={link.link}
                className="flex flex-col items-center justify-center gap-1 border-2 rounded-xl py-2 hover:shadow-md transition duration-200"
              >
                <span className="w-5 h-5">{icon}</span>
                <span className="text-xs text-white">{link.name}</span>
              </Link>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-8">
          <Editlink />
          <Deletelink />
        </div>
        <Addnewlink />
      </div>
    </div>
  );
};