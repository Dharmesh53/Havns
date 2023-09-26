import { useState, useEffect } from "react";

const 
ImageBox = ({ link, classes, placeholder, feed }) => {
  const [ImageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = link;
  }, [link]);

  return (
    <>
      {!ImageLoaded && (
        <img
          src={placeholder}
          className={`${classes} w-full h-full object-cover`}
        />
      )}
      {ImageLoaded && (
        <img
          src={link}
          className={`${classes} w-full h-full object-cover ${feed?"":'hover:brightness-[0.80]'} duration-200`}
        />
      )}
    </>
  );
};

export default ImageBox;
