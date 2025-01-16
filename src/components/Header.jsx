"use client"; // Add this at the top of the file

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import Logo from "../Assets/IMG/Logo.png";

export default  function Header() {
  const [active, setActive] = useState(false);

  useEffect(() => {

    if (typeof window !== "undefined") {
      const isSticky = () => {
        const header = document.querySelector(".header-section");
        const scrollTop = window.scrollY;
        if (header) {
          scrollTop >= 80
            ? header.classList.add("is-sticky")
            : header.classList.remove("is-sticky");
        }
      };

      window.addEventListener("scroll", isSticky);

      const handleRouteChange = () => {
        setActive(false); 
      };


      return () => {
        window.removeEventListener("scroll", isSticky);
      };
    }
  }, );

  return (
    <div className="fixed Header w-full header-section top-0 flex justify-center left-0 z-50  lg:backdrop-blur-sm">
      <div className="lg:h-[10.5vh] h-[11vh] w-full flex justify-between items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <div className=" text-[1.5rem] text-white flex items-center gap-2 w-[20rem]">
          <div>
            {/* <Image className="w-[3rem]" src={Logo} width={50} height={50} alt="Logo" /> */}
          </div>
          <div className="flex flex-col">
            <h3 className=" text-[1.2rem] text-white">PlayPerk Logo</h3>
          </div>
        </div>

        <div className="hidden uppercase w-[45%] xl:flex justify-start text-[1rem] transition-colors hover:text-color-1">
          <ul className="flex justify-center gap-15 text-[1.2rem] text-neutral-100">
            <Link href="/" className="cursor-pointer  hover:text-white">
             Product
            </Link>
            <Link href="/about-us" className="cursor-pointer hover:text-white">
              Company
            </Link>
            <Link href="/contact-us" className="cursor-pointer hover:text-white">
             Resource
            </Link>
            <Link href="/our-work" className="cursor-pointer hover:text-white">
           Priciing
            </Link>
          </ul>
        </div>

        <div className=" text-[1rem] text-[white] contactOnHover xl:inline-flex hidden cursor-pointer rounded-md text-xs w-[7rem] border-[3px] button relative items-center justify-center h-11 transition-colors hover:text-color-1">
          <Link href="/contact-us">
            <button>
              <h3 className="uppercase">Sign UP</h3>
            </button>
          </Link>
        </div>

        <div
          className="HamBurgerIcon flex justify-center h-[8vh] items-center w-[4rem] rounded-2xl xl:hidden border-[2px]"
          onChange={() => setActive(!active)}
        >
          <label className="label flex h-[13vh] justify-center justify-items-center" htmlFor="check">
            <input className="input" type="checkbox" id="check" />
            <span className="span"></span>
            <span className="span"></span>
          </label>
        </div>

        <div className={active ? "Sub-SideNav-on-click" : "Sub-SideNav"}>
          <div className="menuItems">
            <Link href="/" onClick={() => setActive(false)}>
              <h4>Home</h4>
            </Link>
            <Link href="/about-us" onClick={() => setActive(false)}>
              <h4>About Us</h4>
            </Link>
            <Link href="/contact-us" onClick={() => setActive(false)}>
              <h4>Contact Us</h4>
            </Link>
            <Link href="/our-work" onClick={() => setActive(false)}>
              <h4>Our Work</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
