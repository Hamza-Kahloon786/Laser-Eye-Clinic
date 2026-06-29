export default function Badge({ status }) {
  const cls = {
    'Scheduled':   'badge badge-scheduled',
    'Completed':   'badge badge-completed',
    'Cancelled':   'badge badge-cancelled',
    'In Progress': 'badge badge-inprogress',
  }[status] || 'badge badge-scheduled';
  return (
    <span className={cls}>
      <span className="badge-dot" />
      {status}
    </span>
  );
}