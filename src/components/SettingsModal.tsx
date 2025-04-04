import React, { useEffect, useRef } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (path: string) => void;
  currentPath: string;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave, currentPath }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      setTimeout(() => pathInputRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = 'auto';
      dialog.close();
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const path = formData.get('path') as string;
    onSave(path);
  };

  if (!isOpen) return null;

  return (
    <dialog 
      ref={dialogRef} 
      className="modal-overlay"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <h2>Settings</h2>
        </div>
        <form onSubmit={handleSubmit} className="modal-form" method="dialog">
          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="path">Repository Path</label>
              <input 
                ref={pathInputRef}
                type="text" 
                id="path" 
                name="path" 
                defaultValue={currentPath} 
                required 
                placeholder="e.g. /Users/username/projects/my-repo"
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default SettingsModal; 