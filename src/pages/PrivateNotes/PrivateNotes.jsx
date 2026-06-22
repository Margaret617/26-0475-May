import React, { useMemo } from 'react';
import notesData from '../../data/notes.json';
import './PrivateNotes.css';

const PrivateNotes = () => {
  const notes = useMemo(() => notesData, []);
  // ProtectedRoute handles authentication + redirect.
  // This page focuses only on rendering notes.

  return (
    <div className="private-notes-page">
      <div className="private-notes-header">
        <h1 className="section-title">Private Notes</h1>
        <p className="section-subtitle">Restoration logs and cost tracking</p>
      </div>

      <div className="private-notes-content">
        <div className="notes-summary">
          <div className="summary-card">
            <span className="summary-label">Total Notes</span>
            <span className="summary-value">{notes.length}</span>
          </div>
          <div className="summary-card">
            <span className="summary-label">Total Investment</span>
            <span className="summary-value">
              ${notes.reduce((total, note) => total + (note.cost || 0), 0).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="notes-list">
          {notes.map((note) => (
            <div key={note.id} className="note-item">
              <div className="note-header">
                <span className="note-date">{note.date}</span>
                <span className="note-category">{note.category}</span>
              </div>
              <h3>{note.title}</h3>
              <p className="note-content">{note.content}</p>
              {note.cost && (
                <div className="note-cost">
                  <span>Cost: ${note.cost.toLocaleString()}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivateNotes;