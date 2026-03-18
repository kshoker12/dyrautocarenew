export default function HeaderSubText({ className = '', children }) {
  return <div className={`text-center text-gray-600 ${className}`}>{children}</div>;
}
