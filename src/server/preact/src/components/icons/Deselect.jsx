import "./styles.css";

export default function IconDeselect() {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-deselect"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 8h3a1 1 0 0 1 1 1v3" />
      <path d="M16 16h-7a1 1 0 0 1 -1 -1v-7" />
      <path d="M3 3l18 18" />

      {[
        [8, 4], [12, 4], [16, 4], [20, 4],
        [4, 8], [4, 12], [4, 16], [4, 20],
        [8, 20], [12, 20], [16, 20],
        [20, 16], [20, 12], [20, 8]
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="0.2" fill="currentColor" />
      ))}
    </svg>
  );
}
