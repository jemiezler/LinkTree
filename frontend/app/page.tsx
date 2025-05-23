"use client";

import { Button } from "@heroui/button";
import { chunk } from "lodash";



export const data = {
  name: "Napus Samuanpho",
  role: "Devloper",
  link: [
    {
      name: "Facebook",
      link: "www.facebook.com",
    },
    {
      name: "Linkedln",
      link: "www.linkedin.com",
    },
    {
      name: "lsdvglkndr",
      link: "www.facebook.com",
    },
    {
      name: "Linkedln",
      link: "www.linkedin.com",
    },
    
  ],
};

const chunklink = chunk(data.link,2)

export default function Home() {
  const imageSize = 128;

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col items-center sm:w-screen md:w-[400px] bg-white rounded-md shadow-lg h-full">
        <div className="relative w-full h-[40%] bg-slate-400 flex flex-col justify-center items-center overflow-hidden">
          <img src="image.png" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white" />
          {/* Text */}
        </div>
        <div className="flex flex-col justify-center items-center text-black w-full">
          <h1 className="font-sans text-3xl font-bold">{data.name}</h1>
          <p className="text-2xl font-medium">{data.role}</p>
        </div>

        {chunklink.map((row, rowIndex) => (
          <div className="flex flex-col justify-start w-[90%] h-[20%] gap-[24px] m-5 ">
            <div key={rowIndex} className="flex justify-between w-full h-full gap-6">
              {row.map((item, index) => (
                <Button
                  key={index}
                  onPress={() => window.open(`https://${item.link}`, "_blank")}
                  color="primary"
                  variant="ghost"
                  className="flex items-center w-auto h-full p-16 py-16 rounded-[20px]"
                >
                  <span className="flex flex-col items-center gap-2">
                      <img
                        src={`https://www.google.com/s2/favicons?sz=${imageSize}&domain_url=${item.link}`}
                      />
                      <h1 className=" font-sans font-bold "> {item.name}</h1>
                  </span>
                </Button>
              ))}
            </div>
          </div>
        ))}
        <footer>
          <h1 className=" font-sans text-xl font-bold pb-5"> HLLC 2025</h1>
        </footer>
      </div>
    </div>
  );
}
