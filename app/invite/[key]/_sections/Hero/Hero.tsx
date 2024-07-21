"use client";

import { motion } from "framer-motion";
import { Dancing_Script } from "next/font/google";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { configuration } from "@/configuration";
import { cn } from "@/lib/utils";

import { ImagesSlider } from "./ImagesSlider";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

type Props = {
  title: string;
  response: string;
};

export const Hero: React.FC<Props> = ({ title, response }) => {
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
        className="z-50 flex flex-col items-center justify-center p-2"
      >
        <Typography
          as="h2"
          className={cn("text-white", dancingScript.className)}
        >
          {title}
        </Typography>
        <div className="h-4" />
        <Typography
          as="h1"
          className={cn("text-center text-white", dancingScript.className)}
        >
          {`You're invited to the wedding of`}
        </Typography>
        <div className="h-6 sm:h-2" />
        <Typography
          as="h1"
          className={cn("text-center text-white", dancingScript.className)}
        >
          {configuration.common.person1Name}
          <br className="sm:hidden" />
          {" and "}
          <br className="sm:hidden" />
          {configuration.common.person2Name}
        </Typography>
      </motion.div>
    </ImagesSlider>
  );
};
