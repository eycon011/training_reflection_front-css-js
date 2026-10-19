// Mapeamento dos elementos do DOM
const btnIniciar = document.querySelector('#btnIniciar');
const spanTempo = document.querySelector('#tempo');
const spanPontos = document.querySelector('#pontos');
const areaJogo = document.querySelector('#areaJogo');
const alvo = document.querySelector('#alvo');

let tempoRestante = 10;
let pontuacao = 0;
let timer = null;

// Requisito 2: Função auxiliar para calcular coordenadas e posicionar o alvo
function reposicionarAlvo() {
    // Desconta a largura e altura do próprio alvo para não ultrapassar as bordas
    const maxLeft = areaJogo.clientWidth - alvo.offsetWidth;
    const maxTop = areaJogo.clientHeight - alvo.offsetHeight;

    const novoLeft = Math.floor(Math.random() * maxLeft);
    const novoTop = Math.floor(Math.random() * maxTop);

    alvo.style.left = `${novoLeft}px`;
    alvo.style.top = `${novoTop}px`;
}

// Requisito 1: Temporização assíncrona ao clicar no botão
btnIniciar.addEventListener('click', () => {
    // Reinicia contadores
    tempoRestante = 10;
    pontuacao = 0;
    spanTempo.textContent = tempoRestante;
    spanPontos.textContent = pontuacao;

    // Desabilita o botão para evitar múltiplos disparos concorrentes
    btnIniciar.disabled = true;

    // Exibe o alvo e sorteia a primeira posição
    alvo.style.display = 'block';
    reposicionarAlvo();

    // Limpa temporizador anterior caso exista e inicia a contagem
    clearInterval(timer);
    timer = setInterval(() => {
        tempoRestante--;
        spanTempo.textContent = tempoRestante;

        // Requisito 4: Finalização do jogo
        if (tempoRestante <= 0) {
            clearInterval(timer);
            alvo.style.display = 'none'; // Oculta o alvo
            btnIniciar.disabled = false; // Reativa o botão
            alert(`Tempo esgotado! Sua pontuação final foi: ${pontuacao} pontos.`);
        }
    }, 1000);
});

// Requisito 3: Interatividade e acertos ao clicar no alvo
alvo.addEventListener('click', () => {
    pontuacao++;
    spanPontos.textContent = pontuacao;
    reposicionarAlvo();
});