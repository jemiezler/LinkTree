'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@heroui/react';
import React from 'react';
import { FaEnvelope, FaFacebook, FaInstagram, FaMobile, FaPhone, FaTiktok } from 'react-icons/fa';

import getBrandVisual from '../../utils/social.icon';

import Carousel from '@/components/Carousel';

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
  const params = useParams();
  const id = params?.id as string;

  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/contacts/v2/api/users?username=${encodeURIComponent(id)}`)
      .then((res) => {
        if (!res.ok) throw new Error('User not found');

        return res.json();
      })
      .then((user: UserType) => setUser(user))
      .catch((err) => {
        console.error('Error fetching user:', err);
        setUser(null);
      });
  }, [id]);

  if (!user) {
    return <div className="text-center mt-10 spinner-bar-animation" />;
  }

  const images = [
    '/contacts/ae/IMG_9869.JPG',
    '/contacts/ae/IMG_6789.jpeg',
    '/contacts/ae/IMG_0259.JPG',
    '/contacts/ae/IMG_9872.JPG',
    '/contacts/ae/IMG_0263.JPG',
    '/contacts/ae/IMG_6791.jpeg',
    '/contacts/ae/IMG_0269.JPG',
    '/contacts/ae/IMG_0271.JPG',
    '/contacts/ae/IMG_0276.JPG',
    '/contacts/ae/IMG_9946.jpg',
  ];

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
      name: 'MFU Activities',
      link: 'https://www.tiktok.com/@hllc_mfu',
      icon: <FaTiktok className="text-xl" />,
    },
    {
      name: 'Email US',
      link: 'mailto:aemfu2024@gmail.com',
      icon: <FaEnvelope className="text-xl" />,
    },
  ];

  // Extract phone and email from user.links
  const phoneLink = user.links.find(
    (link) => link.name.toLowerCase() === 'phone',
  );
  const emailLink = user.links.find(
    (link) => link.name.toLowerCase() === 'email',
  );

  return (
    <div
      className="w-full h-full max-w-[650px] overflow-x-none backdrop-blur-md shadow-lg md:h-[95%] md:radius-lg md:shadow-2xl"
      style={{ backgroundImage: 'url(/contacts/background.jpg)' }}
    >
      <Card
        className="w-full h-full pt-4"
        radius="none"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <CardHeader className="p-0 relative flex flex-col justify-end bg-cover bg-center py-4 space-y-2">
          <Avatar className="w-24 h-24 text-large" src={`${user.profile}`} />
          <div className="text-center">
            <h1 className="text-xl font-bold text-white uppercase">
              {user.name}
            </h1>
            <p className="text-xs text-gray-300 uppercase">{user.role}</p>
          </div>

          {/* User Social Links */}
          <div className="flex flex-row gap-2">
            {user.links.map((link) => {
              let icon;

              // Handle phone and email icons
              if (link.name.toLowerCase() === 'phone') {
                icon = <FaMobile className="text-xl" />; // Use a phone icon if you have one, e.g., FaPhone
              } else if (link.name.toLowerCase() === 'email') {
                icon = <FaEnvelope className="text-xl" />;
              } else {
                icon = getBrandVisual(link.link).icon;
              }

              // Handle target link (mailto, tel, or http)
              let targetLink = link.link;

              if (link.name.toLowerCase() === 'email') {
                targetLink = `mailto:${link.link}`;
              } else if (link.name.toLowerCase() === 'phone') {
                targetLink = `tel:${link.link}`;
              }

              return (
                <button
                  key={link._id || link.link}
                  aria-label={`Open ${link.name} link`}
                  className="w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform rounded-full p-2 bg-white/20 backdrop-blur-md"
                  type="button"
                  onClick={() => window.open(targetLink, '_blank')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      window.open(targetLink, '_blank');
                    }
                  }}
                >
                  {React.cloneElement(icon, {
                    className: 'w-full h-full',
                    color: 'currentColor',
                  })}
                </button>
              );
            })}
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
          {images && images.length > 0 ? (
            <Carousel images={images} />
          ) : (
            <p className="text-center text-gray-400">No images to display.</p>
          )}
        </CardBody>

        <CardFooter className="relative">
          <p className="w-full text-xs text-center text-gray-100/20 uppercase">
            How to Live and Learn On Campus 2025
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
