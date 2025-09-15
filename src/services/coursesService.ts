import { mockCourses, Course } from '@/data/mockData';

// In-memory store initialized with mock data
let courses: Course[] = [...mockCourses];

const SIMULATED_DELAY = 400;

/**
 * Fetches a list of all courses.
 * @returns A promise that resolves to an array of Course objects.
 */
export const getCourses = async (): Promise<Course[]> => {
    console.log('Fetching all courses from mock service...');
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return courses;
};

/**
 * Creates a new course and adds it to the store.
 * @param newCourseData The data for the new course, without an ID.
 * @returns A promise that resolves to the newly created Course object with an ID.
 */
export const createCourse = async (newCourseData: Omit<Course, 'id'>): Promise<Course> => {
    console.log('Adding new course to mock service...', newCourseData);
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    
    const newCourse: Course = {
        ...newCourseData,
        id: `course${courses.length + 1}_${Date.now()}` // More unique ID
    };
    courses = [...courses, newCourse];
    
    return newCourse;
};