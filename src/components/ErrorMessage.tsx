interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="mt-3 mb-4 text-center text-destructive">
      <p>😱 {message}</p>
    </div>
  );
};
