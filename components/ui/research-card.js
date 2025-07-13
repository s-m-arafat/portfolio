import React from "react";
import Badge from "./badge";
import Button from "./button";
import { Calendar, FileText, Code, ExternalLink, Users } from "lucide-react";

export default function ResearchCard({
  title,
  authors,
  journal,
  year,
  abstract,
  keywords,
  doi,
  pdfLink,
  codeLink,
  featured = false,
  className = "",
}) {
  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-cyan-800/20 hover:border-cyan-600/40 transition-colors ${className}`}>
      {/* Featured badge */}
      {featured && (
        <div className="mb-3">
          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
            Featured
          </Badge>
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold text-title mb-3 hover:text-cyan-200 transition-colors">
        {title}
      </h3>

      {/* Authors */}
      {authors && (
        <div className="flex items-center text-sm text-paragraph mb-2">
          <Users size={16} className="mr-2" />
          <span>{authors}</span>
        </div>
      )}

      {/* Journal and Year */}
      <div className="flex items-center text-sm text-paragraph mb-3 space-x-4">
        {journal && (
          <span className="font-medium text-title">{journal}</span>
        )}
        {year && (
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{year}</span>
          </div>
        )}
      </div>

      {/* Abstract */}
      {abstract && (
        <p className="text-paragraph text-sm mb-4 line-clamp-4">
          {abstract}
        </p>
      )}

      {/* Keywords */}
      {keywords && keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {keywords.map((keyword, index) => (
            <Badge key={index} className="text-xs">
              {keyword}
            </Badge>
          ))}
        </div>
      )}

      {/* DOI */}
      {doi && (
        <div className="text-xs text-cyan-600 mb-4">
          <span className="font-medium">DOI:</span> {doi}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex space-x-3">
        {pdfLink && (
          <Button link={pdfLink} >
            {/* <FileText size={16} className="mr-2" /> */}
            PDF
          </Button>
        )}
        {codeLink && (
          <Button link={codeLink}>
            {/* <Code size={16} className="mr-2" /> */}
            Code
          </Button>
        )}
        <Button link={pdfLink || "#"} >
          {/* <ExternalLink size={16} className="mr-2" /> */}
          View Paper
        </Button>
      </div>
    </div>
  );
} 