"use client";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-white/30">
          &copy; {new Date().getFullYear()} Mohammed Shibili. All rights reserved.
        </div>
        <div className="flex items-center gap-8">
          <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">
            Instagram
          </a>
          <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">
            Twitter
          </a>
          <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">
            LinkedIn
          </a>
          <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">
            Behance
          </a>
        </div>
      </div>
    </footer>
  );
}
