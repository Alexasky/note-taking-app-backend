
import { pool } from '../config/postgres.config';
import { CreateNoteDTO } from './dto/create-note.dto';
import { UpdateNoteDTO } from './dto/update-note.dto';
import { Note } from './note.model';

export class NoteService {

  async createNote(dto: CreateNoteDTO): Promise<Note> {
    const { title, content, userId } = dto;

    const result = await pool.query(
      `INSERT INTO notes (title, content, "userId") 
       VALUES ($1, $2, $3) RETURNING *`,
      [title, content, userId]
    );

    return result.rows[0];
  }

  async getAllNotes(userId: number): Promise<Note[]> {
    const result = await pool.query(
      `SELECT * FROM notes WHERE "userId" = $1`,
      [userId]
    );
    return result.rows;
  }

  async getNoteById(noteId: number): Promise<Note> {
    const result = await pool.query(
      `SELECT * FROM notes WHERE id = $1`,
      [noteId]
    );

    if (result.rows.length === 0) {
      throw new Error('Note not found');
    }

    return result.rows[0];
  }

  async updateNote(
    noteId: number,
    dto: UpdateNoteDTO
  ): Promise<Note> {
    const { title, content } = dto;

    const result = await pool.query(
      `UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *`,
      [title, content, noteId]
    );

    if (result.rows.length === 0) {
      throw new Error('Note not found');
    }

    return result.rows[0];
  }

  async deleteNote(noteId: number): Promise<void> {
    const result = await pool.query(
      `DELETE FROM notes WHERE id = $1`,
      [noteId]
    );

    if (result.rowCount === 0) {
      throw new Error('Note not found');
    }
  }
}