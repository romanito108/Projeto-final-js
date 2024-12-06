let personagem = {
    nome: "",
    raca: "",
    atributos: {
        hp: 0,
        forca: 0,
        agilidade: 0,
        inteligencia: 0,
    },
    arma: ""
};

let etapa = 0;
let atributosRestantes = 6;

function processarResposta() {
    const textarea = document.getElementById("textarea-custom");
    const resposta = textarea.value.trim();

    // preencher campo
    if (!resposta && etapa < 6) {

        Swal.fire({
            title: "Por favor, insira um nome.",
            
          });
      
        return;
    }

    switch (etapa) {
        case 0: // Nome
            personagem.nome = resposta;
            document.getElementById("primeiraInteracaoo").style.display = "none";
            document.getElementById("segundaInteracao").style.display = "block";
            document.getElementById("nomeSaudado").innerText = personagem.nome;
            textarea.value = ""; 
            break;

        case 1: // Raça
            personagem.raca = resposta.charAt(0).toUpperCase() + resposta.slice(1).toLowerCase();
            document.getElementById("segundaInteracao").style.display = "none";
            document.getElementById("terceiraInteracao").style.display = "block";
            textarea.value = ""; 
            break;

        case 2: // Força
            personagem.atributos.forca = parseInt(resposta);
            atributosRestantes -= personagem.atributos.forca;
            document.getElementById("terceiraInteracao").style.display = "none";
            document.getElementById("quartaInteracao").style.display = "block";
            document.getElementById("quartaInteracao").innerHTML = `<p>Você ainda tem ${atributosRestantes} pontos. Quantos para agilidade?</p>`;
            textarea.value = ""; 
            break;

        case 3: // Agilidade
            personagem.atributos.agilidade = parseInt(resposta);
            atributosRestantes -= personagem.atributos.agilidade;
            document.getElementById("quartaInteracao").style.display = "none";
            document.getElementById("quintaInteracao").style.display = "block";
            document.getElementById("quintaInteracao").innerHTML = `<p>Você tem ${atributosRestantes} pontos restantes. Quantos para inteligência?</p>`;
            textarea.value = ""; 
            break;

        case 4: // Inteligência
            if (parseInt(resposta) > atributosRestantes) {
                
        Swal.fire({
            title: "Você não tem pontos suficientes.",
            
          });
              
                return;
            }

            personagem.atributos.inteligencia = parseInt(resposta);
            atributosRestantes -= personagem.atributos.inteligencia;
            document.getElementById("quintaInteracao").style.display = "none";
            document.getElementById("sextaInteracao").style.display = "block";
            document.getElementById("sextaInteracao").innerHTML = `<p>Agora, escolha sua arma: Espada, Machado, Arco e flecha, Duas facas, Cajado ou Grimório?</p>`;
            textarea.value = ""; 
            break;

        case 5: // Escolher arma
            personagem.arma = resposta.charAt(0).toUpperCase() + resposta.slice(1).toLowerCase();
            personagem.atributos.hp = personagem.atributos.forca * 6 + 10;

            // Bonus das raças
            switch (personagem.raca) {
                case "Humano":
                    personagem.atributos.forca += 1;
                    personagem.atributos.agilidade += 1;
                    personagem.atributos.inteligencia += 1;
                    break;
                case "Elfo":
                    personagem.atributos.forca -= 1;
                    personagem.atributos.agilidade += 3;
                    personagem.atributos.inteligencia += 1;
                    break;
                case "Anão":
                    personagem.atributos.forca += 3;
                    personagem.atributos.agilidade -= 1;
                    personagem.atributos.inteligencia += 1;
                    break;
                // case "Hobbit":
                //     personagem.atributos.forca -= 1;
                //     personagem.atributos.agilidade += 1;
                //     personagem.atributos.inteligencia += 3;
                //     break;
                default:
                         
        Swal.fire({
            title: "Raça inválida",
            
          });
              
                    return;
            }

            document.getElementById("sextaInteracao").style.display = "none";
            document.getElementById("resumoInteracao").style.display = "block";
            document.getElementById("resumoInteracao").innerHTML = `
                <h2>Resumo do Personagem</h2>
                <p>Nome: ${personagem.nome}</p>
                <p>Raça: ${personagem.raca}</p>
                <p>Força: ${personagem.atributos.forca}</p>
                <p>Agilidade: ${personagem.atributos.agilidade}</p>
                <p>Inteligência: ${personagem.atributos.inteligencia}</p>
                <p>HP: ${personagem.atributos.hp}</p>
                <p>Arma: ${personagem.arma}</p>
            `;

            // Alterar botão
            const botao = document.querySelector("#formInteracao button");
            botao.innerText = "Começar";
            botao.onclick = iniciarAventura;
            textarea.value = ""; 
            break;

     

        default:
                          
        Swal.fire({
            title: "Etapa inválida.",
            
          });
              
            return;
    }


    if (etapa < 6) etapa++;
}

