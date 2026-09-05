(() => {
  'use strict';

  const DATA = window.EXAM_DATA;
  const mode = document.body.dataset.mode === 'teacher' ? 'teacher' : 'student';
  const isTeacher = mode === 'teacher';
  const letters = ['A', 'B', 'C', 'D'];
  const state = {
    activePart: 1,
    highlighter: false,
    dictionary: false,
    fontSize: readNumber(`vstep:${mode}:fontSize`, 18),
    highlights: readSet(`vstep:${mode}:highlights`),
    spokenWord: ''
  };

  const VI_DICTIONARY = {
    hobby:'sở thích', leisure:'thời gian rảnh rỗi', collect:'sưu tầm', explore:'khám phá',
    relax:'thư giãn', creative:'sáng tạo', exciting:'thú vị; hào hứng', outdoors:'ngoài trời',
    musical:'liên quan đến âm nhạc', skill:'kỹ năng', craft:'đồ thủ công; hoạt động thủ công',
    painting:'vẽ tranh; bức tranh', dancing:'khiêu vũ', cooking:'nấu ăn', photography:'nhiếp ảnh',
    reading:'đọc sách; việc đọc', jogging:'chạy bộ', knitting:'đan len', puzzle:'trò chơi ghép hình',
    gardening:'làm vườn', fishing:'câu cá', relaxing:'thư giãn; dễ chịu', regularly:'đều đặn',
    fun:'vui vẻ; thú vị', join:'tham gia; nối lại', diy:'tự làm; thủ công tại nhà',
    pursue:'theo đuổi', passion:'niềm đam mê', unwind:'thư giãn', pleasure:'niềm vui; sự thích thú',
    keen:'hứng thú; say mê', absorbed:'say mê; tập trung hoàn toàn', quality:'chất lượng',
    track:'dấu vết; theo dõi', routine:'thói quen; lịch trình', escape:'thoát khỏi', recharge:'nạp lại năng lượng',
    batteries:'pin; năng lượng', knack:'năng khiếu', hooked:'bị cuốn hút', stimulate:'kích thích',
    creativity:'sự sáng tạo', recreational:'thuộc hoạt động giải trí', boost:'cải thiện; thúc đẩy',
    mental:'thuộc tinh thần', health:'sức khỏe', engage:'tham gia', rewarding:'bổ ích; đáng làm',
    relieve:'làm giảm', stress:'căng thẳng', anxiety:'lo âu', involved:'tham gia; liên quan', enrich:'làm phong phú',
    announcement:'thông báo', instruction:'hướng dẫn', conversation:'cuộc hội thoại', talk:'bài nói',
    evidence:'chứng cứ', script:'kịch bản bài nghe', answer:'câu trả lời', question:'câu hỏi',
    workshop:'buổi thực hành', participant:'người tham gia', participants:'những người tham gia',
    room:'phòng', equipment:'thiết bị; dụng cụ', instructor:'người hướng dẫn', beginner:'người mới bắt đầu',
    grandmother:'bà', photograph:'bức ảnh; chụp ảnh', photographs:'các bức ảnh', camera:'máy ảnh',
    course:'khóa học', trial:'buổi học thử', project:'dự án; sản phẩm', collection:'bộ sưu tập',
    museum:'bảo tàng', library:'thư viện', route:'tuyến đường', lake:'hồ', fish:'cá', food:'thức ăn',
    learner:'người học', learners:'những người học', materials:'vật liệu; học liệu', tool:'dụng cụ', tools:'các dụng cụ',
    improve:'cải thiện', comfortable:'thoải mái', suitable:'phù hợp', familiar:'quen thuộc', worthwhile:'đáng làm',
    shared:'dùng chung', neighbour:'hàng xóm', neighbourhood:'khu dân cư', resident:'cư dân', residents:'các cư dân',
    volunteer:'tình nguyện viên', donation:'khoản quyên góp', donations:'các khoản quyên góp',
    reaction:'phản ứng', reactions:'các phản ứng', pressure:'áp lực', interest:'sự quan tâm; hứng thú',
    interested:'quan tâm; hứng thú', favourite:'yêu thích', different:'khác nhau', choose:'chọn', selected:'được chọn',
    suggest:'gợi ý', recommend:'đề xuất', decide:'quyết định', arrange:'sắp xếp', available:'có sẵn',
    quickly:'nhanh chóng', carefully:'cẩn thận', previously:'trước đây', overlook:'bỏ qua', overlooked:'đã bỏ qua',
    printed:'được in', book:'sách', square:'hình vuông; ô vuông', squares:'các ô vuông', blanket:'chăn',
    shelf:'kệ', shelves:'các kệ', chair:'ghế', box:'hộp', table:'bàn', park:'công viên', garden:'khu vườn',
    shadow:'bóng', spring:'mùa xuân', family:'gia đình', birthday:'sinh nhật', scarf:'khăn quàng',
    needles:'kim đan', mistakes:'lỗi sai', mistake:'lỗi sai', support:'hỗ trợ', group:'nhóm', centre:'trung tâm',
    free:'miễn phí; rảnh', busy:'bận', evening:'buổi tối', morning:'buổi sáng', weekend:'cuối tuần',
    month:'tháng', minutes:'phút', time:'thời gian', work:'công việc; làm việc', life:'cuộc sống',
    people:'mọi người', person:'người', woman:'người phụ nữ', man:'người đàn ông', speaker:'người nói',
    make:'làm; tạo ra', made:'đã làm', begin:'bắt đầu', start:'bắt đầu', finish:'hoàn thành',
    change:'thay đổi', keep:'giữ', bring:'mang', use:'sử dụng', return:'trả lại; quay lại',
    take:'lấy; thực hiện', help:'giúp đỡ', spend:'dành; chi tiêu', share:'chia sẻ', feel:'cảm thấy',
    want:'muốn', need:'cần', like:'thích; giống như', enjoy:'thích; tận hưởng', learn:'học', practise:'luyện tập',
    listen:'nghe', hear:'nghe thấy', read:'đọc', write:'viết', explain:'giải thích', introduce:'giới thiệu',
    buy:'mua', pay:'trả tiền', cost:'chi phí', price:'giá', online:'trực tuyến', phone:'điện thoại',
    screen:'màn hình', computer:'máy tính', website:'trang web', email:'thư điện tử; gửi thư điện tử',
    small:'nhỏ', large:'lớn', shorter:'ngắn hơn', long:'dài', new:'mới', old:'cũ; già', right:'đúng; bên phải',
    correct:'đúng', wrong:'sai', first:'đầu tiên', later:'sau đó', before:'trước', after:'sau',
    together:'cùng nhau', alone:'một mình', around:'xung quanh', again:'lại; lần nữa',
    because:'bởi vì', however:'tuy nhiên', instead:'thay vào đó', although:'mặc dù', otherwise:'nếu không',
    without:'không có', enough:'đủ', more:'nhiều hơn', most:'nhiều nhất', every:'mọi', any:'bất kỳ',
    something:'điều gì đó', anything:'bất cứ điều gì', everyone:'mọi người', nobody:'không ai'
  };

  const examRoot = document.getElementById('examRoot');
  const highlightToggle = document.getElementById('highlightToggle');
  const dictionaryToggle = document.getElementById('dictionaryToggle');
  const fontValue = document.getElementById('fontValue');
  const dictionaryPanel = document.getElementById('dictionaryPanel');
  const dictionaryWord = document.getElementById('dictionaryWord');
  const dictionaryMeaning = document.getElementById('dictionaryMeaning');
  const dictionarySpeak = document.getElementById('dictionarySpeak');
  const workspaceBar = document.querySelector('.workspace-bar');
  const stickyAudio = document.getElementById('stickyAudio');
  const stickyAudioToggle = document.getElementById('stickyAudioToggle');
  const stickyAudioIcon = document.getElementById('stickyAudioIcon');
  const stickyAudioLabel = document.getElementById('stickyAudioLabel');
  const stickyAudioTime = document.getElementById('stickyAudioTime');
  const toast = document.getElementById('toast');
  let toastTimer;
  let currentStickyAudio = null;
  let scrollFrame = null;

  function readNumber(key, fallback) {
    try {
      const value = Number(localStorage.getItem(key));
      return Number.isFinite(value) && value >= 16 && value <= 26 ? value : fallback;
    } catch (_) { return fallback; }
  }

  function readSet(key) {
    try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); }
    catch (_) { return new Set(); }
  }

  function save(key, value) {
    try { localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value)); }
    catch (_) { /* Preferences remain available for this visit. */ }
  }

  function make(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function appendWords(container, text, baseId, offset = 0) {
    const wordPattern = /[A-Za-z]+(?:['’][A-Za-z]+)*/g;
    let cursor = 0;
    let match;
    while ((match = wordPattern.exec(text)) !== null) {
      container.append(document.createTextNode(text.slice(cursor, match.index)));
      const span = make('span', 'word', match[0]);
      span.dataset.token = `${mode}:${baseId}:${offset + match.index}`;
      if (state.highlights.has(span.dataset.token)) span.classList.add('user-highlight');
      container.append(span);
      cursor = match.index + match[0].length;
    }
    container.append(document.createTextNode(text.slice(cursor)));
  }

  function evidenceRegex(phrase) {
    const escaped = phrase
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/['’]/g, "['’]")
      .replace(/\s+/g, '\\s+');
    return new RegExp(escaped, 'i');
  }

  function appendScriptText(container, text, baseId, evidenceList) {
    const ranges = [];
    if (isTeacher) {
      evidenceList.forEach((entry) => {
        const match = evidenceRegex(entry.text).exec(text);
        if (match) ranges.push({ start: match.index, end: match.index + match[0].length, ...entry });
      });
    }
    ranges.sort((a, b) => a.start - b.start);
    let cursor = 0;
    ranges.forEach((range) => {
      if (range.start < cursor) return;
      appendWords(container, text.slice(cursor, range.start), `${baseId}:plain`, cursor);
      const mark = make('mark', `evidence-mark evidence-slot-${range.slot}`);
      mark.dataset.question = String(range.number);
      appendWords(mark, text.slice(range.start, range.end), `${baseId}:evidence:${range.number}`, range.start);
      container.append(mark);
      cursor = range.end;
    });
    appendWords(container, text.slice(cursor), `${baseId}:plain`, cursor);
  }

  function buildQuestion(question, groupId) {
    const item = make('section', 'question-item');
    item.dataset.question = String(question.number);
    const stem = make('h3', 'question-stem');
    stem.append(make('span', 'question-number', question.number));
    appendWords(stem, question.stem, `${groupId}:q${question.number}:stem`);
    item.append(stem);
    const options = make('div', 'option-list');
    question.options.forEach((option, index) => {
      const label = make('label', 'option-row');
      label.dataset.letter = letters[index];
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `${mode}-question-${question.number}`;
      input.value = letters[index];
      input.setAttribute('aria-label', `${letters[index]}. ${option}`);
      label.append(input, make('span', 'option-letter', `${letters[index]}.`));
      const text = make('span', 'option-text');
      appendWords(text, option, `${groupId}:q${question.number}:option${letters[index]}`);
      label.append(text);
      options.append(label);
    });
    item.append(options);
    return item;
  }

  function buildScript(group) {
    const column = make('aside', 'script-column');
    column.hidden = true;
    column.setAttribute('aria-label', `Script ${group.code}`);
    column.append(make('div', 'script-header', `Script · ${group.code}`));
    const evidence = group.questions.map((q, slot) => ({ number: q.number, text: q.evidence, slot }));
    group.script.forEach((block, index) => {
      const paragraph = make('p', 'script-block');
      if (block.speaker) paragraph.append(make('span', 'speaker-label', `${block.speaker}: `));
      appendScriptText(paragraph, block.text, `${group.id}:script:${index}`, evidence);
      column.append(paragraph);
    });
    return column;
  }

  function buildGroup(group) {
    const card = make('article', `group-card part-${group.part}-card`);
    card.dataset.group = group.id;
    const top = make('header', 'group-top');
    const titleBox = make('div');
    const range = group.questions.length === 1
      ? `Question ${group.questions[0].number}`
      : `Questions ${group.questions[0].number}–${group.questions.at(-1).number}`;
    titleBox.append(make('span', 'group-kicker', range), make('h2', 'group-title', group.title));
    const audio = document.createElement('audio');
    audio.className = 'audio-player';
    audio.controls = true;
    audio.preload = 'metadata';
    audio.src = group.audio;
    audio.setAttribute('aria-label', `Audio ${range}`);
    top.append(titleBox, audio);
    card.append(top);

    const workspace = make('div', 'group-workspace');
    const questionColumn = make('div', 'question-column');
    group.questions.forEach((question) => questionColumn.append(buildQuestion(question, group.id)));
    workspace.append(questionColumn, buildScript(group));
    card.append(workspace);

    const actions = make('footer', 'group-actions');
    const check = make('button', `action-button ${isTeacher ? 'key-button' : 'check-button'}`, isTeacher ? 'Key' : 'Check');
    check.type = 'button';
    check.dataset.action = isTeacher ? 'key' : 'check';
    if (isTeacher) check.setAttribute('aria-pressed', 'false');
    const script = make('button', 'action-button script-button', 'Script');
    script.type = 'button'; script.dataset.action = 'script'; script.setAttribute('aria-pressed', 'false');
    actions.append(check, script);
    if (isTeacher) {
      const evidenceButton = make('button', 'action-button evidence-button', 'Evidence');
      evidenceButton.type = 'button'; evidenceButton.dataset.action = 'evidence'; evidenceButton.setAttribute('aria-pressed', 'false');
      actions.append(evidenceButton);
    }
    const reset = make('button', 'action-button reset-button', 'Reset');
    reset.type = 'button'; reset.dataset.action = 'reset';
    const result = make('output', 'group-result');
    result.setAttribute('aria-live', 'polite');
    actions.append(reset, result);
    card.append(actions);
    return card;
  }

  function renderExam() {
    for (let part = 1; part <= 3; part += 1) {
      const panel = make('section', 'part-panel');
      panel.dataset.partPanel = String(part);
      panel.setAttribute('role', 'tabpanel');
      panel.hidden = part !== state.activePart;
      const labels = { 1: 'Part 1 · Short Announcements & Instructions', 2: 'Part 2 · Conversations', 3: 'Part 3 · Talks' };
      panel.append(make('h2', 'part-heading', labels[part]));
      DATA.groups.filter((group) => group.part === part).forEach((group) => panel.append(buildGroup(group)));
      examRoot.append(panel);
    }
  }

  function switchPart(part) {
    state.activePart = part;
    document.querySelectorAll('.part-tab').forEach((tab) => {
      const active = Number(tab.dataset.part) === part;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('.part-panel').forEach((panel) => { panel.hidden = Number(panel.dataset.partPanel) !== part; });
    document.querySelectorAll('audio').forEach((audio) => audio.pause());
    currentStickyAudio = null;
    stickyAudio.hidden = part === 1;
    requestAnimationFrame(updateStickyAudioFromViewport);
    window.scrollTo({ top: document.querySelector('.workspace-bar').offsetTop, behavior: 'smooth' });
  }

  function findGroupData(card) { return DATA.groups.find((group) => group.id === card.dataset.group); }

  function checkGroup(card) {
    const group = findGroupData(card);
    let correct = 0;
    let answered = 0;
    group.questions.forEach((question) => {
      const section = card.querySelector(`[data-question="${question.number}"]`);
      const selected = section.querySelector('input:checked');
      section.classList.toggle('answer-missing', !selected);
      section.querySelectorAll('.option-row').forEach((row) => row.classList.remove('answer-correct', 'answer-wrong'));
      if (!selected) return;
      answered += 1;
      const selectedRow = selected.closest('.option-row');
      if (selected.value === question.answer) {
        correct += 1;
        selectedRow.classList.add('answer-correct');
      } else {
        selectedRow.classList.add('answer-wrong');
        section.querySelector(`[data-letter="${question.answer}"]`).classList.add('answer-correct');
      }
    });
    const result = card.querySelector('.group-result');
    result.value = answered === group.questions.length ? `${correct}/${group.questions.length} correct` : `${answered}/${group.questions.length} answered · ${correct} correct`;
    showToast(answered === group.questions.length ? `Kết quả: ${correct}/${group.questions.length}` : `Còn ${group.questions.length - answered} câu chưa trả lời`);
  }

  function revealKey(card) {
    const group = findGroupData(card);
    card.querySelectorAll('.answer-correct, .answer-wrong, .answer-missing').forEach((element) => element.classList.remove('answer-correct', 'answer-wrong', 'answer-missing'));
    group.questions.forEach((question) => {
      const section = card.querySelector(`.question-item[data-question="${question.number}"]`);
      section.querySelector(`[data-letter="${question.answer}"]`).classList.add('answer-correct');
    });
    const keyButton = card.querySelector('.key-button');
    keyButton.setAttribute('aria-pressed', 'true');
    card.querySelector('.group-result').value = group.questions.map((question) => `${question.number}${question.answer}`).join(' · ');
    showToast('Đã hiển thị đáp án');
  }

  function toggleScript(card, forceOpen = null) {
    const column = card.querySelector('.script-column');
    const button = card.querySelector('.script-button');
    const open = forceOpen === null ? column.hidden : forceOpen;
    column.hidden = !open;
    card.classList.toggle('script-open', open);
    button.setAttribute('aria-pressed', String(open));
  }

  function toggleEvidence(card) {
    const button = card.querySelector('.evidence-button');
    const on = !card.classList.contains('evidence-on');
    card.classList.toggle('evidence-on', on);
    button.setAttribute('aria-pressed', String(on));
    if (on) toggleScript(card, true);
  }

  function resetGroup(card) {
    card.querySelectorAll('input[type="radio"]').forEach((input) => { input.checked = false; });
    card.querySelectorAll('.answer-correct, .answer-wrong, .answer-missing').forEach((element) => element.classList.remove('answer-correct', 'answer-wrong', 'answer-missing'));
    card.querySelector('.group-result').value = '';
    const keyButton = card.querySelector('.key-button');
    if (keyButton) keyButton.setAttribute('aria-pressed', 'false');
    showToast('Đã đặt lại nhóm câu hỏi');
  }

  function formatTime(value) {
    if (!Number.isFinite(value) || value < 0) return '0:00';
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  function groupRange(card) {
    const group = findGroupData(card);
    const first = group.questions[0].number;
    const last = group.questions.at(-1).number;
    return first === last ? `Q${first}` : `Q${first}–${last}`;
  }

  function syncStickyAudio() {
    if (!currentStickyAudio) return;
    const playing = !currentStickyAudio.paused && !currentStickyAudio.ended;
    stickyAudioToggle.setAttribute('aria-pressed', String(playing));
    stickyAudioToggle.setAttribute('aria-label', playing ? 'Tạm dừng audio' : 'Phát audio');
    stickyAudioIcon.textContent = playing ? '❚❚' : '▶';
    stickyAudioTime.textContent = `${formatTime(currentStickyAudio.currentTime)} / ${formatTime(currentStickyAudio.duration)}`;
  }

  function setStickyAudio(audio) {
    if (!audio) return;
    currentStickyAudio = audio;
    stickyAudioLabel.textContent = groupRange(audio.closest('.group-card'));
    syncStickyAudio();
  }

  function updateStickyAudioFromViewport() {
    if (state.activePart === 1) {
      stickyAudio.hidden = true;
      return;
    }
    stickyAudio.hidden = false;
    if (currentStickyAudio && !currentStickyAudio.paused && !currentStickyAudio.ended) {
      syncStickyAudio();
      return;
    }
    const panel = document.querySelector(`[data-part-panel="${state.activePart}"]`);
    const cards = [...panel.querySelectorAll('.group-card')];
    const anchor = workspaceBar.getBoundingClientRect().bottom + 24;
    const visible = cards.find((card) => {
      const rect = card.getBoundingClientRect();
      return rect.top <= anchor && rect.bottom > anchor;
    });
    const nearest = visible || cards.reduce((best, card) => {
      if (!best) return card;
      return Math.abs(card.getBoundingClientRect().top - anchor) < Math.abs(best.getBoundingClientRect().top - anchor) ? card : best;
    }, null);
    if (nearest) setStickyAudio(nearest.querySelector('audio'));
  }

  function syncWorkspaceHeight() {
    document.documentElement.style.setProperty('--workspace-bar-height', `${workspaceBar.getBoundingClientRect().height}px`);
  }

  function toggleTool(kind) {
    const isHighlight = kind === 'highlight';
    const next = isHighlight ? !state.highlighter : !state.dictionary;
    if (isHighlight) {
      state.highlighter = next;
      document.body.classList.toggle('highlight-mode', next);
      highlightToggle.setAttribute('aria-pressed', String(next));
    } else {
      state.dictionary = next;
      document.body.classList.toggle('dictionary-mode', next);
      dictionaryToggle.setAttribute('aria-pressed', String(next));
      if (!next) dictionaryPanel.hidden = true;
    }
  }

  function normalizeWord(word) {
    return word.toLowerCase().replace(/’/g, "'").replace(/'s$/, '');
  }

  function localMeaning(word) {
    const normalized = normalizeWord(word);
    if (VI_DICTIONARY[normalized]) return VI_DICTIONARY[normalized];
    const variants = [];
    if (normalized.endsWith('ies')) variants.push(`${normalized.slice(0, -3)}y`);
    if (normalized.endsWith('ing')) variants.push(normalized.slice(0, -3), `${normalized.slice(0, -3)}e`);
    if (normalized.endsWith('ed')) variants.push(normalized.slice(0, -2), `${normalized.slice(0, -1)}`);
    if (normalized.endsWith('es')) variants.push(normalized.slice(0, -2));
    if (normalized.endsWith('s')) variants.push(normalized.slice(0, -1));
    return variants.map((variant) => VI_DICTIONARY[variant]).find(Boolean) || '';
  }

  async function openDictionary(word) {
    state.spokenWord = word;
    dictionaryPanel.hidden = false;
    dictionaryWord.textContent = word;
    const local = localMeaning(word);
    if (local) {
      dictionaryMeaning.textContent = local;
      return;
    }
    const cacheKey = `vstep:dictionary:${normalizeWord(word)}`;
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        dictionaryMeaning.textContent = cached;
        return;
      }
    } catch (_) { /* Continue with online lookup. */ }
    dictionaryMeaning.textContent = 'Đang tra nghĩa…';
    try {
      const endpoint = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|vi`;
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('dictionary');
      const payload = await response.json();
      const meaning = payload?.responseData?.translatedText?.trim();
      if (!meaning) throw new Error('dictionary');
      dictionaryMeaning.textContent = meaning;
      try { sessionStorage.setItem(cacheKey, meaning); } catch (_) { /* Ignore cache limits. */ }
    } catch (_) {
      dictionaryMeaning.textContent = 'Không thể kết nối từ điển lúc này.';
    }
  }

  function speak(word) {
    if (!word || !('speechSynthesis' in window)) {
      showToast('Trình duyệt chưa hỗ trợ phát âm');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = .82;
    window.speechSynthesis.speak(utterance);
  }

  function changeFont(delta) {
    state.fontSize = Math.min(26, Math.max(16, state.fontSize + delta));
    document.documentElement.style.setProperty('--content-size', `${state.fontSize}px`);
    fontValue.value = String(state.fontSize);
    save(`vstep:${mode}:fontSize`, String(state.fontSize));
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  renderExam();
  changeFont(0);
  syncWorkspaceHeight();
  if ('ResizeObserver' in window) new ResizeObserver(syncWorkspaceHeight).observe(workspaceBar);
  window.addEventListener('resize', syncWorkspaceHeight);

  document.querySelector('.part-tabs').addEventListener('click', (event) => {
    const tab = event.target.closest('.part-tab');
    if (tab) switchPart(Number(tab.dataset.part));
  });

  examRoot.addEventListener('click', (event) => {
    const action = event.target.closest('[data-action]');
    if (action) {
      const card = action.closest('.group-card');
      if (action.dataset.action === 'check') checkGroup(card);
      if (action.dataset.action === 'key') revealKey(card);
      if (action.dataset.action === 'script') toggleScript(card);
      if (action.dataset.action === 'evidence') toggleEvidence(card);
      if (action.dataset.action === 'reset') resetGroup(card);
      return;
    }
    const word = event.target.closest('.word');
    if (!word) return;
    if (state.highlighter) {
      word.classList.toggle('user-highlight');
      if (word.classList.contains('user-highlight')) state.highlights.add(word.dataset.token);
      else state.highlights.delete(word.dataset.token);
      save(`vstep:${mode}:highlights`, [...state.highlights]);
    }
    if (state.dictionary) openDictionary(word.textContent);
  });

  highlightToggle.addEventListener('click', () => toggleTool('highlight'));
  dictionaryToggle.addEventListener('click', () => toggleTool('dictionary'));
  document.getElementById('fontDecrease').addEventListener('click', () => changeFont(-1));
  document.getElementById('fontIncrease').addEventListener('click', () => changeFont(1));
  document.getElementById('dictionaryClose').addEventListener('click', () => { dictionaryPanel.hidden = true; });
  dictionarySpeak.addEventListener('click', () => speak(state.spokenWord));
  stickyAudioToggle.addEventListener('click', async () => {
    if (!currentStickyAudio) updateStickyAudioFromViewport();
    if (!currentStickyAudio) return;
    if (currentStickyAudio.paused || currentStickyAudio.ended) {
      document.querySelectorAll('audio').forEach((audio) => { if (audio !== currentStickyAudio) audio.pause(); });
      try { await currentStickyAudio.play(); }
      catch (_) { showToast('Không thể phát audio lúc này'); }
    } else {
      currentStickyAudio.pause();
    }
    syncStickyAudio();
  });

  examRoot.addEventListener('play', (event) => {
    if (!(event.target instanceof HTMLAudioElement)) return;
    document.querySelectorAll('audio').forEach((audio) => { if (audio !== event.target) audio.pause(); });
    setStickyAudio(event.target);
  }, true);
  ['pause', 'timeupdate', 'durationchange', 'ended'].forEach((eventName) => {
    examRoot.addEventListener(eventName, (event) => {
      if (event.target === currentStickyAudio) syncStickyAudio();
    }, true);
  });
  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = null;
      updateStickyAudioFromViewport();
    });
  }, { passive: true });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') dictionaryPanel.hidden = true;
  });
})();
