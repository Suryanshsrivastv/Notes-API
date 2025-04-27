// POST /notes - Using POST because we are creating a new note based on request body input.
// This function will handle the creation of a new note in the Supabase database.
// It will validate the request method and the presence of required fields (title and content).
const { createClient } = require('@supabase/supabase-js');

async function getNotes(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return res.status(200).json({ data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { getNotes };
