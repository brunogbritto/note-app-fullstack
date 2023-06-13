import path from "path";
import * as json from "../json";
import type { Notepad } from "../../../shared/types";
import { getPool, sql } from "../database";
import { createNotepadSchema } from "./schemas/createNotepad.schema";

type FindNotepadsParams = {
  limit?: number;
  offset?: number;
  order_by?: string;
  direction?: string;
};

const notepadModelPath = path.join("src", "notepad", "notepadModel");
const notepadModelDataPath = path.join(notepadModelPath, "data");

export async function findNotepadById(id: number) {
  const pool = await getPool();
  try {
    const notepad: Notepad = await pool.one(sql`
    select * from notepads
    where id = ${id}`);
    return notepad;
  } catch {
    return null;
  }
}

export async function findNotepadCommentsById(
  notepadId: number
): Promise<Comment[]> {
  const pool = await getPool();
  const comments = (await pool.many(sql`
    SELECT * from comments
    WHERE notepad_id = ${notepadId}
    ORDER BY created_at desc
  `)) as any;
  return comments;
}

export async function findNotepads({
  limit = 10,
  offset = 0,
  order_by = "created_at",
  direction = "desc",
}: FindNotepadsParams = {}) {
  const pool = await getPool();
  const notepads = await pool.many(sql`
    SELECT * from notepads
    LIMIT ${limit} offset ${offset}
    
  
  `);
  return {
    count: 0,
    notepads,
  };
}

export async function deleteNotepadById(id: number) {
  const pool = await getPool();
  const notepad = await findNotepadById(id);
  const results = await pool.query(sql`
  delete from notepads where id = ${id}`);

  const success = results.rowCount === 1;
  return {
    success,
    notepad,
  };
}

export async function updateNotepadById(
  id: number,
  { title, subtitle, content }: Notepad
) {
  const pool = await getPool();
  const notepad = await pool.one(sql`
   UPDATE notepads 
   SET title=${title}, subtitle=${subtitle}, content=${content}
   WHERE id =${id}
   returning *
  `);

  return {
    success: true,
    notepad,
  };
}

export async function createNotepad(
  notepadData: Omit<Notepad, "id" | "created_at">
) {
  const validation = await createNotepadSchema.safeParseAsync(notepadData);
  if (validation.success === false) {
    return {
      success: false,
      notepad: null,
      errors: validation.error.errors,
    };
  }

  const { title, subtitle, content } = validation.data;
  const pool = await getPool();
  const notepad: Notepad = await pool.one(sql`
    INSERT INTO notepads (title, subtitle, content)
    values (${title}, ${subtitle}, ${content})
    returning *
  `);

  return {
    success: true,
    notepad,
    errors: [],
  };
}

export function overwriteNotepadById(id: number, notepadData: Notepad) {
  const notepad = {
    ...notepadData,
    id,
  };
  json.overwriteJSON([notepadModelDataPath, `${id}.json`], notepad);

  const response = {
    success: true,
    data: { notepad },
  };

  return response;
}
