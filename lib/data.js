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
      startDate: "May, 2021",
      endDate: "June, 2025",
      description: "Graduated",
    },
    {
      title: "HSC",
      institute: "New Govt. Degree College Rajshahi",
      startDate: "2017",
      endDate: "2019",
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

// Posts Data
export const Posts = {
  name: "Blog Posts",
  description:
    "Thoughts, tutorials, and insights on technology and engineering",
  items: [
    {
      title: "Building a RISC-V Processor from Scratch",
      excerpt:
        "A comprehensive guide to designing and implementing a 32-bit RISC-V processor using Verilog HDL, covering pipelined architecture and hazard detection.",
      category: "Computer Architecture",
      date: "December 15, 2024",
      readTime: "8 min read",
      tags: ["RISC-V", "Verilog", "FPGA", "Computer Architecture"],
      slug: "building-risc-v-processor",
      featured: true,
    },
    {
      title: "Machine Learning for Satellite Image Analysis",
      excerpt:
        "Exploring the application of deep learning techniques for satellite image classification and object detection in remote sensing applications.",
      category: "Machine Learning",
      date: "November 28, 2024",
      readTime: "12 min read",
      tags: ["Machine Learning", "Computer Vision", "Satellite", "Python"],
      slug: "ml-satellite-image-analysis",
      featured: true,
    },
    {
      title: "FPGA Development Best Practices",
      excerpt:
        "Essential tips and techniques for efficient FPGA development, from design methodology to optimization strategies.",
      category: "FPGA",
      date: "November 10, 2024",
      readTime: "6 min read",
      tags: ["FPGA", "VHDL", "Digital Design", "Hardware"],
      slug: "fpga-development-best-practices",
      featured: false,
    },
    {
      title: "Web Development with Next.js and TypeScript",
      excerpt:
        "Building modern web applications with Next.js and TypeScript, covering best practices and advanced patterns.",
      category: "Web Development",
      date: "October 25, 2024",
      readTime: "10 min read",
      tags: ["Next.js", "TypeScript", "React", "Web Development"],
      slug: "nextjs-typescript-guide",
      featured: false,
    },
  ],
};

// Research Data
export const Research = {
  name: "Research Publications",
  description:
    "Academic research and publications in computer architecture, machine learning, and digital design",
  items: [
    {
      title:
        "Spiking Neural Network Architecture for Environmental Sound Recognition",
      authors: "Shakil Mahmud Arafat",
      journal: "Thesis for BSc. in Electrical and Electronic Engineering",
      year: 2025,
      abstract:
        "This paper presents a biologically inspired Spiking Neural Network (SNN) architecture tailored for environmental sound classification. Leveraging event-based keypoint encoding and energy-efficient spiking computation, the proposed method achieves competitive performance on the UrbanSound8K dataset. The model demonstrates strong potential for deployment in low-power and neuromorphic hardware systems.",
      keywords: [
        "Spiking Neural Networks",
        "Environmental Sound Classification",
        "Low-Power Design",
        "Neuromorphic Computing",
        "UrbanSound8K",
      ],
      pdfLink: "#", 
      codeLink: "https://github.com/s-m-arafat/spiking-neural-network-experiments", 
      featured: true,
    },
  ],
};

// Contact Data
export const Contact = {
  name: "Get In Touch",
  description:
    "I'm always interested in new opportunities and exciting projects. Feel free to reach out!",
  email: "shakilmahmudarafat@gmail.com",
  location: "Dhaka, Bangladesh",
  availability: "Available for part-time or full-time opportunities",
  socialLinks: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/shakil-mahmud-arafat/",
      icon: "linkedin",
    },
    {
      name: "GitHub",
      url: "https://github.com/s-m-arafat",
      icon: "github",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/arft666",
      icon: "facebook",
    },
  ],
  contactMethods: [
    {
      title: "Email",
      description: "For inquiries, collaborations",
      value: "Send E-mail",
      icon: "Mail",
    },
    {
      title: "Location",
      description: "Based in Dhaka, Bangladesh",
      value: "Dhaka, Bangladesh",
      icon: "MapPin",
    },
    {
      title: "Availability",
      description: "Open to new opportunities",
      value: "Available for work",
      icon: "Calendar",
    },
  ],
};
