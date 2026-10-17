import React, { useState } from 'react';
import { LearnerProfile } from '../../types';
import { StorageService } from '../../services/storage';
import { soundEngine } from '../../services/soundEngine';
import { ALL_CLASSES } from '../../data/curriculumData';
import { X, Plus, Sparkles, Check } from 'lucide-react';

interface ProfileSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileSelected: (profile: LearnerProfile) => void;
}

export const ProfileSwitcherModal: React.FC<ProfileSwitcherModalProps> = ({
  isOpen,
  onClose,
  onProfileSelected,
}) => {
  const [profiles, setProfiles] = useState<LearnerProfile[]>(StorageService.getProfiles());
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

  // Add new profile form state
  const [newName, setNewName] = useState<string>('');
  const [newClassId, setNewClassId] = useState<string>('class_9');
  const [newAvatar, setNewAvatar] = useState<string>('🎓');

  if (!isOpen) return null;

  const handleSelectLearner = (profile: LearnerProfile) => {
    soundEngine.playCorrect();
    StorageService.setActiveProfile(profile.id);
    onProfileSelected(profile);
    onClose();
  };

  const handleAddLearner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const matchedClass = ALL_CLASSES.find((c) => c.id === newClassId) || ALL_CLASSES[0];

    const created = StorageService.addProfile({
      name: newName.trim(),
      classId: matchedClass.id,
      className: `${matchedClass.nameEn} (${matchedClass.stage})`,
      ageBand: matchedClass.ageBand,
      avatarIcon: newAvatar,
      avatarColor: '#2563EB',
    });

    soundEngine.playCorrect();
    setProfiles(StorageService.getProfiles());
    setIsAddingNew(false);
    onProfileSelected(created);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎓</span>
            <div>
              <h3 className="font-bold text-slate-900 text-base leading-tight">
                Student Examination Profiles
              </h3>
              <p className="text-xs text-slate-500">
                Classes 9th to 12th &bull; BISE Swat Board
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {isAddingNew ? (
          /* Add Learner Form (No password) */
          <form onSubmit={handleAddLearner} className="space-y-4 py-2">
            <h4 className="font-bold text-slate-800 text-sm">
              Add a Child (بچے کا اضافہ کریں)
            </h4>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Child's Name (بچے کا نام)
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Ayla, Hamza, Bilal..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Select Class (KG to 12th)
              </label>
              <select
                value={newClassId}
                onChange={(e) => setNewClassId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500 bg-white"
              >
                {ALL_CLASSES.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.nameEn} — {cls.nameUr} ({cls.stage})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Choose Avatar
              </label>
              <div className="flex gap-2 flex-wrap">
                {['🎓', '🔬', '📚', '⚡', '🧬', '📐', '💻', '💡'].map((av) => (
                  <button
                    type="button"
                    key={av}
                    onClick={() => setNewAvatar(av)}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border cursor-pointer ${
                      newAvatar === av
                        ? 'border-slate-900 bg-slate-100'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="w-1/2 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 py-2 text-xs font-bold rounded-lg bg-slate-900 text-white hover:bg-slate-800"
              >
                Save Student Profile
              </button>
            </div>
          </form>
        ) : (
          /* Profile Selection List (Instant One-Tap Switch) */
          <div>
            <div className="space-y-2.5 mb-4">
              {profiles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectLearner(p)}
                  className="w-full p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-purple-400 hover:shadow-md transition-all flex items-center justify-between cursor-pointer text-left active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl shadow-inner border border-slate-100">
                      {p.avatarIcon}
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">
                        {p.name}
                      </div>
                      <div className="text-xs text-purple-600 font-semibold">
                        {p.className}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="pearl-pill text-xs font-bold bg-amber-50 text-amber-700">
                      🔥 {p.streakDays}d
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {p.xp} XP
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setIsAddingNew(true);
                soundEngine.playPop();
              }}
              className="w-full p-3 rounded-2xl border border-dashed border-slate-300 text-slate-600 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <Plus size={14} /> + Add Another Child (بچے کا اضافہ)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
