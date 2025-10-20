'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { 
  Bell, Calendar, Gift, Cake, DollarSign, AlertTriangle,
  Users, TrendingUp, Clock, CheckCircle, X, Eye,
  Filter, Search, Download, Settings, Plus
} from 'lucide-react';

export default function AlertsEventsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const alerts = [
    {
      id: 1,
      type: 'anniversary',
      priority: 'high',
      title: '5-Year Work Anniversary',
      employee: 'John Smith',
      employeeId: 'EMP001',
      department: 'Engineering',
      message: 'John Smith is approaching 5-year work anniversary',
      date: '2024-10-25',
      daysUntil: 5,
      actionRequired: true,
      status: 'Active',
      details: {
        hireDate: '2019-10-25',
        yearsCompleted: 5,
        currentPosition: 'Senior Developer'
      }
    },
    {
      id: 2,
      type: 'anniversary',
      priority: 'medium',
      title: '3-Year Work Anniversary',
      employee: 'Sarah Johnson',
      employeeId: 'EMP002',
      department: 'Sales',
      message: 'Sarah Johnson is approaching 3-year work anniversary',
      date: '2024-11-05',
      daysUntil: 16,
      actionRequired: false,
      status: 'Active',
      details: {
        hireDate: '2021-11-05',
        yearsCompleted: 3,
        currentPosition: 'Sales Manager'
      }
    },
    {
      id: 3,
      type: 'vacation',
      priority: 'high',
      title: 'Excessive Vacation Days',
      employee: 'Michael Chen',
      employeeId: 'EMP003',
      department: 'Marketing',
      message: 'Michael Chen has accumulated 25 vacation days (limit: 20)',
      date: '2024-10-20',
      daysUntil: 0,
      actionRequired: true,
      status: 'Critical',
      details: {
        vacationDays: 25,
        limit: 20,
        lastTaken: '2024-07-15',
        carryoverDays: 5
      }
    },
    {
      id: 4,
      type: 'vacation',
      priority: 'medium',
      title: 'High Vacation Balance',
      employee: 'David Wilson',
      employeeId: 'EMP005',
      department: 'Operations',
      message: 'David Wilson has 22 unused vacation days',
      date: '2024-10-20',
      daysUntil: 0,
      actionRequired: false,
      status: 'Warning',
      details: {
        vacationDays: 22,
        limit: 20,
        lastTaken: '2024-09-10',
        carryoverDays: 2
      }
    },
    {
      id: 5,
      type: 'benefits',
      priority: 'high',
      title: 'Benefits Plan Change',
      employee: 'Sarah Johnson',
      employeeId: 'EMP002',
      department: 'Sales',
      message: 'Sarah Johnson changed from Standard to Premium plan affecting payroll',
      date: '2024-10-18',
      daysUntil: -2,
      actionRequired: true,
      status: 'Active',
      details: {
        oldPlan: 'Standard Plan',
        newPlan: 'Premium Plan',
        costDifference: 150,
        effectiveDate: '2024-11-01'
      }
    },
    {
      id: 6,
      type: 'birthday',
      priority: 'low',
      title: 'Birthday This Month',
      employee: 'Emily Davis',
      employeeId: 'EMP004',
      department: 'HR',
      message: 'Emily Davis has birthday on October 28',
      date: '2024-10-28',
      daysUntil: 8,
      actionRequired: false,
      status: 'Active',
      details: {
        birthDate: '1992-10-28',
        age: 32,
        department: 'HR'
      }
    },
    {
      id: 7,
      type: 'birthday',
      priority: 'low',
      title: 'Birthday This Month',
      employee: 'John Smith',
      employeeId: 'EMP001',
      department: 'Engineering',
      message: 'John Smith has birthday on October 12',
      date: '2024-10-12',
      daysUntil: -8,
      actionRequired: false,
      status: 'Acknowledged',
      details: {
        birthDate: '1985-10-12',
        age: 39,
        department: 'Engineering'
      }
    },
    {
      id: 8,
      type: 'birthday',
      priority: 'low',
      title: 'Birthday This Month',
      employee: 'Sarah Johnson',
      employeeId: 'EMP002',
      department: 'Sales',
      message: 'Sarah Johnson has birthday on October 25',
      date: '2024-10-25',
      daysUntil: 5,
      actionRequired: false,
      status: 'Active',
      details: {
        birthDate: '1988-10-25',
        age: 36,
        department: 'Sales'
      }
    }
  ];

  const alertTypes = ['All', 'Anniversary', 'Vacation', 'Benefits', 'Birthday'];
  const priorities = ['All', 'High', 'Medium', 'Low'];

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || alert.type === filterType.toLowerCase();
    const matchesPriority = filterPriority === 'All' || alert.priority === filterPriority.toLowerCase();
    return matchesSearch && matchesType && matchesPriority;
  });

  const getAlertIcon = (type) => {
    switch(type) {
      case 'anniversary': return Calendar;
      case 'vacation': return Gift;
      case 'benefits': return DollarSign;
      case 'birthday': return Cake;
      default: return Bell;
    }
  };

  const getAlertColor = (type) => {
    switch(type) {
      case 'anniversary': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'vacation': return 'bg-green-100 text-green-800 border-green-200';
      case 'benefits': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'birthday': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Acknowledged': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilText = (days) => {
    if (days < 0) return `${Math.abs(days)} days ago`;
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `In ${days} days`;
  };

  const openModal = (alert) => {
    setSelectedAlert(alert);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAlert(null);
  };

  const acknowledgeAlert = (id) => {
    alert(`Alert ${id} acknowledged`);
  };

  const dismissAlert = (id) => {
    alert(`Alert ${id} dismissed`);
  };

  // Statistics
  const highPriorityCount = filteredAlerts.filter(a => a.priority === 'high').length;
  const actionRequiredCount = filteredAlerts.filter(a => a.actionRequired).length;
  const upcomingCount = filteredAlerts.filter(a => a.daysUntil > 0 && a.daysUntil <= 7).length;
  const anniversaryCount = filteredAlerts.filter(a => a.type === 'anniversary').length;

  return (
    <DashboardLayout>
        <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Alerts & Events</h1>
            <p className="text-gray-600">Manage by exception with automated alerts and notifications</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-xs font-medium text-red-600">High Priority</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{highPriorityCount}</p>
                <p className="text-sm text-gray-600">Urgent Alerts</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs font-medium text-orange-600">Action Needed</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{actionRequiredCount}</p>
                <p className="text-sm text-gray-600">Require Action</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs font-medium text-blue-600">This Week</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{upcomingCount}</p>
                <p className="text-sm text-gray-600">Upcoming Events</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs font-medium text-purple-600">Anniversaries</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{anniversaryCount}</p>
                <p className="text-sm text-gray-600">Work Anniversaries</p>
            </div>
            </div>

            {/* Filters and Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                    type="text"
                    placeholder="Search alerts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* Type Filter */}
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                    {alertTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                {/* Priority Filter */}
                <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                    {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                    ))}
                </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                </button>
                </div>
            </div>
            </div>

            {/* Alerts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAlerts.map(alertItem => {
                const Icon = getAlertIcon(alertItem.type);
                return (
                <div 
                    key={alertItem.id} 
                    className={`bg-white rounded-lg border-2 ${getAlertColor(alertItem.type).split(' ').slice(2).join(' ')} p-5 hover:shadow-md transition cursor-pointer`}
                    onClick={() => openModal(alertItem)}
                >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getAlertColor(alertItem.type).split(' ').slice(0, 2).join(' ')}`}>
                        <Icon className="w-5 h-5" />
                        </div>
                        <div>
                        <h3 className="text-sm font-semibold text-gray-900">{alertItem.title}</h3>
                        <p className="text-xs text-gray-600">{alertItem.employee}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(alertItem.priority)}`}>
                        {alertItem.priority}
                        </span>
                    </div>
                    </div>

                    {/* Message */}
                    <p className="text-sm text-gray-700 mb-4">{alertItem.message}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                        <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {getDaysUntilText(alertItem.daysUntil)}
                        </span>
                        <span className={`px-2 py-1 rounded-full font-medium ${getStatusColor(alertItem.status)}`}>
                        {alertItem.status}
                        </span>
                    </div>
                    {alertItem.actionRequired && (
                        <span className="flex items-center text-xs font-medium text-orange-600">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Action Required
                        </span>
                    )}
                    </div>
                </div>
                );
            })}
            </div>

            {filteredAlerts.length === 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No alerts found</p>
            </div>
            )}

            {/* Alert Details Modal */}
            {showModal && selectedAlert && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className={`p-6 border-b border-gray-200 ${getAlertColor(selectedAlert.type)}`}>
                    <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {(() => {
                        const Icon = getAlertIcon(selectedAlert.type);
                        return <Icon className="w-6 h-6" />;
                        })()}
                        <div>
                        <h3 className="text-xl font-semibold text-gray-900">{selectedAlert.title}</h3>
                        <p className="text-sm text-gray-700 mt-1">{selectedAlert.employee} • {selectedAlert.department}</p>
                        </div>
                    </div>
                    <button onClick={closeModal} className="text-gray-600 hover:text-gray-900">
                        <X className="w-6 h-6" />
                    </button>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    {/* Alert Info */}
                    <div className="flex items-center space-x-3 mb-6">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(selectedAlert.priority)}`}>
                        {selectedAlert.priority} Priority
                    </span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedAlert.status)}`}>
                        {selectedAlert.status}
                    </span>
                    {selectedAlert.actionRequired && (
                        <span className="flex items-center px-3 py-1 text-sm font-medium rounded-full bg-orange-100 text-orange-800">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Action Required
                        </span>
                    )}
                    </div>

                    {/* Message */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700">{selectedAlert.message}</p>
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900">Details</h4>
                    
                    {selectedAlert.type === 'anniversary' && (
                        <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-600 mb-1">Hire Date</p>
                            <p className="text-sm font-medium text-gray-900">{selectedAlert.details.hireDate}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-600 mb-1">Years Completed</p>
                            <p className="text-sm font-medium text-gray-900">{selectedAlert.details.yearsCompleted} years</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                            <p className="text-xs text-gray-600 mb-1">Current Position</p>
                            <p className="text-sm font-medium text-gray-900">{selectedAlert.details.currentPosition}</p>
                        </div>
                        </div>
                    )}

                    {selectedAlert.type === 'vacation' && (
                        <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-600 mb-1">Accumulated Days</p>
                            <p className="text-sm font-medium text-red-600">{selectedAlert.details.vacationDays} days</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-600 mb-1">Limit</p>
                            <p className="text-sm font-medium text-gray-900">{selectedAlert.details.limit} days</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-600 mb-1">Last Taken</p>
                            <p className="text-sm font-medium text-gray-900">{selectedAlert.details.lastTaken}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-600 mb-1">Carryover Days</p>
                            <p className="text-sm font-medium text-gray-900">{selectedAlert.details.carryoverDays} days</p>
                        </div>
                        </div>
                    )}

                    {selectedAlert.type === 'benefits' && (
                        <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-600 mb-1">Previous Plan</p>
                            <p className="text-sm font-medium text-gray-900">{selectedAlert.details.oldPlan}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-600 mb-1">New Plan</p>
                            <p className="text-sm font-medium text-green-600">{selectedAlert.details.newPlan}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-600 mb-1">Cost Difference</p>
                            <p className="text-sm font-medium text-gray-900">+${selectedAlert.details.costDifference}/month</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-600 mb-1">Effective Date</p>
                            <p className="text-sm font-medium text-gray-900">{selectedAlert.details.effectiveDate}</p>
                        </div>
                        </div>
                    )}

                    {selectedAlert.type === 'birthday' && (
                        <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-600 mb-1">Birth Date</p>
                            <p className="text-sm font-medium text-gray-900">{selectedAlert.details.birthDate}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-600 mb-1">Age</p>
                            <p className="text-sm font-medium text-gray-900">{selectedAlert.details.age} years old</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                            <p className="text-xs text-gray-600 mb-1">Department</p>
                            <p className="text-sm font-medium text-gray-900">{selectedAlert.details.department}</p>
                        </div>
                        </div>
                    )}
                    </div>

                    {/* Timeline */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                        <div>
                        <p className="text-gray-600">Event Date</p>
                        <p className="font-medium text-gray-900">{selectedAlert.date}</p>
                        </div>
                        <div className="text-right">
                        <p className="text-gray-600">Time Until Event</p>
                        <p className="font-medium text-gray-900">{getDaysUntilText(selectedAlert.daysUntil)}</p>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
                    <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition"
                    >
                    Close
                    </button>
                    <button
                    onClick={() => dismissAlert(selectedAlert.id)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition"
                    >
                    Dismiss
                    </button>
                    {selectedAlert.actionRequired && (
                    <button
                        onClick={() => acknowledgeAlert(selectedAlert.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        <CheckCircle className="w-4 h-4" />
                        <span>Take Action</span>
                    </button>
                    )}
                </div>
                </div>
            </div>
            )}
        </div>
        </div>
    </DashboardLayout>
  );
}