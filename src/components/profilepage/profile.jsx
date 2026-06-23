import React, { useCallback, useMemo, useState } from 'react';
import PrivateNotes from '../../pages/PrivateNotes/PrivateNotes';
import { getSessionUserId, getUserRecord } from '../../utils/notesStore';

export default function ProfilePage() {
  const [showPrivateNotes, setShowPrivateNotes] = useState(false);

  const sessionUserId = getSessionUserId();

  const userRecord = useMemo(() => {
    if (!sessionUserId) return null;
    return getUserRecord(sessionUserId);
  }, [sessionUserId]);

  const handleOpenPrivateNotes = useCallback(() => {
    setShowPrivateNotes(true);
  }, []);

  const handleClosePrivateNotes = useCallback(() => {
    setShowPrivateNotes(false);
  }, []);

  const email = userRecord?.email;
  const memberSince = userRecord?.createdAt
    ? new Date(userRecord.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
      })
    : null;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>{email ? `Welcome back, ${email}` : 'Local-only profile'}</p>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Account Settings</h2>
          <div className="profile-info">
            <p>{email ? `Email: ${email}` : 'Email: —'}</p>
            <p>{memberSince ? `Member since: ${memberSince}` : 'Member since: —'}</p>
          </div>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h2>Private Notes</h2>
            {!showPrivateNotes && (
              <button className="btn-primary" onClick={handleOpenPrivateNotes} type="button">
                View Private Notes
              </button>
            )}
          </div>

          {showPrivateNotes ? (
            <PrivateNotes isProfilePage onClose={handleClosePrivateNotes} />
          ) : (
            <div className="notes-preview">
              <p>🔒 Your private notes are locked and encrypted.</p>
              <p className="hint">Click "View Private Notes" to unlock and manage them.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
