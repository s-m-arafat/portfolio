"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, Moon, Sun } from 'lucide-react';

const Navigation = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Handle theme initialization and updates
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const isDark = storedTheme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    setIsDarkMode(isDark);
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    setIsDarkMode(!isDarkMode);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.pathname]);

  // Check if link is active
  const isActiveLink = (href) => router.pathname === href;

  // Common link styles
  const getLinkStyles = (href) => ({
    base: 'relative py-2 px-3 transition-colors duration-200',
    active: isActiveLink(href) 
      ? 'text-slate-900 dark:text-white font-medium'
      : 'text-slate-600 hover:text-green-500 dark:text-slate-300 dark:hover:text-green-400',
  });

  // Navigation items
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                Logo
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            {navItems.map(({ name, href }) => {
              const styles = getLinkStyles(href);
              return (
                <Link key={href} href={href}>
                  <span className={`${styles.base} ${styles.active}`}>
                    {name}
                    {isActiveLink(href) && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400/40 via-green-400 to-green-400/40 dark:from-green-400/20 dark:via-green-400 dark:to-green-400/20" />
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-slate-900 dark:text-white" />
              ) : (
                <Moon className="w-5 h-5 text-slate-900 dark:text-white" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 text-slate-900 dark:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu */}
        <nav className="relative w-4/5 max-w-sm h-full bg-white dark:bg-gray-900 shadow-xl">
          <div className="flex flex-col h-full p-6">
            <div className="space-y-6">
              {navItems.map(({ name, href }) => {
                const styles = getLinkStyles(href);
                return (
                  <Link key={href} href={href}>
                    <span className={`block text-lg ${styles.base} ${styles.active}`}>
                      {name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
