
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const restartBtn = document.getElementById('restartBtn');
const messageEl = document.getElementById('message');
const attemptsEl = document.getElementById('attempts');
const historyList = document.getElementById('historyList');
const revealEl = document.getElementById('reveal');

let secret = '';
let attempts = 0;
let gameOver = false;

function newSecret() {
  const num = Math.floor(Math.random() * 90000) + 10000;
  secret = String(num);
}

function resetGame() {
  newSecret();
  attempts = 0;
  gameOver = false;
  messageEl.textContent = '';
  attemptsEl.textContent = attempts;
  historyList.innerHTML = '';
  revealEl.textContent = '';
  guessInput.value = '';
  guessInput.disabled = false;
  guessBtn.disabled = false;
  guessInput.focus();
}

function analyzeGuess(guess) {
  const secretSet = new Set(secret.split(''));
  const guessDigits = guess.split('');
  const presentDigits = [...new Set(guessDigits.filter(d => secretSet.has(d)))];

  const correctPositions = [];
  for (let i = 0; i < 5; i++) {
    if (guess[i] === secret[i]) {
      correctPositions.push({ index: i + 1, digit: guess[i] });
    }
  }

  return { presentDigits, correctPositions };
}

function addHistoryEntry(guess, presentDigits, correctPositions) {
  const li = document.createElement('li');
  li.className = 'history-item';

  const left = document.createElement('div');
  left.className = 'guess-value';
  left.textContent = guess;

  const right = document.createElement('div');
  right.className = 'meta';

  const presentBadge = document.createElement('span');
  presentBadge.className = 'key-badge';
  presentBadge.textContent = `Present: ${presentDigits.length ? presentDigits.join(', ') : '—'}`;

  const posBadge = document.createElement('span');
  posBadge.className = 'key-badge';
  posBadge.style.background = '#e6ffef';
  posBadge.style.color = '#0f5132';
  posBadge.textContent = correctPositions.length
    ? `Correct positions: ${correctPositions.map(p => `${p.digit}@${p.index}`).join(', ')}`
    : 'Correct positions: —';

  right.appendChild(presentBadge);
  right.appendChild(posBadge);

  li.appendChild(left);
  li.appendChild(right);

  historyList.insertBefore(li, historyList.firstChild);
}

function showMessage(text, type = 'info') {
  messageEl.textContent = text;
  if (type === 'success') {
    messageEl.classList.remove('wrong');
    messageEl.classList.add('correct');
  } else if (type === 'error') {
    messageEl.classList.remove('correct');
    messageEl.classList.add('wrong');
  } else {
    messageEl.classList.remove('correct', 'wrong');
  }
}

function submitGuess() {
  if (gameOver) return;

  const raw = guessInput.value.trim();
  if (!/^\d{5}$/.test(raw)) {
    showMessage('Please enter exactly 5 digits (0-9).', 'error');
    return;
  }
  if (raw[0] === '0') {
    showMessage('Leading zeros are not allowed for guesses in this game.', 'error');
    return;
  }

  const guess = raw;
  attempts++;
  attemptsEl.textContent = attempts;

  if (guess === secret) {
    showMessage(`Correct! You found the number ${secret} in ${attempts} attempts.`, 'success');
    revealEl.textContent = `Secret: ${secret}`;
    addHistoryEntry(guess, Array.from(new Set(guess.split('').filter(d => secret.includes(d)))), 
                    guess.split('').map((d, i) => d === secret[i] ? { index: i+1, digit: d } : null).filter(Boolean));
    gameOver = true;
    guessInput.disabled = true;
    guessBtn.disabled = true;
    return;
  }

  const { presentDigits, correctPositions } = analyzeGuess(guess);

  addHistoryEntry(guess, presentDigits, correctPositions);

  showMessage(
    `Wrong guess. ${presentDigits.length ? 'Digits present: ' + presentDigits.join(', ') + '. ' : 'No digits from your guess are present. '}`
    + `${correctPositions.length ? 'Digits in correct position: ' + correctPositions.map(p => `${p.digit}@${p.index}`).join(', ') + '.' : 'No digits are in the correct position.'}`
  );

  guessInput.select();
}

guessBtn.addEventListener('click', submitGuess);
restartBtn.addEventListener('click', resetGame);

guessInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    submitGuess();
  }
  if (e.key.length === 1 && !/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
});

resetGame();