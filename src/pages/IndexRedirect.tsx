import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/**
 * Root redirect: sends first-time users to /portal,
 * returning users to /class/:classId
 */
const IndexRedirect: React.FC = () => {
  const navigate = useNavigate();
  const { activeProfile } = useApp();

  useEffect(() => {
    const hasChosen = localStorage.getItem('ceron_has_chosen_class');
    if (hasChosen) {
      navigate(`/class/${activeProfile.classId}`, { replace: true });
    } else {
      navigate('/portal', { replace: true });
    }
  }, []);

  return null;
};

export default IndexRedirect;

