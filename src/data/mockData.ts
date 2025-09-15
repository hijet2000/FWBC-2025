
export interface Class {
  id: string;
  name: string;
}

export interface Student {
  id: string;
  name: string;
  admissionNo: string;
  classId: string;
  email: string;
  phone: string;
  address: string;
}

export interface DisciplinaryIncident {
  id: string;
  studentId: string;
  date: string;
  incident: string;
  actionTaken: string;
}

export type CourseStatus = 'Open' | 'Draft';

export interface Course {
  id: string;
  title: string;
  description: string;
  status: CourseStatus;
}

export const mockClasses: Class[] = [
  { id: 'c1', name: 'Form 1' },
  { id: 'c2', name: 'Form 2' },
  { id: 'c3', name: 'Form 3' },
  { id: 'c4', name: 'Form 4' },
];

export const mockStudents: Student[] = [
  { id: 's1', name: 'Alice Johnson', admissionNo: 'A001', classId: 'c1', email: 'alice.j@example.com', phone: '555-0101', address: '123 Maple St, Springfield' },
  { id: 's2', name: 'Bob Smith', admissionNo: 'A002', classId: 'c1', email: 'bob.s@example.com', phone: '555-0102', address: '456 Oak Ave, Springfield' },
  { id: 's3', name: 'Charlie Brown', admissionNo: 'A003', classId: 'c2', email: 'charlie.b@example.com', phone: '555-0103', address: '789 Pine Ln, Springfield' },
  { id: 's4', name: 'Diana Prince', admissionNo: 'A004', classId: 'c2', email: 'diana.p@example.com', phone: '555-0104', address: '101 Elm Ct, Springfield' },
  { id: 's5', name: 'Ethan Hunt', admissionNo: 'A005', classId: 'c3', email: 'ethan.h@example.com', phone: '555-0105', address: '212 Birch Rd, Springfield' },
  { id: 's6', name: 'Fiona Glenanne', admissionNo: 'A006', classId: 'c3', email: 'fiona.g@example.com', phone: '555-0106', address: '313 Cedar Blvd, Springfield' },
  { id: 's7', name: 'George Costanza', admissionNo: 'A007', classId: 'c4', email: 'george.c@example.com', phone: '555-0107', address: '414 Spruce Dr, Springfield' },
  { id: 's8', name: 'Hannah Montana', admissionNo: 'A008', classId: 'c4', email: 'hannah.m@example.com', phone: '555-0108', address: '515 Walnut St, Springfield' },
  { id: 's9', name: 'Ian Malcolm', admissionNo: 'A009', classId: 'c1', email: 'ian.m@example.com', phone: '555-0109', address: '616 Ash Ave, Springfield' },
  { id: 's10', name: 'Jane Eyre', admissionNo: 'A010', classId: 'c2', email: 'jane.e@example.com', phone: '555-0110', address: '717 Willow Way, Springfield' },
  { id: 's11', name: 'Kyle Broflovski', admissionNo: 'A011', classId: 'c3', email: 'kyle.b@example.com', phone: '555-0111', address: '818 Aspen Ct, Springfield' },
  { id: 's12', name: 'Laura Palmer', admissionNo: 'A012', classId: 'c4', email: 'laura.p@example.com', phone: '555-0112', address: '919 Poplar Pl, Springfield' },
  { id: 's13', name: 'Michael Scott', admissionNo: 'A013', classId: 'c1', email: 'michael.s@example.com', phone: '555-0113', address: '121 Holly Ln, Springfield' },
  { id: 's14', name: 'Nancy Drew', admissionNo: 'A014', classId: 'c2', email: 'nancy.d@example.com', phone: '555-0114', address: '232 Juniper Rd, Springfield' },
  { id: 's15', name: 'Oscar Martinez', admissionNo: 'A015', classId: 'c3', email: 'oscar.m@example.com', phone: '555-0115', address: '343 Redwood Dr, Springfield' },
  { id: 's16', name: 'Pam Beesly', admissionNo: 'A016', classId: 'c4', email: 'pam.b@example.com', phone: '555-0116', address: '454 Sequoia Ave, Springfield' },
  { id: 's17', name: 'Quentin Coldwater', admissionNo: 'A017', classId: 'c1', email: 'quentin.c@example.com', phone: '555-0117', address: '565 Magnolia Ct, Springfield' },
  { id: 's18', name: 'Rachel Green', admissionNo: 'A018', classId: 'c2', email: 'rachel.g@example.com', phone: '555-0118', address: '676 Sycamore St, Springfield' },
  { id: 's19', name: 'Stanley Hudson', admissionNo: 'A019', classId: 'c3', email: 'stanley.h@example.com', phone: '555-0119', address: '787 Fir Ln, Springfield' },
  { id: 's20', name: 'Tina Belcher', admissionNo: 'A020', classId: 'c4', email: 'tina.b@example.com', phone: '555-0120', address: '898 Hemlock Way, Springfield' },
];

export const mockDisciplinaryIncidents: DisciplinaryIncident[] = [
  { id: 'd1', studentId: 's1', date: '2023-09-15', incident: 'Disrupted class by talking excessively.', actionTaken: 'Verbal warning.' },
  { id: 'd2', studentId: 's3', date: '2023-09-20', incident: 'Did not complete homework assignment.', actionTaken: 'Detention assigned.' },
  { id: 'd3', studentId: 's3', date: '2023-10-05', incident: 'Arrived late to school without a note.', actionTaken: 'Parent notified.' },
  { id: 'd4', studentId: 's3', date: '2023-10-12', incident: 'Heated argument with a classmate during lunch.', actionTaken: 'Mediation with school counselor.' },
  { id: 'd5', studentId: 's5', date: '2023-11-01', incident: 'Caught cheating on a quiz.', actionTaken: 'Received a zero on the quiz, parent conference held.' },
  { id: 'd6', studentId: 's3', date: '2023-11-03', incident: 'Failed to turn in a major project on time.', actionTaken: 'Grade penalized, conference with teacher.' },
];

export const mockCourses: Course[] = [
  { id: 'course1', title: 'Introduction to Algebra', description: 'Learn the fundamentals of algebraic expressions and equations.', status: 'Open' },
  { id: 'course2', title: 'World History: Ancient Civilizations', description: 'A survey of major ancient civilizations from around the globe.', status: 'Open' },
  { id: 'course3', title: 'Creative Writing Workshop', description: 'Hone your storytelling skills through weekly writing prompts and peer feedback.', status: 'Draft' },
  { id: 'course4', title: 'Physical Science 101', description: 'Exploring concepts in chemistry and physics.', status: 'Open' },
];