function iniciarAventura() {
    document.getElementById("resumoInteracao").style.display = "none";
    document.getElementById("iniciodaAventura").style.display = "block";
    document.getElementById("iniciodaAventura").innerHTML = `
        <p>Olá, ${personagem.nome}. Frodo está na montanha da perdição. 
        Aragorn está distraindo o exército de Sauron, no entanto,
        um mago Goblin chamado Huhjia consegue sentir a presença de Frodo. 
        Derrote ele antes que ele entregue a posição do Hobbit. Está pronto?</p>
    `;
// Alterar botão para "Vamos!"
const botao = document.querySelector("#formInteracao button");
botao.innerText = "Vamos!";
botao.onclick = primeiraFase;  // MUDAR A FASE
}



// Função para a primeira fase da luta
function primeiraFase() {
    document.getElementById("iniciodaAventura").style.display = "none";
    document.getElementById("primeiraLuta").style.display = "block";
    document.getElementById("primeiraLuta").innerHTML = "Prepare-se para a batalha! No pé da montanha você se depara com um uruk hai na entrada da caverna. Hora de lutar. Escreva 'rolar' e veremos quem ataca primeiro.";

    // 
    const textarea = document.getElementById("textarea-custom");
    textarea.value = ""; 

    // Alterar botão para enviar
    const botao = document.querySelector("#formInteracao button");
    botao.innerText = "Enviar";
    botao.onclick = processarRolarplayer; // COMEÇAR ROLAGEM

    // Atualiza a etapa para avançar para a fase de luta
    etapa++;
}

let jogadorRolagem, orcRolagem; // 
let danoJogador = Math.floor(Math.random() * 10) + 1; // 
let danoOrc = Math.floor(Math.random() * 6) + 1; //

let turnoJogador; // True se for a vez do jogador, False se for a vez do inimigo

let inimigo = {
    nome: "Orc",
    vida: 40,
    ataqueBase: 4,
    iniciativa: Math.floor(Math.random() * 6) + 1, // Iniciativa 
};

// rolagem do jogador
function processarRolarplayer() {
    const textarea = document.getElementById("textarea-custom");
    const comando = textarea.value.trim().toLowerCase(); // "rolar"

    if (comando === "rolar") {
  
        jogadorRolagem = Math.floor(Math.random() * 6) + 1;

        // resultado
        document.getElementById("primeiraLuta").innerHTML = `
            <p>Você tirou: ${jogadorRolagem}</p>
            Agora digite 'rolar' para descobrir a iniciativa do seu adversário.
        `;

        // 
        textarea.value = ""; 

        const botao = document.querySelector("#formInteracao button");
        botao.innerText = "Enviar";
        botao.onclick = processarRolarorc; // rolagem orc
    } else {
                     
        Swal.fire({
            title: "Digite 'rolar' para iniciar o combate",
            
          });
              
    }
}

// Função para processar a rolagem do orc
function processarRolarorc() {
    const textarea = document.getElementById("textarea-custom");
    const comando = textarea.value.trim().toLowerCase(); // "rolar"

    if (comando === "rolar") {
        // Gerar números aleatórios para o orc e garantir que não seja igual ao do jogador
        do {
            orcRolagem = Math.floor(Math.random() * 6) + 1;
        } while (orcRolagem === jogadorRolagem);

        // Mostrar os resultados
        document.getElementById("primeiraLuta").innerHTML += `
            <p>O adversário tirou: ${orcRolagem}</p>
        `;
        document.getElementById("primeiraLuta").style.display = "block"; //

        // 
        textarea.value = ""; 

        // Comparar as rolagens
        if (jogadorRolagem >= orcRolagem) {
            turnoJogador = true;  // 
        } else {
            turnoJogador = false; // 
        }

        // mensagem de iniciativa
        document.getElementById("primeiraLuta").innerHTML += `
            <p>${turnoJogador ? "Você começa atacando!" : "O adversário começa atacando!"}</p>
        `;

        const botao = document.querySelector("#formInteracao button");
        botao.innerText = "Atacar";
        botao.onclick = iniciarCombate; // INICIAR COMBATE
    } else {
                      
        Swal.fire({
            title: "Digite 'rolar' para iniciar o combate." ,
            
          });
              
    }
}

