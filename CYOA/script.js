
const caixaPrincipal = document.querySelector('.caixa-principal');
const caixaPerguntas = document.querySelector('.caixa-perguntas');
const caixaAlternativas = document.querySelector('.caixa-alternativas');
const caixaResultado = document.querySelector('.caixa-resultado');
const textoResultado = document.querySelector('.texto-resultado');

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

const perguntas = [
  {
    enunciado: "O magnata Richard Blackwood é encontrado morto em seu escritório. Como detetive, sua primeira ação é:",
    alternativas: [
      {
        texto: "Analisar a cena do crime (corpo e arredores)",
        afirmacao: "Você nota: marcas de agulha no pescoço, copo de uísque com resíduos e o relógio de pulso parado às 21:07."
      },
      {
        texto: "Reunir todos os suspeitos na biblioteca",
        afirmacao: "Presentes: a esposa (nervosa), o filho (irritado), a secretária (pálida) e o mordomo (suando excessivamente)."
      }
    ]
  },
  {
    enunciado: "A autópsia revela morte por cianeto. Onde você busca a arma do crime?",
    alternativas: [
      {
        texto: "No laboratório particular da mansão",
        afirmacao: "Encontra frascos de cianeto com etiquetas adulteradas e luvas usadas com DNA desconhecido."
      },
      {
        texto: "No quarto da vítima",
        afirmacao: "Descobre uma carta ameaçadora assinada pelas iniciais 'V.T.' e um frasco de remédios vazio."
      }
    ]
  },
  {
    enunciado: "O celular da vítima mostra uma ligação às 20:55. Você:",
    alternativas: [
      {
        texto: "Rastreia o número misterioso",
        afirmacao: "Era do hospital local - a secretária tinha marcado consulta para Blackwood no mesmo dia."
      },
      {
        texto: "Verifica as câmeras de segurança",
        afirmacao: "Gravações mostram o mordomo saindo do escritório às 21:03, ajustando as luvas."
      }
    ]
  },
  {
    enunciado: "No escritório, você encontra um testamento recente. Ele revela:",
    alternativas: [
      {
        texto: "A exclusão do filho da herança",
        afirmacao: "O filho tinha dívidas milionárias com cassinos e acesso ao cofre familiar."
      },
      {
        texto: "Um grande legado para a secretária",
        afirmacao: "Ela era filha secreta de Blackwood, mas o mordomo era o único que sabia desse segredo."
      }
    ]
  }
];

function mostraPergunta() {
  if (atual >= perguntas.length) {
    mostraResultado();
    return;
  }
  
  perguntaAtual = perguntas[atual];
  caixaPerguntas.textContent = perguntaAtual.enunciado;
  caixaAlternativas.textContent = "";
  mostraAlternativas();
}

function mostraAlternativas() {
  for (const alternativa of perguntaAtual.alternativas) {
    const botaoAlternativa = document.createElement("button");
    botaoAlternativa.textContent = alternativa.texto;
    botaoAlternativa.addEventListener("click", () => respostaSelecionada(alternativa));
    caixaAlternativas.appendChild(botaoAlternativa);
  }
}

function respostaSelecionada(opcaoSelecionada) {
  const afirmacoes = opcaoSelecionada.afirmacao;
  historiaFinal += "◆ " + afirmacoes + "\n";
  atual++;
  mostraPergunta();
}

function mostraResultado() {
  caixaPerguntas.textContent = "RELATÓRIO FINAL:";
  textoResultado.innerHTML = 
    `<strong>Pistas coletadas:</strong><br><br>${historiaFinal}<br>
    <em>Sua conclusão:</em> ${determinaAssassino()}`;
  caixaAlternativas.textContent = "";
}

function determinaAssassino() {
  // Lógica simples baseada nas pistas acumuladas
  if (historiaFinal.includes("mordomo") && historiaFinal.includes("luvas")) {
    return "O MORDOMO é o assassino! Ele manipulou o cianeto e foi flagrado nas câmeras.";
  } else if (historiaFinal.includes("filho") && historiaFinal.includes("dívidas")) {
    return "O FILHO é o culpado! Matou o pai para herdar antes que as dívidas fossem descobertas.";
  } else if (historiaFinal.includes("secretária") && historiaFinal.includes("filha secreta")) {
    return "A SECRETÁRIA cometeu o crime para garantir herança como filha não reconhecida.";
  } else {
    return "A ESPOSA planejou tudo para ficar com a fortuna, usando o mordomo como bode expiatório.";
  }
}

mostraPergunta();