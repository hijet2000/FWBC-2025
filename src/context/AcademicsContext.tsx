import React, { createContext, useContext, useState, ReactNode } from 'react';

// Interfaces
export interface Subject {
  id: string;
  name: string;
}

export interface Teacher {
  id: string;
  name: string;
}

export interface Assignment {
  id: string;
  subjectId: string;
  teacherId: string;
  classId: string;
}

interface AcademicsContextType {
  subjects: Subject[];
  teachers: Teacher[];
  assignments: Assignment[];
  addAssignment: (newAssignment: Omit<Assignment, 'id'>) => void;
}

// Mock Data
const mockSubjects: Subject[] = [
  { id: 'subj1', name: 'Mathematics' },
  { id: 'subj2', name: 'Science' },
  { id: 'subj3', name: 'English' },
  { id: 'subj4', name: 'History' },
  { id: 'subj5', name: 'Art' },
];

const mockTeachers: Teacher[] = [
  { id: 't1', name: 'Mr. John Doe' },
  { id: 't2', name: 'Ms. Emily White' },
  { id: 't3', name: 'Mr. Richard Roe' },
  { id: 't4', name: 'Ms. Sarah Stone' },
];

const initialAssignments: Assignment[] = [
    { id: 'assign1', subjectId: 'subj1', teacherId: 't1', classId: 'c1'},
    { id: 'assign2', subjectId: 'subj2', teacherId: 't2', classId: 'c1'},
    { id: 'assign3', subjectId: 'subj1', teacherId: 't1', classId: 'c2'},
    { id: 'assign4', subjectId: 'subj3', teacherId: 't4', classId: 'c3'},
];


// Context
const AcademicsContext = createContext<AcademicsContextType | undefined>(undefined);

export const AcademicsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subjects] = useState<Subject[]>(mockSubjects);
  const [teachers] = useState<Teacher[]>(mockTeachers);
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);

  const addAssignment = (newAssignment: Omit<Assignment, 'id'>) => {
    setAssignments(prev => [
        ...prev,
        { ...newAssignment, id: `assign${prev.length + 1}` }
    ]);
  };

  return (
    <AcademicsContext.Provider value={{ subjects, teachers, assignments, addAssignment }}>
      {children}
    </AcademicsContext.Provider>
  );
};

// Hook
export const useAcademics = (): AcademicsContextType => {
  const context = useContext(AcademicsContext);
  if (context === undefined) {
    throw new Error('useAcademics must be used within an AcademicsProvider');
  }
  return context;
};