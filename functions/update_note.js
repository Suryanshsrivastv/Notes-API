// PUT /notes/:id - Using PUT to fully update an existing note by its unique ID.
// This function will handle the update of a note in the Supabase database based on the provided ID in the request parameters.
const { createClient } = require('@supabase/supabase-js');

async function updateNote(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id } = req.params;
  const { title, content } = req.body;

  if (!id || !title || !content) {
    return res.status(400).json({ error: 'ID, title, and content are required.' });
  }

  try {
    const { data, error } = await supabase
      .from('notes')
      .update({ title, content})
      .eq('id', id)
      .select();

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { updateNote };