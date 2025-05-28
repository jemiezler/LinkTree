import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaWeixin,
  FaEnvelope,
  FaYoutube,
  FaDiscord,
  FaLink,
  FaLine,
} from 'react-icons/fa';
import React from 'react';

export default function getBrandVisual(url: string) {
  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes('facebook'))
    return { icon: <FaFacebookF />, gradient: 'from-blue-500 to-blue-700' };
  if (lowerUrl.includes('instagram'))
    return {
      icon: <FaInstagram />,
      gradient: 'from-yellow-400 via-pink-500 to-purple-600',
    };
  if (lowerUrl.includes('github'))
    return {
      icon: <FaGithub />,
      gradient: 'from-gray-600 to-gray-800',
    };
  if (lowerUrl.includes('linkedin'))
    return { icon: <FaLinkedinIn />, gradient: 'from-blue-400 to-blue-600' };
  if (lowerUrl.includes('twitter') || lowerUrl.includes('x.com'))
    return { icon: <FaTwitter />, gradient: 'from-sky-400 to-sky-600' };
  if (lowerUrl.includes('line.me'))
    return { icon: <FaLine />, gradient: 'from-green-400 to-green-600' };
  if (lowerUrl.includes('mailto:'))
    return { icon: <FaEnvelope />, gradient: 'from-orange-400 to-red-500' };
  if (lowerUrl.includes('youtube'))
    return { icon: <FaYoutube />, gradient: 'from-red-500 to-red-700' };
  if (lowerUrl.includes('discord'))
    return { icon: <FaDiscord />, gradient: 'from-indigo-500 to-blue-500' };
  if (lowerUrl.includes('wechat'))
    return { icon: <FaWeixin />, gradient: 'from-green-400 to-green-600' };

  return { icon: <FaLink />, gradient: 'from-gray-500 to-gray-300' };
}
