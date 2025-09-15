import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockDisciplinaryIncidents, Student, Class } from '../../data/mockData';
import { generateBehaviorSummary } from '../../services/aiService';
import * as studentsService from '../../services/studentsService';
import * as classesService from '../../services/classesService';
import BehaviorSummaryModal from './BehaviorSummaryModal';
import { Spinner } from '../../components/ui/Spinner';

const StudentProfile: React.FC = () => {
  const { siteId, studentId } = useParams<{ siteId: string; studentId: string }>();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [summaryText, setSummaryText] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [studentClass, setStudentClass] = useState<Class | null>(null);
  const [loading, setLoading] = useState(true);

  const studentIncidents = mockDisciplinaryIncidents.filter(i => i.studentId === studentId);

  useEffect(() => {
    if (!studentId) return;

    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const [fetchedStudent, fetchedClasses] = await Promise.all([
          studentsService.getStudentById(studentId),
          classesService.getClasses(),
        ]);

        if (fetchedStudent) {
          setStudent(fetchedStudent);
          const sClass = fetchedClasses.find(c => c.id === fetchedStudent.classId);
          setStudentClass(sClass || null);
        } else {
          setStudent(null);
        }
      } catch (error) {
        console.error("Failed to fetch student profile:", error);
        setStudent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [studentId]);
  
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return names[0][0];
  }

  const handleGenerateSummary = async () => {
    setIsLoadingSummary(true);
    setSummaryText('');
    setIsSummaryModalOpen(true);
    try {
        const summary = await generateBehaviorSummary(studentIncidents);
        setSummaryText(summary);
    } catch (error) {
        console.error("Failed to generate summary:", error);
        setSummaryText("An error occurred while generating the summary. Please try again.");
    } finally {
        setIsLoadingSummary(false);
    }
  };

  const tabs = ['Overview', 'Discipline', 'Guardians', 'Attendance', 'Fees'];
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold">Student Not Found</h2>
        <p className="mt-2 text-gray-400">Could not find a student with ID: {studentId}</p>
        <Link to={`/school/${siteId}/students`} className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Students List
        </Link>
      </div>
    );
  }

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Profile</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Edit Profile
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Photo and Basic Info */}
          <div className="md:col-span-1 space-y-8">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-32 h-32 rounded-full bg-gray-700 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-400">{getInitials(student.name)}</span>
              </div>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-gray-400">{studentClass?.name}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-300">Basic Information</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-400">Admission No.</dt>
                    <dd className="mt-1 font-mono text-white">{student.admissionNo}</dd>
                  </div>
                   <div>
                    <dt className="text-sm font-medium text-gray-400">Class</dt>
                    <dd className="mt-1 text-white">{studentClass?.name}</dd>
                  </div>
                </dl>
              </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Contact Information</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-400">Email Address</dt>
                  <dd className="mt-1 text-white">{student.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Phone Number</dt>
                  <dd className="mt-1 text-white">{student.phone}</dd>
                </div>
              </dl>
            </div>
             <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Address</h3>
              <address className="not-italic text-white">
                {student.address}
              </address>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'Discipline' && (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-200">Disciplinary History</h3>
            <button
              onClick={handleGenerateSummary}
              disabled={isLoadingSummary || studentIncidents.length === 0}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
               {isLoadingSummary ? 'Generating...' : 'Generate Behavior Summary'}
            </button>
          </div>
          {studentIncidents.length > 0 ? (
            <ul className="space-y-4">
              {studentIncidents.map(incident => (
                <li key={incident.id} className="p-4 bg-gray-700/50 rounded-lg">
                  <p className="font-semibold text-white">{incident.incident}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    <span className="font-medium">Action Taken:</span> {incident.actionTaken}
                  </p>
                  <p className="text-xs text-gray-500 mt-2 text-right">{new Date(incident.date).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No disciplinary incidents on record for this student.</p>
            </div>
          )}
        </div>
      )}

      {/* Placeholder for other tabs */}
      {activeTab !== 'Overview' && activeTab !== 'Discipline' && (
         <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold">Content for {activeTab}</h3>
          <p className="mt-2 text-gray-400">This section is under construction.</p>
        </div>
      )}

      <BehaviorSummaryModal
        isOpen={isSummaryModalOpen}
        onClose={() => setIsSummaryModalOpen(false)}
        summary={summaryText}
        isLoading={isLoadingSummary}
      />
    </div>
  );
};

export default StudentProfile;
