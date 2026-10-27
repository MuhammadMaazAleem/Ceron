import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LessonPlayer } from '../components/lesson/LessonPlayer';
import { useApp } from '../context/AppContext';

const LessonPage: React.FC = () => {
  const navigate = useNavigate();
  const { unitId, lessonId } = useParams<{ unitId: string; lessonId: string }>();
  const { units, activeProfile, languagePref } = useApp();

  const unit = units.find((u) => u.id === unitId);
  const lesson = unit?.lessons?.find((l) => l.id === lessonId);

  if (!unit || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
        <p className="text-base font-semibold">Lesson not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-indigo-600 underline cursor-pointer"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <LessonPlayer
      lesson={lesson}
      allLessonsInUnit={unit.lessons || []}
      childId={activeProfile.id}
      languagePref={languagePref}
      onBack={() => navigate(-1)}
      onSelectLesson={(l) => {
        navigate(`/lesson/${unit.id}/${l.id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onTakeQuiz={() => navigate(`/mock?unitId=${unit.id}`)}
    />
  );
};

export default LessonPage;

