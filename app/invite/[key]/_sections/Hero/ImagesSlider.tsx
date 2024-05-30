"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const MOBILE_IMAGES = [
  "/mobile/IMG_1234.jpg",
  "/mobile/IMG_2971.jpg",
  "/mobile/0FC01B5F.jpg",
  "/mobile/IMG_6185.jpg",
];

const DESKTOP_IMAGES = [
  "/desktop/IMG_4023.jpg",
  "/desktop/IMG_3001.jpg",
  "/desktop/IMG_9364.jpg",
  "/desktop/IMG_8727.jpg",
];

export const ImagesSlider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = useState<string[]>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setImages(MOBILE_IMAGES);
    } else {
      setImages(DESKTOP_IMAGES);
    }
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images?.length ? 0 : prevIndex + 1
    );
  }, [images?.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? (images?.length ?? 0) - 1 : prevIndex - 1
    );
  }, [images?.length]);

  const loadImages = useCallback(() => {
    if (!images) return;
    const loadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = reject;
      });
    });

    Promise.all(loadPromises)
      .then((loadedImages) => {
        setLoadedImages(loadedImages as string[]);
      })
      .catch((error) => console.error("Failed to load images", error));
  }, [images]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        handleNext();
      } else if (event.key === "ArrowDown") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    let interval: any;
    interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, [handleNext, handlePrevious]);

  const slideVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateX: 45,
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0],
      },
    },
    upExit: {
      opacity: 1,
      y: "-150%",
      transition: {
        duration: 1,
      },
    },
    downExit: {
      opacity: 1,
      y: "150%",
      transition: {
        duration: 1,
      },
    },
  };

  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div
      className="relative flex h-[40rem] w-full items-center justify-center overflow-hidden"
      style={{
        perspective: "1000px",
      }}
    >
      {areImagesLoaded ? (
        <>
          {children}
          <div className="absolute inset-0 z-40 bg-black/50" />
          <AnimatePresence>
            <motion.img
              key={currentIndex}
              src={loadedImages[currentIndex]}
              initial="initial"
              animate="visible"
              exit="upExit"
              variants={slideVariants}
              className="image absolute inset-0 h-full w-full object-cover object-center"
            />
          </AnimatePresence>
        </>
      ) : null}
    </div>
  );
};
