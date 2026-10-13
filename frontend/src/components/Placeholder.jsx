// заглушка сохраняет место под фотографию или иллюстрацию, которую добавят позже.
export default function Placeholder({ label = 'Место для изображения', className = '' }) {
  return (
    <div className={`image-placeholder ${className}`}>
      {/* декоративный круг сохраняет оформление пустой области из макета. */}
      <span className="placeholder-circle" />
      {/* подпись помогает понять, какой файл нужно будет добавить. */}
      <small>{label}</small>
    </div>
  );
}
