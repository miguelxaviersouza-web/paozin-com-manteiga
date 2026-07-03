const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let playerOrigin = "";
// Posiciona o personagem perfeitamente em cima do chão vermelho
const player = { x: 50, y: 420, width: 40, height: 60, speed: 5, color: '#a100ff' };
const keys = {};

// Lista de objetivos para aparecerem na tela
const objectives = [
    { text: "1. Desbrave a Terra Roxa indo para a direita.", done: false },
    { text: "2. Derrube a mata pioneira para abrir caminho.", done: false },
    { text: "3. Alcance o extremo leste para fundar as cidades.", done: false }
];

window.addEventListener('keydown', e => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault(); 
    }
    keys[e.code] = true;
});
window.addEventListener('keyup', e => keys[e.code] = false);

function changeScreen(currentId, nextId) {
    const currentScreen = document.getElementById(currentId);
    const nextScreen = document.getElementById(nextId);
    if (currentScreen && nextScreen) {
        currentScreen.classList.add('hidden');
        nextScreen.classList.remove('hidden');
    }
}

function selectOrigin(origin) {
    playerOrigin = origin;
    document.getElementById('screen-origin').classList.add('hidden');
    
    if(origin === 'Nordestino') player.color = '#a100ff'; // Roxo neon
    if(origin === 'Paulista') player.color = '#ff0033';    // Vermelho vivo
    if(origin === 'Mineiro') player.color = '#ff00aa';     // Carmesim
    
    gameLoop();
}

function update() {
    if (keys['ArrowLeft'] || keys['KeyA']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['KeyD']) player.x += player.speed;
    if (keys['ArrowUp'] || keys['KeyW']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['KeyS']) player.y += player.speed;

    // Limita o movimento para o jogador não cair do chão
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    // Impede o jogador de passar para baixo da linha da terra
    if (player.y + player.height > 480) player.y = 480 - player.height;

    // Ativa os objetivos conforme o jogador avança no mapa
    if (player.x > 200) objectives[0].done = true;
    if (player.x > 450) objectives[1].done = true;
    if (player.x > 650) objectives[2].done = true;
}

function draw() {
    // 1. CORREÇÃO: Pinta o fundo do céu de PRETO SOMBREADO (Acaba com o fundo branco)
    ctx.fillStyle = '#0a020c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Solo de Terra Roxa
    ctx.fillStyle = '#16020c'; 
    ctx.fillRect(0, 480, canvas.width, 120);
    
    // Linha do horizonte vermelha marcante
    ctx.strokeStyle = '#ff0033'; 
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 480);
    ctx.lineTo(canvas.width, 480);
    ctx.stroke();

    // 3. Cenário: Araucária com cores expressionistas e contorno para destacar
    ctx.fillStyle = '#26041c'; // Tronco
    ctx.fillRect(660, 270, 25, 210); 
    
    ctx.fillStyle = '#4a002a'; // Copa inferior
    ctx.fillRect(580, 250, 185, 22);
    ctx.fillStyle = '#73003c'; // Copa superior
    ctx.fillRect(610, 220, 125, 22);

    // Contorno da árvore para dar o estilo artístico de "pincelada"
    ctx.strokeStyle = '#ff0033';
    ctx.lineWidth = 1;
    ctx.strokeRect(580, 250, 185, 22);
    ctx.strokeRect(610, 220, 125, 22);

    // 4. Painel de Informações e Metas (Texto com fundo semitransparente corrigido)
    ctx.fillStyle = 'rgba(15, 2, 22, 0.7)';
    ctx.fillRect(15, 15, 480, 140);
    ctx.strokeStyle = '#800080';
    ctx.strokeRect(15, 15, 480, 140);
    
    // Textos da interface
    ctx.fillStyle = '#ff0033'; 
    ctx.font = "bold 16px Merriweather, Georgia, serif";
    ctx.fillText(`Jornada: Migrante ${playerOrigin}`, 30, 45);
    
    ctx.fillStyle = '#ba75ff'; 
    ctx.font = "13px Merriweather, Georgia, serif";
    ctx.fillText("Objetivo: Expansão da Fronteira Agrícola e Ciclo do Café", 30, 65);

    // Renderiza dinamicamente as missões
    ctx.font = "12px Merriweather, Georgia, serif";
    objectives.forEach((obj, index) => {
        if (obj.done) {
            ctx.fillStyle = '#00ff66'; // Verde se concluído
            ctx.fillText(obj.text + " [OK]", 30, 95 + (index * 18));
        } else {
            ctx.fillStyle = '#bda6bd'; // Cinza/Roxo se pendente
            ctx.fillText(obj.text + " [...]", 30, 95 + (index * 18));
        }
    });

    // 5. Desenha o Personagem principal
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Contorno forte no personagem
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
