import React from "react";
import {Linkedin, Facebook, Github, Mail,  } from "lucide-react";

export default function SocialGroup() {
    const iconstyle = "text-green-light hover:text-green-base";
  return (
    <div className="flex space-x-5 mt-5 items-center justify-center px-4">
        <a href="https://www.linkedin.com/in/shakil-mahmud-arafat/" target="_blank" rel="noreferrer">
            <Linkedin size={24} className={iconstyle} />
        </a>
        <a href="https://github.com/s-m-arafat" target="_blank" rel="noreferrer">
            <Github size={24} className={iconstyle} />
        </a>
        <a href="https://www.facebook.com/arft666" target="_blank" rel="noreferrer">
            <Facebook size={24} className={iconstyle} />
        </a>
        <a href="mailto:shakilmahmudarafat@gmail.com" target="_blank" rel="noreferrer">
            <Mail size={24} className={iconstyle} />
        </a>
        
    </div>
  );
}
