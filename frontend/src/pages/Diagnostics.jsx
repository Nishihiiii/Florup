// экран диагностики позволяет выбрать фото и посмотреть доступный справочник проблем.
export default function Diagnostics({ diagnosticFile, setDiagnosticFile, diagnosticMessage, setDiagnosticMessage, problems }) {
  return (
    <main className="page diagnostics-page">
      {/* вводное описание объясняет назначение страницы. */}
      <div className="diagnostics-title">
        <h1>Диагностика</h1>
        <p>Загрузите фото больного растения или найдите симптомы, и наш алгоритм поможет определить проблему и предложит способы лечения.</p>
      </div>

      {/* поле выбора изображения работает локально и не отправляет файл на сторонний сервис. */}
      <section className="diagnostics-upload">
        <label className="diagnostic-dropzone">
          <span className="upload-symbol">⇩</span>
          <strong>{diagnosticFile ? diagnosticFile.name : 'Загрузите фото больного растения'}</strong>
          <span>Перетащите файл сюда или нажмите для выбора</span>
          <small>PNG, JPG до 10 мб</small>
          <input type="file" accept="image/png,image/jpeg" onChange={(event) => {
            setDiagnosticFile(event.target.files?.[0] || null);
            setDiagnosticMessage('');
          }} />
        </label>
        {/* пока алгоритм распознавания не подключён, кнопка честно сообщает об этом. */}
        <button className="analyze-button" onClick={() => setDiagnosticMessage(diagnosticFile ? 'Автоматическая диагностика пока не подключена. Справочник болезней появится после добавления данных.' : 'Сначала выберите фотографию растения.')}>
          Проанализировать
        </button>
        {diagnosticMessage && <p className="diagnostic-message">{diagnosticMessage}</p>}
      </section>

      {/* не подставляем выдуманные болезни: показываем пустое состояние до заполнения справочника. */}
      {(!problems || problems.length === 0) && (
        <div className="db-empty diagnostics-empty">
          <h2>Справочник симптомов пока пуст</h2>
          <p>Поиск по симптомам появится здесь, когда справочник будет добавлен в базу данных.</p>
        </div>
      )}
    </main>
  );
}
