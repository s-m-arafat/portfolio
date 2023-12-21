import { facebook, github, linkedin, mail } from "./svg";

export const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Posts",
    href: "/posts",
  },

  {
    name: "Activities",
    href: "/activities",
  },
  {
    name: "Portfolio",
    href: "/portfolio",
  },
  {
    name: "About",
    href: "/about",
  },
];
export const socials = [
  {
    name: "facebook",
    link: "https://www.facebook.com/arft666",
    icon: facebook,
  },
  {
    name: "linkedin",
    link: "https://www.linkedin.com/in/shakil-mahmud-arafat/",
    icon: linkedin,
  },
  {
    name: "github",
    link: "https://github.com/s-m-arafat",
    icon: github,
  },
  {
    name: "mail",
    link: "mailto:shakilmahmudarafat@gmail.com",
    icon: mail,
  },
];
export const Experience = {
  name: "Experience",
  img: "/images/experience.png",
  content: [
    {
      title: "R&D Intern",
      institute: "Shoshti x DocsML",
      startDate: "2023",
      endDate: "present",
      description:
        "Developed a website for the department of Electrical and Electronic Engineering, AUST",
    },
    {
      title: "UG Research Assistant",
      institute: "AUST satellite Lab",
      startDate: "2023",
      endDate: "present",
      description:
        "Developed a website for the department of Electrical and Electronic Engineering, AUST",
    },
  ],
};

export const Education = {
  name: "Education",
  img: "/images/education.png",
  content: [
    {
      title: "BSc.",
      institute: "Ahsanullah University of Science and Technology",
      startDate: "2021",
      endDate: "present",
      description:
        "BSc. in Electrical and Electronic Engineering",
    },
    {
      title: "HSC",
      institute: "New Govt. Degree College Rajshahi",
      startDate: "2017",
      endDate: "2019",
      description: "Science background",
    },
    {
      title: "SSC",
      institute: "Rajshahi Collegiate School",
      startDate: "2009",
      endDate: "2017",
      description: "Science background",
    },
  ],
};
