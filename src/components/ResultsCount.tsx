export default function ResultsCount({ count }: { count: number }) {
  return (
    <p className="count">
      <b>{count}</b> results
    </p>
  );
}
