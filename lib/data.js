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
    name: "Research",
    href: "/research",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Portfolio",
    href: "/portfolio",
  },
  {
    name: "Contact",
    href: "/contact",
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
      title: "Software Engineer",
      institute: "Ekagra Health",
      startDate: "June, 2025",
      endDate: "Present",
      location: "Remote",
      description: [
        "Developing Ekagra Patient and Doctors portal for appointment",
        "Implementing features for patient management, appointment scheduling, and billing",
        "Developing Machine Learning model for wound detection",
        "Collaborating with cross-functional teams to deliver high-quality software products",
      ],
    },
    {
      title: "UG Research Assistant",
      institute: "AUST satellite Lab",
      startDate: "April, 2023",
      endDate: "April, 2024",
      description: [
        "Experimenting with an image recognition system on satellite images",
        "Building website and project management system for satellite laboratory ",
      ],
    },
  ],
};

export const Education = {
  name: "Education",
  img: "/home/arafat/work/portfolio/public/images/circuit.png",
  content: [
    {
      title: "Bachelor of Science in Electrical and Electronic Engineering",
      institute: "Ahsanullah University of Science and Technology",
      startDate: "2019",
      endDate: "2023",
      description: "Graduated",
    },
    {
      title: "Higher Secondary Certificate",
      institute: "Science Group",
      startDate: "2017",
      endDate: "2019",
      description:
        "Completed with distinction in Physics, Chemistry, and Mathematics.",
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

export const Skills = {
  name: "Technical Skills",
  categories: [
    {
      name: "Machine Learning",
      icon: "BrainCog",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV"],
    },
    {
      name: "VLSI & Hardware",
      icon: "Microchip",
      skills: ["Verilog", "VHDL", "Cadence", "Synopsys"],
    },
    {
      name: "FPGA Development",
      icon: "MemoryStick",
      skills: ["Xilinx", "Vivado", "Quartus", "SystemVerilog"],
    },
    {
      name: "RISC-V & Architecture",
      icon: "Cpu",
      skills: ["RISC-V", "Assembly", "Computer Architecture", "Digital Design"],
    },
    {
      name: "Web Development",
      icon: "Globe",
      skills: ["React", "Next.js", "JavaScript", "TypeScript"],
    },
    {
      name: "Backend & Database",
      icon: "Database",
      skills: ["Node.js", "Python", "MongoDB", "PostgreSQL"],
    },
  ],
};

export const Projects = {
  name: "Featured Projects",
  items: [
    {
      title: "RISC-V Processor Implementation",
      description:
        "Designed and implemented a 32-bit RISC-V processor using Verilog HDL. Features include pipelined architecture, hazard detection, and forwarding units.",
      technologies: ["Verilog", "RISC-V", "FPGA"],
      viewLink: "#",
      githubLink: "#",
    },
    {
      title: "Machine Learning Image Classifier",
      description:
        "Developed a CNN-based image classification system using TensorFlow and Keras. Achieved 95% accuracy on custom dataset with data augmentation techniques.",
      technologies: ["Python", "TensorFlow", "CNN"],
      viewLink: "#",
      githubLink: "#",
    },
    {
      title: "Healthcare Management System",
      description:
        "Built a comprehensive healthcare management system with patient records, appointment scheduling, and billing functionality using React and Node.js.",
      technologies: ["React", "Node.js", "MongoDB"],
      viewLink: "#",
      githubLink: "#",
    },
    {
      title: "FPGA-based Digital Signal Processor",
      description:
        "Implemented a real-time digital signal processor on FPGA for audio processing. Features include FIR filters, FFT computation, and real-time visualization.",
      technologies: ["VHDL", "FPGA", "DSP"],
      viewLink: "#",
      githubLink: "#",
    },
  ],
};
