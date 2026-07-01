"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type FadeInImageProps = ImageProps;

export default function FadeInImage({
  className = "",
  onLoad,
  onLoadingComplete,
  ...props
}: FadeInImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <Image
      {...props}
      className={`fade-in-image${isLoaded ? " fade-in-image--loaded" : ""}${
        className ? ` ${className}` : ""
      }`}
      onLoad={(event) => {
        handleLoaded();
        onLoad?.(event);
      }}
      onLoadingComplete={(image) => {
        handleLoaded();
        onLoadingComplete?.(image);
      }}
    />
  );
}
