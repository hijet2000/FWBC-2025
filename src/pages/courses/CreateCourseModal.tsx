import React, { useState } from 'react';
import { CourseStatus } from '@/data/mockData';

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: { title: string; description: string; status: CourseStatus }) => void;
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<CourseStatus>('Draft');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      onSave({ title, description, status });
      // Reset form and close
      setTitle('');
      setDescription('');
      setStatus('Draft');
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-lg text-white border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6">Create New Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-400 mb-1">
                Course Title
              </label>
              <input
                id="courseTitle"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-400 mb-1">
                Description
              </label>
              <textarea
                id="courseDescription"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="courseStatus" className="block text-sm font-medium text-gray-400 mb-1">
                Status
              </label>
              <select
                id="courseStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value as CourseStatus)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Draft">Draft</option>
                <option value="Open">Open</option>
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
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseModal;