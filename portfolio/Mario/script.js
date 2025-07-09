// Seletores e variáveis principais
const gameBoard = document.querySelector('.gameBoard');
const pipe = document.getElementById('pipe');
const scoreDisplay = document.getElementById('score');
const playerSelect = document.getElementById('player');
const playerNameInput = document.getElementById('playerName');
const rankingList = document.getElementById('rankingList');

let character;
let characterName = 'mario';
let characterImg;
let isRunning = false;
let score = 0;
let loop;
let currentName = '';
let gamePaused = false;

// Iniciar o jogo
function startGame() {
  if (isRunning) return;

  if (!playerNameInput.value.trim()) {
    alert('Digite seu nome!');
    return;
  }

  currentName = playerNameInput.value;
  characterName = playerSelect.value;

  document.getElementById('mainMenu').style.display = 'none';
  score = 0;
  scoreDisplay.innerText = score;
  isRunning = true;
  gamePaused = false;

  createCharacter();

  // Define a velocidade escolhida
  pipe.style.animation = `pipeAnimation ${getSpeed()}s infinite linear`;

  // Loop de verificação de colisão
  loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const charPosition = +window.getComputedStyle(character).bottom.replace("px", "");

    if (pipePosition <= 120 && pipePosition > 0 && charPosition < 100) {
      return gameOver();
    }
  }, 10);
}

// Pausar e continuar jogo
function pauseGame() {
  if (!isRunning) return;

  gamePaused = !gamePaused;

  if (gamePaused) {
    clearInterval(loop);
    pipe.style.animationPlayState = "paused";
    if (character) character.style.animationPlayState = "paused";
  } else {
    pipe.style.animationPlayState = "running";
    if (character) character.style.animationPlayState = "running";

    // Reinicia loop
    loop = setInterval(() => {
      const pipePosition = pipe.offsetLeft;
      const charPosition = +window.getComputedStyle(character).bottom.replace("px", "");
      if (pipePosition <= 120 && pipePosition > 0 && charPosition < 100) {
        return gameOver();
      }
    }, 10);
  }
}

// Cria o personagem escolhido
function createCharacter() {
  if (character) character.remove();

  characterImg = `images/${characterName}.gif`;
  character = document.createElement('img');
  character.src = characterImg;
  character.alt = characterName;
  character.classList.add('character');

  gameBoard.appendChild(character);
}

// Função de pulo
function jump() {
  if (!isRunning || gamePaused || character.classList.contains('jump')) return;

  character.classList.add('jump');

  setTimeout(() => {
    character.classList.remove('jump');
  }, 800);

  score++;
  scoreDisplay.innerText = score;
}

// Lê a velocidade do seletor de configurações
function getSpeed() {
  return document.getElementById('speedSelect').value || 2;
}

// Game Over
function gameOver() {
  clearInterval(loop);
  isRunning = false;

  pipe.style.animation = 'none';
  character.src = `images/game-over${characterName}.png`;
  character.style.width = '75px';
  character.style.marginLeft = '50px';

  saveRanking();
  showRanking();

  document.getElementById('mainMenu').style.display = 'block';
}

// Salva ranking no localStorage
function saveRanking() {
  const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
  ranking.push({ name: currentName, score });
  ranking.sort((a, b) => b.score - a.score);
  localStorage.setItem('ranking', JSON.stringify(ranking.slice(0, 10)));
}

// Exibe ranking na tela
function showRanking() {
  const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
  rankingList.innerHTML = ranking.map((r, i) =>
    `<li><strong>${i + 1}º</strong> ${r.name} - ${r.score} pts</li>`
  ).join('');
}

// Mostra um modal por id
function showModal(id) {
  document.getElementById(id).style.display = 'block';
}

// Fecha o modal
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Controle de teclado e toque
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    pauseGame();
  } else {
    jump();
  }
});
document.addEventListener("touchstart", jump);

// Atualiza ranking ao carregar
window.onload = () => {
  showRanking();
};
