// шапка сайта содержит логотип, переходы между страницами и вход в профиль.
export default function Header({ page, go, demoUser }) {
  // пункты навигации собраны в массив, чтобы разметка не дублировалась.
  const items = [
    ['catalog', 'Каталог'],
    ['care', 'Уход за растением'],
    ['diagnostics', 'Диагностика'],
    ['map', 'Карта магазинов'],
    ['community', 'Сообщество'],
  ];

  return (
    <header className="site-header">
      {/* нажатие на логотип всегда возвращает на главную. */}
      <button className="brand" onClick={() => go('home')} aria-label="Florup — главная">
        <span className="brand-icon-placeholder" />
        <span>FLORUP</span>
      </button>
      {/* активный пункт получает класс active для подсветки в стилях. */}
      <nav className="main-nav" aria-label="Основная навигация">
        {items.map(([id, label]) => (
          <button key={id} className={page === id ? 'nav-link active' : 'nav-link'} onClick={() => go(id)}>{label}</button>
        ))}
      </nav>
      {/* текст кнопки зависит от того, вошёл ли пользователь в демонстрационный аккаунт. */}
      <button className="header-account" onClick={() => go(demoUser ? 'profile' : 'login')}>
        {demoUser ? 'Профиль' : 'Войти'}
      </button>
      {demoUser && <button className="header-avatar-placeholder" title="Открыть профиль" onClick={() => go('profile')} aria-label="Профиль" />}
    </header>
  );
}
