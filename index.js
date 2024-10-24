const caixas = document.querySelectorAll(".caixa")
const statusBox = document.querySelector(".status")
const res = document.querySelector('.resultado')
const btnStart = document.querySelector(".btn-start")

// variavel de controle
let jogoComecou = false
let jogadorAtual = 'X'
let statsGame = ['', '', '', '', '', '', '', '', ''] 

// posiçoes - condições para ganhar
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(evento) {
    if (jogoComecou) {
        const elemento = evento.target

        if (elemento.textContent !== '') return

        const elemIndex = parseInt(elemento.getAttribute('data-index'))

        // adiciono a jogada do jogador atual 
        statsGame[elemIndex] = jogadorAtual

        // adiciono a jogada na tela
        elemento.textContent = jogadorAtual

        switch (jogadorAtual) {
            case 'X':
                statusBox.textContent = 'Vez do Jogador O'
                break
            case 'O':
                statusBox.textContent = "Vez do Jogador X"
                break
        }

        if(checaVitoria()) {
            fimJogo(jogadorAtual)
        } else {
            jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X'
        } 
    }
}

function checaVitoria() {
    return winningConditions.some(condicao => {
        const [a, b, c] = condicao
        return statsGame[a] === jogadorAtual && 
                statsGame[a] === statsGame[b] &&
                statsGame[a] === statsGame[c]
    })
}

function fimJogo(jogador) {
    jogoComecou = false
    statsGame = ['', '', '', '', '', '', '', '', ''] 
    jogadorAtual = 'X'
    statusBox.textContent = 'Fim de Jogo'
    btnStart.disabled = false
    
    switch (jogador) {
        case 'X':
            res.textContent = 'Jogador X venceu!!!'
            break
        case 'O':
            res.textContent = "Jogador O venceu!!!"
            break
    }
}


caixas.forEach(cell => cell.addEventListener("click", handleCellClick))

btnStart.addEventListener("click",() => {
    jogoComecou = true
    btnStart.disabled = true
    caixas.forEach(caixa => {
        caixa.textContent = '';  // Limpa o texto da célula
    });
    statusBox.textContent = "Jogo iniciou!"
    res.textContent = "Sem vitória nenhuma"
})
