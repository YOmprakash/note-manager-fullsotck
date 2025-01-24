import React, { useState, useEffect } from 'react';
import { createNote, updateNote } from '../api/api';
import { toast } from 'react-toastify';

function NoteForm({ selectedNote, setSelectedNote, notes, setNotes }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Personal',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedNote) {
      setFormData(selectedNote);
    } else {
      setFormData({ title: '', description: '', category: 'Personal' });
    }
  }, [selectedNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (selectedNote) {
        const { _id, __v, createdAt, updatedAt, ...updatedNoteData } = formData;
        const response = await updateNote(selectedNote._id, updatedNoteData);
        setNotes(
          notes.map((note) =>
            note._id === selectedNote._id ? response.data : note
          )
        );
        toast.success('Note updated successfully!');
      } else {
        const response = await createNote(formData);
        setNotes([response.data, ...notes]);
        toast.success('Note added successfully!');
      }
      setFormData({ title: '', description: '', category: 'Personal' });
      setSelectedNote(null);
    } catch (error) {
      console.error('Error submitting note:', error);
      toast.error(
        selectedNote
          ? 'Failed to update note.'
          : 'Failed to add note.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-teal-800 rounded-lg shadow-lg h-[350px]"
    >
      <h2 className="mb-4 text-xl font-bold text-white">
        {selectedNote ? 'Edit Note' : 'Add Note'}
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full px-4 py-2 border-none rounded-lg bg-teal-700 text-white placeholder-light-orange-200 focus:outline-none focus:ring-2 focus:ring-mustard-400"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          className="w-full px-4 py-2 border-none rounded-lg bg-teal-700 text-white placeholder-light-orange-200 focus:outline-none focus:ring-2 focus:ring-mustard-400"
        />
      </div>
      <div className="mb-4">
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-4 py-2 border-none rounded-lg bg-teal-700 text-white focus:outline-none focus:ring-2 focus:ring-mustard-400"
        >
          <option value="Work" className="bg-teal-700 text-white">
            Work
          </option>
          <option value="Personal" className="bg-teal-700 text-white">
            Personal
          </option>
          <option value="Others" className="bg-teal-700 text-white">
            Others
          </option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2 text-white bg-[#e0b65c] rounded-lg hover:bg-mustard-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
            {selectedNote ? 'Updating...' : 'Adding...'}
          </div>
        ) : selectedNote ? (
          'Update Note'
        ) : (
          'Add Note'
        )}
      </button>
    </form>
  );
}

export default NoteForm;