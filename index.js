const caixas = document.querySelectorAll(".caixa")
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
    const elemento = evento.target
    const elemIndex = parseInt(elemento.getAttribute('data-index'))

    // adiciono a jogada do jogador atual 
    statsGame[elemIndex] = jogadorAtual

    // adiciono a jogada na tela
    elemento.textContent = jogadorAtual

    if(checaVitoria()) {
        console.log("venceu!")
    } else {
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X'
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

caixas.forEach(cell => cell.addEventListener("click", handleCellClick))
