const responses = {
  "aquecimento global": [
    "O aquecimento global é o aumento da temperatura média da Terra. A principal causa atual é o aumento dos gases de efeito estufa produzido pelas atividades humanas.",
    "A queima de carvão, petróleo e gás libera gases que retêm calor na atmosfera. Reduzir essas emissões é essencial para limitar o aquecimento global."
  ],
  "desmatamento": [
    "O desmatamento reduz a biodiversidade, destrói habitats e diminui a capacidade das florestas de absorver dióxido de carbono.",
    "Proteger florestas e recuperar áreas degradadas ajuda a conservar espécies, água e equilíbrio climático."
  ],
  "poluição": [
    "A poluição pode afetar o ar, a água e o solo, prejudicando ecossistemas e a saúde das pessoas.",
    "Reduzir o desperdício, separar resíduos corretamente e melhorar os transportes são algumas formas de diminuir a poluição."
  ],
  "energias renováveis": [
    "Energia solar, eólica e hidrelétrica são exemplos de fontes renováveis. Elas se recompõem naturalmente e podem gerar eletricidade com baixas emissões.",
    "As energias renováveis ajudam a reduzir a dependência de combustíveis fósseis, embora cada projeto precise considerar seus impactos ambientais."
  ],
  "mudanças climáticas": [
    "Mudanças climáticas são alterações de longo prazo nos padrões de temperatura e clima. Hoje, o aquecimento observado é causado principalmente pelas emissões humanas de gases de efeito estufa.",
    "As mudanças climáticas podem intensificar ondas de calor, alterar padrões de chuva e elevar o nível do mar. Reduzir emissões e se adaptar aos impactos são ações importantes."
  ],
  "ajudar o planeta": [
    "Podes ajudar evitando desperdícios, economizando energia, usando água com responsabilidade e reutilizando materiais sempre que possível.",
    "Pequenas atitudes contam: planejar compras, reduzir descartáveis, cuidar de áreas verdes e escolher meios de transporte menos poluentes quando possível."
  ],
  "efeito estufa": [
    "O efeito estufa é um processo natural que mantém a Terra aquecida. O problema é sua intensificação pelo excesso de gases emitidos pelas atividades humanas.",
    "Gases como dióxido de carbono e metano retêm parte do calor na atmosfera. O aumento desses gases intensifica o efeito estufa."
  ],
  "reciclagem": [
    "A reciclagem transforma materiais usados em matéria-prima para novos produtos. Separar corretamente papel, plástico, vidro e metal pode ajudar a reduzir resíduos.",
    "Antes de reciclar, vale lembrar dos 3 Rs: reduzir o consumo, reutilizar o que for possível e reciclar o que não puder ser reutilizado."
  ],
  "água": [
    "A água doce disponível é limitada e essencial para todos os seres vivos. Evitar desperdícios e proteger rios e nascentes ajuda a conservar esse recurso.",
    "Fechar a torneira quando não está a ser usada, reparar vazamentos e evitar poluir rios são atitudes importantes."
  ]
};

const messages = document.getElementById("messages");
const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");
const clearButton = document.getElementById("clearChat");
const suggestions = document.getElementById("suggestions");

function normalize(text) {
  return text.toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[?!.,]/g, "")
    .trim();
}

function addMessage(text, sender) {
  const row = document.createElement("div");
  row.className = `message ${sender === "user" ? "user-message" : "bot-message"}`;

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = sender === "user" ? "🙂" : "🌍";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  row.append(avatar, bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

function getAnswer(question) {
  const q = normalize(question);

  if (/^(oi|ola|bom dia|boa tarde|boa noite)\b/.test(q)) {
    return "Olá! 🌱 Que bom conversar contigo. O que gostarias de saber sobre o clima e o meio ambiente?";
  }
  if (q.includes("obrigad")) return "De nada! Cada conversa é uma oportunidade de aprender a cuidar melhor do nosso planeta. 🌍";
  if (q.includes("quem es") || q.includes("quem e voce") || q.includes("o que es")) {
    return "Sou a Clima IA, um chatbot educativo criado para conversar sobre mudanças climáticas e sustentabilidade.";
  }
  if (q.includes("sair") || q.includes("tchau") || q.includes("adeus")) {
    return "Obrigado pela conversa! Continua a aprender e a cuidar do planeta. Até à próxima! 🌍";
  }

  const matches = Object.keys(responses).filter(topic => q.includes(normalize(topic)));
  if (matches.length) {
    const topic = matches[0];
    const options = responses[topic];
    return options[Math.floor(Math.random() * options.length)];
  }

  if (q.includes("causa") && (q.includes("clima") || q.includes("aquecimento"))) {
    return "Entre as principais causas do aquecimento atual estão a queima de combustíveis fósseis, o desmatamento e algumas atividades agrícolas e industriais.";
  }
  if (q.includes("solucao") || q.includes("solucoes")) {
    return "Algumas soluções incluem ampliar energias renováveis, proteger florestas, melhorar a eficiência energética, reduzir desperdícios e investir em transportes sustentáveis.";
  }

  return "Ainda estou a aprender sobre esse assunto. 😊 Podes perguntar sobre aquecimento global, desmatamento, poluição, energias renováveis, efeito estufa, reciclagem ou água.";
}

function sendMessage(text) {
  const question = text.trim();
  if (!question) return;

  addMessage(question, "user");
  input.value = "";
  input.focus();

  const typing = document.createElement("div");
  typing.className = "message bot-message";
  typing.innerHTML = '<div class="message-avatar">🌍</div><div class="bubble">A pensar<span class="dots">...</span></div>';
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;

  window.setTimeout(() => {
    typing.remove();
    addMessage(getAnswer(question), "bot");
  }, 450);
}

form.addEventListener("submit", event => {
  event.preventDefault();
  sendMessage(input.value);
});

suggestions.addEventListener("click", event => {
  const button = event.target.closest(".suggestion");
  if (button) sendMessage(button.textContent);
});

clearButton.addEventListener("click", () => {
  messages.replaceChildren();
  addMessage("Conversa limpa! 🌿 Olá novamente. Sobre que tema ambiental gostarias de conversar?", "bot");
  input.focus();
});
