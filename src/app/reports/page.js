'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { 
  FileText, Download, Calendar, Filter, TrendingUp,
  Users, DollarSign, Gift, Clock, BarChart3,
  PieChart, Building, UserCheck, Heart, FileSpreadsheet
} from 'lucide-react';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState('thisYear');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const reportCategories = [
    {
      id: 'earnings',
      name: 'Earnings Reports',
      icon: DollarSign,
      color: 'green',
      reports: [
        {
          id: 'earnings-shareholder',
          name: 'Total Earnings by Shareholder',
          description: 'Breakdown of earnings for shareholders vs non-shareholders',
          lastGenerated: '2024-10-15',
          format: ['PDF', 'Excel', 'CSV']
        },
        {
          id: 'earnings-gender',
          name: 'Total Earnings by Gender',
          description: 'Gender-based earnings analysis',
          lastGenerated: '2024-10-15',
          format: ['PDF', 'Excel', 'CSV']
        },
        {
          id: 'earnings-ethnicity',
          name: 'Total Earnings by Ethnicity',
          description: 'Ethnicity-based earnings breakdown',
          lastGenerated: '2024-10-15',
          format: ['PDF', 'Excel', 'CSV']
        },
        {
          id: 'earnings-employment',
          name: 'Total Earnings by Employment Type',
          description: 'Full-time vs Part-time earnings comparison',
          lastGenerated: '2024-10-15',
          format: ['PDF', 'Excel', 'CSV']
        },
        {
          id: 'earnings-department',
          name: 'Total Earnings by Department',
          description: 'Department-wise earnings analysis YTD and previous year',
          lastGenerated: '2024-10-15',
          format: ['PDF', 'Excel', 'CSV']
        }
      ]
    },
    {
      id: 'vacation',
      name: 'Vacation Reports',
      icon: Gift,
      color: 'blue',
      reports: [
        {
          id: 'vacation-shareholder',
          name: 'Vacation Days by Shareholder',
          description: 'Vacation usage for shareholders vs non-shareholders',
          lastGenerated: '2024-10-12',
          format: ['PDF', 'Excel', 'CSV']
        },
        {
          id: 'vacation-gender',
          name: 'Vacation Days by Gender',
          description: 'Gender-based vacation days analysis',
          lastGenerated: '2024-10-12',
          format: ['PDF', 'Excel', 'CSV']
        },
        {
          id: 'vacation-ethnicity',
          name: 'Vacation Days by Ethnicity',
          description: 'Ethnicity-based vacation days breakdown',
          lastGenerated: '2024-10-12',
          format: ['PDF', 'Excel', 'CSV']
        },
        {
          id: 'vacation-employment',
          name: 'Vacation Days by Employment Type',
          description: 'Full-time vs Part-time vacation comparison',
          lastGenerated: '2024-10-12',
          format: ['PDF', 'Excel', 'CSV']
        },
        {
          id: 'vacation-accumulated',
          name: 'Accumulated Vacation Days',
          description: 'Employees with excessive vacation days',
          lastGenerated: '2024-10-18',
          format: ['PDF', 'Excel']
        }
      ]
    },
    {
      id: 'benefits',
      name: 'Benefits Reports',
      icon: Heart,
      color: 'purple',
      reports: [
        {
          id: 'benefits-shareholder',
          name: 'Average Benefits by Shareholder',
          description: 'Benefits costs for shareholders vs non-shareholders',
          lastGenerated: '2024-10-10',
          format: ['PDF', 'Excel', 'CSV']
        },
        {
          id: 'benefits-plan',
          name: 'Benefits by Plan Type',
          description: 'Breakdown of Basic, Standard, and Premium plans',
          lastGenerated: '2024-10-10',
          format: ['PDF', 'Excel', 'CSV']
        },
        {
          id: 'benefits-changes',
          name: 'Benefits Plan Changes',
          description: 'Recent changes affecting payroll',
          lastGenerated: '2024-10-18',
          format: ['PDF', 'Excel']
        },
        {
          id: 'benefits-department',
          name: 'Benefits by Department',
          description: 'Department-wise benefits analysis',
          lastGenerated: '2024-10-10',
          format: ['PDF', 'Excel', 'CSV']
        }
      ]
    },
    {
      id: 'alerts',
      name: 'Alerts & Events Reports',
      icon: Calendar,
      color: 'orange',
      reports: [
        {
          id: 'anniversaries',
          name: 'Work Anniversaries Report',
          description: 'Upcoming hiring anniversaries (configurable threshold)',
          lastGenerated: '2024-10-19',
          format: ['PDF', 'Excel']
        },
        {
          id: 'birthdays',
          name: 'Birthdays Current Month',
          description: 'All employees with birthdays this month',
          lastGenerated: '2024-10-01',
          format: ['PDF', 'Excel']
        },
        {
          id: 'alerts-summary',
          name: 'Alerts Summary Report',
          description: 'Overview of all active alerts by priority',
          lastGenerated: '2024-10-20',
          format: ['PDF', 'Excel']
        }
      ]
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive Reports',
      icon: BarChart3,
      color: 'indigo',
      reports: [
        {
          id: 'executive-summary',
          name: 'Executive Summary Dashboard',
          description: 'Complete overview of HR and Payroll metrics',
          lastGenerated: '2024-10-20',
          format: ['PDF', 'Excel']
        },
        {
          id: 'monthly-summary',
          name: 'Monthly HR & Payroll Summary',
          description: 'Comprehensive monthly report with all metrics',
          lastGenerated: '2024-10-01',
          format: ['PDF', 'Excel', 'CSV']
        },
        {
          id: 'yoy-comparison',
          name: 'Year-over-Year Comparison',
          description: 'YTD vs Previous Year detailed analysis',
          lastGenerated: '2024-10-15',
          format: ['PDF', 'Excel']
        },
        {
          id: 'department-analytics',
          name: 'Department Analytics Report',
          description: 'Deep dive into department-level metrics',
          lastGenerated: '2024-10-18',
          format: ['PDF', 'Excel', 'CSV']
        }
      ]
    }
  ];

  const quickStats = [
    { label: 'Total Reports', value: '24', change: '+3', icon: FileText, color: 'blue' },
    { label: 'Generated This Month', value: '18', change: '+5', icon: TrendingUp, color: 'green' },
    { label: 'Scheduled Reports', value: '8', change: '0', icon: Clock, color: 'purple' },
    { label: 'Export Formats', value: '3', change: '0', icon: FileSpreadsheet, color: 'orange' }
  ];

  const recentReports = [
    { name: 'Executive Summary Dashboard', date: '2024-10-20 09:30 AM', type: 'PDF', size: '2.4 MB' },
    { name: 'Alerts Summary Report', date: '2024-10-20 08:15 AM', type: 'Excel', size: '1.8 MB' },
    { name: 'Work Anniversaries Report', date: '2024-10-19 04:45 PM', type: 'PDF', size: '856 KB' },
    { name: 'Benefits Plan Changes', date: '2024-10-18 02:20 PM', type: 'Excel', size: '1.2 MB' }
  ];

  const getIconColor = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  const handleGenerateReport = (reportId, format) => {
    alert(`Generating ${reportId} report in ${format} format...`);
  };

  const handleScheduleReport = (reportId) => {
    alert(`Scheduling ${reportId} report...`);
  };

  return (
    <DashboardLayout>
        <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-gray-600">Generate and export comprehensive HR and Payroll reports</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconColor(stat.color)}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    {stat.change !== '0' && (
                        <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                        </span>
                    )}
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
                );
            })}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3">
                <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                    <option value="thisMonth">This Month</option>
                    <option value="lastMonth">Last Month</option>
                    <option value="thisQuarter">This Quarter</option>
                    <option value="thisYear">This Year (YTD)</option>
                    <option value="lastYear">Last Year</option>
                    <option value="custom">Custom Range</option>
                </select>

                <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                    <option value="All">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                </select>
                </div>

                <div className="flex gap-2">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                    <Calendar className="w-4 h-4" />
                    <span>Schedule</span>
                </button>
                </div>
            </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Report Categories */}
            <div className="lg:col-span-2 space-y-6">
                {reportCategories.map(category => {
                const Icon = category.icon;
                return (
                    <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Category Header */}
                    <div className={`p-4 ${getIconColor(category.color).replace('text-', 'bg-').replace('-600', '-50')} border-b border-gray-200`}>
                        <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconColor(category.color)}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                            <p className="text-sm text-gray-600">{category.reports.length} reports available</p>
                        </div>
                        </div>
                    </div>

                    {/* Reports List */}
                    <div className="divide-y divide-gray-200">
                        {category.reports.map(report => (
                        <div key={report.id} className="p-4 hover:bg-gray-50 transition">
                            <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-gray-900 mb-1">{report.name}</h4>
                                <p className="text-xs text-gray-600 mb-2">{report.description}</p>
                                <p className="text-xs text-gray-500">Last generated: {report.lastGenerated}</p>
                            </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                {report.format.map(format => (
                                <button
                                    key={format}
                                    onClick={() => handleGenerateReport(report.id, format)}
                                    className="flex items-center space-x-1 px-3 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition"
                                >
                                    <Download className="w-3 h-3" />
                                    <span>{format}</span>
                                </button>
                                ))}
                            </div>
                            <button
                                onClick={() => handleScheduleReport(report.id)}
                                className="text-xs text-gray-600 hover:text-indigo-600 transition"
                            >
                                Schedule
                            </button>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                );
                })}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
                {/* Recent Reports */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
                <div className="space-y-3">
                    {recentReports.map((report, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{report.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-600">{report.date}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-600">{report.type}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-600">{report.size}</span>
                        </div>
                        </div>
                        <Download className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    </div>
                    ))}
                </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <BarChart3 className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm font-medium text-gray-900">Generate Executive Summary</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Export All Data</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-gray-900">Schedule Monthly Report</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <PieChart className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-gray-900">Custom Report Builder</span>
                    </button>
                </div>
                </div>

                {/* Report Statistics */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-sm p-5 text-white">
                <h3 className="text-lg font-semibold mb-4">Report Statistics</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">This Month</span>
                    <span className="text-lg font-bold">18 reports</span>
                    </div>
                    <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">This Year</span>
                    <span className="text-lg font-bold">156 reports</span>
                    </div>
                    <div className="flex items-center justify-between">
                    <span className="text-sm opacity-90">Total Size</span>
                    <span className="text-lg font-bold">24.5 GB</span>
                    </div>
                    <div className="pt-3 border-t border-white border-opacity-20">
                    <div className="flex items-center justify-between text-sm">
                        <span className="opacity-90">Most Generated</span>
                        <span className="font-medium">Executive Summary</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </DashboardLayout>
  );
}