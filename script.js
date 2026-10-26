const perfis = [
    {
        id: 1,
        nome: "Engenheiro de Sistemas",
        categoria: "Construção",
        descricao: "Transforma problemas em soluções. Tem facilidade em consertar dispositivos e focar em soluções práticas.",
        recomendacao: "Focar na manutenção estrutural da base espacial e garantir que os sistemas de suporte à vida fiquem estáveis.",
        imagem: "img/perfil-1.jpg"
    },
    {
        id: 2,
        nome: "Cientista Explorador",
        categoria: "Investigação",
        descricao: "Gosta de pesquisar, analisar evidências e descobrir detalhadamente como o ecossistema e as coisas funcionam.",
        recomendacao: "Coletar e analisar amostras orgânicas ou de minerais no laboratório químico principal da nave.",
        imagem: "img/perfil-2.jpg"
    },
    {
        id: 3,
        nome: "Explorador de Campo",
        categoria: "Exploração",
        descricao: "Adora desbravar novos lugares, testar alternativas inovadoras e lidar com situações de improviso no terreno.",
        recomendacao: "Liderar o mapeamento topográfico externo utilizando o rover de exploração de solo.",
        imagem: "img/perfil-3.jpg"
    },
    {
        id: 4,
        nome: "Estrategista da Missão",
        categoria: "Planejamento",
        descricao: "Excelente em gerenciar dados organizados, coordenar equipes de tripulantes e planejar com precisão os próximos passos.",
        recomendacao: "Supervisionar a segurança da tripulação direto da central de comando e mapear rotas seguras de pouso.",
        imagem: "img/perfil-4.jpg"
    }
];

document.getElementById('btn-descobrir').addEventListener('click', calcularPerfil);
document.getElementById('btn-refazer').addEventListener('click', refazerTeste);

function calcularPerfil() {
    const nome = document.getElementById('nome').value.trim();
    const dataNascString = document.getElementById('data-nascimento').value;

    if (!nome || !dataNascString) {
        alert("Por favor, preencha seu nome e sua data de nascimento.");
        return;
    }

    const dataNascimento = new Date(dataNascString);
    const hoje = new Date();
    hoje.setHours(0,0,0,0);
    
    if (dataNascimento > hoje) {
        alert("A data de nascimento não pode ser uma data futura!");
        return;
    }

    const p1 = document.querySelector('input[name="p1"]:checked');
    const p2 = document.querySelector('input[name="p2"]:checked');
    const p3 = document.querySelector('input[name="p3"]:checked');
    const p4 = document.querySelector('input[name="p4"]:checked');

    if (!p1 || !p2 || !p3 || !p4) {
        alert("Por favor, responda todas as 4 perguntas antes de prosseguir.");
        return;
    }

    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }

    const contagem = { 1: 0, 2: 0, 3: 0, 4: 0 };
    contagem[p1.value]++;
    contagem[p2.value]++;
    contagem[p3.value]++;
    contagem[p4.value]++;

    let maiorPontuacao = -1;
    let perfilVencedorId = 1;

    for (let id in contagem) {
        if (contagem[id] > maiorPontuacao) {
            maiorPontuacao = contagem[id];
            perfilVencedorId = parseInt(id);
        }
    }

    const perfilSelecionado = perfis.find(p => p.id === perfilVencedorId);

    const containerDados = document.getElementById('resultado-dados');
    containerDados.innerHTML = `
        <p><strong>Tripulante:</strong> ${nome}</p>
        <p><strong>Idade Calculada:</strong> ${idade} anos</p>
        <hr>
        <h3>Perfil Identificado: ${perfilSelecionado.nome}</h3>
        <p><strong>Categoria:</strong> ${perfilSelecionado.categoria}</p>
        <p><strong>Descrição:</strong> ${perfilSelecionado.descricao}</p>
        <p><strong>Recomendação para a Missão:</strong> ${perfilSelecionado.recomendacao}</p>
        <div class="perfil-imagem-container">
            <img src="${perfilSelecionado.imagem}" alt="${perfilSelecionado.nome}" onerror="this.src='https://placeholder.com'">
        </div>
    `;

    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('resultado-section').classList.remove('hidden');
    
    document.getElementById('resultado-section').scrollIntoView({ behavior: 'smooth' });
}

function refazerTeste() {
    document.getElementById('nome').value = '';
    document.getElementById('data-nascimento').value = '';

    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => radio.checked = false);

    document.getElementById('resultado-section').classList.add('hidden');
    document.getElementById('quiz-section').classList.remove('hidden');
}
