import React, { useState } from 'react';
import { useCourses } from '@/context/CoursesContext';
import { CourseStatus } from '@/data/mockData';
import CreateCourseModal from '@/pages/courses/CreateCourseModal';
import { Spinner } from '@/components/ui/Spinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

const Courses: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { courses, addCourse, loading } = useCourses();

  const handleSaveCourse = async (newCourse: { title: string; description: string; status: CourseStatus }) => {
    await addCourse(newCourse);
    setIsModalOpen(false);
  };

  const StatusBadge: React.FC<{ status: CourseStatus }> = ({ status }) => {
    const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full inline-block';
    if (status === 'Open') {
      return <span className={`${baseClasses} bg-green-500/20 text-green-300`}>Open</span>;
    }
    return <span className={`${baseClasses} bg-gray-500/20 text-gray-300`}>Draft</span>;
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          Create Course
        </Button>
      </div>
      
      {/* Courses Grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-gray-800 rounded-lg p-5 flex flex-col border border-gray-700 hover:border-blue-500 transition-colors duration-300 shadow-lg">
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-bold text-white pr-2">{course.title}</h2>
                  <StatusBadge status={course.status} />
                </div>
                <p className="text-gray-400 text-sm">{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Courses Found"
          description="Get started by creating a new course."
        >
          <Button onClick={() => setIsModalOpen(true)}>
            Create Course
          </Button>
        </EmptyState>
      )}

      <CreateCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCourse}
      />
    </div>
  );
};

export default Courses;