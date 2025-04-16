import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Download, FileText, Calendar, TrendingUp } from 'lucide-react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const Salary = () => {
  const currentSalary = {
    basic: 75000,
    allowances: 15000,
    deductions: 8000,
    bonus: 5000,
    total: 87000
  };

  const salaryHistory = [
    { month: 'March 2024', amount: 87000, status: 'Pending' },
    { month: 'February 2024', amount: 85000, status: 'Paid' },
    { month: 'January 2024', amount: 85000, status: 'Paid' }
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Salary Slip', 20, 20);
    // Add more content to PDF
    doc.save('salary-slip.pdf');
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(salaryHistory);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Salary History');
    XLSX.writeFile(wb, 'salary-history.xlsx');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 max-w-7xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Salary Details</h1>
          <div className="flex gap-4">
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={downloadExcel}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Excel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Basic Salary</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              ${currentSalary.basic.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Allowances</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              ${currentSalary.allowances.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-red-600" />
              <span className="text-sm text-gray-600">Deductions</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              -${currentSalary.deductions.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-600">Net Salary</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              ${currentSalary.total.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Salary Breakdown</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Basic Salary</span>
              <span className="text-gray-900">${currentSalary.basic.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Allowances</span>
              <span className="text-gray-900">+${currentSalary.allowances.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Deductions</span>
              <span className="text-red-600">-${currentSalary.deductions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Bonus</span>
              <span className="text-green-600">+${currentSalary.bonus.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-semibold text-gray-900">${currentSalary.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Salary History</h2>
        <div className="space-y-4">
          {salaryHistory.map((record, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-gray-900">{record.month}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-gray-900">${record.amount.toLocaleString()}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  record.status === 'Paid' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {record.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Salary;