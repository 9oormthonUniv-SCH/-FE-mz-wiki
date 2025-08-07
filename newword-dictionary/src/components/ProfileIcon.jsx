const ProfileIcon = ({ size = 48, color = "#000" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
  >
    <circle cx="24" cy="14" r="8" stroke={color} strokeWidth="3" fill="none" />

    <path
      d="M12 40c0-6.6 5.4-12 12-12s12 5.4 12 12"
      stroke={color}
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);
export default ProfileIcon;
