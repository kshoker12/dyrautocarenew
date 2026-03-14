export default function TopArrow({ className = '', clickAction }) {
  return (
    <button
      type="button"
      className={`fixed bottom-2 right-2 p-2 rounded-full bg-primary-orange z-50 hover:bg-red-50 ease-in-out duration-200 active:bg-red-400 active:p-1 ${className}`}
      onClick={clickAction}
    >
      <i className="fa fa-arrow-up text-xl text-white px-1" />
    </button>
  );
}
