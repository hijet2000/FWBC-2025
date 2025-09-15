import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Course, CourseStatus } from '../data/mockData';
import * as coursesService from '../services/coursesService';

interface CoursesContextType {
  courses: Course[];
  addCourse: (newCourse: Omit<Course, 'id'>) => Promise<void>;
  loading: boolean;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CoursesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const fetchedCourses = await coursesService.getCourses();
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const addCourse = async (newCourseData: Omit<Course, 'id'>) => {
    const newCourse = await coursesService.createCourse(newCourseData);
    setCourses(prev => [...prev, newCourse]);
  };

  return (
    <CoursesContext.Provider value={{ courses, addCourse, loading }}>
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = (): CoursesContextType => {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
};
