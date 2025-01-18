"use client";

import oneIMG from "../Assets/IMG/1.png";
import twoIMG from "../Assets/IMG/2.png";
import threeIMG from "../Assets/IMG/3.png";
import fourIMG from "../Assets/IMG/4.png";
import fiveIMG from "../Assets/IMG/7.png";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import imgBack from "../Assets/IMG/imgboard.webp";

export default function Landing() {
  const cesaRef = useRef(null); 
  const andRef = useRef(null);  
  const csiRef = useRef(null); 
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  const [isClient, setIsClient] = useState(false);


  
  useEffect(() => {
    setIsClient(true);
  
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  
    if (!isClient) return;
  
    // Split text for animation
    const cesaSplit = SplitType.create(cesaRef.current, { types: "chars" });
    const andSplit = SplitType.create(andRef.current, { types: "chars" });
    const csiSplit = SplitType.create(csiRef.current, { types: "chars" });
  
    const timeline = gsap.timeline();
  
    timeline
      .set(cesaSplit.chars, { yPercent: 100, opacity: 0 })
      .set(andSplit.chars, { yPercent: 100, opacity: 0 })
      .set(csiSplit.chars, { yPercent: 100, opacity: 0 })
      .to([cesaSplit.chars, andSplit.chars, csiSplit.chars], {
        yPercent: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.05, 
        ease: "power4.out",
        markers: true, 

      });
  }, [isClient]);



  return (
    <div className="w-full h-[100vh] flex flex-col " ref={heroRef}>
      <div className="HomePage ">
        {isClient && (
          <video ref={videoRef} autoPlay="autoplay" loop="loop" muted>
            <source src="/_next-video/playperk.mp4" type="video/mp4" />
          </video>
        )}
        <div className="overlay"></div>
        <div className="text oswarld">
          <div className="w-full flex gap-[3rem]">
            <div className="textForCESA">
              <h2
                ref={cesaRef}
                className="text-[0.8rem] md:text-[1.2rem] lg:text-[3rem] xl:text-[6rem]"
              >
              Play
              </h2>
            </div>
          
            <div className="textForCESA">
              <h2
                ref={csiRef}
                className="text-[0.8rem] md:text-[1.2rem] lg:text-[3rem] xl:text-[6rem]"
              >
                Perk
              </h2>
            </div>
          </div>
<div className="w-full flex justify-start items-start h-[40%] p-5 flex-col">
  <div className="w-[100%] ">
          <h3
            className="text-[0.6rem] md:text-[1.1rem] lg:text-[3rem] xl:text-[3.7rem]"
          >
          Scan QR
          </h3>
          <p
            className="text-[05rem] md:text-[0.8rem] lg:text-[1rem] xl:text-[1.1rem]"
          >
           Play Game and Earn More Discount
          </p>
          <div>
            <a href="/contact-us" className="">
             Play Game Now
            </a>
          </div>
          </div>
          </div>
        </div>
        <div className="IMGBACK w-[100%] h-[100%] ">
        <Image src={imgBack}  alt="" />
        </div>
      </div>

      <div className="slider bg-gradient-to-br from-purple-700 to-blue-900 ">
        <div className="slide-track z-4">
          <div className="slide z-4">
            <Image src={oneIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={twoIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={threeIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={fourIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={fiveIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={threeIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={fiveIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={oneIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={fourIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={oneIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={twoIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={oneIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={fiveIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={fourIMG} height="100" width="250" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
