import { AttendanceRecord, AttendanceData } from '@/context/AttendanceContext';

const SIMULATED_DELAY = 200;

// This object simulates a remote database for attendance records.
const mockAttendanceStore: AttendanceData = {};

/**
 * Fetches attendance records for a specific class on a specific date.
 * @param date The date string (e.g., '2023-10-26').
 * @param classId The ID of the class.
 * @returns A promise that resolves to an AttendanceRecord, or undefined if none exists.
 */
export const fetchAttendanceForClass = async (date: string, classId: string): Promise<AttendanceRecord | undefined> => {
    const key = `${date}_${classId}`;
    console.log(`Fetching attendance for key: ${key} from mock service...`);
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    return mockAttendanceStore[key];
};

/**
 * Saves attendance records for a specific class on a specific date.
 * @param date The date string.
 * @param classId The ID of the class.
 * @param records The attendance records to save.
 * @returns A promise that resolves when the save is complete.
 */
export const saveAttendanceForClass = async (date: string, classId: string, records: AttendanceRecord): Promise<void> => {
    const key = `${date}_${classId}`;
    console.log(`Saving attendance for key: ${key} to mock service...`);
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    mockAttendanceStore[key] = records;
    return;
};