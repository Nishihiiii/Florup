// подвал завершает страницу, показывает контакты проекта и дополнительные переходы.
export default function Footer({ go }) {
  // небольшая функция создаёт одинаково оформленные кнопки навигации.
  const link = (label, target) => (
    <button key={label} onClick={() => go(target)}>
      {label}
    </button>
  );

  return (
    <footer className="site-footer">
      {/* слева находится логотип и краткое описание сервиса. */}
      <div className="footer-brand-block">
        <div className="footer-logo-row">
          <span className="footer-logo-placeholder" />
          <strong>FLORUP</strong>
        </div>
        <p>Ваш персональный интерактивный путеводитель по выращиванию и уходу за комнатными растениями.</p>
      </div>

      {/* в этой колонке собраны основные разделы приложения. */}
      <div className="footer-column">
        <h3>Навигация</h3>
        {link('Главная страница', 'home')}
        {link('Каталог растений', 'catalog')}
        {link('Диагностика болезней', 'diagnostics')}
        {link('Карта магазинов', 'map')}
      </div>

      {/* контактные данные пока статические и при необходимости заменяются на реальные. */}
      <div className="footer-column">
        <h3>Контакты</h3>
        <a href="tel:+79533452434">Телефон: +7 (953)-345-24-34</a>
        <a href="mailto:fporUp@gmail.com">Почта: fporUp@gmail.com</a>
        <span>Адрес офиса: г. Новосибирск, Красный проспект, д. 72</span>
      </div>

      {/* ссылки ведут на главные страницы социальных сетей как временные адреса. */}
      <div className="footer-column">
        <h3>Соцсети</h3>
        <a href="https://vk.com" target="_blank" rel="noreferrer">Вконтакте</a>
        <a href="https://telegram.org" target="_blank" rel="noreferrer">Телеграмм</a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer">Youtube</a>
      </div>
    </footer>
  );
}
