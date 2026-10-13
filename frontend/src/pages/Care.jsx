// экран ухода содержит личную коллекцию растений и календарь задач.
import { useState } from 'react'; // useState хранит выбранную вкладку.
import Placeholder from '../components/Placeholder.jsx'; // заглушка показывает место будущей фотографии.

export default function Care({ go, demoUser, plants, notify }) {
  // по умолчанию открываем календарь, но ни один день в нём не выбран.
  const [tab, setTab] = useState('calendar');

  return (
    <main className="page care-page">
      {/* заголовок помогает понять, что пользователь находится в личном разделе ухода. */}
      <div className="page-heading">
        <h1>Уход за растением</h1>
      </div>

      {/* левая колонка показывает личные растения и кнопку добавления. */}
      <div className="care-dashboard">
        <aside className="my-plants">
          <h2>Мои растения</h2>
          {demoUser && plants.length ? (
            plants.slice(0, 4).map((plant) => (
              <button key={plant.id} className="my-plant-item">
                <Placeholder label="" />
                <span>{plant.name}</span>
              </button>
            ))
          ) : (
            <div className="care-empty">
              <p>{demoUser ? 'У вас пока нет добавленных растений.' : 'Войдите в демонстрационный аккаунт, чтобы попробовать личный раздел.'}</p>
              {!demoUser && (
                <button className="olive-button" onClick={() => go('login')}>
                  Войти
                </button>
              )}
            </div>
          )}
          {/* пока нет личных записей, предлагаем перейти к каталогу, а не создаём растение автоматически. */}
          <button className="add-plant-button" onClick={() => plants.length ? notify('Выберите растение из каталога, чтобы продолжить.') : go('catalog')}>
            ＋ Добавить растение
          </button>
        </aside>

        {/* правая колонка переключает список растений и календарь ухода. */}
        <section className="care-main">
          <div className="care-tabs">
            <button className={tab === 'plants' ? 'active' : ''} onClick={() => setTab('plants')}>Мои растения</button>
            <button className={tab === 'calendar' ? 'active' : ''} onClick={() => setTab('calendar')}>Календарь ухода</button>
          </div>

          {tab === 'calendar' ? (
            <>
              {/* дни недели не выделяются заранее: расписания пользователя пока нет. */}
              <div className="calendar-box">
                <div className="calendar-week">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                    <button key={day} onClick={() => notify(`Выбран день: ${day}`)}>
                      {day}
                      <strong>—</strong>
                    </button>
                  ))}
                </div>
                <div className="calendar-note">
                  <h3>Календарь ухода</h3>
                  <p>Пока нет запланированных задач. Добавьте растение, чтобы составить расписание ухода.</p>
                  <button className="olive-button" onClick={() => go('catalog')}>Выбрать растение</button>
                </div>
              </div>

              {/* история останется пустой до появления реальных записей об уходе. */}
              <div className="care-history">
                <h3>История ухода</h3>
                <div className="care-history-empty">История появится после выполнения первых задач по уходу.</div>
              </div>
            </>
          ) : (
            <div className="care-empty larger">
              <h3>Мои растения</h3>
              <p>У вас пока нет добавленных растений.</p>
              <button className="olive-button" onClick={() => go('catalog')}>Открыть каталог</button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
