const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let playerOrigin = "";
// Personagem principal
const player = { x: 50, y: 440, width: 40, height: 60, speed: 5, color: '#ff0033' };
const keys = {};

// Lista de objetivos do jogo para renderizar na tela
const objectives = [
    { text: "1. Desbrave a Terra Roxa em busca de espaço.", done: false },
    { text: "2. Plante os primeiros grãos de Café no Norte do PR.", done: false },
    { text: "3. Siga para o leste para fundar Londrina e Maringá.", done: false }
];

// Captura de comandos do teclado
window.addEventListener('keydown', e => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault(); // Evita que a página role enquanto joga
    }
    keys[e.code] = true;
});
window.addEventListener('keyup', e => keys[e.code] = false);

// Transição de telas do menu
function changeScreen(currentId, nextId) {
    const currentScreen = document.getElementById(currentId);
    const nextScreen = document.getElementById(nextId);
    if (currentScreen && nextScreen) {
        currentScreen.classList.add('hidden');
        nextScreen.classList.remove('hidden');
    }
}

// Configura a origem escolhida pelo jogador
function selectOrigin(origin) {
    playerOrigin = origin;
    document.getElementById('screen-origin').classList.add('hidden');
    
    // Define a cor do jogador com base na escolha
    if(origin === 'Nordestino') player.color = '#a100ff'; // Roxo Expressionista
    if(origin === 'Paulista') player.color = '#ff0033';    // Vermelho Vivo
    if(origin === 'Mineiro') player.color = '#ff00aa';     // Rosa/Carmesim
    
    // Aguarda um instante para garantir que a tela limpou e inicia o loop
    setTimeout(() => {
        gameLoop();
    }, 100);
}

function update() {
    if (keys['ArrowLeft'] || keys['KeyA']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['KeyD']) player.x += player.speed;
    if (keys['ArrowUp'] || keys['KeyW']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['KeyS']) player.y += player.speed;

    // Limites de colisão com as bordas do Canvas
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;

    // Lógica simples de checagem de objetivos por posição
    if (player.x > 200) objectives[0].done = true;
    if (player.x > 400) objectives[1].done = true;
    if (player.x > 600) objectives[2].done = true;
}

function draw() {
    // 1. Limpa a tela inteira antes de desenhar o novo frame (Fundo Roxo Escuro)
    ctx.fillStyle = '#0f0214';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Desenha o Solo de Terra Roxa (Com traço vermelho expressionista)
    ctx.fillStyle = '#260511'; // Tom de terra/café queimado
    ctx.fillRect(0, 480, canvas.width, 120);
    
    ctx.strokeStyle = '#ff0033'; // Linha do horizonte vermelha
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 480);
    ctx.lineTo(canvas.width, 480);
    ctx.stroke();

    // 3. Desenha o Cenário: Araucária do Paraná (Cores fortes para dar contraste)
    ctx.fillStyle = '#3a0d28'; // Tronco roxo escuro
    ctx.fillRect(660, 250, 25, 230); 
    
    ctx.fillStyle = '#670033'; // Galhos inferiores (Expressionistas)
    ctx.fillRect(580, 230, 185, 20);
    ctx.fillStyle = '#990033'; // Galhos superiores
    ctx.fillRect(610, 200, 125, 20);

    // 4. Desenha o Painel de Informações e Objetivos (Texto)
    ctx.fillStyle = '#rgba(0,0,0,0.5)';
    ctx.fillRect(10, 10, 450, 140); // Fundo do painel de texto
    
    ctx.fillStyle = '#ff0033'; // Título em Vermelho
    ctx.font = "bold 16px Merriweather, Georgia, serif";
    ctx.fillText(`Jornada: Migrante ${playerOrigin}`, 20, 35);
    
    ctx.fillStyle = '#bc73ff'; // Subtítulo em Roxo Claro
    ctx.font = "13px Merriweather, Georgia, serif";
    ctx.fillText("Destino: Expansão da Fronteira Agrícola do Café", 20, 55);

    // Renderiza a lista de metas/objetivos na tela
    ctx.font = "12px Merriweather, Georgia, serif";
    objectives.forEach((obj, index) => {
        ctx.fillStyle = obj.done ? '#00ff66' : '#d8c0d8'; // Verde se feito, cinza se não
        let statusText = obj.done ? " [CONCLUÍDO]" : " [EM ANDAMENTO]";
        ctx.fillText(obj.text + statusText, 20, 85 + (index * 20));
    });

    // 5. Desenha o Personagem (O quadrado escolhido)
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Contorno do Personagem (Branco para destacar no fundo escuro)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(player.x, player.y, player.width, player.height);
}

// Loop Principal estável
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