// Função para iniciar o combate
function iniciarCombate() {
    let mensagem = "";

    if (turnoJogador) {
        // ATAQUE JOGADOR
        const rolagemProtagonista = Math.floor(Math.random() * 6) + 1; // 
        let bonusProtagonista = 0;

        // BONUS DAS ARMAS
        if (personagem.arma === "Espada" || personagem.arma === "Machado") {
            bonusProtagonista = personagem.atributos.forca;
        } else if (personagem.arma === "Duas facas" || personagem.arma === "Arco e flecha") {
            bonusProtagonista = personagem.atributos.agilidade;
        } else if (personagem.arma === "Cajado" || personagem.arma === "Grimório") {
            bonusProtagonista = personagem.atributos.inteligencia;
        }

        const danoProtagonista = rolagemProtagonista + bonusProtagonista;
        inimigo.vida -= danoProtagonista; // Aplica o dano ao inimigo

        mensagem += `Você atacou com ${personagem.arma} e causou ${danoProtagonista} de dano! Vida do inimigo: ${inimigo.vida}<br>`;

        if (inimigo.vida <= 0) {
            mensagem += "Você derrotou o inimigo! Parabéns!";
            finalizarCombate(true);
            return;
        }
    } else {
        // **Ataque do inimigo**
        const rolagemInimigo = Math.floor(Math.random() * 6) + 1; // 
        const danoInimigo = rolagemInimigo + inimigo.ataqueBase - personagem.atributos.agilidade;
        const danoFinalInimigo = Math.max(danoInimigo, 0); // dano não fica menor do que 0

        personagem.atributos.hp -= danoFinalInimigo; // Aplica o dano ao jogador

        mensagem += `O ${inimigo.nome} atacou e causou ${danoFinalInimigo} de dano! Sua vida atual: ${personagem.atributos.hp}<br>`;

        if (personagem.atributos.hp <= 0) {
            mensagem += "Você foi derrotado! Fim de jogo!";
            finalizarCombate(false);
            return;
        }
    }

    // Alterar turno com variavel booleana
    turnoJogador = !turnoJogador;

     // operador ternario
    mensagem += turnoJogador
        ? "É sua vez! Clique em 'Atacar' para continuar."
        : "É a vez do inimigo! Clique em 'Ataque do Inimigo' para continuar.";
    atualizarInterfaceCombate(mensagem);
}

// Função para atualizar a interface do botão
function atualizarInterfaceCombate(mensagem) {
    document.getElementById("primeiraLuta").innerHTML = mensagem;

    const botao = document.querySelector("#formInteracao button");
    botao.innerText = turnoJogador ? "Atacar" : "Ataque do Inimigo";
    botao.onclick = iniciarCombate;
}

// Função para FINALIZARCOMBATE
function finalizarCombate(vitoria) {
    const mensagemFinal = vitoria
        ? "Você venceu o combate! Parabéns!"
        : "Você perdeu o combate! Fim de jogo.";

    // Atualiza o texto 
    document.getElementById("primeiraLuta").innerHTML = mensagemFinal;

    const botao = document.querySelector("#formInteracao button");
    botao.innerText = vitoria ? "Continuar" : "Reiniciar";
    botao.onclick = vitoria ? avancarHistoria : reiniciarJogo;
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    location.reload(); // 
}

// LUTA TROLL

let novoInimigo = {
    nome: "Troll",
    vida: 60,
    ataqueBase: 5,
    iniciativa: Math.floor(Math.random() * 6) + 1, 
};




function finalizarCombate(vitoria) {
    const mensagemFinal = vitoria
        ? "Você venceu o combate! Parabéns!"
        : "Você perdeu o combate! Fim de jogo.";

    // Atualiza o texto 
    document.getElementById("primeiraLuta").innerHTML = mensagemFinal;

    const botao = document.querySelector("#formInteracao button");
    botao.innerText = vitoria ? "Continuar" : "Reiniciar";
    botao.onclick = vitoria ? iniciarNovoCombate : reiniciarJogo; // 
}





