# Notes API

A minimal RESTful Notes service built using **Express.js** and **Supabase**.

---

## Features

- Create new notes
- Fetch all notes
- Update an existing note
- Delete a note
- Time Stamping for each note
- Full error handling

---

##  Setup & Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Suryanshsrivastv/Notes-API.git
    cd <your-project-folder>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file at the root:

    ```env
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_anon_or_service_role_key
    PORT=3000
    ```

4. Run the server:

    ```bash
    node index.js
    ```

Server will run on `http://localhost:3000`.

---

##  Database Schema

**File:** `schema.sql`

```sql
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc', now())
);
```

## Why This Design Choice?

- **UUIDs for Unique Identification**: Ensures globally unique identifiers for each note and user, which is reliable for scaling.
- **TEXT Fields for Note Content**: Provides flexibility to store notes of varying sizes without constraints.
- **Automatic UTC Timestamps**: Tracks creation and updates consistently across time zones, ensuring accuracy and scalability.
- **Developer-Friendly Design**: Simplifies handling and reduces the need for manual configurations or additional operations.


## One-Line "Why?" Comments for Each Endpoint

- **post_notes.js**  
  `// POST /notes - Using POST because we are creating a new note based on request body input.`

- **get_notes.js**  
  `// GET /notes - Using GET to retrieve all existing notes without modifying any data.`

- **update_note.js**  
  `// PUT /notes/:id - Using PUT to fully update an existing note by its unique ID.`

- **delete_note.js**  
  `// DELETE /notes/:id - Using DELETE to permanently remove a specific note by its unique ID.`

## Sample Curl Requests

# 1. Post Request
``` curl
curl -X POST http://localhost:3000/api/notes \
-H "Content-Type: application/json" \
-d '{"title": "Meeting Notes", "content": "Discussed project milestones."}'
```

# Expected Response
```json
{
  "data": [
    {
      "id": "generated-uuid-here",
      "title": "My first note",
      "content": "This is the content of my first note.",
      "created_at": "2025-04-27T10:30:00.000Z"
    }
  ]
}
```
# 2. Get Request
```curl
curl -X GET https://localhost:3000/api/notes
```

# Expected Response
```json
{
  "data": [
    {
      "id": "66b5fa7a-ea80-4524-96df-cf8d1b2c3694",
      "title": "My first note",
      "content": "This is the content of my first note.",
      "created_at": "2025-04-27T10:30:00.000Z"
    }
  ]
}
```

# 3. Put Request
```curl
curl -X PUT https://localhost:3000/api/notes/<note-id> \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated title", "content": "Updated content"}'
```
# Expected Response
```json
{
  "data": [
    {
      "id": "66b5fa7a-ea80-4524-96df-cf8d1b2c3694",
      "title": "Updated title",
      "content": "Updated content",
      "created_at": "2025-04-27T10:30:00.000Z"
      "updated_at": "2025-04-27T10:30:00.000Z"
    }
  ]
}
```
# 4. Delete Request
```curl
curl -X DELETE https://localhost:3000/api/notes/66b5fa7a-ea80-4524-96df-cf8d1b2c3694
```

# Expected Response
```json
{
  "message": "Note deleted successfully"
}
```


