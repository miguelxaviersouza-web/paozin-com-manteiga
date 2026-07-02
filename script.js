const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let playerOrigin = "";
const player = { x: 50, y: 480, width: 40, height: 60, speed: 5, color: '#ff0033' };
const keys = {};

// Captura de comandos do teclado
window.addEventListener('keydown', e => keys[e.code] = true);
window.addEventListener('keyup', e => keys[e.code] = false);

// Função genérica para transição suave de telas
function changeScreen(currentId, nextId) {
    document.getElementById(currentId).classList.add('hidden');
    document.getElementById(nextId).classList.remove('hidden');
}

// Seleção de opções com transição para o gameplay
function selectOrigin(origin) {
    playerOrigin = origin;
    document.getElementById('screen-origin').classList.add('hidden');
    
    // Configura a cor do boneco com base na escolha
    if(origin === 'Nordestino') player.color = '#9900ff'; // Roxo
    if(origin === 'Paulista') player.color = '#ff0033';    // Vermelho
    if(origin === 'Mineiro') player.color = '#ff33aa';     // Rosa/Vermelho claro
    
    // Inicia o ciclo de atualização e renderização do jogo
    gameLoop();
}

function update() {
    if (keys['ArrowLeft'] || keys['KeyA']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['KeyD']) player.x += player.speed;
    if (keys['ArrowUp'] || keys['KeyW']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['KeyS']) player.y += player.speed;

    // Limites das bordas do Canvas
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Solo de Terra Roxa estilizado no Canvas
    ctx.fillStyle = '#1a001a';
    ctx.fillRect(0, 500, canvas.width, 100);
    ctx.strokeStyle = '#ff0033';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 500);
    ctx.lineTo(canvas.width, 500);
    ctx.stroke();

    // Silhueta de Araucária ao fundo (Paraná)
    ctx.fillStyle = '#0d0013';
    ctx.fillRect(650, 320, 20, 180); // Tronco
    ctx.fillStyle = '#260033';
    ctx.fillRect(580, 300, 160, 20); // Copa camada 1
    ctx.fillRect(600, 270, 120, 20); // Copa camada 2

    // Interface de texto do jogo
    ctx.fillStyle = '#ff0033';
    ctx.font = "bold 16px Merriweather";
    ctx.fillText(`Jornada: Migrante ${playerOrigin}`, 20, 40);
    
    ctx.fillStyle = '#800080';
    ctx.font = "14px Merriweather";
    ctx.fillText("Destino: Fronteira Agrícola (Londrina/Maringá)", 20, 65);

    // Desenha o bloco do jogador
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Contorno do jogador para destacar no fundo escuro
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
