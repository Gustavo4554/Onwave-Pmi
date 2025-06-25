// Seleção de elementos
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbot = document.querySelector(".chatbot");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".chatbot header span");

let fluxoAtual = "inicio"; 


const criarMensagem = (mensagem, className) => {
  const li = document.createElement("li");
  li.classList.add("chat", className);

  const logoImg = className === "incoming"
    ? '<div class="bot-img"><img src="img/icone-onwave.png" alt="On Wave"></div>'
    : "";

  li.innerHTML = `${logoImg}<p>${mensagem}</p>`;
  return li;
};


const criarOpcoes = (opcoes) => {
  const container = document.createElement("div");
  container.classList.add("opcoes-container");

  opcoes.forEach((opcao) => {
    const btn = document.createElement("button");
    btn.textContent = opcao.texto;
    btn.className = "opcao-botao";
    btn.onclick = () => carregarFluxo(opcao.proxima_id);
    container.appendChild(btn);
  });

  const li = document.createElement("li");
  li.classList.add("chat", "incoming");
  li.appendChild(container);
  chatbox.appendChild(li);
  chatbox.scrollTop = chatbox.scrollHeight;
};

const carregarFluxo = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/fluxo/${id}`);
    const data = await res.json();

    let mensagem = data.mensagem;

    if (data.opcoes && data.opcoes.length > 0) {
      mensagem += "<br><br>";
      data.opcoes.forEach((opcao, index) => {
        mensagem += `${index + 1}. ${opcao.texto}<br>`;
      });
    }

    chatbox.appendChild(criarMensagem(mensagem, "incoming"));

    
    chatInput.dataset.opcoes = JSON.stringify(data.opcoes || []);
    chatbox.scrollTop = chatbox.scrollHeight;
    fluxoAtual = id;
  } catch (err) {
    chatbox.appendChild(criarMensagem("Erro ao carregar fluxo.", "incoming"));
  }
};


const handleChat = () => {
  const msg = chatInput.value.trim();
  if (!msg) return;

  chatbox.appendChild(criarMensagem(msg, "outgoing"));
  chatInput.value = "";
  chatbox.scrollTop = chatbox.scrollHeight;

  const opcoes = JSON.parse(chatInput.dataset.opcoes || "[]");

  const opcaoSelecionada = parseInt(msg);
  if (!isNaN(opcaoSelecionada) && opcaoSelecionada > 0 && opcaoSelecionada <= opcoes.length) {
    const proximaId = opcoes[opcaoSelecionada - 1].proxima_id;
    carregarFluxo(proximaId);
  } else {
    chatbox.appendChild(criarMensagem("Por favor, selecione uma opção válida digitando o número correspondente.", "incoming"));
  }
};

chatbotToggler.addEventListener("click", () => {
  document.body.classList.toggle("show-chatbot");
});

chatbotCloseBtn.addEventListener("click", () => {
  document.body.classList.remove("show-chatbot");
});

sendChatBtn.addEventListener("click", handleChat);
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleChat();
  }
});


window.addEventListener("load", () => carregarFluxo(fluxoAtual));