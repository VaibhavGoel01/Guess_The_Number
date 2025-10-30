# Guess the 5‑Digit Number

A small browser game where the computer picks a random 5‑digit number (10000–99999) and you try to guess it. After each wrong guess the game displays:
- Digits present — which unique digits from your guess appear anywhere in the secret number.
- Correct positions — which digits are exactly correct and their 1‑based positions (for example `7@3` means digit `7` is correct at position 3).

This is a lightweight HTML/CSS/JavaScript project suitable for learning DOM manipulation and simple game logic.

---

## How to play

- Enter a 5‑digit guess (digits only). Guesses must be exactly five digits and must not start with `0` (the secret is generated between 10000 and 99999).
- Press the "Guess" button or press Enter.
- On a wrong guess:
  - "Digits present" lists unique digits from your guess that appear anywhere in the secret.
  - "Correct positions" lists digits that are in the correct spot as `digit@index`.
- The History panel keeps track of past guesses with present digits and correct positions.
- When you guess the secret exactly, the game reveals the secret and shows the number of attempts.

Example:
- Secret: `52873`
- Guess: `52345`
  - Present digits: `5, 2, 3` (because those digits exist somewhere in the secret)
  - Correct positions: `5@1, 3@4` (if those digits match at positions 1 and 4)

---

## Validation rules

- Input must be a 5‑digit numeric string (0–9).
- Guesses starting with `0` are rejected to match the secret generation (10000–99999).
- Non-digit input or wrong length will prompt an error message.

---

## Files & responsibilities

- `index.html` — the markup and UI container.
- `styles.css` — visual styling and responsive layout.
- `script.js` — game logic, input validation, and DOM updates.
- `README.md` — (this document) instructions and notes.

---

## Accessibility & UX notes

- Input uses `inputmode="numeric"` and `maxlength="5"` to improve mobile behavior.
- Message and History areas use `aria-live` so screen readers get updates for important changes.
- Buttons and input elements are keyboard-accessible (press Enter to submit).

---

## Contact

Created & maintained by VaibhavGoel01. If you want help extending or packaging the game, send a message with what you'd like to add.
