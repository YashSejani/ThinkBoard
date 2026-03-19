import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`/api/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        toast.error('Failed to load note');
        console.error('Fetch error:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setSaving(true);
    try {
      await axios.put(`/api/notes/${id}`, { title: title.trim(), content: content.trim() });
      toast.success('Note updated successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to update note');
      console.error('Update error:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Back link */}
      <Link to="/" className="btn btn-ghost btn-sm gap-2 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Notes
      </Link>

      {/* Form card */}
      <div className="card bg-base-200 border border-base-300 shadow-lg">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight mb-6">Edit Note</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Title</span>
              </label>
              <input
                type="text"
                placeholder="Note title…"
                className="input input-bordered w-full focus:input-primary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Content */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Content</span>
              </label>
              <textarea
                placeholder="Note content…"
                className="textarea textarea-bordered w-full h-48 resize-y focus:textarea-primary"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full gap-2"
              disabled={saving}
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;