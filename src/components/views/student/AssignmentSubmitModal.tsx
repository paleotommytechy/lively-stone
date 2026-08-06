import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { useUIStore } from '../../../store/useUIStore';
import { IOSModal } from '../../ios/IOSModal';
import { FileText, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

export const AssignmentSubmitModal: React.FC = () => {
  const { activeAssignment, setActiveAssignment } = useUIStore();
  const { submitAssignment } = useApp();
  const closeAssignmentModal = () => setActiveAssignment(null);
  const [textResponse, setTextResponse] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  if (!activeAssignment) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textResponse.trim()) return;
    submitAssignment(activeAssignment.id, textResponse);
  };

  const handleSimulateFile = () => {
    setFileName('Discipleship_Report_Ifeoluwa.pdf');
  };

  return (
    <IOSModal
      isOpen={!!activeAssignment}
      onClose={closeAssignmentModal}
      title={activeAssignment.title}
      subtitle={`Due ${activeAssignment.deadline} • Pillar: ${activeAssignment.pillar}`}
    >
      <div className="space-y-6 pt-2">
        {/* Instructions */}
        <div className="p-4 rounded-3xl glass-pill border border-amber-500/30 space-y-1.5">
          <p className="text-xs font-mono font-bold text-amber-500 dark:text-amber-400 uppercase tracking-wider">
            ASSIGNMENT INSTRUCTIONS
          </p>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {activeAssignment.instructions}
          </p>
        </div>

        {activeAssignment.submitted ? (
          /* Submission Status View */
          <div className="space-y-4">
            <div className="p-4 rounded-3xl glass-pill border border-emerald-500/30 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <h4 className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  SUBMISSION STATUS: {activeAssignment.status?.toUpperCase()}
                </h4>
                <p className="text-[11px] font-mono text-slate-400">
                  Submitted at: {activeAssignment.submittedAt}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-900 dark:text-white">Your Logged Response:</p>
              <div className="p-4 rounded-2xl glass-pill text-xs text-slate-700 dark:text-slate-300 italic font-serif leading-relaxed">
                "{activeAssignment.submissionText}"
              </div>
            </div>

            {activeAssignment.feedback && (
              <div className="p-4 rounded-3xl glass-pill border border-blue-500/30 space-y-1">
                <p className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400">
                  Mentor Grade: {activeAssignment.grade} • Feedback:
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {activeAssignment.feedback}
                </p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={closeAssignmentModal}
                className="px-6 py-2.5 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-xs font-bold shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Form Input View */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Practical Response & Reflections
              </label>
              <textarea
                required
                rows={5}
                value={textResponse}
                onChange={(e) => setTextResponse(e.target.value)}
                placeholder="Write your reflection, accountability plan, or outreach notes..."
                className="w-full p-4 rounded-2xl glass-input text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            {/* Mock File Upload Dropzone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Attach Supporting Document (Optional Simulation)
              </label>
              <div 
                onClick={handleSimulateFile}
                className="border-2 border-dashed border-white/20 dark:border-white/10 rounded-2xl p-4 text-center hover:border-amber-500 cursor-pointer transition-colors glass-pill"
              >
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {fileName ? `Attached: ${fileName}` : 'Click to simulate PDF / Word attachment upload'}
                </p>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeAssignmentModal}
                className="px-4 py-2 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 text-xs font-extrabold shadow-lg shadow-amber-500/20 transition-all ios-active"
              >
                Submit Assignment
              </button>
            </div>
          </form>
        )}
      </div>
    </IOSModal>
  );
};

