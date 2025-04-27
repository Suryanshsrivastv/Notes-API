const express = require('express');
const { postNotes } = require('../functions/post_notes');
const { getNotes } = require('../functions/get_notes');
const { deleteNote } = require('../functions/delete_note');
const { updateNote } = require('../functions/update_note');

const router = express.Router();

router.post('/notes', postNotes);

router.get('/notes', getNotes);

router.put('/notes/:id', updateNote);

router.delete('/notes/:id', deleteNote);

module.exports = router;