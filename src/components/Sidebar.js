'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Home, Users, DollarSign, Gift, Calendar, Bell, 
  FileText, PieChart, Clock, X, ChevronRight, AlertCircle
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const router = useRouter(); // ✅ dùng router để điều hướng

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/dashboard', badge: null },
    { id: 'employees', icon: Users, label: 'Employees', path: '/employees', badge: '342' },
    { id: 'payroll', icon: DollarSign, label: 'Payroll', path: '/payroll', badge: null },
    { id: 'benefits', icon: Gift, label: 'Benefits', path: '/benefits', badge: null },
    { id: 'vacation', icon: Calendar, label: 'Vacation Days', path: '/vacation', badge: '12' },
    { id: 'alerts', icon: Bell, label: 'Alerts & Events', path: '/alerts', badge: '4' },
    { id: 'reports', icon: FileText, label: 'Reports', path: '/reports', badge: null },
    { id: 'analytics', icon: PieChart, label: 'Analytics', path: '/analytics', badge: null },
    { id: 'timesheets', icon: Clock, label: 'Timesheets', path: '/timesheets', badge: null }
  ];

  const quickLinks = [
    { id: 'anniversaries', label: 'Hiring Anniversaries', path: '/anniversaries' },
    { id: 'birthdays', label: 'Birthdays This Month', path: '/birthdays' },
    { id: 'new-hires', label: 'New Hires', path: '/new-hires' },
    { id: 'departures', label: 'Departures', path: '/departures' }
  ];

  const handleNavigation = (item) => {
    setActiveItem(item.id);
    router.push(item.path); // ✅ chuyển hướng đến trang tương ứng
    if (onClose) onClose(); // đóng sidebar nếu đang ở mobile
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="mb-6">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Main Menu
            </h3>
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 rounded-lg
                  transition-colors duration-150
                  ${activeItem === item.id 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`
                    px-2 py-0.5 text-xs font-medium rounded-full
                    ${activeItem === item.id 
                      ? 'bg-indigo-200 text-indigo-800' 
                      : 'bg-gray-200 text-gray-700'
                    }
                  `}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          
        </nav>

        
      </aside>
    </>
  );
}
