const { createClient } = require('@supabase/supabase-js');

async function postNotes(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const { data, error } = await supabase
      .from('notes')
      .insert([{ title, content }])
      .select();

    if (error) {
      throw error;
    }

    return res.status(201).json({ data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { postNotes };
