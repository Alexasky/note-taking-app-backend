import { Request, Response } from 'express';
import { NoteService } from './note.service';
import { CreateNoteDTO } from './dto/create-note.dto';
import { UpdateNoteDTO } from './dto/update-note.dto';
import { NOTE_NOT_FOUND_ERROR, USER_ID_INVALID_ERROR } from './note.constant';

const noteService = new NoteService();

export const createNote = async (req: Request, res: Response) => {
  try {
    const dto: CreateNoteDTO = req.body;
    const note = await noteService.createNote(dto);
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: USER_ID_INVALID_ERROR });
  }
};

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const notes = await noteService.getAllNotes(userId);
    res.status(200).json(notes);
  } catch (error) {
   	res.status(400).json({ error: USER_ID_INVALID_ERROR });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const noteId = parseInt(req.params.noteId);
    const note = await noteService.getNoteById(noteId);
    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ error: NOTE_NOT_FOUND_ERROR });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const noteId = parseInt(req.params.noteId);
    const dto: UpdateNoteDTO = req.body;
    const updatedNote = await noteService.updateNote(noteId, dto);
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(404).json({ error: NOTE_NOT_FOUND_ERROR });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const noteId = parseInt(req.params.noteId);
    await noteService.deleteNote(noteId);
    res.json({ id: noteId }); 
  } catch (error) {
    res.status(404).json({ error: NOTE_NOT_FOUND_ERROR });
  }
};