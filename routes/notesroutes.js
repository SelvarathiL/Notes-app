const express = require('express');
const router = express.Router();
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
} = require('../controllers/notescontroller');

function requireLogin(req,res,next){
    if (!req.session.user){
        return res.status(401).json({ message:'Not logged in' });
    }
    next();
}

router.use(requireLogin);

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;