import React from "react";
import Badge from "./badge";

export default function SkillCard({ 
  title, 
  icon: Icon, 
  skills, 
  className = "" 
}) {
  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-cyan-800/20 ${className}`}>
      <h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center">
        {Icon && <Icon className="mr-2" size={20} />}
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index}>{skill}</Badge>
        ))}
      </div>
    </div>
  );
} 