export type ErrorMessageProps = {
  message?: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  return <span className="text-sm text-red-500">{message}</span>;
}
