export const site = {
  name: "Shakil Mahmud Arafat",
  headline: "Embedded Systems & VLSI Engineer",
  summary:
    "EEE graduate working across embedded systems and VLSI — firmware and PCB design, transistor-level analog design with SPICE simulation and DRC/LVS in Cadence Virtuoso, and RTL design with UVM-based verification. I use Python and object-oriented programming to automate simulation and verification.",
  location: "Dhaka, Bangladesh",
  email: "shakilmahmudarafat@gmail.com",
  availability: "Open to embedded systems and VLSI design & verification roles.",
  currentRole: {
    title: "Embedded System Engineer (R&D)",
    org: "Ulterior Engineering Intl.",
    period: "Sep 2026 – Present",
  },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shakil-mahmud-arafat/" },
    { label: "GitHub", href: "https://github.com/s-m-arafat" },
  ],
};

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Storybook", href: "/storybook" },
];

export const FIELDS = [
  {
    slug: "analog",
    label: "Analog IC",
    blurb: "Transistor-level design and SPICE characterization in Cadence Virtuoso — op-amps, comparators and SRAM.",
  },
  {
    slug: "digital",
    label: "Digital & Verification",
    blurb: "RTL design, UVM and SVA verification, and synthesis through place-and-route.",
  },
  {
    slug: "embedded",
    label: "Embedded & PCB",
    blurb: "Firmware for ESP32, STM32 and AVR, industrial protocols, and PCB design in KiCad.",
  },
  {
    slug: "research",
    label: "Research",
    blurb: "Spiking neural networks for neuromorphic sound classification.",
  },
];

export const experience = [
  {
    title: "Embedded System Engineer (R&D)",
    org: "Ulterior Engineering Intl.",
    location: "Mohakhali, Dhaka",
    period: "Sep 2026 – Present",
    skills: ["STM32", "PCB design", "FPGA", "Firmware development", "Communication protocols"],
    points: [
      "Research and development on multiple MCUs and firmware development for optimized client solutions.",
      "Schematic and PCB design for customized modules; component soldering.",
    ],
  },
  {
    title: "Software Engineer",
    org: "Ekagra Health Inc.",
    orgUrl: "https://ekagrahealth.ai",
    location: "Remote, US-based",
    period: "Jul 2025 – Aug 2026",
    skills: ["Python", "Object-oriented programming", "System architecture design"],
    points: [
      "Architected and maintained EHR software using object-oriented design patterns, building modular, reusable class hierarchies for scalability and long-term maintainability.",
      "Developed an AI-assisted clinician workflow, integrating Scribing and Wound Care models into the EHR to automate clinical tasks.",
      "Led a team of 4 engineers, working with clinical product stakeholders to turn requirements into technical specs.",
    ],
  },
];

export const activities = [
  {
    title: "Programming Team Lead (R&D)",
    org: "AUST Satellite and Communication Laboratory",
    period: "Apr 2023 – Apr 2024",
    points: [
      "Experimented with an image recognition system on satellite images.",
      "Built a website and project management system for the lab.",
    ],
  },
  {
    title: "Sub-Executive (Web Team)",
    org: "AUST Innovation and Design Club",
    period: "Apr 2023 – Apr 2024",
    points: [
      "Automated email communication and certificate generation.",
      "Helped organize club workshops and events with the executive team.",
    ],
  },
];

export const skills = [
  {
    group: "Analog design",
    items: ["Transistor-level design", "Two-stage op-amps", "StrongARM comparators", "Stick diagrams", "PVT corners", "SPICE (DC, AC, transient, noise)"],
  },
  {
    group: "Digital design",
    items: ["Verilog", "SystemVerilog", "RTL design", "FSMs & sequential circuits", "RISC-V (RV32I)", "UART, SPI, I2C", "APB, AHB, AXI4-Lite"],
  },
  { group: "Verification", items: ["SystemVerilog OOP", "UVM", "SVA"] },
  {
    group: "Embedded systems",
    items: ["ESP32", "STM32", "AVR/Arduino", "ARM Cortex-M", "FPGA", "GPIO, interrupts, timers", "PWM, ADC, DMA", "FreeRTOS", "Bare-metal C/C++", "PlatformIO"],
  },
  {
    group: "Communication protocols",
    items: ["UART", "SPI", "I2C", "RS-485", "Modbus RTU/TCP", "MQTT", "Ethernet/TCP-IP"],
  },
  { group: "PCB & hardware", items: ["Altium Designer", "KiCad", "PCB soldering"] },
  {
    group: "EDA & simulation",
    items: ["Cadence Virtuoso (schematic, ADE)", "Cadence Genus", "Cadence Innovus", "DRC/LVS", "LTspice", "Proteus", "Wokwi", "Icarus Verilog", "ModelSim", "Intel Quartus", "AMD Vivado XSim", "EDA Playground"],
  },
  { group: "Programming & tools", items: ["C", "C++", "Python", "MATLAB", "Bash", "JavaScript", "Linux", "Git"] },
];

export const education = [
  {
    degree: "BSc in Electrical and Electronic Engineering",
    detail: "Major: Electronics",
    institution: "Ahsanullah University of Science and Technology (AUST), Dhaka",
    year: "2025",
  },
  { degree: "HSC, Science", institution: "New Govt. Degree College, Rajshahi", year: "2019" },
  { degree: "SSC, Science", institution: "Rajshahi Collegiate School, Rajshahi", year: "2017" },
];

export const coursework = [
  {
    name: "VLSI I",
    topics: "CMOS networks, transmission gates, pass transistors, Elmore delay, DC and transient response, linear delay model, dynamic circuits, layout, fault analysis, stick diagrams, Cadence, Verilog",
  },
  {
    name: "VLSI II",
    topics: "Physical design, floorplanning, routing (maze, dogleg, left-edge), timing analysis, KL and FM partitioning, Dijkstra's shortest path, testbenches, Genus, Innovus",
  },
  { name: "Digital Logic Design", topics: "Combinational and sequential circuits, K-maps, FSMs, memory, counters" },
  { name: "Electronic Circuits I & II", topics: "BJTs, MOSFETs, op-amps, power amplifiers, feedback amplifiers, active filters" },
  { name: "Computer Architecture", topics: "SAP I & II, cache mapping, memory organization, pipelining" },
  {
    name: "Microprocessor, Interfacing & System Design",
    topics: "16-bit architecture, memory organization, bus activities, instruction set, 8255, 8279, 8253 PIT",
  },
  { name: "Processing & Fabrication Technology" },
  { name: "Power Electronics", topics: "SCR, IGBT, GTO, TRIAC, UJT, DIAC, rectifiers, buck, boost and buck-boost converters" },
  { name: "Programming Language", topics: "C++, OOP, data structures and algorithms" },
];

export const certifications = [
  { name: "Verification Series Part 1: SystemVerilog Essentials" },
  { name: "Embedded Systems Essentials with Arm: Get Practical with Hardware", issuer: "edX" },
  { name: "Learning FPGA Development", issuer: "LinkedIn Learning" },
  { name: "15-day Design Verification (DV) and DFT training", issuer: "Ulkasemi" },
];
