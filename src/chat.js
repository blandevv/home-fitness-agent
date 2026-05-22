const messagesEl = document.getElementById('messages');
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const suggestionsEl = document.getElementById('suggestions');
let suggestionsHidden = false;

const ICON_BOT = `<svg class="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`;
const ICON_USER = `<svg class="w-4 h-4 text-zinc-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"/></svg>`;

input.addEventListener('input', () => {
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, 128) + 'px';
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    form.dispatchEvent(new Event('submit'));
  }
});

function scrollToBottom() {
  messagesEl.scrollTo({ top: messagesEl.scrollHeight, behavior: 'smooth' });
}

function hideSuggestions() {
  if (suggestionsHidden) return;
  suggestionsHidden = true;
  suggestionsEl.style.transition = 'opacity 0.25s, transform 0.25s';
  suggestionsEl.style.opacity = '0';
  suggestionsEl.style.transform = 'translateY(-4px)';
  setTimeout(() => suggestionsEl.remove(), 250);
}

function appendMessage(role, html) {
  const isUser = role === 'user';

  const wrapper = document.createElement('div');
  wrapper.className = `flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`;

  const avatar = document.createElement('div');
  avatar.className = 'w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0 mt-0.5';
  avatar.innerHTML = isUser ? ICON_USER : ICON_BOT;

  const bubble = document.createElement('div');
  bubble.className = `max-w-lg px-4 py-3 rounded-2xl text-sm leading-relaxed msg-content ${
    isUser
      ? 'bg-orange-500 text-white rounded-tr-md'
      : 'bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-tl-md'
  }`;
  bubble.innerHTML = html;

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  messagesEl.appendChild(wrapper);
  scrollToBottom();
}

function showTyping() {
  const wrapper = document.createElement('div');
  wrapper.className = 'flex items-start gap-3';
  wrapper.id = 'typing-indicator';

  const avatar = document.createElement('div');
  avatar.className = 'w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0 mt-0.5';
  avatar.innerHTML = ICON_BOT;

  const bubble = document.createElement('div');
  bubble.className = 'bg-zinc-800 border border-zinc-700 rounded-2xl rounded-tl-md px-4 py-3.5 flex gap-1.5 items-center';
  bubble.innerHTML = `
    <span class="dot w-1.5 h-1.5 rounded-full bg-zinc-500 block"></span>
    <span class="dot w-1.5 h-1.5 rounded-full bg-zinc-500 block"></span>
    <span class="dot w-1.5 h-1.5 rounded-full bg-zinc-500 block"></span>
  `;

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  messagesEl.appendChild(wrapper);
  scrollToBottom();
}

function hideTyping() {
  document.getElementById('typing-indicator')?.remove();
}

function renderText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^[-•] (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    .replaceAll('\n\n', '</p><p>')
    .replaceAll('\n', '<br>')
    .replace(/^(.+)$/, '<p>$1</p>');
}

function setLoading(loading) {
  sendBtn.disabled = loading;
  input.disabled = loading;
}

async function sendMessage(text) {
  if (!text.trim()) return;
  hideSuggestions();

  appendMessage('user', renderText(text));
  input.value = '';
  input.style.height = 'auto';
  setLoading(true);
  showTyping();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    });

    hideTyping();

    if (!res.ok) throw new Error(`Error ${res.status}`);
    const { reply } = await res.json();
    appendMessage('bot', renderText(reply));
  } catch {
    hideTyping();
    appendMessage('bot', '<span class="text-red-400">No se pudo conectar con el servidor. Intenta de nuevo.</span>');
  } finally {
    setLoading(false);
    input.focus();
  }
}

function sendSuggestion(text) {
  input.value = text;
  form.dispatchEvent(new Event('submit'));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage(input.value.trim());
});

globalThis.sendSuggestion = sendSuggestion;
