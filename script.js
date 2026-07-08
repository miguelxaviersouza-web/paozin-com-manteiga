document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    let playerOrigin = "";
    // Configurações básicas do jogador
    const player = { x: 50, y: 420, width: 40, height: 60, speed: 5, color: '#a100ff' };
    const keys = {};

    // Sistema de metas/objetivos históricos do RPG
    const objectives = [
        { text: "1. Desbrave a Terra Roxa indo para a direita.", done: false },
        { text: "2. Derrube a mata pioneira para abrir caminho.", done: false },
        { text: "3. Alcance o extremo leste para fundar as cidades.", done: false }
    ];

    // --- ENGENHARIA DE TELAS (Captura de cliques) ---
    const btnStart = document.getElementById('btn-start');
    const btnCredits = document.getElementById('btn-credits');
    const screenIntro = document.getElementById('screen-intro');
    const screenOrigin = document.getElementById('screen-origin');

    if (btnStart) {
        btnStart.addEventListener('click', () => {
            screenIntro.classList.add('hidden');
            screenOrigin.classList.remove('hidden');
        });
    }

    if (btnCredits) {
        btnCredits.addEventListener('click', () => {
            alert('Inspirado na obra expressionista e de fundo social do paraense Theodoro Braga.');
        });
    }

    // Configuração da escolha de personagens
    const originButtons = document.querySelectorAll('[data-origin]');
    originButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const selected = e.target.getAttribute('data-origin');
            playerOrigin = selected;
            
            screenOrigin.classList.add('hidden');
            
            // Customiza a cor de acordo com a origem do migrante
            if(selected === 'Nordestino') player.color = '#a100ff'; 
            if(selected === 'Paulista') player.color = '#ff0033';    
            if(selected === 'Mineiro') player.color = '#ff00aa';     
            
            // Dá início ao loop do Canvas
            gameLoop();
        });
    });

    // --- CONTROLES DE MOVIMENTAÇÃO ---
    window.addEventListener('keydown', e => {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
            e.preventDefault(); 
        }
        keys[e.code] = true;
    });
    window.addEventListener('keyup', e => keys[e.code] = false);

    function update() {
        if (keys['ArrowLeft'] || keys['KeyA']) player.x -= player.speed;
        if (keys['ArrowRight'] || keys['KeyD']) player.x += player.speed;
        if (keys['ArrowUp'] || keys['KeyW']) player.y -= player.speed;
        if (keys['ArrowDown'] || keys['KeyS']) player.y += player.speed;

        // Limita as bordas para o personagem não sumir ou cair
        if (player.x < 0) player.x = 0;
        if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
        if (player.y < 0) player.y = 0;
        if (player.y + player.height > 480) player.y = 480 - player.height;

        // Atualiza os objetivos históricos conforme anda pelo mapa do Paraná
        if (player.x > 200) objectives[0].done = true;
        if (player.x > 450) objectives[1].done = true;
        if (player.x > 650) objectives[2].done = true;
    }

    function draw() {
        // 1. Limpa e pinta o fundo do céu (Preto Expressionista)
        ctx.fillStyle = '#0a020c';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Solo de Terra Roxa / Café
        ctx.fillStyle = '#16020c'; 
        ctx.fillRect(0, 480, canvas.width, 120);
        
        // Linha do horizonte vermelha marcante
        ctx.strokeStyle = '#ff0033'; 
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, 480);
        ctx.lineTo(canvas.width, 480);
        ctx.stroke();

        // 3. Elemento do Cenário: Araucária do PR
        ctx.fillStyle = '#26041c'; 
        ctx.fillRect(660, 270, 25, 210); // Tronco
        
        ctx.fillStyle = '#4a002a'; 
        ctx.fillRect(580, 250, 185, 22); // Folhas baixo
        ctx.fillStyle = '#73003c'; 
        ctx.fillRect(610, 220, 125, 22); // Folhas cima

        ctx.strokeStyle = '#ff0033';
        ctx.lineWidth = 1;
        ctx.strokeRect(580, 250, 185, 22);
        ctx.strokeRect(610, 220, 125, 22);

        // 4. Caixa do painel de objetivos
        ctx.fillStyle = 'rgba(15, 2, 22, 0.85)';
        ctx.fillRect(15, 15, 480, 140);
        ctx.strokeStyle = '#800080';
        ctx.lineWidth = 2;
        ctx.strokeRect(15, 15, 480, 140);
        
        // Textos das missões
        ctx.fillStyle = '#ff0033'; 
        ctx.font = "bold 16px sans-serif";
        ctx.fillText("Jornada: Migrante " + playerOrigin, 30, 45);
        
        ctx.fillStyle = '#ba75ff'; 
        ctx.font = "13px sans-serif";
        ctx.fillText("Objetivo: Expansão da Fronteira Agrícola", 30, 65);

        ctx.font = "12px sans-serif";
        objectives.forEach((obj, index) => {
            if (obj.done) {
                ctx.fillStyle = '#00ff66'; 
                ctx.fillText(obj.text + " [OK]", 30, 95 + (index * 18));
            } else {
                ctx.fillStyle = '#bda6bd'; 
                ctx.fillText(obj.text + " [...]", 30, 95 + (index * 18));
            }
        });

        // 5. Desenha o Jogador quadrado
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
});
