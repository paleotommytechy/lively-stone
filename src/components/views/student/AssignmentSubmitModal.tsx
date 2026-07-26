import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { IOSModal } from '../../ios/IOSModal';
import { FileText, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

export const AssignmentSubmitModal: React.FC = () => {
  const { activeAssignment, closeAssignmentModal, submitAssignment } = useApp();
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
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
            Assignment Instructions
          </p>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {activeAssignment.instructions}
          </p>
        </div>

        {activeAssignment.submitted ? (
          /* Submission Status View */
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  Submission Status: {activeAssignment.status?.toUpperCase()}
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Submitted at: {activeAssignment.submittedAt}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-zinc-900 dark:text-white">Your Logged Response:</p>
              <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 italic">
                "{activeAssignment.submissionText}"
              </div>
            </div>

            {activeAssignment.feedback && (
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  Mentor Grade: {activeAssignment.grade} • Feedback:
                </p>
                <p className="text-xs text-zinc-700 dark:text-zinc-300">
                  {activeAssignment.feedback}
                </p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={closeAssignmentModal}
                className="px-6 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Form Input View */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Practical Response & Reflections
              </label>
              <textarea
                required
                rows={5}
                value={textResponse}
                onChange={(e) => setTextResponse(e.target.value)}
                placeholder="Write your reflection, accountability plan, or outreach notes..."
                className="w-full p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            {/* Mock File Upload Dropzone */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Attach Supporting Document (Optional Simulation)
              </label>
              <div 
                onClick={handleSimulateFile}
                className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-4 text-center hover:border-amber-500 cursor-pointer transition-colors"
              >
                <Upload className="w-6 h-6 text-zinc-400 mx-auto mb-1" />
                <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  {fileName ? `Attached: ${fileName}` : 'Click to simulate PDF / Word attachment upload'}
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeAssignmentModal}
                className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-500 hover:text-zinc-900"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold shadow-md transition-all ios-active"
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
