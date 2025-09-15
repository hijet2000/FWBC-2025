import React, { useState, useEffect } from 'react';
import { useAcademics } from '@/context/AcademicsContext';
import * as classesService from '@/services/classesService';
import { Class } from '@/data/mockData';
import AssignSubjectModal from '@/pages/academics/AssignSubjectModal';
import { Spinner } from '@/components/ui/Spinner';

const Academics: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { subjects, teachers, assignments, addAssignment } = useAcademics();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        const fetchedClasses = await classesService.getClasses();
        setClasses(fetchedClasses);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || 'N/A';
  const getTeacherName = (id: string) => teachers.find(t => t.id === id)?.name || 'N/A';
  const getClassName = (id: string) => classes.find(c => c.id === id)?.name || 'N/A';

  const handleSaveAssignment = (newAssignment: { subjectId: string, teacherId: string, classId: string }) => {
    addAssignment(newAssignment);
    setIsModalOpen(false);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Academics Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Assign Subject
        </button>
      </div>
      
      {/* Assignments Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4 font-semibold">Subject</th>
              <th className="p-4 font-semibold">Assigned Teacher</th>
              <th className="p-4 font-semibold">Class</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <tr key={assignment.id} className="border-t border-gray-700">
                  <td className="p-4">{getSubjectName(assignment.subjectId)}</td>
                  <td className="p-4">{getTeacherName(assignment.teacherId)}</td>
                  <td className="p-4">{getClassName(assignment.classId)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-8 text-gray-500">
                  No subjects have been assigned yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AssignSubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAssignment}
        classes={classes}
      />
    </div>
  );
};

export default Academics;