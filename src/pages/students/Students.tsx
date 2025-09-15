import React, { useState, useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Student, Class } from '../../data/mockData';
import * as studentsService from '../../services/studentsService';
import * as classesService from '../../services/classesService';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/ui/EmptyState';

const Students: React.FC = () => {
  const { siteId } = useParams<{ siteId: string }>();
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [fetchedStudents, fetchedClasses] = await Promise.all([
          studentsService.getStudents(),
          classesService.getClasses(),
        ]);
        setStudents(fetchedStudents);
        setClasses(fetchedClasses);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesClass = selectedClass ? student.classId === selectedClass : true;
      const matchesSearch = searchTerm
        ? student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesClass && matchesSearch;
    });
  }, [searchTerm, selectedClass, students]);

  const getClassById = (classId: string) => {
    return classes.find(c => c.id === classId)?.name || 'N/A';
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Students</h1>
      
      {/* Filters */}
      <div className="flex space-x-4 mb-6 p-4 bg-gray-800 rounded-lg">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-1">
            Search by Name or Admission No.
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="classFilter" className="block text-sm font-medium text-gray-400 mb-1">
            Filter by Class
          </label>
          <select
            id="classFilter"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
            <option value="">All Classes</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Admission No.</th>
              <th className="p-4 font-semibold">Class</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr key={student.id} className={`border-t border-gray-700 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/50'}`}>
                  <td className="p-4">
                    <Link
                      to={`/school/${siteId}/students/${student.id}`}
                      className="text-blue-400 hover:underline"
                    >
                      {student.name}
                    </Link>
                  </td>
                  <td className="p-4 font-mono text-gray-400">{student.admissionNo}</td>
                  <td className="p-4 text-gray-300">{getClassById(student.classId)}</td>
                  <td className="p-4">
                    <Link to={`/school/${siteId}/students/${student.id}`} className="text-sm text-blue-400 hover:text-blue-300">View</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-8">
                  <EmptyState title="No Students Found" description="Try adjusting your search or filter criteria." />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
