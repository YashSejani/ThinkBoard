import React from 'react';
import { Link } from 'react-router';
import { Pencil, Trash2, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const NoteCard = ({ note, onDelete }) => {
  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await axios.delete(`/api/notes/${note._id}`);
      toast.success('Note deleted successfully');
      onDelete(note._id);
    } catch (error) {
      toast.error('Failed to delete note');
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="note-card">
      {/* Single color accent */}
      <div className="note-card-accent"></div>

      <div className="note-card-body">
        <h2 className="note-card-title">{note.title}</h2>
        <p className="note-card-content">{note.content}</p>

        <div className="note-card-divider"></div>

        {/* Date + actions all in one row */}
        <div className="note-card-footer">
          <span className="note-card-date">
            <Clock className="w-3.5 h-3.5" />
            {formattedDate}
          </span>

          <div className="note-card-actions">
            <Link to={`/note/${note._id}`} className="btn btn-outline btn-primary btn-sm gap-1.5">
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-outline btn-error btn-sm gap-1.5">
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
