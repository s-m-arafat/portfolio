import React from "react";
import ContactCard from "@/components/ui/contact-card";
import Button from "@/components/ui/button";
import { Mail, MapPin, Calendar, Send, MessageCircle } from "lucide-react";
import { Contact } from "@/lib/data";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      {/* Header Section */}
      <div className="relative pt-10 px-5 lg:px-10">
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-5xl font-bold text-title mb-4">
            {Contact.name}
          </h1>
          <p className="text-md text-paragraph font-['Fira_Code'] mb-8">
            {Contact.description}
          </p>
        </div>
      </div>

      {/* Contact Information Section */}
      <section className="relative px-5 lg:px-10 py-8">
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <MessageCircle className="text-cyan-400 mr-3" size={24} />
            <h2 className="text-2xl font-bold text-cyan-400">
              Contact Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Contact.contactMethods.map((method, index) => {
              const IconComponent = {
                Mail,
                MapPin,
                Calendar,
              }[method.icon];

              return (
                <ContactCard
                  key={index}
                  title={method.title}
                  description={method.description}
                  value={method.value}
                  icon={IconComponent}
                  link={
                    method.title === "Email"
                      ? `mailto:${method.value}`
                      : undefined
                  }
                />
              );
            })}
          </div>
        </div>
      </section>
      {/* Social Links Section */}
      <section className="relative px-5 lg:px-10 py-8">
        <div className="grid-pattern" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="flex space-x-4 justify-center">
            {Contact.socialLinks.map((social, index) => (
              <Button key={index} link={social.url}>
                {social.name}
              </Button>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Form Section */}
      <section className="relative px-5 lg:px-10 py-8">
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-cyan-800/20">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">
              Send a Message
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-title text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-cyan-800/20 rounded-lg text-title placeholder-cyan-600 focus:outline-none focus:border-cyan-500/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-title text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/5 border border-cyan-800/20 rounded-lg text-title placeholder-cyan-600 focus:outline-none focus:border-cyan-500/50"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-title text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-800/20 rounded-lg text-title placeholder-cyan-600 focus:outline-none focus:border-cyan-500/50"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-title text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-800/20 rounded-lg text-title placeholder-cyan-600 focus:outline-none focus:border-cyan-500/50 resize-none"
                  placeholder="Tell me about your project or inquiry..."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <Button link="#" hideicon>
                  {/* <Send size={16} className="mr-2" /> */}
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
