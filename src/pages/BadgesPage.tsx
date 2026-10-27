import React from 'react';
import { BadgesView } from '../components/dashboard/BadgesView';
import { useApp } from '../context/AppContext';

const BadgesPage: React.FC = () => {
  const { activeProfile } = useApp();
  return <BadgesView profile={activeProfile} />;
};

export default BadgesPage;

