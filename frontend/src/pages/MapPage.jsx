// карта магазинов содержит поиск и место для будущей интерактивной карты.
import Placeholder from '../components/Placeholder.jsx'; // показывает пустое место вместо выдуманной карты.
import AssetSlot from '../components/AssetSlot.jsx'; // подставляет пользовательскую иконку поиска из assets.

export default function MapPage({ city, setCity }) {
  return (
    <main className="page map-page">
      {/* заголовок описывает поиск торговых точек и товаров. */}
      <div className="page-heading">
        <h1>Карта магазинов</h1>
        <p>Поиск товаров, локаций и магазинов рядом с вами.</p>
      </div>

      {/* фильтры расположены отдельно от области будущей карты. */}
      <div className="map-layout">
        <aside className="map-filters">
          <h2>Поиск товаров</h2>
          <label className="field-search">
            <AssetSlot name="search" className="search-icon-placeholder" label="Место для иконки поиска" />
            <input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Поиск по товарам..." />
          </label>
          <h3>Список магазинов</h3>
          <div className="shop-empty">
            <strong>Магазинов пока нет</strong>
            <p>Список появится после добавления реальных данных.</p>
          </div>
        </aside>

        {/* карта пока обозначена заглушкой; настоящие координаты будут приходить из базы. */}
        <div className="map-placeholder">
          <Placeholder label="Здесь будет карта магазинов" />
          <p>Карта и отметки магазинов будут добавлены позже.</p>
        </div>
      </div>
    </main>
  );
}
