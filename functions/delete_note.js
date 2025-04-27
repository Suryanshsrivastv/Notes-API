// DELETE /notes/:id - Using DELETE to permanently remove a specific note by its unique ID.
// This function will handle the deletion of a note from the Supabase database based on the provided ID in the request parameters.
// It will validate the request method and the presence of the ID parameter.
const { createClient } = require('@supabase/supabase-js');

async function deleteNote(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Note ID is required.' });
  }

  try {
    const { data, error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    return res.status(200).json({ message: 'Note deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { deleteNote };
