// форма входа нужна для демонстрации пользовательского сценария.
import { useState } from 'react'; // храним значения полей и сообщение об ошибке.

export default function Login({ onLogin, onRegister }) {
  // состояние полей обновляется при вводе текста пользователем.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // проверяем обязательные поля и передаём данные в демонстрационный обработчик.
  const submit = (event) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError('Заполните email и пароль.');
      return;
    }
    onLogin({ email, name: email.split('@')[0] });
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h1>Вход</h1>
        <label>Email
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Введите email" required />
        </label>
        <label>Пароль
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Введите пароль" required />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="olive-button auth-submit">Войти</button>
        <small>Нет аккаунта? <button type="button" onClick={onRegister}>Регистрация</button></small>
        <p className="demo-note">Демонстрационный вход: данные не сохраняются и не отправляются на сервер.</p>
      </form>
    </main>
  );
}
