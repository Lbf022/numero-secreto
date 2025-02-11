let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio ();
let tentativas = 1;

function exibirTextonaTela (tag, texto) {
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextonaTela ('h1', 'Jogo do número Secreto');
    exibirTextonaTela ('p', 'Escreva um número entre 1 e 10');
}


exibirMensagemInicial ();

function verificarChute() {
    let chute = document.querySelector ('input').value;

    if (chute == numeroSecreto) {
        exibirTextonaTela ('h1', 'Acertou!');
        let palavratentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavratentativas}.`;
        exibirTextonaTela ('p', mensagemTentativa);
        document.getElementById ('reiniciar').removeAttribute ('disabled');

    } else{
        if (chute > numeroSecreto) {
            exibirTextonaTela ('p', `O número secreto é menor que ${chute}`);
        } else {
            exibirTextonaTela ('p', `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo ();
    }   
}

function gerarNumeroAleatorio () {
    let numeroSecretoEscolhido =  parseInt (Math.random () * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes (numeroSecretoEscolhido)) {
        gerarNumeroAleatorio ();
    } else {
        listaDeNumerosSorteados.push (numeroSecretoEscolhido);
        console.log (listaDeNumerosSorteados);
        return numeroSecretoEscolhido;
    }
}

function limparCampo () {
    chute = document.querySelector ('input');
    chute.value = '';
}

function reiniciarJogo () {
    numeroSecreto = gerarNumeroAleatorio ();
    limparCampo ();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById ('reiniciar').setAttribute ('disabled', true);
}