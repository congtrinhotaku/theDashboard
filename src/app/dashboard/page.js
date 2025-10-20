// app/dashboard/page.js
'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { 
  DollarSign, Users, Calendar, Gift, TrendingUp, 
  Download, AlertCircle, Cake
} from 'lucide-react';

export default function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'anniversary', message: 'John Smith - 5 year anniversary in 3 days', priority: 'high' },
    { id: 2, type: 'vacation', message: '12 employees have >20 vacation days accumulated', priority: 'medium' },
    { id: 3, type: 'benefits', message: 'Sarah Johnson changed benefits plan affecting payroll', priority: 'high' },
    { id: 4, type: 'birthday', message: '8 employees have birthdays this month', priority: 'low' }
  ]);

  const kpiData = {
    totalEarnings: { current: 12450000, previous: 11280000, change: 10.4 },
    vacationDays: { current: 2847, previous: 2654, change: 7.3 },
    avgBenefits: { shareholders: 8500, nonShareholders: 6200, change: 5.2 },
    activeEmployees: { current: 342, previous: 318, change: 7.5 }
  };

  const departmentData = [
    { name: 'Engineering', earnings: 4200000, employees: 125, vacation: 980 },
    { name: 'Sales', earnings: 3100000, employees: 89, vacation: 712 },
    { name: 'Marketing', earnings: 1850000, employees: 54, vacation: 445 },
    { name: 'Operations', earnings: 1650000, employees: 42, vacation: 398 },
    { name: 'HR', earnings: 850000, employees: 22, vacation: 212 },
    { name: 'Finance', earnings: 800000, employees: 10, vacation: 100 }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const dismissAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type) => {
    switch(type) {
      case 'anniversary': return <Calendar className="w-5 h-5" />;
      case 'vacation': return <Gift className="w-5 h-5" />;
      case 'benefits': return <DollarSign className="w-5 h-5" />;
      case 'birthday': return <Cake className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getAlertColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
              Active Alerts ({alerts.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map(alert => (
              <div key={alert.id} className={`p-4 rounded-lg border flex items-start justify-between ${getAlertColor(alert.priority)}`}>
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <p className="text-sm font-medium">{alert.message}</p>
                </div>
                <button 
                  onClick={() => dismissAlert(alert.id)}
                  className="text-current hover:opacity-70 ml-2 text-xl leading-none"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header with Year Selector */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard Overview</h1>
          <p className="text-gray-600">HR & Payroll Executive Management Portal</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Earnings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center text-sm font-medium text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              {kpiData.totalEarnings.change}%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {formatCurrency(kpiData.totalEarnings.current)}
          </h3>
          <p className="text-sm text-gray-600">Total Earnings YTD</p>
          <p className="text-xs text-gray-500 mt-2">
            Previous: {formatCurrency(kpiData.totalEarnings.previous)}
          </p>
        </div>

        {/* Vacation Days */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center text-sm font-medium text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              {kpiData.vacationDays.change}%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {formatNumber(kpiData.vacationDays.current)}
          </h3>
          <p className="text-sm text-gray-600">Total Vacation Days</p>
          <p className="text-xs text-gray-500 mt-2">
            Previous: {formatNumber(kpiData.vacationDays.previous)}
          </p>
        </div>

        {/* Average Benefits */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center text-sm font-medium text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              {kpiData.avgBenefits.change}%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {formatCurrency(kpiData.avgBenefits.shareholders)}
          </h3>
          <p className="text-sm text-gray-600">Avg Benefits (Shareholders)</p>
          <p className="text-xs text-gray-500 mt-2">
            Non-Shareholders: {formatCurrency(kpiData.avgBenefits.nonShareholders)}
          </p>
        </div>

        {/* Active Employees */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex items-center text-sm font-medium text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              {kpiData.activeEmployees.change}%
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {formatNumber(kpiData.activeEmployees.current)}
          </h3>
          <p className="text-sm text-gray-600">Active Employees</p>
          <p className="text-xs text-gray-500 mt-2">
            Previous: {formatNumber(kpiData.activeEmployees.previous)}
          </p>
        </div>
      </div>

      {/* Department Breakdown and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings by Department */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Earnings by Department</h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              View Details →
            </button>
          </div>
          <div className="space-y-4">
            {departmentData.map((dept, index) => {
              const maxEarnings = Math.max(...departmentData.map(d => d.earnings));
              const percentage = (dept.earnings / maxEarnings) * 100;
              
              return (
                <div key={index} className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                    <span className="text-sm font-bold text-gray-900">{formatCurrency(dept.earnings)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{dept.employees} employees</span>
                    <span className="text-xs text-gray-500">{dept.vacation} vacation days</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions & Reports</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition text-left">
              <Users className="w-6 h-6 text-indigo-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">View by Gender</p>
              <p className="text-xs text-gray-600">Drill down analysis</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition text-left">
              <Users className="w-6 h-6 text-indigo-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">View by Ethnicity</p>
              <p className="text-xs text-gray-600">Diversity metrics</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition text-left">
              <Calendar className="w-6 h-6 text-indigo-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Employment Type</p>
              <p className="text-xs text-gray-600">Full-time vs Part-time</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition text-left">
              <Gift className="w-6 h-6 text-indigo-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Benefits Plans</p>
              <p className="text-xs text-gray-600">Plan comparison</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition text-left">
              <DollarSign className="w-6 h-6 text-indigo-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Shareholders</p>
              <p className="text-xs text-gray-600">Shareholder data</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition text-left">
              <Cake className="w-6 h-6 text-indigo-600 mb-2" />
              <p className="text-sm font-medium text-gray-900">Birthdays</p>
              <p className="text-xs text-gray-600">This month</p>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}