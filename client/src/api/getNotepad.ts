import { api } from "./api";
import { Notepad } from "../../../shared/types";

type GetNotepadsOutput = {
  count: number;
  notepads: Notepad[];
};

export async function getNotepad(id: number): Promise<GetNotepadsOutput> {
  const res = await api.get(`/notepads/${id}`);
  const notepad = res.data;
  return notepad;
}
