export default function HeaderSubText({ className = '', children }) {
  return <p className={`text-center text-gray-600 ${className}`}>{children}</p>;
}
