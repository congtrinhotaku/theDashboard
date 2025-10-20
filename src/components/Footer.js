// components/Footer.js
'use client';

import { BarChart3 } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">ACME Corporation</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Integrated HR & Payroll Dashboard for Executive Management. 
              Making informed decisions with real-time employee and payroll insights.
            </p>
            <div className="flex space-x-4">
              <span className="text-xs text-gray-500">Version 2.1.0</span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">Last Updated: Oct 2024</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition">API Reference</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition">User Guide</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition">Release Notes</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition">Contact IT</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition">Report Issue</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition">System Status</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-sm text-gray-600">
              © {currentYear} ACME Corporation. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition">Terms of Service</a>
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition">Security</a>
              <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}