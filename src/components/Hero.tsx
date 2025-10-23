'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { ArrowRightIcon, ShieldCheckIcon, EyeIcon, ScaleIcon } from '@heroicons/react/24/outline';

export function Hero() {
  const [email, setEmail] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email signup
    console.log('Email signup:', email);
  };

  if (!mounted) {
    return (
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-16 sm:py-24 lg:py-32">
        <div className="container-mobile">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-12 bg-gray-200 rounded mb-6"></div>
              <div className="h-6 bg-gray-200 rounded mb-8"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-16 sm:py-24 lg:py-32">
      <div className="container-mobile">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-8">
            <ShieldCheckIcon className="h-4 w-4 mr-2" />
            Secure & Transparent Platform
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Make Corruption{' '}
            <span className="text-primary-600">Visible</span>,{' '}
            <span className="text-primary-600">Verifiable</span>, and{' '}
            <span className="text-primary-600">Costly</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join citizens in holding officials accountable through verified petitions, 
            secure reporting, and transparent data. Your voice matters, and your safety is protected.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="flex items-center">
              <Link href="/campaigns" className="flex items-center">
                Start a Campaign
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="flex items-center">
              <Link href="/issues" className="flex items-center">
                Report an Issue
                <EyeIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Email signup */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 input"
                required
              />
              <Button type="submit" className="sm:w-auto flex items-center">
                Get Updates
              </Button>
            </form>
            <p className="text-sm text-gray-500 mt-3">
              Join thousands of citizens fighting for transparency
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">
              50K+
            </div>
            <div className="text-sm sm:text-base text-gray-600">
              Verified Signatures
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">
              1.2K+
            </div>
            <div className="text-sm sm:text-base text-gray-600">
              Issues Resolved
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">
              500+
            </div>
            <div className="text-sm sm:text-base text-gray-600">
              RTI Requests
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-primary-600 mb-2">
              25+
            </div>
            <div className="text-sm sm:text-base text-gray-600">
              Legal Actions
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-300 rounded-full opacity-20"></div>
      </div>
    </section>
  );
}
