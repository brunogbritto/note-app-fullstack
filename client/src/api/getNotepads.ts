import { api } from "./api";
import { Notepad } from "../../../shared/types";

type GetNotepadsInput = {
  limit?: number;
  offset?: number;
  search?: string;
  order_by?: string;
  direction?: string;
};

export type GetNotepadsOutput = {
  count: number;
  notepads: Notepad[];
};

export async function getNotepads(
  params: GetNotepadsInput = {}
): Promise<GetNotepadsOutput> {
  const res = await api.get("/notepads", {
    params,
  });
  const { count, notepads } = res.data;
  console.log(res.data);
  return { count: count || 0, notepads: notepads || [] };
}
