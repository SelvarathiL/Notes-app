const ConnectDB = require('../db');

// Get all notes of logged-in user
exports.getAllNotes = async (req, res) => {
  try {
    const db = await ConnectDB();
    const [notes] = await db.execute(
      'SELECT * FROM note WHERE userid = ? ORDER BY updated_at DESC',
      [req.session.user.id]
    );
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
};

// Get a specific note
exports.getNoteById = async (req, res) => {
  console.log(req.session.user.id);
  const noteId = req.params.id;
  try {
    const db = await ConnectDB();
    const [rows] = await db.execute(
      'SELECT * FROM note WHERE id = ? AND userid = ?',
      [noteId, req.session.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Note not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching note' });
  }
};

// Create a new note
exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const db = await ConnectDB();
    await db.execute(
      'INSERT INTO note (title, content, userid) VALUES (?, ?, ?)',
      [title, content, req.session.user.id]
    );
    res.status(201).json({ message: 'Note created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating note' });
  }
};

// Update a note
exports.updateNote = async (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;
  try {
    const db = await ConnectDB();
    const [result] = await db.execute(
      'UPDATE note SET title = ?, content = ? WHERE id = ? AND userid = ?',
      [title, content, noteId, req.session.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Note not found or not yours' });
    res.json({ message: 'Note updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating note' });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    const db = await ConnectDB();
    const [result] = await db.execute(
      'DELETE FROM note WHERE id = ? AND userid = ?',
      [noteId, req.session.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Note not found or not yours' });
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting note' });
  }
};
