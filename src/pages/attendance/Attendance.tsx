import React, { useState, useMemo, useEffect } from 'react';
import { Student, Class } from '@/data/mockData';
import { useAttendance, AttendanceRecord, AttendanceStatus } from '@/context/AttendanceContext';
import * as classesService from '@/services/classesService';
import { mockStudents } from '@/data/mockData';
import { Spinner } from '@/components/ui/Spinner';

const Attendance: React.FC = () => {
  const { saveAttendance, getAttendance } = useAttendance();
  
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [studentStatuses, setStudentStatuses] = useState<AttendanceRecord>({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const fetchedClasses = await classesService.getClasses();
        setClasses(fetchedClasses);
        if (fetchedClasses.length > 0 && !selectedClassId) {
          setSelectedClassId(fetchedClasses[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const studentsInClass = useMemo(() => {
    return mockStudents.filter(student => student.classId === selectedClassId);
  }, [selectedClassId]);

  useEffect(() => {
    if (!selectedClassId || !date) return;

    const loadAttendance = async () => {
      const existingRecords = await getAttendance(date, selectedClassId);
      const initialStatuses: AttendanceRecord = {};
      studentsInClass.forEach(student => {
        initialStatuses[student.id] = existingRecords?.[student.id] || 'present';
      });
      setStudentStatuses(initialStatuses);
    };

    loadAttendance();
  }, [selectedClassId, date, studentsInClass, getAttendance]);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setStudentStatuses(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSave = async () => {
    await saveAttendance(date, selectedClassId, studentStatuses);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  
  const statusOptions: { value: AttendanceStatus, label: string, color: string }[] = [
    { value: 'present', label: 'Present', color: 'bg-green-600' },
    { value: 'absent', label: 'Absent', color: 'bg-red-600' },
    { value: 'late', label: 'Late', color: 'bg-yellow-600' },
    { value: 'excused', label: 'Excused', color: 'bg-blue-600' },
  ];
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-white relative">
      {showToast && (
        <div className="fixed top-24 right-8 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-50">
          Attendance saved successfully!
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">Mark Attendance</h1>

      {/* Filters */}
      <div className="flex space-x-4 mb-6 p-4 bg-gray-800 rounded-lg">
        <div className="flex-1">
          <label htmlFor="classFilter" className="block text-sm font-medium text-gray-400 mb-1">
            Select Class
          </label>
          <select
            id="classFilter"
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="date-picker" className="block text-sm font-medium text-gray-400 mb-1">
            Select Date
          </label>
          <input
            id="date-picker"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>
      </div>
      
      {/* Attendance Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 font-semibold">Student Name</th>
              <th className="p-4 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {studentsInClass.length > 0 ? (
              studentsInClass.map((student) => (
                <tr key={student.id} className="border-t border-gray-700">
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">
                    <div className="flex justify-center items-center space-x-2 md:space-x-4">
                      {statusOptions.map(option => (
                        <label key={option.value} className="flex items-center space-x-2 cursor-pointer text-sm">
                          <input
                            type="radio"
                            name={`status-${student.id}`}
                            value={option.value}
                            checked={studentStatuses[student.id] === option.value}
                            onChange={() => handleStatusChange(student.id, option.value)}
                            className="hidden"
                          />
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                            studentStatuses[student.id] === option.value
                              ? `${option.color} text-white shadow-md`
                              : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                          }`}>
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center p-8 text-gray-500">
                  Select a class to see students.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {studentsInClass.length > 0 && (
        <div className="mt-6 text-right">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Save Attendance
          </button>
        </div>
      )}
    </div>
  );
};

export default Attendance;