'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Users, DollarSign, Calendar,
  Gift, PieChart, BarChart3, LineChart, Target,
  ArrowUp, ArrowDown, Filter, Download, RefreshCw
} from 'lucide-react';

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('thisYear');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Summary Metrics
  const summaryMetrics = [
    {
      label: 'Total Workforce',
      value: '342',
      change: '+7.5%',
      trend: 'up',
      previous: '318',
      icon: Users,
      color: 'blue'
    },
    {
      label: 'Total Payroll (YTD)',
      value: '$42.5M',
      change: '+10.4%',
      trend: 'up',
      previous: '$38.5M',
      icon: DollarSign,
      color: 'green'
    },
    {
      label: 'Avg Salary',
      value: '$82,450',
      change: '+3.2%',
      trend: 'up',
      previous: '$79,900',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      label: 'Benefits Cost',
      value: '$2.85M',
      change: '+5.8%',
      trend: 'up',
      previous: '$2.69M',
      icon: Gift,
      color: 'orange'
    }
  ];

  // Department Performance
  const departmentData = [
    { dept: 'Engineering', employees: 125, payroll: 11875000, avgSalary: 95000, growth: 12.5, efficiency: 94 },
    { dept: 'Sales', employees: 89, payroll: 7565000, avgSalary: 85000, growth: 8.3, efficiency: 88 },
    { dept: 'Marketing', employees: 54, payroll: 4212000, avgSalary: 78000, growth: 15.2, efficiency: 91 },
    { dept: 'Operations', employees: 42, payroll: 3444000, avgSalary: 82000, growth: 5.8, efficiency: 86 },
    { dept: 'HR', employees: 22, payroll: 1430000, avgSalary: 65000, growth: 10.0, efficiency: 89 },
    { dept: 'Finance', employees: 10, payroll: 800000, avgSalary: 80000, growth: 0.0, efficiency: 92 }
  ];

  // Gender Distribution
  const genderData = [
    { category: 'Male', count: 198, percentage: 57.9, avgSalary: 84200 },
    { category: 'Female', count: 144, percentage: 42.1, avgSalary: 80100 }
  ];

  // Employment Type
  const employmentData = [
    { type: 'Full-time', count: 312, percentage: 91.2, avgSalary: 83500 },
    { type: 'Part-time', count: 30, percentage: 8.8, avgSalary: 52000 }
  ];

  // Shareholder vs Non-Shareholder
  const shareholderData = [
    { category: 'Shareholders', count: 45, percentage: 13.2, avgSalary: 98500, avgBenefits: 8500 },
    { category: 'Non-Shareholders', count: 297, percentage: 86.8, avgSalary: 79800, avgBenefits: 6200 }
  ];

  // Vacation Trends
  const vacationTrends = [
    { month: 'Jan', taken: 245, avg: 5.2 },
    { month: 'Feb', taken: 198, avg: 4.1 },
    { month: 'Mar', taken: 312, avg: 6.5 },
    { month: 'Apr', taken: 278, avg: 5.8 },
    { month: 'May', taken: 356, avg: 7.4 },
    { month: 'Jun', taken: 423, avg: 8.8 },
    { month: 'Jul', taken: 487, avg: 10.1 },
    { month: 'Aug', taken: 445, avg: 9.2 },
    { month: 'Sep', taken: 312, avg: 6.5 },
    { month: 'Oct', taken: 289, avg: 6.0 }
  ];

  // Turnover Data
  const turnoverData = {
    rate: 8.2,
    hires: 28,
    departures: 21,
    netGrowth: 7
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const getIconColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  return (
    <DashboardLayout>
        <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Insights</h1>
                <p className="text-gray-600">Deep dive into HR and Payroll metrics with visual analytics</p>
            </div>
            <div className="flex gap-2">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                <Download className="w-4 h-4" />
                <span>Export</span>
                </button>
            </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
                <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                <option value="thisMonth">This Month</option>
                <option value="thisQuarter">This Quarter</option>
                <option value="thisYear">This Year (YTD)</option>
                <option value="lastYear">Last Year</option>
                </select>

                <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                <option value="all">All Metrics</option>
                <option value="payroll">Payroll</option>
                <option value="benefits">Benefits</option>
                <option value="vacation">Vacation</option>
                <option value="headcount">Headcount</option>
                </select>
            </div>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {summaryMetrics.map((metric, index) => {
                const Icon = metric.icon;
                const TrendIcon = metric.trend === 'up' ? ArrowUp : ArrowDown;
                return (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconColor(metric.color)}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${metric.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <TrendIcon className="w-3 h-3" />
                        <span>{metric.change}</span>
                    </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                    <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
                    <p className="text-xs text-gray-500">Previous: {metric.previous}</p>
                </div>
                );
            })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Department Performance */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Department Performance</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                {departmentData.map((dept, index) => {
                    const maxPayroll = Math.max(...departmentData.map(d => d.payroll));
                    const payrollPercentage = (dept.payroll / maxPayroll) * 100;
                    
                    return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                        <div className="flex items-center justify-between mb-3">
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900">{dept.dept}</h4>
                            <p className="text-xs text-gray-600">{dept.employees} employees</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-900">{formatCurrency(dept.payroll)}</p>
                            <p className="text-xs text-gray-600">Avg: {formatCurrency(dept.avgSalary)}</p>
                        </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div 
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${payrollPercentage}%` }}
                        ></div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-4">
                            <span className="flex items-center text-green-600">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {dept.growth}% growth
                            </span>
                            <span className="text-gray-600">
                            Efficiency: {dept.efficiency}%
                            </span>
                        </div>
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>

            {/* Turnover & Growth */}
            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Turnover & Growth</h3>
                <div className="space-y-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-gray-900">{turnoverData.rate}%</p>
                    <p className="text-sm text-gray-600">Turnover Rate</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                        <p className="text-2xl font-bold text-green-600">{turnoverData.hires}</p>
                        <p className="text-xs text-gray-600">New Hires</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg text-center">
                        <p className="text-2xl font-bold text-red-600">{turnoverData.departures}</p>
                        <p className="text-xs text-gray-600">Departures</p>
                    </div>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-indigo-600">+{turnoverData.netGrowth}</p>
                    <p className="text-xs text-gray-600">Net Growth</p>
                    </div>
                </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
                <div className="space-y-3">
                    <div className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg">
                    <Target className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">High Growth</p>
                        <p className="text-xs text-gray-600">Marketing dept growing 15.2%</p>
                    </div>
                    </div>
                    <div className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-lg">
                    <Target className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">Attention Needed</p>
                        <p className="text-xs text-gray-600">15 employees  20 vacation days</p>
                    </div>
                    </div>
                    <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">Positive Trend</p>
                        <p className="text-xs text-gray-600">Benefits satisfaction up 12%</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* Demographics Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Gender Distribution */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Gender Distribution</h3>
                <PieChart className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                {genderData.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{item.category}</span>
                        <span className="text-sm font-bold text-gray-900">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                        className={`h-2 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-pink-600'}`}
                        style={{ width: `${item.percentage}%` }}
                        ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{item.count} employees</span>
                        <span>Avg: {formatCurrency(item.avgSalary)}</span>
                    </div>
                    </div>
                ))}
                </div>
            </div>

            {/* Employment Type */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Employment Type</h3>
                <Users className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                {employmentData.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{item.type}</span>
                        <span className="text-sm font-bold text-gray-900">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                        className={`h-2 rounded-full ${index === 0 ? 'bg-green-600' : 'bg-orange-600'}`}
                        style={{ width: `${item.percentage}%` }}
                        ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{item.count} employees</span>
                        <span>Avg: {formatCurrency(item.avgSalary)}</span>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </div>

            {/* Shareholder Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Shareholder vs Non-Shareholder</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                {shareholderData.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                        <h4 className="text-sm font-semibold text-gray-900">{item.category}</h4>
                        <p className="text-xs text-gray-600">{item.count} employees ({item.percentage}%)</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Avg Salary</p>
                        <p className="text-sm font-bold text-gray-900">{formatCurrency(item.avgSalary)}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Avg Benefits</p>
                        <p className="text-sm font-bold text-gray-900">{formatCurrency(item.avgBenefits)}</p>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>

            {/* Vacation Trends */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Vacation Trends (2024)</h3>
                <LineChart className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-2">
                {vacationTrends.map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition">
                    <div className="flex items-center space-x-3 flex-1">
                        <span className="text-xs font-medium text-gray-600 w-8">{month.month}</span>
                        <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(month.taken / 500) * 100}%` }}
                            ></div>
                        </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 ml-3">
                        <span className="text-xs font-medium text-gray-900 w-12 text-right">{month.taken}</span>
                        <span className="text-xs text-gray-600 w-16 text-right">Avg: {month.avg}</span>
                    </div>
                    </div>
                ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total YTD</span>
                    <span className="font-bold text-gray-900">3,345 days</span>
                </div>
                </div>
            </div>
            </div>

        </div>
        </div>
    </DashboardLayout>
  );
}