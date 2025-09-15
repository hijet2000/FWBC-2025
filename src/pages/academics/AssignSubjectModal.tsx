import React, { useState, useEffect } from 'react';
import { useAcademics } from '@/context/AcademicsContext';
import { Class } from '@/data/mockData';

interface AssignSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (assignment: { subjectId: string; teacherId: string; classId: string }) => void;
  classes: Class[];
}

const AssignSubjectModal: React.FC<AssignSubjectModalProps> = ({ isOpen, onClose, onSave, classes }) => {
  const { subjects, teachers } = useAcademics();

  const [subjectId, setSubjectId] = useState<string>(subjects[0]?.id || '');
  const [teacherId, setTeacherId] = useState<string>(teachers[0]?.id || '');
  const [classId, setClassId] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      // Set initial/default values when modal is opened
      if (subjects.length > 0 && !subjectId) setSubjectId(subjects[0].id);
      if (teachers.length > 0 && !teacherId) setTeacherId(teachers[0].id);
      if (classes.length > 0 && !classId) setClassId(classes[0].id);
    }
  }, [isOpen, classes, subjects, teachers, classId, subjectId, teacherId]);


  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subjectId && teacherId && classId) {
      onSave({ subjectId, teacherId, classId });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md text-white border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6">Assign Subject to Class</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                Subject
              </label>
              <select
                id="subject"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="teacher" className="block text-sm font-medium text-gray-400 mb-1">
                Teacher
              </label>
              <select
                id="teacher"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-400 mb-1">
                Class
              </label>
              <select
                id="class"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-600 hover:bg-gray-500 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors font-semibold"
            >
              Save Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignSubjectModal;