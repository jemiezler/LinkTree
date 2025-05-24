"use client";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { Avatar, Button } from "@heroui/react";
import { Input } from "@heroui/input";

import DropdownSingleSelection from "../components/dropdown-single-selection";
import UploadProfilePicture from "../components/UploadProfilePicture";
import { useEffect, useState } from "react";
import { useEffect, useState } from "react";

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
      .then((data) => {
        setUser(data), console.log(data);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-7 py-8 md:py-10 px-6 max-w-md bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl">
        <div className="flex gap-4 items-center">
          <Avatar
            className="w-60 h-60"
            radius="sm"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          />
        </div>
        <div className="grid grid-cols-1">
          <UploadProfilePicture />
        </div>
        <div className="w-[220px] mx-auto grid grid-cols-1 gap-4">
          <p className="text-[14px] text-white">Name & Role</p>
          <Input label="Name" placeholder="Enter your name" type="text" />
          <DropdownSingleSelection />
        </div>
        <div className="grid grid-cols-2 gap-16">
          <Link href="/edit">
            <Button variant="light" className="text-white" type="submit">
              Cancel
            </Button>
          </Link>
          <Link href="/edit">
            <Button color="primary" type="submit">
              Save
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
