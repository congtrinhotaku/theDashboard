'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { 
  Calendar, Search, Filter, Download, Eye, Plus,
  TrendingUp, Users, Clock, CheckCircle, XCircle,
  AlertCircle, X, ArrowRight
} from 'lucide-react';

export default function VacationManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedYear, setSelectedYear] = useState('2024');

  const vacationData = [
    {
      id: 1,
      employeeId: 'EMP001',
      name: 'John Smith',
      department: 'Engineering',
      position: 'Senior Developer',
      isShareholder: true,
      type: 'Full-time',
      totalAllowed: 20,
      taken: 12,
      pending: 3,
      remaining: 5,
      status: 'Warning',
      vacationHistory: [
        { id: 1, startDate: '2024-01-15', endDate: '2024-01-19', days: 5, type: 'Annual Leave', status: 'Approved' },
        { id: 2, startDate: '2024-03-10', endDate: '2024-03-12', days: 3, type: 'Personal', status: 'Approved' },
        { id: 3, startDate: '2024-06-20', endDate: '2024-06-23', days: 4, type: 'Annual Leave', status: 'Approved' },
        { id: 4, startDate: '2024-11-15', endDate: '2024-11-17', days: 3, type: 'Personal', status: 'Pending' },
      ]
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: 'Sarah Johnson',
      department: 'Sales',
      position: 'Sales Manager',
      isShareholder: false,
      type: 'Full-time',
      totalAllowed: 18,
      taken: 8,
      pending: 2,
      remaining: 8,
      status: 'Good',
      vacationHistory: [
        { id: 1, startDate: '2024-02-05', endDate: '2024-02-09', days: 5, type: 'Annual Leave', status: 'Approved' },
        { id: 2, startDate: '2024-05-15', endDate: '2024-05-17', days: 3, type: 'Sick Leave', status: 'Approved' },
        { id: 3, startDate: '2024-12-20', endDate: '2024-12-21', days: 2, type: 'Personal', status: 'Pending' },
      ]
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: 'Michael Chen',
      department: 'Marketing',
      position: 'Marketing Lead',
      isShareholder: false,
      type: 'Full-time',
      totalAllowed: 18,
      taken: 15,
      pending: 5,
      remaining: -2,
      status: 'Critical',
      vacationHistory: [
        { id: 1, startDate: '2024-01-08', endDate: '2024-01-12', days: 5, type: 'Annual Leave', status: 'Approved' },
        { id: 2, startDate: '2024-04-10', endDate: '2024-04-16', days: 7, type: 'Annual Leave', status: 'Approved' },
        { id: 3, startDate: '2024-07-22', endDate: '2024-07-24', days: 3, type: 'Personal', status: 'Approved' },
        { id: 4, startDate: '2024-11-25', endDate: '2024-11-29', days: 5, type: 'Annual Leave', status: 'Pending' },
      ]
    },
    {
      id: 4,
      employeeId: 'EMP004',
      name: 'Emily Davis',
      department: 'HR',
      position: 'HR Specialist',
      isShareholder: false,
      type: 'Part-time',
      totalAllowed: 12,
      taken: 4,
      pending: 0,
      remaining: 8,
      status: 'Good',
      vacationHistory: [
        { id: 1, startDate: '2024-03-18', endDate: '2024-03-19', days: 2, type: 'Personal', status: 'Approved' },
        { id: 2, startDate: '2024-08-05', endDate: '2024-08-06', days: 2, type: 'Sick Leave', status: 'Approved' },
      ]
    },
    {
      id: 5,
      employeeId: 'EMP005',
      name: 'David Wilson',
      department: 'Operations',
      position: 'Operations Manager',
      isShareholder: true,
      type: 'Full-time',
      totalAllowed: 20,
      taken: 18,
      pending: 4,
      remaining: -2,
      status: 'Critical',
      vacationHistory: [
        { id: 1, startDate: '2024-02-12', endDate: '2024-02-16', days: 5, type: 'Annual Leave', status: 'Approved' },
        { id: 2, startDate: '2024-04-22', endDate: '2024-04-26', days: 5, type: 'Annual Leave', status: 'Approved' },
        { id: 3, startDate: '2024-07-08', endDate: '2024-07-12', days: 5, type: 'Annual Leave', status: 'Approved' },
        { id: 4, startDate: '2024-09-16', endDate: '2024-09-18', days: 3, type: 'Personal', status: 'Approved' },
        { id: 5, startDate: '2024-12-23', endDate: '2024-12-26', days: 4, type: 'Annual Leave', status: 'Pending' },
      ]
    },
  ];

  const departments = ['All', 'Engineering', 'Sales', 'Marketing', 'Operations', 'HR', 'Finance'];
  const statuses = ['All', 'Good', 'Warning', 'Critical'];

  const filteredData = vacationData.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || emp.department === filterDept;
    const matchesStatus = filterStatus === 'All' || emp.status === filterStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const totalTaken = filteredData.reduce((sum, emp) => sum + emp.taken, 0);
  const totalPending = filteredData.reduce((sum, emp) => sum + emp.pending, 0);
  const totalRemaining = filteredData.reduce((sum, emp) => sum + emp.remaining, 0);
  const criticalCount = filteredData.filter(e => e.status === 'Critical').length;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Good': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRequestStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVacationTypeColor = (type) => {
    switch(type) {
      case 'Annual Leave': return 'bg-blue-100 text-blue-800';
      case 'Sick Leave': return 'bg-orange-100 text-orange-800';
      case 'Personal': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  const getProgressPercentage = (taken, total) => {
    return Math.min((taken / total) * 100, 100);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-600';
    if (percentage >= 70) return 'bg-yellow-600';
    return 'bg-green-600';
  };

  return (
    <DashboardLayout>
        <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Vacation Days Management</h1>
            <p className="text-gray-600">Track and manage employee vacation time and leave requests</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{totalTaken}</p>
                <p className="text-sm text-gray-600">Total Days Taken</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                </div>
                <p className="text-2xl font-bold text-yellow-600 mb-1">{totalPending}</p>
                <p className="text-sm text-gray-600">Pending Requests</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                </div>
                <p className="text-2xl font-bold text-green-600 mb-1">{totalRemaining}</p>
                <p className="text-sm text-gray-600">Total Remaining</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                </div>
                <p className="text-2xl font-bold text-red-600 mb-1">{criticalCount}</p>
                <p className="text-sm text-gray-600">Critical Status</p>
            </div>
            </div>

            {/* Filters and Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
                {/* Year Selector */}
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </select>

                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                    type="text"
                    placeholder="Search employees..."
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
                
                </div>
            </div>
            </div>

            {/* Vacation Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Allowed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taken</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pending</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remaining</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {filteredData.map(employee => {
                    const percentage = getProgressPercentage(employee.taken, employee.totalAllowed);
                    return (
                        <tr key={employee.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="text-indigo-600 font-semibold text-sm">
                                {employee.name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                                <p className="text-xs text-gray-500">
                                {employee.employeeId}
                                {employee.isShareholder && <span className="ml-2 text-purple-600">★</span>}
                                </p>
                            </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <p className="text-sm text-gray-900">{employee.department}</p>
                            <p className="text-xs text-gray-500">{employee.type}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{employee.totalAllowed} days</td>
                        <td className="px-6 py-4 text-sm font-medium text-blue-600">{employee.taken} days</td>
                        <td className="px-6 py-4 text-sm font-medium text-yellow-600">{employee.pending} days</td>
                        <td className="px-6 py-4">
                            <span className={`text-sm font-semibold ${employee.remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {employee.remaining} days
                            </span>
                        </td>
                        <td className="px-6 py-4">
                            <div className="w-32">
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                <span>{percentage.toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(percentage)}`}
                                style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(employee.status)}`}>
                            {employee.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button 
                            onClick={() => openModal(employee)}
                            className="inline-flex items-center px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                            >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                            </button>
                        </td>
                        </tr>
                    );
                    })}
                </tbody>
                </table>
            </div>

            {filteredData.length === 0 && (
                <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No vacation records found</p>
                </div>
            )}
            </div>

            {/* Vacation Details Modal */}
            {showModal && selectedEmployee && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                    <h3 className="text-xl font-semibold text-gray-900">Vacation History</h3>
                    <p className="text-sm text-gray-600 mt-1">Year: {selectedYear}</p>
                    </div>
                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    {/* Employee Info */}
                    <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-semibold text-xl">
                            {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                        </div>
                        <div>
                        <h4 className="text-lg font-semibold text-gray-900">{selectedEmployee.name}</h4>
                        <p className="text-sm text-gray-600">{selectedEmployee.position} • {selectedEmployee.department}</p>
                        <p className="text-xs text-gray-500 mt-1">Employee ID: {selectedEmployee.employeeId}</p>
                        </div>
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedEmployee.status)}`}>
                        {selectedEmployee.status}
                    </span>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-4 gap-4 py-6 border-b border-gray-200">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Total Allowed</p>
                        <p className="text-2xl font-bold text-gray-900">{selectedEmployee.totalAllowed}</p>
                        <p className="text-xs text-gray-500">days</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Taken</p>
                        <p className="text-2xl font-bold text-blue-600">{selectedEmployee.taken}</p>
                        <p className="text-xs text-gray-500">days</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">{selectedEmployee.pending}</p>
                        <p className="text-xs text-gray-500">days</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Remaining</p>
                        <p className={`text-2xl font-bold ${selectedEmployee.remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {selectedEmployee.remaining}
                        </p>
                        <p className="text-xs text-gray-500">days</p>
                    </div>
                    </div>

                    {/* Vacation History */}
                    <div className="py-6">
                    <h5 className="text-sm font-semibold text-gray-900 mb-4">Vacation Requests</h5>
                    <div className="space-y-3">
                        {selectedEmployee.vacationHistory.map(vacation => (
                        <div key={vacation.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                            <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getVacationTypeColor(vacation.type)}`}>
                                    {vacation.type}
                                </span>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRequestStatusColor(vacation.status)}`}>
                                    {vacation.status}
                                </span>
                                <span className="text-sm font-semibold text-gray-900">{vacation.days} days</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{vacation.startDate}</span>
                                <ArrowRight className="w-4 h-4 mx-2" />
                                <span>{vacation.endDate}</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                    <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                    Close
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    <Download className="w-4 h-4" />
                    <span>Download Report</span>
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