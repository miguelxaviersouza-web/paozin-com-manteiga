const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let playerOrigin = "";
// Posiciona o jogador perfeitamente acima do solo
const player = { x: 50, y: 420, width: 40, height: 60, speed: 5, color: '#a100ff' };
const keys = {};

// Lista de objetivos do jogo
const objectives = [
    { text: "1. Desbrave a Terra Roxa indo para a direita.", done: false },
    { text: "2. Derrube a mata pioneira para abrir caminho.", done: false },
    { text: "3. Alcance o extremo leste para fundar as cidades.", done: false }
];

// Captura de teclado
window.addEventListener('keydown', e => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault(); 
    }
    keys[e.code] = true;
});
window.addEventListener('keyup', e => keys[e.code] = false);

// Controle de telas
function changeScreen(currentId, nextId) {
    const currentScreen = document.getElementById(currentId);
    const nextScreen = document.getElementById(nextId);
    if (currentScreen && nextScreen) {
        currentScreen.classList.add('hidden');
        nextScreen.classList.remove('hidden');
    }
}

// Configura a origem do jogador
function selectOrigin(origin) {
    playerOrigin = origin;
    document.getElementById('screen-origin').classList.add('hidden');
    
    if(origin === 'Nordestino') player.color = '#a100ff'; 
    if(origin === 'Paulista') player.color = '#ff0033';    
    if(origin === 'Mineiro') player.color = '#ff00aa';     
    
    gameLoop();
}

function update() {
    if (keys['ArrowLeft'] || keys['KeyA']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['KeyD']) player.x += player.speed;
    if (keys['ArrowUp'] || keys['KeyW']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['KeyS']) player.y += player.speed;

    // Limites de tela
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > 480) player.y = 480 - player.height;

    // Atualiza os objetivos com base na posição X do jogador
    if (player.x > 200) objectives[0].done = true;
    if (player.x > 450) objectives[1].done = true;
    if (player.x > 650) objectives[2].done = true;
}

function draw() {
    // 1. Limpa o frame e pinta o fundo de preto roxo profundo
    ctx.fillStyle = '#0a020c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Desenha o solo (Terra Roxa)
    ctx.fillStyle = '#16020c'; 
    ctx.fillRect(0, 480, canvas.width, 120);
    
    // Linha do horizonte vermelha
    ctx.strokeStyle = '#ff0033'; 
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 480);
    ctx.lineTo(canvas.width, 480);
    ctx.stroke();

    // 3. Cenário (Araucária Expressionista)
    ctx.fillStyle = '#26041c'; 
    ctx.fillRect(660, 270, 25, 210); 
    
    ctx.fillStyle = '#4a002a'; 
    ctx.fillRect(580, 250, 185, 22);
    ctx.fillStyle = '#73003c'; 
    ctx.fillRect(610, 220, 125, 22);

    ctx.strokeStyle = '#ff0033';
    ctx.lineWidth = 1;
    ctx.strokeRect(580, 250, 185, 22);
    ctx.strokeRect(610, 220, 125, 22);
