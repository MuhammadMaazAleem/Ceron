import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AIPaperCheckerView } from '../components/checker/AIPaperCheckerView';
import { useApp } from '../context/AppContext';
import { SUBJECTS } from '../data/curriculumData';

const CheckerPage: React.FC = () => {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId?: string }>();
  const { activeProfile, units } = useApp();

  const classSubjects = useMemo(() => {
    return SUBJECTS.filter((s) => s.classes.includes(activeProfile.classId));
  }, [activeProfile.classId]);

  return (
    <AIPaperCheckerView
      profile={activeProfile}
      units={units}
      subjects={classSubjects}
      initialUnitId={unitId}
      onExit={() => navigate(-1)}
    />
  );
};

export default CheckerPage;

