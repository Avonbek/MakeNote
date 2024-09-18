interface EmptyStateProps {
  onNewDocument: () => void;
}

export default function EmptyState({ onNewDocument }: EmptyStateProps) {
  return (
    <div className="text-center">
      <p>No documents found.</p>
      <button onClick={onNewDocument}>Create New Document</button>
    </div>
  );
}
