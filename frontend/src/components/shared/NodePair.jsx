// NodePair — фірмовий знак: дві точки, з'єднані тонкою кривою.
export const NodePair = ({ width = 26, muted = false, className = "" }) => {
  const h = Math.round(width * 12 / 26);
  return (
    <svg
      width={width}
      height={h}
      viewBox="0 0 26 12"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M 3 9 C 9 3, 17 3, 23 9"
        fill="none"
        stroke={muted ? "hsl(30, 10%, 62%)" : "hsl(30, 10%, 40%)"}
        strokeWidth="1"
      />
      <circle cx="3" cy="9" r="2.5" fill={muted ? "hsl(28, 18%, 55%)" : "hsl(28, 28%, 38%)"} />
      <circle cx="23" cy="9" r="2" fill={muted ? "hsl(30, 8%, 50%)" : "hsl(30, 10%, 30%)"} />
    </svg>
  );
};
