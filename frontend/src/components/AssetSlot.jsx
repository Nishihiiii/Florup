// компонент автоматически ищет локальную иконку с нужным именем и расширением.
import { useState } from 'react'; // useState хранит найденное расширение и состояние загрузки.

// поддерживаемые форматы для иконок интерфейса.
const EXTENSIONS = ['svg', 'png', 'webp', 'jpg', 'jpeg'];

export default function AssetSlot({ name, className = '', label = '' }) {
  // индекс указывает, какой формат проверяется сейчас.
  const [extensionIndex, setExtensionIndex] = useState(0);
  // загруженная иконка убирает визуальную заглушку.
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={`asset-slot ${className} ${loaded ? 'asset-slot-loaded' : ''}`} role="img" aria-label={label}>
      {/* пока файл не найден, отображается пустая область нужного размера. */}
      {!loaded && <span className="asset-slot-fallback" aria-hidden="true" />}
      {/* при ошибке загрузки пробуем следующее расширение, не меняя имя файла. */}
      {extensionIndex < EXTENSIONS.length && (
        <img
          src={`/assets/icons/${name}.${EXTENSIONS[extensionIndex]}`}
          alt=""
          onLoad={() => setLoaded(true)}
          onError={() => setExtensionIndex((index) => index + 1)}
        />
      )}
    </span>
  );
}
