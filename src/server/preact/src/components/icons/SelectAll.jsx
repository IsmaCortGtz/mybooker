import "./styles.css";

export default function IconSelectAll() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-select-all"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 8m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" />

      {[
        [4, 4], [8, 4], [12, 4], [16, 4], [20, 4],
        [4, 8], [4, 12], [4, 16], [4, 20],
        [8, 20], [12, 20], [16, 20], [20, 20],
        [20, 16], [20, 12], [20, 8]
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="0.2" fill="currentColor" />
      ))}
    </svg>
  );
}
