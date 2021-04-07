import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import observerOptions from "./options";
import Wrapper from "./Wrapper";
import { ImageProps } from "./types";
interface ItemProps{
  positionTop?: string;
  imgHeight?: string;
}
const StyledImage = styled.img<ItemProps>`
  position: absolute;
  top: ${prpos=> prpos.positionTop? prpos.positionTop :'0'};
  left: 0;
  width: 100%;
  
  max-width: 100%;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  
`;

const Image: React.FC<ImageProps> = ({ src, alt, positionTop,imgHeight, ...otherProps }) => {
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = (imgRef.current as unknown) as HTMLImageElement;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { isIntersecting } = entry;
        if (isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      });
    }, observerOptions);
    observer.observe(img);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <Wrapper ref={imgRef} {...otherProps}>
      {isLoaded ? <StyledImage src={src} alt={alt} positionTop={positionTop} height={imgHeight}/> : <Placeholder />}
    </Wrapper>
  );
};

export default Image;
