export default function PrimaryButton({ className = '', disabled, children, ...props }) {
  return (
    <button
      type="button"
      className={`${className} inline-flex items-center px-4 py-2 bg-gray-800 border-transparent rounded-lg font-semibold text-xs uppercase tracking-widest hover:bg-opacity-0 border-[1px] border-primary-orange hover:border-white focus:bg-gray-750 active:bg-gray-900 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-400 ${disabled ? 'opacity-25' : ''} `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
