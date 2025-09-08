let cards = [];
        let firstCard = null;
        let secondCard = null;
        let matchedPairs = 0;
        let totalPairs = 0;
        let startTime = null;
        let elapsedTime = 0;
        let moves = 0;
        let timerInterval = null;
        let level = '';
        let wordsImages = {
            "Gato": {
                word: "Gato",
                imgSrc: "./images/business-cat.png",
                alt: "Ilustracao realista de um gato preto com olhos amarelos e terno de negocios, parado confiantemente como um executivo felino"
            },
            "Cachorro": {
                word: "Cachorro",
                imgSrc: "./images/happy-dog.png",
                alt: "Imagem cartoon de um cachorro feliz com lingua para fora, rabo abanando e expressao facial amigavel em um campo gramado"
            },
            "Passaro": {
                word: "Passaro",
                imgSrc: "./images/bird-amazonian.png",
                alt: "Representacao artistica de um passaro amazonico colorido com asas abertas, plumas vibrantes em tons de verde e azul, voando sobre a selva"
            },
            "Peixe": {
                word: "Peixe",
                imgSrc: "./images/Koi-Fish.png",
                alt: "Ilustracao subaquatica de um peixe koi dourado nadando graciosamente em um rio limpido com folhas caidas e fundo de pedra"
            },
            "Leao": {
                word: "Leao",
                imgSrc: "./images/lion-head.png",
                alt: "Desenho artistico de uma cabeca de leao majestoso com juba espessa e olhos ferozes, em tons de bege e ouro contra fundo savana"
            },
            "Tigre": {
                word: "Tigre",
                imgSrc: "./images/tiger-face.png",
                alt: "Retrato realista de um rosto de tigre listrado com pelagem laranja e preta, bigodes proeminentes e expressao deIntensity"
            },
            "Elefante": {
                word: "Elefante",
                imgSrc: "./images/elephant-icon.png",
                alt: "Ilustracao em aquarela de um elefante africano com tromba erguida, presas grandes e pele rugosa em tons de cinza, em um ambiente natural"
            },
            "Urso": {
                word: "Urso",
                imgSrc: "./images/angry-bear-head.png",
                alt: "Ilustracao cartoon de uma cabeca de urso zangado com presas a mostra, olhos vermelhos e expressao feroz sob pelagem marrom"
            },
            "Cavalo": {
                word: "Cavalo",
                imgSrc: "./images/horse.png",
                alt: "Representacao realista de um cavalo branco galopando em campo aberto, crina e cauda esvoacando ao vento com pressao dourada"
            },
            "Coelho": {
                word: "Coelho",
                imgSrc: "./images/rabbit.png",
                alt: "Desenho cute de um coelho branco com orelhas longas, sentado ereto com olhos grandes e um balao de pensamento com cenoura"
            },
            "Macaco": {
                word: "Macaco",
                imgSrc: "./images/monkey.png",
                alt: "Ilustracao humoristica de um macaco sorridente com gravata, segurando uma banana, expressao inteligente e malandra"
            },
            "Girafa": {
                word: "Girafa",
                imgSrc: "./images/giraffe.png",
                alt: "Imagem perfil de uma girafa elegante com pescoço longo, Pinturas pretas e marrons suaves, pastando na savana africana"
            },
            "Zebra": {
                word: "Zebra",
                imgSrc: "./images/zebra.png",
                alt: "Vista lateral de uma zebra com listras pretas e brancas nitidas, galopando em campo gramado com caminho de terra ao fundo"
            },
            "Rinoceronte": {
                word: "Rinoceronte",
                imgSrc: "./images/rhino.png",
                alt: "Ilustracao detalhada de um rinoceronte cinza com chifre grande, pele rugosa e expressao serena em ambiente selvagem"
            },
            "Hipopotamo": {
                word: "Hipopotamo",
                imgSrc: "./images/hippo.png",
                alt: "Representacao subaquatica de um hipopotamo emergindo da agua, boca aberta mostrando dentes, pele rosa e musculos definidos"
            },
            "Panda": {
                word: "Panda",
                imgSrc: "./images/panda.png",
                alt: "Desenho adoravel de um panda gigante comendo bambu, pelagem branca e preta, olhos grandes e expressao pacifica"
            }
        };

        function goToMenu() {
            clearInterval(timerInterval);  // Para o cronômetro
            restartGame();  // Reinicia o jogo para limpar o estado
            document.getElementById('game').style.display = 'none';
            document.getElementById('menu').style.display = 'flex';
        }

        function startGame(selectedLevel) {
            level = selectedLevel;
            document.getElementById('level-span').textContent = level;
            document.getElementById('menu').style.display = 'none';
            document.getElementById('game').style.display = 'flex';
            initializeGame();
        }

        function initializeGame() {
            const numPairs = { 'Iniciante': 4, 'Intermediario':6, 'Profissional': 8, 'Lendario': 12 }[level];
            totalPairs = numPairs;
            moves = 0;
            matchedPairs = 0;
            elapsedTime = 0;
            firstCard = null;
            secondCard = null;

            updateLabels();
            startTimer();

            const availableWords = Object.values(wordsImages);
            const selectedCards = availableWords.slice(0, numPairs);
            cards = [...selectedCards, ...selectedCards].sort(() => Math.random() - 0.5);

            renderBoard();
        }

        // function renderBoard() {
        //     const board = document.getElementById('board');
        //     board.innerHTML = '';
        //     cards.forEach((cardData, index) => {
        //         const cardDiv = document.createElement('div');
        //         cardDiv.className = 'card';
        //         cardDiv.innerHTML = `
        //             <div class="card-inner">
        //                 <div class="card-face card-front">
        //                     <img src="./images/memory_icon.png" alt="Desenho de verso de carta com marca de interrogacao central em circulo azul escuro" class="w-20 h-20">
        //                 </div>
        //                 <div class="card-face card-back">
        //                     <img src="${cardData.imgSrc}" alt="${cardData.alt}" class="w-20 h-20 mb-2">
        //                     <span class="text-sm font-bold">${cardData.word}</span>
        //                 </div>
        //             </div>
        //         `;
        //         cardDiv.addEventListener('click', () => cardClick(cardDiv, index, cardData));
        //         board.appendChild(cardDiv);
        //     });
        // }

        function renderBoard() {
            const board = document.getElementById('board');
            board.innerHTML = '';
            // Define número par de colunas baseado no total de cartas
            const totalCards = totalPairs * 2;
            let cols;
            if (totalCards <= 8) {
                cols = 4;  // 4 colunas para até 8 cartas
            } else {
                cols = 4;  // 4 colunas para até 24 cartas
            }
            // Aplica o grid-template-columns com número par de colunas
            board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
            cards.forEach((cardData, index) => {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'card';
                cardDiv.innerHTML = `
                    <div class="card-inner">
                        <div class="card-face card-front">
                            <img src="./images/memory_icon.png" alt="Desenho de verso de carta com marca de interrogacao central em circulo azul escuro" class="w-20 h-20">
                        </div>
                        <div class="card-face card-back">
                            <img src="${cardData.imgSrc}" alt="${cardData.alt}" class="w-20 h-20 mb-2">
                            <span class="text-sm font-bold">${cardData.word}</span>
                        </div>
                    </div>
                `;
                cardDiv.addEventListener('click', () => cardClick(cardDiv, index, cardData));
                board.appendChild(cardDiv);
            });
        }

        function cardClick(cardDiv, index, cardData) {
            if (cardDiv.classList.contains('flipped') || cardDiv.classList.contains('matched') || (firstCard && secondCard)) return;

            cardDiv.classList.add('flipped');
            if (!firstCard) {
                firstCard = { div: cardDiv, index, data: cardData };
            } else if (!secondCard) {
                secondCard = { div: cardDiv, index, data: cardData };
                moves++;
                updateLabels();
                setTimeout(checkMatch, 1000);
            }
        }

        function checkMatch() {
            if (firstCard.data.word !== secondCard.data.word) {
                firstCard.div.classList.remove('flipped');
                secondCard.div.classList.remove('flipped');
            } else {
                firstCard.div.classList.add('matched');
                secondCard.div.className += ' matched';
                matchedPairs++;
                updateLabels();
                if (matchedPairs === totalPairs) {
                    clearInterval(timerInterval);
                    gameOver();
                }
            }
            firstCard = null;
            secondCard = null;
        }

        function startTimer() {
            startTime = Date.now();
            timerInterval = setInterval(() => {
                elapsedTime = Math.floor((Date.now() - startTime) / 1000);
                const minutes = Math.floor(elapsedTime / 60);
                const seconds = elapsedTime % 60;
                document.getElementById('time-span').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        }

        function updateLabels() {
            document.getElementById('moves-span').textContent = moves;
            document.getElementById('pairs-span').textContent = `${matchedPairs}/${totalPairs}`;
        }

        function restartGame() {
            clearInterval(timerInterval);
            initializeGame();
        }

        function gameOver() {
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = elapsedTime % 60;
            const efficiency = moves / totalPairs;
            const timeScore = elapsedTime / 60;
            let performance = 'Continue praticando!';
            if (efficiency <= 1.5 && timeScore <= 2) performance = 'Excelente!';
            else if (efficiency <= 2.0 && timeScore <= 3) performance = 'Muito bom!';
            else if (efficiency <= 2.5) performance = 'Bom!';

            document.getElementById('stats-text').textContent = 
                `\nEstatisticas:\nNivel: ${level}\nTempo: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}\nMovimentos: ${moves}\nPares encontrados: ${matchedPairs}/${totalPairs}\nDesempenho: ${performance}`;
            document.getElementById('gameOverModal').style.display = 'block';
        }

        function closeModal() {
            document.getElementById('gameOverModal').style.display = 'none';
            document.getElementById('menu').style.display = 'flex';
            document.getElementById('game').style.display = 'none';
            clearInterval(timerInterval);
        }