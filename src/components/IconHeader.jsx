export default function IconHeader({ title, className = '', icon }) {
  return (
    <h2 className={` ${className} text-4xl p-4 font-bold `}>
      <i className={`${icon} mr-4`} />
      {title}
    </h2>
  );
}
