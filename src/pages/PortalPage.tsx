import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClassSelectionPortal } from '../components/common/ClassSelectionPortal';
import { useApp } from '../context/AppContext';

const PortalPage: React.FC = () => {
  const navigate = useNavigate();
  const { activeProfile, handleSelectClass } = useApp();
  const canCancel = !!localStorage.getItem('ceron_has_chosen_class');

  return (
    <ClassSelectionPortal
      currentClassId={activeProfile.classId}
      canCancel={canCancel}
      onCancel={() => navigate(-1)}
      onSelectClass={(classId) => {
        handleSelectClass(classId);
        navigate(`/class/${classId}`, { replace: true });
      }}
    />
  );
};

export default PortalPage;

