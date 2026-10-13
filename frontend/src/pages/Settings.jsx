// настройки содержат переключатели интерфейса и действия демонстрационного аккаунта.
import { useState } from 'react'; // храним значения переключателей.

export default function Settings({ demoUser, go, logout, notify }) {
  // уведомления включены по умолчанию только в текущем состоянии интерфейса.
  const [notifications, setNotifications] = useState(true);
  // считываем текущую тему из класса на корневом html-элементе.
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('theme-dark'));

  return (
    <main className="page settings-page">
      <button className="back-link" onClick={() => go('profile')}>← Вернуться в профиль...</button>
      <div className="settings-panel">
        <h1>Настройки</h1>
        {/* первый ряд включает или выключает напоминания в интерфейсе. */}
        <div className="setting-row">
          <div><strong>Уведомления</strong><span>Напоминания об уходе за растениями</span></div>
          <button className={`toggle-switch ${notifications ? 'on' : ''}`} role="switch" aria-checked={notifications} onClick={() => setNotifications((value) => !value)}><span /></button>
        </div>
        {/* смена темы обновляет класс на html, после чего css применяет другую палитру. */}
        <div className="setting-row">
          <div><strong>Тема оформления</strong><span>Светлая или тёмная тема</span></div>
          <button className={`toggle-switch ${dark ? 'on' : ''}`} role="switch" aria-checked={dark} onClick={() => {
            setDark((value) => !value);
            document.documentElement.classList.toggle('theme-dark', !dark);
          }}><span /></button>
        </div>
        {/* строка аккаунта пока показывает демонстрационные данные. */}
        <div className="setting-row">
          <div><strong>Аккаунт</strong><span>{demoUser?.email || 'Демонстрационный аккаунт'}</span></div>
          <button className="setting-chevron" onClick={() => notify('Это демонстрационный аккаунт.')}>›</button>
        </div>
        {/* выход отображается только после демонстрационного входа. */}
        {demoUser && (
          <button className="setting-row logout-setting" onClick={logout}>
            <div><strong>Выйти из аккаунта</strong><span>Завершить текущий сеанс</span></div>
            <span className="setting-chevron">›</span>
          </button>
        )}
      </div>
    </main>
  );
}
