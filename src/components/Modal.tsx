import React, { useEffect, useRef } from 'react';
import { TemplateFormData } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TemplateFormData) => void;
  title: string;
  initialData?: TemplateFormData;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, initialData }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      // Focus first input after a short delay to ensure dialog is rendered
      setTimeout(() => firstInputRef.current?.focus(), 0);
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
    const data: TemplateFormData = {
      name: formData.get('name') as string,
      command: formData.get('command') as string,
      image: formData.get('image') as string,
      language: formData.get('language') as string,
      framework: formData.get('framework') as string,
      npmDownloads: formData.get('npmDownloads') as string,
      githubStars: formData.get('githubStars') as string,
      lastUpdated: formData.get('lastUpdated') as string
    };
    onSubmit(data);
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog 
      ref={dialogRef} 
      className="modal-overlay"
      onCancel={handleClose}
      onClick={(e) => {
        // Only close if clicking the backdrop (dialog element itself)
        if (e.target === dialogRef.current) {
          handleClose();
        }
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <form onSubmit={handleSubmit} className="modal-form" method="dialog">
          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                ref={firstInputRef}
                type="text" 
                id="name" 
                name="name" 
                defaultValue={initialData?.name} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="command">Command</label>
              <input type="text" id="command" name="command" defaultValue={initialData?.command} required />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input type="url" id="image" name="image" defaultValue={initialData?.image} required />
            </div>
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <input type="text" id="language" name="language" defaultValue={initialData?.language} required />
            </div>
            <div className="form-group">
              <label htmlFor="framework">Framework</label>
              <input type="text" id="framework" name="framework" defaultValue={initialData?.framework} required />
            </div>
            <div className="form-group">
              <label htmlFor="npmDownloads">NPM Downloads</label>
              <input type="text" id="npmDownloads" name="npmDownloads" defaultValue={initialData?.npmDownloads} />
            </div>
            <div className="form-group">
              <label htmlFor="githubStars">GitHub Stars</label>
              <input type="text" id="githubStars" name="githubStars" defaultValue={initialData?.githubStars} />
            </div>
            <div className="form-group">
              <label htmlFor="lastUpdated">Last Updated</label>
              <input type="text" id="lastUpdated" name="lastUpdated" defaultValue={initialData?.lastUpdated} />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={handleClose}>Cancel</button>
            <button type="submit">{initialData ? 'Save Changes' : 'Add Template'}</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Modal; 