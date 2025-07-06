import React from "react";
import Badge from "./badge";
import Button from "./button";
import { Calendar, Clock, ExternalLink } from "lucide-react";

export default function PostCard({
  title,
  excerpt,
  category,
  date,
  readTime,
  tags,
  slug,
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

      {/* Category */}
      {category && (
        <div className="mb-2">
          <span className="text-cyan-400 text-sm font-medium">{category}</span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold text-cyan-300 mb-3 hover:text-cyan-200 transition-colors">
        {title}
      </h3>

      {/* Excerpt */}
      {excerpt && (
        <p className="text-cyan-700 text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>
      )}

      {/* Meta information */}
      <div className="flex items-center text-xs text-cyan-600 mb-4 space-x-4">
        {date && (
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{date}</span>
          </div>
        )}
        {readTime && (
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{readTime}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Read more button */}
      <Button link={`/posts/${slug}`} hideicon>
        Read More
        {/* <ExternalLink size={16} className="ml-2" /> */}
      </Button>
    </div>
  );
} 