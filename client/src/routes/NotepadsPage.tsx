import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../config";
import { getNotepads } from "../api/getNotepads";
import { Notepad } from "../../../shared/types";

const pageSize = config.pageSize;

const initialNotepadList = {
  count: 0,
  notepads: [] as Notepad[],
};

export function NotepadsPage() {
  const [notes, setNotes] = useState<{ count: number; notepads: Notepad[] }>(
    initialNotepadList
  );
  const params = useParams();
  const page = params.page === undefined ? 1 : +params.page;
  const limit = pageSize;
  const offset = pageSize * (page - 1);

  useEffect(() => {
    getNotepads({ limit, offset }).then((notepadList) => setNotes(notepadList));
  }, [params]);

  return <div>{params.page}</div>;
}
