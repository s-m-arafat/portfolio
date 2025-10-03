import React from "react";
import Image from "next/image";
import SocialGroup from "@/components/socialgroup";
import Expertise from "@/components/expertise";
import Explore from "@/components/explore";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import PortfolioCard from "@/components/ui/portfolio-card";

export default function Home() {
  // Example featured content - you would typically fetch this from your data source
  const featuredPosts = [
    {
      title: "Latest Research Paper",
      excerpt: "Exploring the intersection of AI and sustainable computing",
      date: "August 2025",
      link: "/research"
    },
    {
      title: "Recent Project",
      excerpt: "Building efficient ML models for edge devices",
      date: "July 2025",
      link: "/projects"
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col lg:flex-row items-center py-8 lg:py-12">
        <div className="relative w-full lg:w-1/2">
          <Image
            src="/images/chip-bg-3.jpg"
            alt="chip"
            width={500}
            height={500}
            className="relative z-10 w-full"
            priority
          />
          <div className="gradient-fade-edges"></div>
        </div>
        <div className="relative flex items-center pt-4 pb-4 px-5 lg:pl-10 w-full lg:w-1/2">
          <div className="grid-pattern" />
          <div className="flex flex-col align-middle gap-4">
            <div className="leading-10 antialiased mb-2">
              <p className="text-md text-paragraph mb-1">Hello! I&apos;m</p>
              <h1 className="text-3xl lg:text-5xl font-bold text-title mb-1">
                Shakil Mahmud Arafat
              </h1>
              <p className="text-sm md:text-md text-paragraph font-['Fira_Code'] pt-1">
                Welcome to the realm of my ideas and thoughts.
              </p>
            </div>
            <Expertise />
            <div className="flex space-x-4 mt-3 items-center justify-center md:justify-start">
              <Button link="/#about" hideicon>
                About Me
              </Button>
              <Button link="/portfolio">View Portfolio</Button>
            </div>
            <div className="pb-2 lg:pb-0 lg:mt-8">
              <SocialGroup />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="py-16 px-5 md:px-10" id="featured">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-title mb-8">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post, index) => (
              <PortfolioCard
                key={index}
                title={post.title}
                description={post.excerpt}
                dateRange={post.date}
                viewLink={post.link}
                technologies={["AI", "Machine Learning", "Edge Computing"]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-5 md:px-10 bg-white/5 backdrop-blur-sm" id="about">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-title mb-8">About Me</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <p className="text-paragraph">
                I&apos;m a passionate researcher and developer focused on the intersection of artificial intelligence 
                and sustainable computing. With expertise in machine learning and edge computing, I strive to 
                create solutions that make a meaningful impact.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge>Machine Learning</Badge>
                <Badge>Edge Computing</Badge>
                <Badge>Sustainable AI</Badge>
                <Badge>Research</Badge>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/profile-pic.jpg"
                alt="Profile"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 px-5 md:px-10">
        <Explore />
      </section>

      {/* Contact Section */}
      <section className="py-16 px-5 md:px-10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-title mb-8">Let&apos;s Connect</h2>
          <p className="text-paragraph mb-8 max-w-2xl mx-auto">
            Interested in collaborating on research, projects, or just want to discuss ideas? 
            Feel free to reach out!
          </p>
          <div className="flex justify-center space-x-4">
            <Button link="/contact">Get in Touch</Button>
            <Button link="mailto:your-email@example.com">Email Me</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
