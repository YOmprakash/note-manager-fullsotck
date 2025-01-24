import axios from 'axios';

const API = 'https://note-manager-backend-nkea.onrender.com/api';
// const API = 'http://localhost:5000/api';
export const fetchNotes = () => axios.get(`${API}/notes`);
export const createNote = (note) => axios.post(`${API}/notes`, note);
export const updateNote = (id, note) => axios.put(`${API}/notes/${id}`, note);
export const deleteNote = (id) => axios.delete(`${API}/notes/${id}`);