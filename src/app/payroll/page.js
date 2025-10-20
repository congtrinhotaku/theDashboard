'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { 
  DollarSign, Download, Filter, Search, Calendar, 
  TrendingUp, Users, Eye, CheckCircle, XCircle,
  Clock, FileText, ChevronRight, AlertCircle
} from 'lucide-react';

export default function PayrollManagement() {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-10');
  const [filterDept, setFilterDept] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  const payrollData = [
    { 
      id: 1, 
      employeeId: 'EMP001',
      name: 'John Smith', 
      department: 'Engineering', 
      position: 'Senior Developer',
      baseSalary: 95000,
      monthlyBase: 7916.67,
      overtime: 450,
      bonus: 1000,
      deductions: 1200,
      netPay: 8166.67,
      status: 'Paid',
      paidDate: '2024-10-01',
      isShareholder: true,
      hoursWorked: 168,
      overtimeHours: 10
    },
    { 
      id: 2, 
      employeeId: 'EMP002',
      name: 'Sarah Johnson', 
      department: 'Sales', 
      position: 'Sales Manager',
      baseSalary: 85000,
      monthlyBase: 7083.33,
      overtime: 0,
      bonus: 2500,
      deductions: 950,
      netPay: 8633.33,
      status: 'Paid',
      paidDate: '2024-10-01',
      isShareholder: false,
      hoursWorked: 160,
      overtimeHours: 0
    },
    { 
      id: 3, 
      employeeId: 'EMP003',
      name: 'Michael Chen', 
      department: 'Marketing', 
      position: 'Marketing Lead',
      baseSalary: 78000,
      monthlyBase: 6500,
      overtime: 300,
      bonus: 500,
      deductions: 850,
      netPay: 6450,
      status: 'Pending',
      paidDate: null,
      isShareholder: false,
      hoursWorked: 164,
      overtimeHours: 8
    },
    { 
      id: 4, 
      employeeId: 'EMP004',
      name: 'Emily Davis', 
      department: 'HR', 
      position: 'HR Specialist',
      baseSalary: 65000,
      monthlyBase: 5416.67,
      overtime: 0,
      bonus: 0,
      deductions: 700,
      netPay: 4716.67,
      status: 'Pending',
      paidDate: null,
      isShareholder: false,
      hoursWorked: 160,
      overtimeHours: 0
    },
    { 
      id: 5, 
      employeeId: 'EMP005',
      name: 'David Wilson', 
      department: 'Operations', 
      position: 'Operations Manager',
      baseSalary: 82000,
      monthlyBase: 6833.33,
      overtime: 600,
      bonus: 1200,
      deductions: 1100,
      netPay: 7533.33,
      status: 'Paid',
      paidDate: '2024-10-01',
      isShareholder: true,
      hoursWorked: 172,
      overtimeHours: 12
    },
  ];

  const departments = ['All', 'Engineering', 'Sales', 'Marketing', 'Operations', 'HR', 'Finance'];
  const statuses = ['All', 'Paid', 'Pending', 'Processing'];

  const filteredPayroll = payrollData.filter(pay => {
    const matchesSearch = pay.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pay.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || pay.department === filterDept;
    const matchesStatus = filterStatus === 'All' || pay.status === filterStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const totalPayroll = filteredPayroll.reduce((sum, pay) => sum + pay.netPay, 0);
  const paidCount = filteredPayroll.filter(p => p.status === 'Paid').length;
  const pendingCount = filteredPayroll.filter(p => p.status === 'Pending').length;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Paid': return <CheckCircle className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Processing': return <AlertCircle className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const openPayrollDetails = (payroll) => {
    setSelectedPayroll(payroll);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedPayroll(null);
  };

  const processPayroll = (id) => {
    alert(`Processing payroll for employee ID: ${id}`);
  };

  return (
    <DashboardLayout>
        <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payroll Management</h1>
            <p className="text-gray-600">Manage employee compensation and payroll processing</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-indigo-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                {formatCurrency(totalPayroll)}
                </p>
                <p className="text-sm text-gray-600">Total Payroll</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                </div>
                <p className="text-2xl font-bold text-green-600 mb-1">{paidCount}</p>
                <p className="text-sm text-gray-600">Paid Employees</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                </div>
                <p className="text-2xl font-bold text-yellow-600 mb-1">{pendingCount}</p>
                <p className="text-sm text-gray-600">Pending Payments</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{filteredPayroll.length}</p>
                <p className="text-sm text-gray-600">Total Employees</p>
            </div>
            </div>

            {/* Filters and Period Selector */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
                {/* Period Selector */}
                <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <input
                    type="month"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                    type="text"
                    placeholder="Search by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* Department Filter */}
                <select
                    value={filterDept}
                    onChange={(e) => setFilterDept(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                    {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>

                {/* Status Filter */}
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                    {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                    ))}
                </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    <FileText className="w-4 h-4" />
                    <span>Generate Report</span>
                </button>
                </div>
            </div>
            </div>

            {/* Payroll Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Base Salary</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Overtime</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bonus</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deductions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Pay</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {filteredPayroll.map(payroll => (
                    <tr key={payroll.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-semibold text-sm">
                                {payroll.name.split(' ').map(n => n[0]).join('')}
                            </span>
                            </div>
                            <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{payroll.name}</p>
                            <p className="text-xs text-gray-500">
                                {payroll.employeeId}
                                {payroll.isShareholder && <span className="ml-2 text-purple-600">★</span>}
                            </p>
                            </div>
                        </div>
                        </td>
                        <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{payroll.department}</p>
                        <p className="text-xs text-gray-500">{payroll.position}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(payroll.monthlyBase)}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                        {payroll.overtime > 0 ? formatCurrency(payroll.overtime) : '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                        {payroll.bonus > 0 ? formatCurrency(payroll.bonus) : '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-red-600">
                        {formatCurrency(payroll.deductions)}
                        </td>
                        <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-900">{formatCurrency(payroll.netPay)}</p>
                        </td>
                        <td className="px-6 py-4">
                        <div className="flex items-center">
                            <span className={`flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payroll.status)}`}>
                            {getStatusIcon(payroll.status)}
                            <span>{payroll.status}</span>
                            </span>
                        </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                            <button 
                            onClick={() => openPayrollDetails(payroll)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="View Details"
                            >
                            <Eye className="w-4 h-4" />
                            </button>
                            {payroll.status === 'Pending' && (
                            <button 
                                onClick={() => processPayroll(payroll.employeeId)}
                                className="px-3 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                                Process
                            </button>
                            )}
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

            {filteredPayroll.length === 0 && (
                <div className="text-center py-12">
                <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No payroll records found</p>
                </div>
            )}
            </div>

            {/* Payroll Details Modal */}
            {showDetails && selectedPayroll && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                    <h3 className="text-xl font-semibold text-gray-900">Payroll Details</h3>
                    <p className="text-sm text-gray-600 mt-1">Period: {selectedPeriod}</p>
                    </div>
                    <button onClick={closeDetails} className="text-gray-400 hover:text-gray-600">
                    <XCircle className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    {/* Employee Info */}
                    <div className="flex items-center space-x-4 pb-6 border-b border-gray-200">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-semibold text-xl">
                        {selectedPayroll.name.split(' ').map(n => n[0]).join('')}
                        </span>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900">{selectedPayroll.name}</h4>
                        <p className="text-sm text-gray-600">{selectedPayroll.position} • {selectedPayroll.department}</p>
                        <p className="text-xs text-gray-500 mt-1">Employee ID: {selectedPayroll.employeeId}</p>
                    </div>
                    </div>

                    {/* Earnings Breakdown */}
                    <div className="py-6 border-b border-gray-200">
                    <h5 className="text-sm font-semibold text-gray-900 mb-4">Earnings</h5>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Base Salary (Monthly)</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedPayroll.monthlyBase)}</span>
                        </div>
                        <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Overtime ({selectedPayroll.overtimeHours}hrs)</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedPayroll.overtime)}</span>
                        </div>
                        <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Bonus</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedPayroll.bonus)}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-gray-200">
                        <span className="text-sm font-semibold text-gray-900">Gross Pay</span>
                        <span className="text-sm font-semibold text-gray-900">
                            {formatCurrency(selectedPayroll.monthlyBase + selectedPayroll.overtime + selectedPayroll.bonus)}
                        </span>
                        </div>
                    </div>
                    </div>

                    {/* Deductions */}
                    <div className="py-6 border-b border-gray-200">
                    <h5 className="text-sm font-semibold text-gray-900 mb-4">Deductions</h5>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tax Withholding</span>
                        <span className="text-sm font-medium text-red-600">{formatCurrency(selectedPayroll.deductions * 0.6)}</span>
                        </div>
                        <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Social Security</span>
                        <span className="text-sm font-medium text-red-600">{formatCurrency(selectedPayroll.deductions * 0.25)}</span>
                        </div>
                        <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Insurance</span>
                        <span className="text-sm font-medium text-red-600">{formatCurrency(selectedPayroll.deductions * 0.15)}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-gray-200">
                        <span className="text-sm font-semibold text-gray-900">Total Deductions</span>
                        <span className="text-sm font-semibold text-red-600">{formatCurrency(selectedPayroll.deductions)}</span>
                        </div>
                    </div>
                    </div>

                    {/* Net Pay */}
                    <div className="py-6">
                    <div className="bg-indigo-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                        <span className="text-base font-semibold text-gray-900">Net Pay</span>
                        <span className="text-2xl font-bold text-indigo-600">{formatCurrency(selectedPayroll.netPay)}</span>
                        </div>
                    </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Hours Worked</p>
                        <p className="text-sm font-medium text-gray-900">{selectedPayroll.hoursWorked} hours</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Status</p>
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedPayroll.status)}`}>
                        {getStatusIcon(selectedPayroll.status)}
                        <span>{selectedPayroll.status}</span>
                        </span>
                    </div>
                    {selectedPayroll.paidDate && (
                        <div>
                        <p className="text-sm text-gray-600 mb-1">Payment Date</p>
                        <p className="text-sm font-medium text-gray-900">{selectedPayroll.paidDate}</p>
                        </div>
                    )}
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Shareholder</p>
                        <p className="text-sm font-medium text-gray-900">
                        {selectedPayroll.isShareholder ? 'Yes ★' : 'No'}
                        </p>
                    </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                    <button
                    onClick={closeDetails}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                    Close
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    <Download className="w-4 h-4" />
                    <span>Download Payslip</span>
                    </button>
                </div>
                </div>
            </div>
            )}
        </div>
        </div>
    </DashboardLayout>
  );
}