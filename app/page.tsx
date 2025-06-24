'use client';

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@heroui/react';
import React from 'react';
import { FaEnvelope, FaFacebook, FaInstagram, FaMobile, FaTiktok } from 'react-icons/fa';
import getBrandVisual from '@/utils/social.icon';

// You can define your UserType and LinkType interfaces if you still want strong typing,
// but they are not strictly necessary for a static page.
interface LinkType {
  _id?: string;
  name: string;
  link: string;
  user?: string;
  __v?: number;
}

interface UserType {
  _id: string;
  username: string;
  name: string;
  profile: string;
  role: string;
  links: LinkType[];
  __v?: number;
  id?: string;
  images?: string[];
}

export default function UserPage() {

  const Activities = [
    {
      name: 'MFU Activities',
      link: 'https://www.facebook.com/mfuactivities',
      icon: <FaFacebook className="text-xl" />,
    },
    {
      name: 'MFU Activities',
      link: 'https://www.instagram.com/mfu_activities/',
      icon: <FaInstagram className="text-xl" />,
    },
    {
      name: 'hllc_mfu',
      link: 'https://www.tiktok.com/@hllc_mfu',
      icon: <FaTiktok className="text-xl" />,
    },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center antialiased">

      <div
        className="absolute inset-0"
        style={{ backgroundImage: "url(/contacts/background-hllc.jpg)" }}
      ></div>
      <div
        className="absolute inset-0 bg-cover bg-center bg-black/50 backdrop-blur-md"
      ></div>
      <div
        className="w-full h-full max-w-md overflow-x-none backdrop-blur-md shadow-lg md:h-[95%] md:radius-lg md:shadow-2xl"
        style={{ backgroundImage: 'url(/contacts/background-hllc.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <Card
          className="w-full h-full pt-8 md:px-4 items-center justify-center"
          radius="none"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <CardHeader className="p-0 relative flex flex-col justify-end bg-cover bg-center py-4 space-y-2 flex-1">
            <Avatar className="w-24 h-24 text-large" src={`contacts/profile/logo_hllc.jpg`} />
            <div className="text-center">
              <h1 className="text-xl font-bold text-white uppercase pt-2">
                How to Live and Learn <br /> on Campus 2025
              </h1>
              {/* <p className="text-xs text-gray-300 uppercase">{user.role}</p> */}
            </div>
          </CardHeader>

          <CardBody className="px-8 flex justify-start items-center space-y-4">
            <div className="w-full space-y-2 font-semibold">
              {Activities.map((activity, index) => (
                <Button
                  key={index}
                  as="a"
                  className="w-full bg-white/20 backdrop-blur-sm border-1 border-white/10 flex items-center gap-2"
                  href={activity.link}
                  radius="full"
                  rel="noopener noreferrer"
                  size="md"
                  target="_blank"
                >
                  {activity.icon}
                  <p>{activity.name}</p>
                </Button>
              ))}
            </div>
          </CardBody>

          <CardFooter className="relative">
            <p className="w-full text-xs text-center text-gray-100/20 uppercase">
              How to Live and Learn On Campus 2025
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>

  );
}