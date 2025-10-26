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
            "CuecaVirada": {
                word: "CuecaVirada",
                imgSrc: "./images/Dishes Images/CuecaVirada.jpg",
                alt: "Cueca Virada é um doce frito tradicional da culinária mineira, especialmente popular em festas juninas, quermesses e feiras de rua em Minas Gerais. Consiste em uma massa doce frite de cor dourada intensa e formato irregular, torcido ou dobrado."
            },
            "ALaMinuta": {
                word: "A La minuta",
                imgSrc: "./images/Dishes Images/ArrozFeijaoBatataBife.jpg",
                alt: "Imagem de um prato chamado 'A la minuta', que apresenta um bife grelhado acompanhado de arroz branco, feijão preto e batatas fritas, servido em um prato branco sobre uma mesa"
            },
            "Costelao": {
                word: "Costelão",
                imgSrc: "./images/Dishes Images/Costelao.jpg",
                alt: "Foto de um prato suculento chamado Costelão, que apresenta uma costela bovina assada com temperos, acompanhada de farofa, vinagrete e mandioca frita, servida em um prato rústico sobre uma mesa de madeira"
            },
            "Feijoada": {
                word: "Feijoada",
                imgSrc: "./images/Dishes Images/Feijoada.jpg",
                alt: "Imagem de um prato tradicional brasileiro chamado Feijoada, que consiste em um guisado de feijão preto com carnes variadas, servido com arroz branco, couve refogada, laranja fatiada e farofa em um prato branco"
            },
            "MacarraoMolhoCarne": {
                word: "Macarrão",
                imgSrc: "./images/Dishes Images/MacarraoMolhoCarne.jpg",
                alt: "Foto de um prato de macarrão com molho de carne, apresentando espaguete coberto por um molho vermelho com pedaços de carne moída, servido em um prato branco sobre uma mesa"
            },
            "Moqueca": {
                word: "Moqueca",
                imgSrc: "./images/Dishes Images/Moqueca.jpg",
                alt: "Imagem de um prato típico brasileiro chamado Moqueca, que consiste em um ensopado de peixe com leite de coco, azeite de dendê, pimentões e temperos, servido em uma panela de barro com arroz branco ao lado"
            },
            "OssoBuco": {
                word: "Ossobuco",
                imgSrc: "./images/Dishes Images/OssoBuco.jpg",
                alt: "Foto de um prato italiano chamado Ossobuco, que apresenta um corte de carne bovina com osso, cozido lentamente em um molho saboroso, servido com purê de batatas e legumes em um prato branco"
            },
            "Pamonha": {
                word: "Pamonha",
                imgSrc: "./images/Dishes Images/Pamonha.jpg",
                alt: "Representacao realista de um cavalo branco galopando em campo aberto, crina e cauda esvoacando ao vento com pressao dourada"
            },
            "PaoDeQueijo": {
                word: "Pão de Queijo",
                imgSrc: "./images/Dishes Images/PaoDeQueijo.jpg",
                alt: "Imagem de pães de queijo fresquinhos, pequenos e redondos, com casca dourada e interior macio, servidos em um prato branco sobre uma mesa"
            },
            "Pinhao": {
                word: "Pinhão",
                imgSrc: "./images/Dishes Images/Pinhao.jpg",
                alt: "Foto de pinhões cozidos, que são sementes de araucária, com casca marrom brilhante e interior macio, servidos em um prato branco sobre uma mesa rústica"
            },
            "Polenta": {
                word: "Polenta",
                imgSrc: "./images/Dishes Images/Polenta.jpg",
                alt: "Imagem de um prato de polenta cremosa, feita com fubá de milho, servida em um prato branco e acompanhada de molho de tomate e queijo ralado"
            },
            "Pudim": {
                word: "Pudim",
                imgSrc: "./images/Dishes Images/Pudim.jpg",
                alt: "Foto de um pudim de leite condensado, com textura lisa e brilhante, coberto com calda de caramelo, servido em um prato branco"
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
                            <img src="${cardData.imgSrc}" alt="${cardData.alt}" class="w-20 h-20">
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