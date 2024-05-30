"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

import { ImagesSlider } from "./ImagesSlider";

type Props = {
  title: string;
};

export const Hero: React.FC<Props> = ({ title }) => {
  return (
    <ImagesSlider>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col items-center justify-center"
      >
        <Typography as="h4" className="font-serif text-white">
          {title}
        </Typography>
        <div className="h-4" />
        <Typography as="h1" className="text-center font-serif text-white">
          {`You're invited to the wedding of`}
        </Typography>
        <div className="h-6 sm:h-2" />
        <Typography as="h1" className="text-center font-serif text-white">
          {"Christopher\u00A0Krogh and Stachenne\u00A0Ollivierra"}
        </Typography>
        <div className="h-4 sm:h-6" />
        <Button variant="secondary">RSVP</Button>
      </motion.div>
    </ImagesSlider>
  );
};
