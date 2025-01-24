import React, { useState, useEffect, useRef } from 'react';
import NoteList from './components/NoteList';
import Form from './components/Form';
import SearchBar from './components/SeachBar';
import { fetchNotes } from './api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    async function getNotes() {
      setIsLoading(true);
      try {
        const response = await fetchNotes();
        setNotes(response.data);
        setFilteredNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
        toast.error('Failed to fetch notes.');
      } finally {
        setIsLoading(false);
      }
    }
    getNotes();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    setIsSearching(true);

    const timerId = setTimeout(() => {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(lowerSearch) ||
          note.category.toLowerCase().includes(lowerSearch)
      );
      setFilteredNotes(filtered);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timerId);
  }, [search, notes]);

  const handleSearchFocus = () => {
    searchInputRef.current.focus();
  };

  return (
    <div className="min-h-screen bg-orange-200 p-4 text-white">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-6 text-teal-900">
        Personal Notes Manager
      </h1>
      <SearchBar
        search={search}
        setSearch={setSearch}
        onFocus={handleSearchFocus}
        ref={searchInputRef}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Form
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          notes={notes}
          setNotes={setNotes}
        />
        <NoteList
          notes={filteredNotes}
          setNotes={setNotes}
          setSelectedNote={setSelectedNote}
          isLoading={isLoading}
          isSearching={isSearching}
          search={search}
        />
      </div>
    </div>
  );
}

export default App;