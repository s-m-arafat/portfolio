"use client";
import React, { useState } from "react";
import { Maximize } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

const IntroCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const personalInfo = {
    name: "Shakil Mahmud Arafat",
    title: "Full Stack Developer",
    shortBio:
      "Passionate developer with 1 year of experience in building Machine Learning Models and Modern Web Applications.",
    fullBio:
      "Experienced Full Stack Developer with a proven track record of delivering scalable web applications. Proficient in React, Node.js, and cloud technologies. Led multiple successful projects and mentored junior developers. Strong problem-solving skills and a keen eye for user experience.",
    image: "/images/profile-pic.jpg",
    skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
  };

  return (
    <div className="relative">
      {/* Main Card */}
      <div className="max-w-sm bg-white dark:bg-black-2 rounded-lg shadow-lg p-6">
        <div className="relative flex items-center gap-4">
          {/* Profile Image */}
          <Image
            width={80}
            height={80}
            src={personalInfo.image}
            alt={personalInfo.name}
            className="w-20 h-20 rounded-full object-cover"
          />

          {/* Basic Info */}
          <div className="flex-1">
            <h2 className="text-xl font-bold">{personalInfo.name}</h2>
            <p className="text-gray-600 dark:text-white-2">{personalInfo.title}</p>
          </div>

          {/* Icons */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="hover:bg-gray-100/10 transition-colors"
          >
            <Maximize className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Short Bio */}
        <p className="mt-4 text-gray-700 dark:text-white-2">{personalInfo.shortBio}</p>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Portfolio Details</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="flex items-center gap-4 mb-4">
              <Image
                width={96}
                height={96}
                src={personalInfo.image}
                alt={personalInfo.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold">{personalInfo.name}</h2>
                <p className="text-gray-600">{personalInfo.title}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">About Me</h3>
                <p className="text-gray-700">{personalInfo.fullBio}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IntroCard;
