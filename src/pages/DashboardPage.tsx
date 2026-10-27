import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AcademyDashboard } from '../components/dashboard/AcademyDashboard';
import { useApp } from '../context/AppContext';
import { SUBJECTS } from '../data/curriculumData';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { classId } = useParams<{ classId: string }>();
  const { activeProfile, units, openTour } = useApp();

  // Filter for whichever class is in the URL (or the active profile class)
  const effectiveClassId = classId || activeProfile.classId;
  const classUnits = units.filter((u) => u.classId === effectiveClassId);
  const displayedUnits = classUnits.length > 0 ? classUnits : units;
  const classSubjects = SUBJECTS.filter((s) => s.classes.includes(effectiveClassId));

  return (
    <AcademyDashboard
      profile={activeProfile}
      subjects={classSubjects}
      units={displayedUnits}
      languagePref="en"
      onSelectUnit={(unit) => {
        navigate(`/chapter/${unit.id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onLaunchMockTest={() => navigate('/mock')}
      onOpenTour={openTour}
    />
  );
};

export default DashboardPage;

