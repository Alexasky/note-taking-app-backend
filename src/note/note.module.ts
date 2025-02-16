import express from 'express';
import { createNote, getAllNotes, getNoteById, updateNote, deleteNote } from './note.controller';
import { authGuard } from '../auth/guards/auth.guard';


const noteRoutes = express.Router();

noteRoutes.post('/note/create', authGuard, createNote);
noteRoutes.get('/notes/:userId', authGuard, getAllNotes);
noteRoutes.get('/note/:noteId', authGuard, getNoteById);
noteRoutes.put('/note/:noteId', authGuard, updateNote);
noteRoutes.delete('/note/:noteId', authGuard, deleteNote);

export { noteRoutes };