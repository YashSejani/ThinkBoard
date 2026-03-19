import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrowLeft, Plus, Loader2 } from 'lucide-react';

const CreatePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/notes', { title: title.trim(), content: content.trim() });
      toast.success('Note created successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create note');
      console.error('Create error:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-2xl font-bold tracking-tight mb-6">Create a New Note</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Title</span>
              </label>
              <input
                type="text"
                placeholder="Give your note a title…"
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
                placeholder="Write your thoughts here…"
                className="textarea textarea-bordered w-full h-48 resize-y focus:textarea-primary"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full gap-2"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {loading ? 'Creating…' : 'Create Note'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