// Função  próxima luta
function iniciarNovoCombate() {
    // Atualizar o inimigo 
    inimigo = novoInimigo;
    inimigo.vida = 50; // Resetando a vida do inimigo
    personagem.atributos.hp = personagem.atributos.forca * 6 + 10; // Resetando a vida do personagem

    
    document.getElementById("primeiraLuta").innerHTML = `
        <p>Você avançou para o próximo capítulo da história. Agora você enfrentará um ${inimigo.nome}!</p>
        <p>Prepare-se para a batalha!</p>
    `;

   
    const botao = document.querySelector("#formInteracao button");
    botao.innerText = "Iniciar Combate";
    botao.onclick = iniciarNovaFaseDeCombate;
}


function iniciarNovaFaseDeCombate() {
    // Resetando o estado da luta
    danoJogador = Math.floor(Math.random() * 10) + 1;
    danoOrc = Math.floor(Math.random() * 6) + 1;
    turnoJogador = null; // Resetando o turno do jogador
    inimigo = novoInimigo; // Usando o novo inimigo

    // Chamar a função de rolar novamente para o novo inimigo
    document.getElementById("primeiraLuta").innerHTML = `
        <p>Você se prepara para lutar contra o ${inimigo.nome}. Digite 'rolar' para ver quem ataca primeiro.</p>
    `;

    const botao = document.querySelector("#formInteracao button");
    botao.innerText = "Enviar";
    botao.onclick = processarRolarplayer; // Atribui a função para iniciar a rolagem
}

// Novo inimigo: Hujia
let ultimoInimigo = {
    nome: "Hujia",
    vida: 80,
    ataqueBase: 6,
    iniciativa: Math.floor(Math.random() * 6) + 1,
};

// Função para iniciar a batalha contra Hujia
function iniciarUltimoCombate() {
    // Atualizar o inimigo
    inimigo = ultimoInimigo;
    personagem.atributos.hp = personagem.atributos.forca * 6 + 10; // Resetando a vida do personagem

    document.getElementById("primeiraLuta").innerHTML = `
        <p>Você enfrentará o último desafio: o mago goblin ${inimigo.nome}!</p>
        <p>Prepare-se para a batalha final!</p>
    `;

    const botao = document.querySelector("#formInteracao button");
    botao.innerText = "Iniciar Combate";
    botao.onclick = iniciarFaseFinalDeCombate;
}

// Função para a última fase de combate
function iniciarFaseFinalDeCombate() {
    // Resetar o estado da luta
    danoJogador = Math.floor(Math.random() * 10) + 1;
    danoOrc = Math.floor(Math.random() * 6) + 1;
    turnoJogador = null; // Resetando o turno do jogador
    inimigo = ultimoInimigo; // Usando o último inimigo

    document.getElementById("primeiraLuta").innerHTML = `
        <p>Você enfrenta ${inimigo.nome}. Digite 'rolar' para decidir quem começa atacando.</p>
    `;

    const botao = document.querySelector("#formInteracao button");
    botao.innerText = "Enviar";
    botao.onclick = processarRolarplayer; // Atribui a função para iniciar a rolagem
}

// Adicionar ao final de `finalizarCombate` para decidir próximo passo
function finalizarCombate(vitoria) {
    const mensagemFinal = vitoria
        ? "Você venceu o combate! Parabéns!"
        : "Você perdeu o combate! Fim de jogo.";

    document.getElementById("primeiraLuta").innerHTML = mensagemFinal;

    const botao = document.querySelector("#formInteracao button");
    if (vitoria) {
        if (inimigo.nome === "Orc") {
            botao.innerText = "Continuar";
            botao.onclick = iniciarNovoCombate; // Próxima luta contra o Troll
        } else if (inimigo.nome === "Troll") {
            botao.innerText = "Continuar";
            botao.onclick = iniciarUltimoCombate; // Luta final contra Hujia
        } else if (inimigo.nome === "Hujia") {
            botao.innerText = "Finalizar";
            botao.onclick = concluirHistoria; // Fim do jogo
        }
    } else {
        botao.innerText = "Reiniciar";
        botao.onclick = reiniciarJogo; // 
    }
}

//concluir a história após derrotar Hujia
function concluirHistoria() {
    document.getElementById("primeiraLuta").innerHTML = `
        <h2>Parabéns, ${personagem.nome}!</h2>
        <p>Você derrotou ${ultimoInimigo.nome}, salvando Frodo e garantindo que o Anel pudesse ser destruído.</p>
        <p>O mundo está salvo graças à sua coragem e habilidade!</p>
        <p>Fim da jornada.</p>
    `;

    const botao = document.querySelector("#formInteracao button");
    botao.innerText = "Jogar Novamente";
    botao.onclick = reiniciarJogo; // reiniciar o jogo
}
