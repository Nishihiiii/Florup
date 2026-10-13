// карточка растения показывает описание, требования к уходу и похожие записи из каталога.
import Placeholder from '../components/Placeholder.jsx';

export default function PlantDetails({ selectedPlant, setSelectedPlant, go, plants }) {
  // сначала используем выбранное растение; если перехода из каталога не было, берём первую запись.
  // берём выбранное растение или первую реальную запись каталога.
  const plant = selectedPlant || plants[0];
  // признак отличает тестовую карточку от данных, полученных из базы.
  const isPreview = Boolean(plant?.__preview);
  // похожие растения выбираются из существующего каталога без создания новых записей.
  const similarPlants = plants.filter((item) => item.id !== plant?.id).slice(0, 3);

  // пустое состояние показываем, когда база ещё не содержит доступных растений.
  if (!plant) {
    return (
      <main className="page plant-detail-page">
        {/* пустое состояние объясняет, почему карточка пока недоступна. */}
        <button className="back-link" onClick={() => go('catalog')}>← Вернуться в каталог</button>
        <div className="db-empty">
          <h2>Карточка растения пока недоступна</h2>
          <p>Подробная информация появится, когда в каталоге будут доступны растения.</p>
          <button className="olive-button" onClick={() => go('catalog')}>В каталог</button>
        </div>
      </main>
    );
  }

  return (
    <main className="page plant-detail-page">
      <button className="back-link" onClick={() => go('catalog')}>← Вернуться в каталог</button>
      {/* основная часть карточки: фотография слева, сведения о растении справа. */}
      <div className="plant-detail-top">
        <div className="plant-detail-photo plant-photo-portrait">
          {plant.image_url || plant.imageUrl
            ? <img src={plant.image_url || plant.imageUrl} alt={plant.name} />
            : <Placeholder label="Место для фотографии растения" className="plant-photo-placeholder" />}
        </div>
        <div className="plant-detail-copy">
          {!isPreview && <div className="detail-tags"><span /> <span /></div>}
          <h1>{isPreview ? 'Растение' : plant.name}</h1>
          {!isPreview && (plant.latin_name || plant.latinName) && <p className="latin">{plant.latin_name || plant.latinName}</p>}
          {!isPreview && plant.description && <p>{plant.description}</p>}
        </div>
      </div>

      {/* рекомендации выводятся отдельными карточками, чтобы их можно было читать по разделам. */}
      <h2 className="section-title">Требования к уходу</h2>
      <div className="care-requirements">
        {[
          ['Полив', plant.care_watering_text || plant.watering],
          ['Освещение', plant.care_lighting_text || plant.lighting],
          ['Температура', plant.care_temp_text || plant.temperature],
          ['Влажность', plant.care_humidity_text || plant.humidity],
        ].map(([title, text]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text || ''}</p>
          </article>
        ))}
      </div>

      {/* похожие растения берутся из каталога, а не создаются как фиктивные записи. */}
      <h2 className="section-title">Похожие растения</h2>
      {similarPlants.length ? (
        <div className="similar-plants-grid catalog-grid">
          {similarPlants.map((similar) => (
            <button className="catalog-plant-card" key={similar.id} onClick={() => { setSelectedPlant(similar); go('plant'); window.scrollTo({ top: 0, behavior: 'instant' }); }}>
              <div className="catalog-plant-image">
                {similar.image_url || similar.imageUrl
                  ? <img src={similar.image_url || similar.imageUrl} alt={similar.name} />
                  : <div className="db-image-placeholder" aria-label="Место для фотографии" />}
              </div>
              <strong>{similar.name}</strong>
              <small>{similar.latin_name || similar.latinName || ''}</small>
              <span className="plant-card-pill">В каталог</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="similar-plants-grid catalog-grid">
          <div className="catalog-plant-card similar-empty-card" aria-label="Место для похожего растения">
            <div className="catalog-plant-image"><div className="db-image-placeholder" /></div>
            <strong aria-hidden="true">&nbsp;</strong>
            <small aria-hidden="true">&nbsp;</small>
          </div>
        </div>
      )}
    </main>
  );
}
