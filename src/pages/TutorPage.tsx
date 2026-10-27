import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CeronAIClaudeView } from '../components/tutor/CeronAIClaudeView';
import { useApp } from '../context/AppContext';

const TutorPage: React.FC = () => {
  const navigate = useNavigate();
  const { activeProfile } = useApp();

  return (
    <CeronAIClaudeView
      profile={activeProfile}
      onExit={() => navigate(-1)}
    />
  );
};

export default TutorPage;

