import React from "react";
import Badge from "./badge";
import Button from "./button";

export default function PortfolioCard({
  title,
  subtitle,
  dateRange,
  location,
  description,
  technologies,
  viewLink,
  githubLink,
  children,
  className = "",
}) {
  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-cyan-800/20 ${className}`}>
      {/* Header with title, subtitle, and date/location */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
        <div>
          {title && (
            <h3 className="text-xl font-semibold text-cyan-300 mb-1">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-cyan-600 font-['Fira_Code']">{subtitle}</p>
          )}
        </div>
        {(dateRange || location) && (
          <div className="flex items-center text-sm text-cyan-600 mt-2 lg:mt-0">
            {dateRange && <span>{dateRange}</span>}
            {location && (
              <>
                <span className="ml-3">{location}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      {description && (
        <div className="text-cyan-700 text-sm mb-4">
          {Array.isArray(description) ? (
            <ul className="space-y-2">
              {description.map((desc, i) => (
                <li key={i}>• {desc}</li>
              ))}
            </ul>
          ) : (
            <p>{description}</p>
          )}
        </div>
      )}

      {/* Technologies/Badges */}
      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <Badge key={index}>{tech}</Badge>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      {(viewLink || githubLink) && (
        <div className="flex space-x-3">
          {viewLink && (
            <Button link={viewLink} hideicon>
              View Project
            </Button>
          )}
          {githubLink && (
            <Button link={githubLink}>
              GitHub
            </Button>
          )}
        </div>
      )}

      {/* Custom children content */}
      {children}
    </div>
  );
} 