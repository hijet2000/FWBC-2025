import { mockStudents, Student } from '../data/mockData';

const SIMULATED_DELAY = 500;

// In a real app, this would be an API call. For now, we use an in-memory array.
let students: Student[] = [...mockStudents];

/**
 * Fetches a list of all students.
 * @returns A promise that resolves to an array of Student objects.
 */
export const getStudents = async (): Promise<Student[]> => {
  console.log('Fetching all students from mock service...');
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  return students;
};

/**
 * Fetches a single student by their ID.
 * @param id The ID of the student to fetch.
 * @returns A promise that resolves to a Student object, or undefined if not found.
 */
export const getStudentById = async (id: string): Promise<Student | undefined> => {
  console.log(`Fetching student with id: ${id} from mock service...`);
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  return students.find(s => s.id === id);
};
