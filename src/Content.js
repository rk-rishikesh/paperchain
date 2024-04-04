// import images
import Hero_person from "./assets/images/Hero/person.png";
import du from "./assets/images/Hero/person1.png";
import du1 from "./assets/images/Hero/person2.png";
import figma from "./assets/images/Skills/figma.png";
import ps from "./assets/images/Skills/ps.png";
import reactjs from "./assets/images/Skills/react.png";
import nodejs from "./assets/images/Skills/node.png";

import services_logo1 from "./assets/images/Services/logo1.png";
import services_logo2 from "./assets/images/Services/logo2.png";
import services_logo3 from "./assets/images/Services/logo3.png";

import project1 from "./assets/images/projects/img1.png";
import project2 from "./assets/images/projects/img2.png";
import project3 from "./assets/images/projects/img3.png";
import person_project from "./assets/images/projects/person.png";

import avatar1 from "./assets/images/Testimonials/avatar1.png";
import avatar2 from "./assets/images/Testimonials/avatar2.png";
import avatar3 from "./assets/images/Testimonials/avatar3.png";
import avatar4 from "./assets/images/Testimonials/avatar4.png";


// import icons from react-icons
import { GrMail } from "react-icons/gr";
import { MdArrowForward, MdCall } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";
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
  services: {
    title: "About Us ",
    subtitle: "Who We Are",
    service_content: [
      {
        title: "Mission",
        para: "Our mission is to facilitate secure property transactions and maintain reliable land records.",
        logo: services_logo1,
      },
      {
        title: "Vision",
        para: "We envision a future where property rights are protected and accessible to all.",
        logo: services_logo2,
      },
      {
        title: "Values",
        para: "Integrity, Transparency, Accountability.",
        logo: services_logo3,
      },
    ],
  },
  Projects: {
    title: "Recent Transactions",
    subtitle: "Our Work",
    image: person_project,
    project_content: [
      {
        title: "Land Title Transfer",
        image: project1,
      },
      {
        title: "Property Registartion",
        image: project2,
      },
      {
        title: "Land Survey Report",
        image: project3,
      },
    ],
  },
  Testimonials: {
    title: "Designers",
    subtitle: "What Designers Say",
    testimonials_content: [
      {
        review:
          "“Lorem ipsum is a placeholder text commonly used to demonstra”",
        img: avatar4,
        name: "Rishikesh Kale",
      },
      {
        review:
          "“Lorem ipsum is a placeholder text commonly used to demonstra”",
        img: avatar1,
        name: "Anushka Zade",
      },
      {
        review:
          "“Lorem ipsum is a placeholder text commonly used to demonstra”",
        img: avatar2,
        name: "Nisha Jain",
      },
      {
        review:
          "“Lorem ipsum is a placeholder text commonly used to demonstra”",
        img: avatar3,
        name: "Palak Agrawal",
      },
      {
        review:
          "“Lorem ipsum is a placeholder text commonly used to demonstra”",
        img: avatar4,
        name: "Akshat Deshmukh",
      },
    ],
  },
  Contact: {
    title: "Contact Us",
    subtitle: "Get in Touch",
    social_media: [
      {
        text: "paperchain",
        icon: GrMail,
        link: "mailto:paperchain",
      },
      {
        text: "+91 123456789",
        icon: MdCall,
        link: "https://wa.me/123456789",
      },
      {
        text: "PRANA",
        icon: BsInstagram,
        link: " ",
      },
    ],
  },
  Footer: {
    text: "© All Right Reserved Land Guardian 2024",
  },
};
