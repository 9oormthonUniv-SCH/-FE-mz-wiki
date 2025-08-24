const MagnifierIcon = ({ size = 24, color = "#333", className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    className={className}
  >
    <circle cx="22" cy="22" r="14" stroke={color} strokeWidth="3" fill="none" />
    <line
      x1="33"
      y1="31.2"
      x2="45.8"
      y2="42"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export default MagnifierIcon;
