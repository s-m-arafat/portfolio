import React from "react";
import Button from "./button";
import { Mail, MapPin, Calendar, ExternalLink } from "lucide-react";

export default function ContactCard({
  title,
  description,
  value,
  icon: Icon,
  link,
  className = "",
}) {
  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-cyan-800/20 hover:border-cyan-600/40 transition-colors ${className}`}>
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
            {Icon && <Icon className="text-cyan-400" size={24} />}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-cyan-300 mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-cyan-600 text-sm mb-3">
              {description}
            </p>
          )}
          {link ? (
            <Button link={link} hideicon>
              {value}
              {/* <ExternalLink size={16} className="ml-2" /> */}
            </Button>
          ) : (
            <p className="text-cyan-400 font-medium">
              {value}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 