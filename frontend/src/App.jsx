// главный компонент связывает страницы, навигацию, данные API и демонстрационный вход.
import { useEffect, useState } from 'react';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import PlantDetails from './pages/PlantDetails.jsx';
import Care from './pages/Care.jsx';
import Diagnostics from './pages/Diagnostics.jsx';
import MapPage from './pages/MapPage.jsx';
import Community from './pages/Community.jsx';
import Profile from './pages/Profile.jsx';
import ProfileEdit from './pages/ProfileEdit.jsx';
import Settings from './pages/Settings.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// адрес backend задаётся через переменную окружения; локальный адрес используется для разработки.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
// названия основных разделов собраны в одном месте, чтобы их было легко менять.
// состояние приложения хранится здесь и передаётся нужным страницам через props.
export default function App() {
  // текущий экран приложения, который выбирается через внутреннюю навигацию.
  const [page, setPage] = useState('home');
  // значение login/register открывает модальное окно входа или регистрации.
  const [authModal, setAuthModal] = useState(null);
  // данные каталога загружаются с backend; пустой массив означает, что записей пока нет.
  const [plants, setPlants] = useState([]);
  // справочник проблем загружается отдельно от каталога растений.
  const [problems, setProblems] = useState([]);
  // статус API нужен, чтобы интерфейс мог различать загрузку и недоступность сервера.
  const [apiState, setApiState] = useState('loading');
  // выбранная запись передаётся на страницу подробной информации о растении.
  const [selectedPlant, setSelectedPlant] = useState(null);
  // demoUser показывает, что демонстрационный вход выполнен; это не настоящая авторизация.
  const [demoUser, setDemoUser] = useState(null);
  // toast хранит короткое сообщение, которое временно показывается пользователю.
  const [toast, setToast] = useState('');
  // публикации живут только в состоянии интерфейса и пока не сохраняются на сервере.
  const [posts, setPosts] = useState([]);
  // строка поиска фильтрует растения в каталоге.
  const [plantSearch, setPlantSearch] = useState('');
  // значение оставлено для будущего поиска по симптомам.
  const [symptomSearch, setSymptomSearch] = useState('');
  // выбранный файл используется для демонстрации формы диагностики.
  const [diagnosticFile, setDiagnosticFile] = useState(null);
  // здесь хранится результат проверки ввода или сообщение о состоянии диагностики.
  const [diagnosticMessage, setDiagnosticMessage] = useState('');
  // поле поиска на странице карты пока хранит введённый запрос локально.
  const [city, setCity] = useState('');
  // имя и описание профиля хранятся в памяти до подключения серверного сохранения.
  const [profileName, setProfileName] = useState('Никитация😎');
  const [profileBio, setProfileBio] = useState('Люблю комнатные растения и делюсь опытом выращивания.');

  // при первом открытии загружаем реальные записи растений и проблем из API.
  useEffect(() => {
    let alive = true;
    Promise.all([
      fetch(`${API_URL}/api/plants`).then(r => r.ok ? r.json() : Promise.reject()).catch(() => null),
      fetch(`${API_URL}/api/problems`).then(r => r.ok ? r.json() : Promise.reject()).catch(() => null),
    ]).then(([p, d]) => {
      if (!alive) return;
      const pData = Array.isArray(p) ? p : p?.data || p?.plants || [];
      const dData = Array.isArray(d) ? d : d?.data || d?.problems || [];
      setPlants(pData);
      setProblems(dData);
      setApiState(p || d ? 'ready' : 'offline');
    });
    return () => { alive = false; };
  }, []);

  // единая функция перехода обрабатывает навигацию и открытие окна входа.
  const go = (next) => {
    if (next === 'login' || next === 'register') { setAuthModal(next); return; }
    setAuthModal(null);
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  // показываем пользователю короткую обратную связь о выполненном действии.
  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 3200);
  };
  // демонстрационный вход нужен для показа интерфейса без реальной авторизации.
  const demoLogin = (data) => {
    setDemoUser({ email: data.email, name: data.name || data.email.split('@')[0] || 'Пользователь' });
    if (data.name) setProfileName(data.name);
    setAuthModal(null);
    setPage('profile');
    notify('Демонстрационный вход выполнен. Данные аккаунта не отправлялись на сервер.');
  };
  // завершаем демонстрационный сеанс и возвращаемся на главную.
  const logout = () => {
    setDemoUser(null);
    go('home');
    notify('Вы вышли из демонстрационного аккаунта.');
  };
  // общие данные и обработчики передаются страницам одним объектом.
  const pageProps = { go, plants, problems, apiState, selectedPlant, setSelectedPlant, demoUser, notify, posts, setPosts, plantSearch, setPlantSearch, symptomSearch, setSymptomSearch, diagnosticFile, setDiagnosticFile, diagnosticMessage, setDiagnosticMessage, city, setCity, profileName, setProfileName, profileBio, setProfileBio, logout };
  // выбираем компонент в зависимости от текущего адреса внутри приложения.
  const content = {
    home: <Home {...pageProps} />,
    catalog: <Catalog {...pageProps} />,
    plant: <PlantDetails {...pageProps} />,
    care: demoUser ? <Care {...pageProps} /> : <main className="page care-locked"><div className="db-empty"><h2>Войдите, чтобы открыть уход за растениями</h2><p>Ваш календарь, список растений и история ухода появятся после входа в аккаунт.</p><button className="olive-button" onClick={() => go('login')}>Войти</button></div></main>,
    diagnostics: <Diagnostics {...pageProps} />,
    map: <MapPage {...pageProps} />,
    community: <Community {...pageProps} />,
    profile: <Profile {...pageProps} />,
    'profile-edit': demoUser ? <ProfileEdit {...pageProps} /> : <main className="page"><div className="db-empty"><h2>Войдите, чтобы редактировать профиль</h2><button className="olive-button" onClick={() => go('login')}>Войти</button></div></main>,
    settings: <Settings {...pageProps} />,
    login: <Login {...pageProps} onLogin={demoLogin} onRegister={() => go('register')} />,
    register: <Register {...pageProps} onRegister={demoLogin} onLogin={() => go('login')} />,
  }[page] || <Home {...pageProps} />;

  return <div className="app-shell">
    {/* общий каркас: шапка, выбранная страница, подвал и служебные сообщения */}
    <Header page={page} go={go} demoUser={demoUser} />
    {content}
    <Footer go={go} />
    {authModal && <div className="auth-overlay" role="dialog" aria-modal="true" onMouseDown={e=>{if(e.target===e.currentTarget)setAuthModal(null)}}><button className="auth-overlay-close" onClick={()=>setAuthModal(null)} aria-label="Закрыть">×</button>{authModal==='login' ? <Login onLogin={demoLogin} onRegister={()=>setAuthModal('register')} go={go} /> : <Register onRegister={demoLogin} onLogin={()=>setAuthModal('login')} go={go} />}</div>}
    {toast && <div className="toast" role="status">{toast}</div>}

  </div>;
}
