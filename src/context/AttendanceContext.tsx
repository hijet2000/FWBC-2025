import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as attendanceService from '@/services/attendanceService';

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface AttendanceRecord {
  [studentId: string]: AttendanceStatus;
}

export interface AttendanceData {
  [date_classId: string]: AttendanceRecord;
}

interface AttendanceContextType {
  attendanceData: AttendanceData;
  saveAttendance: (date: string, classId: string, records: AttendanceRecord) => Promise<void>;
  getAttendance: (date: string, classId: string) => Promise<AttendanceRecord | undefined>;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [attendanceData, setAttendanceData] = useState<AttendanceData>({});

  const saveAttendance = async (date: string, classId: string, records: AttendanceRecord) => {
    await attendanceService.saveAttendanceForClass(date, classId, records);
    const key = `${date}_${classId}`;
    setAttendanceData(prevData => ({
      ...prevData,
      [key]: records,
    }));
  };
  
  const getAttendance = async (date: string, classId: string) => {
    const key = `${date}_${classId}`;
    if (attendanceData[key]) {
      return attendanceData[key];
    }
    
    const records = await attendanceService.fetchAttendanceForClass(date, classId);
    if (records) {
      setAttendanceData(prevData => ({
        ...prevData,
        [key]: records,
      }));
    }
    return records;
  };

  return (
    <AttendanceContext.Provider value={{ attendanceData, saveAttendance, getAttendance }}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = (): AttendanceContextType => {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};