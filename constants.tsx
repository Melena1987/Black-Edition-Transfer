
import React from 'react';
import { Plane, Ship, MapPin, Clock, Globe, Car, Wifi, Refrigerator, BatteryCharging, Shield, Baby, Luggage } from 'lucide-react';

export const WHATSAPP_NUMBER = "+34650718410";
export const PHONE_NUMBER = "+34650718410";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '').replace(/\s/g, '')}`;

export const SERVICES = [
  {
    id: 'airports',
    title: 'Airports',
    description: 'Premium transfers with base in Marbella to Malaga Airport (AGP) and Gibraltar (GIB). Punctuality and personalized meet & greet service.',
    icon: <Plane className="w-6 h-6" />,
    image: 'https://firebasestorage.googleapis.com/v0/b/galeriaoficialapp.firebasestorage.app/o/users%2FI5KZz4BuUEfxcoAvSCAWllkQtwt1%2Fphotos%2F1766914685732_como-llegar-del-aeropuerto-de-malaga-al-centro-de-la-ciudad-1200x630-1.jpg?alt=media&token=ae7b35fe-faa5-4d37-abda-5b260161f8d1'
  },
  {
    id: 'ports',
    title: 'Ports',
    description: 'Exclusive service at the Ports of Malaga, Algeciras, Tarifa, and Gibraltar. Direct connections for cruise passengers and maritime transfers.',
    icon: <Ship className="w-6 h-6" />,
    image: 'https://firebasestorage.googleapis.com/v0/b/galeriaoficialapp.firebasestorage.app/o/users%2FI5KZz4BuUEfxcoAvSCAWllkQtwt1%2Fphotos%2F1766914685733_fenomenal.jpg?alt=media&token=547f16a4-b3cc-4c52-b61a-197137ecfe1d'
  },
  {
    id: 'long-distance',
    title: 'Andalusia & Beyond',
    description: 'Intercity journeys from Marbella to all of Andalusia (Seville, Granada, Ronda), Madrid, and international transfers to Portugal.',
    icon: <Globe className="w-6 h-6" />,
    image: 'https://firebasestorage.googleapis.com/v0/b/galeriaoficialapp.firebasestorage.app/o/users%2FI5KZz4BuUEfxcoAvSCAWllkQtwt1%2Fphotos%2F1766914685732_image_processing20230908-2-dzjyjy.jpg?alt=media&token=ab23e54c-634d-412d-8a03-83765b40007c'
  },
  {
    id: 'disposition',
    title: 'Hourly Hire',
    description: 'Vehicle and professional chauffeur at your full disposal in Marbella and surroundings. Total flexibility for events and shopping.',
    icon: <Clock className="w-6 h-6" />,
    image: 'https://firebasestorage.googleapis.com/v0/b/galeriaoficialapp.firebasestorage.app/o/users%2FI5KZz4BuUEfxcoAvSCAWllkQtwt1%2Fphotos%2F1766914271335_WhatsApp_Image_2025-12-26_at_23.37.37.jpeg?alt=media&token=31f9faa9-7dec-4ff1-b9bd-01bb1c0f26ae'
  }
];

export const FLEET_MAIN_VIDEO = "https://firebasestorage.googleapis.com/v0/b/galeriaoficialapp.firebasestorage.app/o/users%2FI5KZz4BuUEfxcoAvSCAWllkQtwt1%2Fphotos%2F1767348165098_WhatsApp_Video_2025-12-29_at_15.37.23.mp4?alt=media&token=1947924b-b637-4db7-80c6-f4a09d915461";

export const MAIN_VEHICLE = {
  name: 'Mercedes Black Edition XL',
  category: 'Business Luxury Van',
  capacity: '7 Passengers + Chauffeur',
  luggage: 'Up to 10 Large Suitcases',
  description: 'Our exclusive Mercedes Black Edition XL is the pinnacle of luxury travel in Marbella. Tailored for those who demand space, safety, and a premium onboard environment. One vehicle, infinite possibilities.',
  features: [
    { icon: <Shield size={18} />, label: 'Advanced Safety Systems' },
    { icon: <Refrigerator size={18} />, label: 'Onboard Fridge' },
    { icon: <Wifi size={18} />, label: 'High-Speed Wi-Fi' },
    { icon: <BatteryCharging size={18} />, label: 'USB Chargers' },
    { icon: <Baby size={18} />, label: 'Baby & Booster Seats' },
    { icon: <Luggage size={18} />, label: 'XL Luggage Capacity' },
    { icon: <Car size={18} />, label: 'Dual Air Conditioning' },
  ],
  images: [
    "https://firebasestorage.googleapis.com/v0/b/galeriaoficialapp.firebasestorage.app/o/users%2FI5KZz4BuUEfxcoAvSCAWllkQtwt1%2Fphotos%2F1767375317170_Black_Edition.png?alt=media&token=b858d521-eed4-49fb-b3c7-fc4719880825",
    "https://firebasestorage.googleapis.com/v0/b/galeriaoficialapp.firebasestorage.app/o/users%2FI5KZz4BuUEfxcoAvSCAWllkQtwt1%2Fphotos%2F1766914271335_WhatsApp_Image_2025-12-26_at_23.37.37.jpeg?alt=media&token=31f9faa9-7dec-4ff1-b9bd-01bb1c0f26ae"
  ]
};
