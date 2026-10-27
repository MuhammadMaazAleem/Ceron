import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChapterDetailView } from '../components/chapter/ChapterDetailView';
import { useApp } from '../context/AppContext';
import { SUBJECTS } from '../data/curriculumData';
import { StorageService } from '../services/storage';

const ChapterPage: React.FC = () => {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const { units, activeProfile, languagePref, refreshProfile } = useApp();

  const unit = units.find((u) => u.id === unitId);
  const subject = unit ? SUBJECTS.find((s) => s.id === unit.subjectId) : undefined;

  if (!unit) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
        <p className="text-base font-semibold">Chapter not found.</p>
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
    <ChapterDetailView
      unit={unit}
      subject={subject}
      languagePref={languagePref}
      completedLessonIds={activeProfile.completedLessons || []}
      onBack={() => navigate(-1)}
      onSelectLesson={(lesson) => {
        navigate(`/lesson/${unit.id}/${lesson.id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onLaunchQuiz={() => navigate(`/mock?unitId=${unit.id}`)}
      onCompleteTopic={(lessonId) => {
        StorageService.completeLesson(activeProfile.id, lessonId, 25);
        refreshProfile();
      }}
    />
  );
};

export default ChapterPage;

