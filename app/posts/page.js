import React from "react";
import PostCard from "@/components/ui/post-card";
import { FileText, Calendar, Clock } from "lucide-react";
import { Posts } from "@/lib/data";

export default function PostsPage() {
  return (
    <div className="relative min-h-screen">
      {/* Header Section */}
      <div className="relative pt-10 px-5 lg:px-10">
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-5xl font-bold text-cyan-400 mb-4">
            {Posts.name}
          </h1>
          <p className="text-md text-cyan-700 font-['Fira_Code'] mb-8">
            {Posts.description}
          </p>
        </div>
      </div>

      {/* Posts Section */}
      <section className="relative px-5 lg:px-10 py-8">
        <div className="grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <FileText className="text-cyan-400 mr-3" size={24} />
            <h2 className="text-2xl font-bold text-cyan-400">Latest Posts</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Posts.items.map((post, index) => (
              <PostCard
                key={index}
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                date={post.date}
                readTime={post.readTime}
                tags={post.tags}
                slug={post.slug}
                featured={post.featured}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative px-5 lg:px-10 py-8">
        <div className="grid-pattern" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            Stay Updated
          </h2>
          <p className="text-cyan-700 mb-6 max-w-2xl mx-auto">
            Subscribe to get notified when new posts are published. 
            I write about technology, engineering, and my research experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-white/5 border border-cyan-800/20 rounded-lg text-cyan-300 placeholder-cyan-600 focus:outline-none focus:border-cyan-500/50"
            />
            <button className="px-6 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}