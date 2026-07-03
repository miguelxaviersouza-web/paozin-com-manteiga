const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let playerOrigin = "";
const player = { x: 50, y: 420, width: 40, height: 60, speed: 5, color: '#a100ff' };
const keys = {};

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

// Função de transição de telas corrigida e protegida
function changeScreen(currentId, nextId) {
    const currentScreen = document.getElementById(currentId);
    const nextScreen = document.getElementById(nextId);
    
    if (currentScreen && nextScreen) {
        currentScreen.classList.add('hidden');
        nextScreen.classList.remove('hidden');
    } else {
        console.error("Erro: Não foi possível encontrar as telas com os IDs: " + currentId + " ou " + nextId);
    }
}

// Configura a origem do jogador e inicia o jogo
function selectOrigin(origin) {
    playerOrigin = origin;
    
    const originScreen = document.getElementById('screen-origin');
    if (originScreen) {
        originScreen.classList.add('hidden');
    }
    
    if(origin === 'Nordestino') player.color = '#a100ff'; 
    if(origin === 'Paulista') player.color = '#ff0033';    
    if(origin === 'Mineiro') player.color = '#ff00aa';     
    
    // Inicia o loop do jogo
    gameLoop();
}

function update() {
    if (keys['ArrowLeft'] || keys['KeyA']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['KeyD']) player.x += player.speed;
    if (keys['ArrowUp'] || keys['KeyW']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['KeyS']) player.y += player.speed;

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > 480) player.y = 480 - player.height;

    if (player.x > 200) objectives[0].done = true;
    if (player.x > 450) objectives[1].done = true;
    if (player.x > 650) objectives[2].done = true;
}

function draw() {
    ctx.fillStyle = '#0a020c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#16020c'; 
    ctx.fillRect(0, 480, canvas.width, 120);
    
    ctx.strokeStyle = '#ff0033'; 
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 480);
    ctx.lineTo(canvas.width, 480);
    ctx.stroke();

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

    ctx.fillStyle = 'rgba(15, 2, 22, 0.85)';
    ctx.fillRect(15, 15, 480, 140);
    ctx.strokeStyle = '#800080';
    ctx.lineWidth = 2;
    ctx.strokeRect(15, 15, 480, 140);
    
    ctx.fillStyle = '#ff0033'; 
    ctx.font = "bold 16px Merriweather, Georgia, serif";
    ctx.fillText("Jornada: Migrante " + playerOrigin, 30, 45);
    
    ctx.fillStyle = '#ba75ff'; 
    ctx.font = "13px Merriweather, Georgia, serif";
    ctx.fillText("Objetivo: Expansão da Fronteira Agrícola", 30, 65);

    ctx.font = "12px Merriweather, Georgia, serif";
    objectives.forEach((obj, index) => {
        if (obj.done) {
            ctx.fillStyle = '#00ff66'; 
            ctx.fillText(obj.text + " [OK]", 30, 95 + (index * 18));
        } else {
            ctx.fillStyle = '#bda6bd'; 
            ctx.fillText(obj.text + " [...]", 30, 95 + (index * 18));
        }
    });

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
