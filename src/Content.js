// import images
import Hero_person from "./assets/images/Hero/person.png";
import du from "./assets/images/Hero/person1.png";
import du1 from "./assets/images/Hero/person2.png";

import { MdArrowForward } from "react-icons/md";
import { TbSmartHome } from "react-icons/tb";
import { BiUser } from "react-icons/bi";
import { RiServiceLine, RiProjectorLine } from "react-icons/ri";
import { MdOutlinePermContactCalendar } from "react-icons/md";

export const content = {
  nav: [
    {
      link: "#home",
      icon: TbSmartHome,
    },
    {
      link: "#skills",
      icon: BiUser,
    },
    {
      link: "#services",
      icon: RiServiceLine,
    },
    {
      link: "#projects",
      icon: RiProjectorLine,
    },
    {
      link: "#contact",
      icon: MdOutlinePermContactCalendar,
    },
  ],
  hero: {
    title: " ",
    firstName: "PAPER",
    LastName: "CHAIN",
    image2:du1,
    image1: du,
    image: Hero_person,
    hero_content: [
      {
        count: "PAPERCHAIN",
      }
    ],
  },
  skills: {
    title: "Services",
    subtitle: "What We Offer",
    skills_content: [
      {
        name: "Issue Document",
        para: " ",
        logo: "https://static.vecteezy.com/system/resources/previews/010/882/101/original/clipboard-note-taking-paper-3d-icon-illustration-png.png",
      },
      {
        name: "Verify Document",
        para: " ",
        logo: "https://static.vecteezy.com/system/resources/previews/010/882/101/original/clipboard-note-taking-paper-3d-icon-illustration-png.png",
      },
      // {
      //   name: "QRCodeIssuerSignature",
      //   para: " ",
      //   logo: "https://static.vecteezy.com/system/resources/previews/010/882/101/original/clipboard-note-taking-paper-3d-icon-illustration-png.png",
      // },
      // {
      //   name: "Verification",
      //   para: " ",
      //   logo: "https://static.vecteezy.com/system/resources/previews/010/882/101/original/clipboard-note-taking-paper-3d-icon-illustration-png.png",
      // }
    ],
    icon: MdArrowForward,
  },
  Footer: {
    text: "© All Right Reserved Land Guardian 2024",
  },
};
