import { mockClasses, Class } from '@/data/mockData';

const SIMULATED_DELAY = 300;

let classes: Class[] = [...mockClasses];

/**
 * Fetches a list of all classes.
 * @returns A promise that resolves to an array of Class objects.
 */
export const getClasses = async (): Promise<Class[]> => {
  console.log('Fetching all classes from mock service...');
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  return classes;
};