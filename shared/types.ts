export type Notepad = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  created_at: string;
  count: number;
};

export type Comment = {
  id: number;
  notepad_id: number;
  created_at: string;
  message: string;
};
