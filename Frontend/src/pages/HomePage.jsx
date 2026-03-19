import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import { FileText, Loader2 } from 'lucide-react';

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get('/api/notes');
      setNotes(res.data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (deletedId) => {
    setNotes((prev) => prev.filter((note) => note._id !== deletedId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Notes</h1>
        <p className="text-base-content/60 mt-1">
          {notes.length} {notes.length === 1 ? 'note' : 'notes'} saved
        </p>
      </div>

      {notes.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
          <div className="bg-base-200 rounded-full p-6 mb-4">
            <FileText className="w-12 h-12 text-base-content/30" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No notes yet</h2>
          <p className="text-base-content/50 max-w-md">
            Start capturing your thoughts by creating your first note.
          </p>
        </div>
      ) : (
        /* Notes grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;