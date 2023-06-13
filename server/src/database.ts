import { createPool, sql as sqlObj, DatabasePool } from "slonik";

export const sql = sqlObj.unsafe;

let pool: DatabasePool;
export async function getPool() {
  if (pool === undefined) {
    pool = await createPool("postgres://aluno:infnet123@142.93.174.194/bgb_sn");
  }
  return pool;
}
