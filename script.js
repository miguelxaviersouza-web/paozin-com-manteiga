const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let playerOrigin = "";
const player = { x: 50, y: 480, width: 40, height: 60, speed: 5, color: '#ff0033' };
const keys = {};

// Captura de eventos do teclado (Previne problemas com foco de tela)
window.addEventListener('keydown', e => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault(); // Impede a página de rolar ao jogar
    }
    keys[e.code] = true;
});
window.addEventListener('keyup', e => keys[e.code] = false);

// Função de transição suave de telas
function changeScreen(currentId, nextId) {
    const currentScreen = document.getElementById(currentId);
    const nextScreen = document.getElementById(nextId);
    
    if (currentScreen && nextScreen) {
        currentScreen.classList.add('hidden');
        nextScreen.classList.remove('hidden');
    }
}

// Inicializa a escolha e configura o personagem antes de dar o Start
function selectOrigin(origin) {
    playerOrigin = origin;
    document.getElementById('screen-origin').classList.add('hidden');
    
    // Customização do personagem dependendo da escolha histórica
    if(origin === 'Nordestino') player.color = '#9900ff'; // Roxo
    if(origin === 'Paulista') player.color = '#ff0033';    // Vermelho
    if(origin === 'Mineiro') player.color = '#ff33aa';     // Rosa/Vermelho claro
    
    // Inicia o ciclo contínuo do jogo
    gameLoop();
}

function update() {
    if (keys['ArrowLeft'] || keys['KeyA']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['KeyD']) player.x += player.speed;
    if (keys['ArrowUp'] || keys['KeyW']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['KeyS']) player.y += player.speed;

    // Colisão com as bordas reais do canvas interno
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function draw() {
    // Limpa a tela antes do novo frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Solo de Terra Roxa
    ctx.fillStyle = '#1a001a';
    ctx.fillRect(0, 500, canvas.width, 100);
    ctx.strokeStyle = '#ff0033';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 500);
    ctx.lineTo(canvas.width, 500);
    ctx.stroke();

    // Cenário: Araucária estilizada (Paraná)
    ctx.fillStyle = '#0d0013';
    ctx.fillRect(650, 320, 20, 180); // Tronco
    ctx.fillStyle = '#260033';
    ctx.fillRect(580, 300, 160, 20); // Galhos inferiores
    ctx.fillRect(600, 270, 120, 20); // Galhos superiores

    // Painel Textual Superior
    ctx.fillStyle = '#ff0033';
    ctx.font = "bold 16px Merriweather, Georgia, serif";
    ctx.fillText(`Jornada: Migrante ${playerOrigin}`, 20, 40);
    
    ctx.fillStyle = '#800080';
    ctx.font = "14px Merriweather, Georgia, serif";
    ctx.fillText("Destino: Fronteira Agrícola (Londrina/Maringá)", 20, 65);

    // Renderização do Jogador
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Contorno para dar destaque expressionista
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(player.x, player.y, player.width, player.height);
}

// Loop principal de animação estável
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
