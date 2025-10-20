'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { 
  Gift, Heart, Shield, Umbrella, GraduationCap, Car,
  Search, Filter, Download, Eye, Edit, Plus, X,
  TrendingUp, Users, DollarSign, CheckCircle, AlertCircle
} from 'lucide-react';

export default function BenefitsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const benefitsPlans = [
    { id: 'basic', name: 'Basic Plan', cost: 200, color: 'blue' },
    { id: 'standard', name: 'Standard Plan', cost: 350, color: 'green' },
    { id: 'premium', name: 'Premium Plan', cost: 500, color: 'purple' },
  ];

  const benefitTypes = [
    { id: 'health', name: 'Health Insurance', icon: Heart, color: 'red' },
    { id: 'dental', name: 'Dental Insurance', icon: Shield, color: 'blue' },
    { id: 'life', name: 'Life Insurance', icon: Umbrella, color: 'green' },
    { id: 'education', name: 'Education Support', icon: GraduationCap, color: 'purple' },
    { id: 'transport', name: 'Transportation', icon: Car, color: 'orange' },
  ];

  const employeeBenefits = [
    {
      id: 1,
      employeeId: 'EMP001',
      name: 'John Smith',
      department: 'Engineering',
      plan: 'premium',
      planName: 'Premium Plan',
      isShareholder: true,
      enrollmentDate: '2019-03-15',
      benefits: ['health', 'dental', 'life', 'education', 'transport'],
      monthlyCost: 500,
      annualCost: 6000,
      status: 'Active',
      dependents: 2
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: 'Sarah Johnson',
      department: 'Sales',
      plan: 'standard',
      planName: 'Standard Plan',
      isShareholder: false,
      enrollmentDate: '2020-06-20',
      benefits: ['health', 'dental', 'life'],
      monthlyCost: 350,
      annualCost: 4200,
      status: 'Active',
      dependents: 1
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: 'Michael Chen',
      department: 'Marketing',
      plan: 'standard',
      planName: 'Standard Plan',
      isShareholder: false,
      enrollmentDate: '2021-01-10',
      benefits: ['health', 'dental', 'life'],
      monthlyCost: 350,
      annualCost: 4200,
      status: 'Active',
      dependents: 0
    },
    {
      id: 4,
      employeeId: 'EMP004',
      name: 'Emily Davis',
      department: 'HR',
      plan: 'basic',
      planName: 'Basic Plan',
      isShareholder: false,
      enrollmentDate: '2021-09-05',
      benefits: ['health', 'dental'],
      monthlyCost: 200,
      annualCost: 2400,
      status: 'Pending Review',
      dependents: 0
    },
    {
      id: 5,
      employeeId: 'EMP005',
      name: 'David Wilson',
      department: 'Operations',
      plan: 'premium',
      planName: 'Premium Plan',
      isShareholder: true,
      enrollmentDate: '2018-11-12',
      benefits: ['health', 'dental', 'life', 'education', 'transport'],
      monthlyCost: 500,
      annualCost: 6000,
      status: 'Active',
      dependents: 3
    },
  ];

  const plans = ['All', 'Basic Plan', 'Standard Plan', 'Premium Plan'];
  const types = ['All', 'Active', 'Pending Review', 'Inactive'];

  const filteredBenefits = employeeBenefits.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'All' || emp.planName === filterPlan;
    const matchesType = filterType === 'All' || emp.status === filterType;
    return matchesSearch && matchesPlan && matchesType;
  });

  const totalCost = filteredBenefits.reduce((sum, emp) => sum + emp.annualCost, 0);
  const avgCost = filteredBenefits.length > 0 ? totalCost / filteredBenefits.length : 0;
  const shareholderAvg = filteredBenefits.filter(e => e.isShareholder).reduce((sum, e) => sum + e.annualCost, 0) / 
                        (filteredBenefits.filter(e => e.isShareholder).length || 1);
  const nonShareholderAvg = filteredBenefits.filter(e => !e.isShareholder).reduce((sum, e) => sum + e.annualCost, 0) / 
                           (filteredBenefits.filter(e => !e.isShareholder).length || 1);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const getPlanColor = (plan) => {
    switch(plan) {
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'standard': return 'bg-green-100 text-green-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBenefitIcon = (benefitId) => {
    const benefit = benefitTypes.find(b => b.id === benefitId);
    if (!benefit) return null;
    const Icon = benefit.icon;
    return <Icon className="w-4 h-4" />;
  };

  const openModal = (mode, employee = null) => {
    setModalMode(mode);
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  return (
    <DashboardLayout>
        <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Benefits Management</h1>
            <p className="text-gray-600">Manage employee benefits plans and coverage</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-indigo-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                {formatCurrency(totalCost)}
                </p>
                <p className="text-sm text-gray-600">Total Annual Cost</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Gift className="w-6 h-6 text-green-600" />
                </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                {formatCurrency(avgCost)}
                </p>
                <p className="text-sm text-gray-600">Average Per Employee</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                </div>
                </div>
                <p className="text-2xl font-bold text-purple-600 mb-1">
                {formatCurrency(shareholderAvg)}
                </p>
                <p className="text-sm text-gray-600">Avg (Shareholders)</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                </div>
                </div>
                <p className="text-2xl font-bold text-blue-600 mb-1">
                {formatCurrency(nonShareholderAvg)}
                </p>
                <p className="text-sm text-gray-600">Avg (Non-Shareholders)</p>
            </div>
            </div>

            {/* Benefits Plans Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {benefitsPlans.map(plan => {
                const employeeCount = employeeBenefits.filter(e => e.plan === plan.id).length;
                return (
                <div key={plan.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPlanColor(plan.id)}`}>
                        {employeeCount} enrolled
                    </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(plan.cost)}<span className="text-lg font-normal text-gray-600">/mo</span></p>
                    <p className="text-sm text-gray-600 mb-4">Per employee monthly cost</p>
                    <div className="space-y-2">
                    {benefitTypes.slice(0, plan.id === 'basic' ? 2 : plan.id === 'standard' ? 3 : 5).map(benefit => {
                        const Icon = benefit.icon;
                        return (
                        <div key={benefit.id} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>{benefit.name}</span>
                        </div>
                        );
                    })}
                    </div>
                </div>
                );
            })}
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
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>

                {/* Plan Filter */}
                <select
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                    {plans.map(plan => (
                    <option key={plan} value={plan}>{plan}</option>
                    ))}
                </select>

                {/* Status Filter */}
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                    {types.map(type => (
                    <option key={type} value={type}>{type}</option>
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

            {/* Benefits Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Benefits</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dependents</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monthly Cost</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Annual Cost</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {filteredBenefits.map(employee => (
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
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPlanColor(employee.plan)}`}>
                            {employee.planName}
                        </span>
                        </td>
                        <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                            {employee.benefits.slice(0, 4).map(benefitId => (
                            <div key={benefitId} className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                                {getBenefitIcon(benefitId)}
                            </div>
                            ))}
                            {employee.benefits.length > 4 && (
                            <span className="text-xs text-gray-500">+{employee.benefits.length - 4}</span>
                            )}
                        </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{employee.dependents}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(employee.monthlyCost)}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatCurrency(employee.annualCost)}</td>
                        <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(employee.status)}`}>
                            {employee.status}
                        </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                            <button 
                            onClick={() => openModal('view', employee)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="View Details"
                            >
                            <Eye className="w-4 h-4" />
                            </button>
                            <button 
                            onClick={() => openModal('edit', employee)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Edit Benefits"
                            >
                            <Edit className="w-4 h-4" />
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

            {filteredBenefits.length === 0 && (
                <div className="text-center py-12">
                <Gift className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No benefits records found</p>
                </div>
            )}
            </div>

            {/* Benefits Details Modal */}
            {showModal && selectedEmployee && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                    <h3 className="text-xl font-semibold text-gray-900">Benefits Details</h3>
                    <p className="text-sm text-gray-600 mt-1">{selectedEmployee.planName}</p>
                    </div>
                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    {/* Employee Info */}
                    <div className="flex items-center space-x-4 pb-6 border-b border-gray-200">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-semibold text-xl">
                        {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900">{selectedEmployee.name}</h4>
                        <p className="text-sm text-gray-600">{selectedEmployee.department}</p>
                        <p className="text-xs text-gray-500 mt-1">Employee ID: {selectedEmployee.employeeId}</p>
                    </div>
                    {selectedEmployee.isShareholder && (
                        <span className="ml-auto px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                        ★ Shareholder
                        </span>
                    )}
                    </div>

                    {/* Plan Details */}
                    <div className="py-6 border-b border-gray-200">
                    <h5 className="text-sm font-semibold text-gray-900 mb-4">Current Plan</h5>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPlanColor(selectedEmployee.plan)}`}>
                            {selectedEmployee.planName}
                        </span>
                        <span className="text-2xl font-bold text-gray-900">
                            {formatCurrency(selectedEmployee.monthlyCost)}<span className="text-sm font-normal text-gray-600">/month</span>
                        </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-600">Enrollment Date</p>
                            <p className="font-medium text-gray-900">{selectedEmployee.enrollmentDate}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Annual Cost</p>
                            <p className="font-medium text-gray-900">{formatCurrency(selectedEmployee.annualCost)}</p>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* Benefits Coverage */}
                    <div className="py-6 border-b border-gray-200">
                    <h5 className="text-sm font-semibold text-gray-900 mb-4">Coverage Details</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {benefitTypes.map(benefit => {
                        const Icon = benefit.icon;
                        const isIncluded = selectedEmployee.benefits.includes(benefit.id);
                        return (
                            <div 
                            key={benefit.id} 
                            className={`p-4 rounded-lg border ${isIncluded ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
                            >
                            <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isIncluded ? 'bg-green-100' : 'bg-gray-100'}`}>
                                <Icon className={`w-6 h-6 ${isIncluded ? 'text-green-600' : 'text-gray-400'}`} />
                                </div>
                                <div className="flex-1">
                                <p className={`text-sm font-medium ${isIncluded ? 'text-gray-900' : 'text-gray-500'}`}>
                                    {benefit.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {isIncluded ? 'Included' : 'Not Included'}
                                </p>
                                </div>
                                {isIncluded && <CheckCircle className="w-5 h-5 text-green-600" />}
                            </div>
                            </div>
                        );
                        })}
                    </div>
                    </div>

                    {/* Dependents */}
                    <div className="py-6">
                    <h5 className="text-sm font-semibold text-gray-900 mb-4">Additional Information</h5>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Dependents</p>
                        <p className="text-2xl font-bold text-gray-900">{selectedEmployee.dependents}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Status</p>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedEmployee.status)}`}>
                            {selectedEmployee.status}
                        </span>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Benefits Count</p>
                        <p className="text-2xl font-bold text-gray-900">{selectedEmployee.benefits.length}</p>
                        </div>
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
                    {modalMode === 'view' && (
                    <button 
                        onClick={() => setModalMode('edit')}
                        className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        <Edit className="w-4 h-4" />
                        <span>Edit Benefits</span>
                    </button>
                    )}
                    {modalMode === 'edit' && (
                    <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                        <CheckCircle className="w-4 h-4" />
                        <span>Save Changes</span>
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