import React from 'react';
import { Play, Twitch, Linkedin, Twitter, ArrowUpRight, Mail, Code } from 'lucide-react';

export const Connect: React.FC = () => {
  return (
    <>
      <section id="connect" className="py-32 relative overflow-hidden bg-surface/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Latest Transmission (Video) */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                </div>
                <h2 className="text-2xl font-display font-bold text-white tracking-wide">LATEST TRANSMISSION</h2>
              </div>
              
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 bg-black relative group mb-8 shadow-2xl shadow-secondary/5 transition-all duration-500 hover:border-secondary/30">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                  alt="Video Thumbnail" 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity scale-100 group-hover:scale-105 duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-secondary group-hover:border-secondary transition-all duration-300 cursor-pointer">
                    <Play className="w-8 h-8 text-white fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 block bg-black/50 w-fit px-2 py-1 rounded backdrop-blur-md">New Video</span>
                  <h3 className="text-2xl font-bold text-white truncate drop-shadow-lg">How I Built a SaaS in 7 Days (No Sleep)</h3>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <h3 className="text-2xl font-display font-bold text-white mb-4">Connect</h3>
              
              <a href="#" className="group flex items-center justify-between p-5 rounded-xl bg-background border border-white/5 hover:border-secondary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#9146FF]/10 flex items-center justify-center text-[#9146FF] group-hover:bg-[#9146FF] group-hover:text-white transition-all">
                    <Twitch className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#9146FF] transition-colors">Twitch</h4>
                    <p className="text-xs text-gray-500 font-mono">Live Coding Sessions</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-gray-600 group-hover:bg-red-500 transition-colors"></span>
                </div>
              </a>

              <a href="#" className="group flex items-center justify-between p-5 rounded-xl bg-background border border-white/5 hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5] group-hover:bg-[#0077b5] group-hover:text-white transition-all">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#0077b5] transition-colors">LinkedIn</h4>
                    <p className="text-xs text-gray-500 font-mono">Professional Network</p>
                  </div>
                </div>
                <ArrowUpRight className="text-gray-600 group-hover:text-white transition-colors" />
              </a>

              <a href="#" className="group flex items-center justify-between p-5 rounded-xl bg-background border border-white/5 hover:border-white/20 transition-all">
                <div