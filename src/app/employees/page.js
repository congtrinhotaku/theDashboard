'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';
import { 
  Plus, Search, Filter, Download, Edit, Trash2, Eye, 
  X, Mail, Phone, MapPin, Briefcase, Calendar, DollarSign,
  UserCheck, Users
} from 'lucide-react';

export default function EmployeesCRUD() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@acme.com', phone: '+1 234-567-8901', department: 'Engineering', position: 'Senior Developer', status: 'Active', salary: 95000, hireDate: '2019-03-15', type: 'Full-time', isShareholder: true },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@acme.com', phone: '+1 234-567-8902', department: 'Sales', position: 'Sales Manager', status: 'Active', salary: 85000, hireDate: '2020-06-20', type: 'Full-time', isShareholder: false },
    { id: 3, name: 'Michael Chen', email: 'michael.c@acme.com', phone: '+1 234-567-8903', department: 'Marketing', position: 'Marketing Lead', status: 'Active', salary: 78000, hireDate: '2021-01-10', type: 'Full-time', isShareholder: false },
    { id: 4, name: 'Emily Davis', email: 'emily.d@acme.com', phone: '+1 234-567-8904', department: 'HR', position: 'HR Specialist', status: 'Active', salary: 65000, hireDate: '2021-09-05', type: 'Part-time', isShareholder: false },
    { id: 5, name: 'David Wilson', email: 'david.w@acme.com', phone: '+1 234-567-8905', department: 'Operations', position: 'Operations Manager', status: 'On Leave', salary: 82000, hireDate: '2018-11-12', type: 'Full-time', isShareholder: true },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', department: '', position: '', 
    status: 'Active', salary: '', hireDate: '', type: 'Full-time', isShareholder: false
  });

  const departments = ['All', 'Engineering', 'Sales', 'Marketing', 'Operations', 'HR', 'Finance'];
  const statuses = ['All', 'Active', 'On Leave', 'Inactive'];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || emp.department === filterDept;
    const matchesStatus = filterStatus === 'All' || emp.status === filterStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const openModal = (mode, employee = null) => {
    setModalMode(mode);
    setSelectedEmployee(employee);
    if (mode === 'add') {
      setFormData({
        name: '', email: '', phone: '', department: 'Engineering', position: '', 
        status: 'Active', salary: '', hireDate: '', type: 'Full-time', isShareholder: false
      });
    } else if (employee) {
      setFormData({ ...employee });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newEmployee = {
        ...formData,
        id: employees.length + 1,
      };
      setEmployees([...employees, newEmployee]);
    } else if (modalMode === 'edit') {
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee.id ? { ...formData, id: selectedEmployee.id } : emp
      ));
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
        <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Management</h1>
            <p className="text-gray-600">Manage your workforce and employee information</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">Total Employees</p>
                    <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
                </div>
                <Users className="w-8 h-8 text-indigo-600" />
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">Active</p>
                    <p className="text-2xl font-bold text-green-600">
                    {employees.filter(e => e.status === 'Active').length}
                    </p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">Shareholders</p>
                    <p className="text-2xl font-bold text-purple-600">
                    {employees.filter(e => e.isShareholder).length}
                    </p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">Departments</p>
                    <p className="text-2xl font-bold text-blue-600">6</p>
                </div>
                <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
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
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
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
                <button 
                    onClick={() => openModal('add')}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Employee</span>
                </button>
                </div>
            </div>
            </div>

            {/* Employees Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {filteredEmployees.map(employee => (
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
                            <p className="text-sm text-gray-500">{employee.email}</p>
                            </div>
                        </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{employee.department}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{employee.position}</td>
                        <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{employee.type}</span>
                        {employee.isShareholder && (
                            <span className="ml-2 text-xs text-purple-600">★ SH</span>
                        )}
                        </td>
                        <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(employee.status)}`}>
                            {employee.status}
                        </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                        ${employee.salary.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                            <button 
                            onClick={() => openModal('view', employee)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="View"
                            >
                            <Eye className="w-4 h-4" />
                            </button>
                            <button 
                            onClick={() => openModal('edit', employee)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Edit"
                            >
                            <Edit className="w-4 h-4" />
                            </button>
                            <button 
                            onClick={() => handleDelete(employee.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                            >
                            <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

            {filteredEmployees.length === 0 && (
                <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No employees found</p>
                </div>
            )}
            </div>

            {/* Modal */}
            {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">
                    {modalMode === 'add' ? 'Add New Employee' : 
                    modalMode === 'edit' ? 'Edit Employee' : 'Employee Details'}
                    </h3>
                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    {modalMode === 'view' ? (
                    // View Mode
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 pb-4 border-b">
                        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-semibold text-xl">
                            {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                            </span>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-900">{selectedEmployee.name}</h4>
                            <p className="text-gray-600">{selectedEmployee.position}</p>
                        </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Email</p>
                            <p className="text-sm font-medium text-gray-900 flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            {selectedEmployee.email}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Phone</p>
                            <p className="text-sm font-medium text-gray-900 flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            {selectedEmployee.phone}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Department</p>
                            <p className="text-sm font-medium text-gray-900 flex items-center">
                            <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                            {selectedEmployee.department}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Hire Date</p>
                            <p className="text-sm font-medium text-gray-900 flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {selectedEmployee.hireDate}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Employment Type</p>
                            <p className="text-sm font-medium text-gray-900">{selectedEmployee.type}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Status</p>
                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedEmployee.status)}`}>
                            {selectedEmployee.status}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Salary</p>
                            <p className="text-sm font-medium text-gray-900 flex items-center">
                            <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                            ${selectedEmployee.salary.toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Shareholder</p>
                            <p className="text-sm font-medium text-gray-900">
                            {selectedEmployee.isShareholder ? 'Yes' : 'No'}
                            </p>
                        </div>
                        </div>
                    </div>
                    ) : (
                    // Add/Edit Form
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                            <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                            <select
                            value={formData.department}
                            onChange={(e) => setFormData({...formData, department: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                            {departments.filter(d => d !== 'All').map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                            <input
                            type="text"
                            value={formData.position}
                            onChange={(e) => setFormData({...formData, position: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date *</label>
                            <input
                            type="date"
                            value={formData.hireDate}
                            onChange={(e) => setFormData({...formData, hireDate: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type *</label>
                            <select
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                            <select
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                            <option value="Active">Active</option>
                            <option value="On Leave">On Leave</option>
                            <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Salary ($) *</label>
                            <input
                            type="number"
                            value={formData.salary}
                            onChange={(e) => setFormData({...formData, salary: parseInt(e.target.value) || 0})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isShareholder}
                                onChange={(e) => setFormData({...formData, isShareholder: e.target.checked})}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Shareholder</span>
                            </label>
                        </div>
                        </div>
                    </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                    <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                    {modalMode === 'view' ? 'Close' : 'Cancel'}
                    </button>
                    {modalMode !== 'view' && (
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        {modalMode === 'add' ? 'Add Employee' : 'Save Changes'}
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