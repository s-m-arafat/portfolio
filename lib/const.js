import Facebook from "../assets/facebook.svg";
import mail from "../assets/mail.png";
import cf from "../assets/cf.svg";
import github from "../assets/github.svg";
export const navLinks = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Posts",
    path: "/posts",
  },
  {
    text: "Portfolio",
    path: "/portfolio",
  },
  {
    text: "Current activities",
    path: "/activities",
  },
  {
    text: "Contest Career",
    path: "/contests",
  },
  {
    text: "Contact",
    path: "/contact",
  },
  {
    text: "Resume",
    path: "/resume",
  },
];
export const sociallinks = [
  {
    text: "Mail",
    link: "mailto://contact@smarafat.me",
    icon: mail,
    hideText: true,
  },
  {
    text: "Facebook",
    link: "https://facebook.com/arft666",
    icon: Facebook,
    hideText: true,
  },
  {
    text: "Github",
    link: "https://github.com/s-m-arafat",
    icon: github,
    hideText: true,
  },
  {
    text: "Codeforces",
    link: "https://codeforces.com/profile/arft666",
    icon: cf,
    hideText: true,
  },
];
