// Depois de selecionar o herói vai pra tela de batalha com o primeiro inimigo (mais fraco para o mais forte)
// Duas opções de Ataque: uma sem a necessidade de mana e outra que gasta mana.
// Duas opções de Defesa: uma sem a necessidade de mana e outra que gasta mana.
// Jogo funciona a base de turnos, primeiro o herói ataca, depois ele precisa esperar o ataque do inimigo...
// Mensagem de Vitória ou Derrota para cada batalha
// Caso ganhe todas as batalhas: Venceu o Jogo, mas se o herói morreu ele pode recomeçar o jogo.

document.addEventListener('DOMContentLoaded', () => {
    const mensagemJogo = document.getElementById('mensagemJogo');

    const nomeHeroi = localStorage.getItem('heroiSelecionado') || "Elliot";
    const imagemHeroi = localStorage.getItem('imagemHeroi') || "./img/heroi1.png";

    const heroi = {
        nome: nomeHeroi,
        vida: 100,
        mana: 50,

        atacar: function (tipo) 
        {
            if (tipo === 'basico') return Math.floor(Math.random() * 8) + 1 + 6;

            if (tipo === 'especial' && this.mana >= 10) 
            {
                this.mana -= 10;
                return 12 + (Math.floor(Math.random() * 13) + 1);
            }

            return 0;
        },

        defender: function (tipo) 
        {
            if (tipo === 'basico') return 5; // Reduz dano em 5

            if (tipo === 'especial' && this.mana >= 5) 
            {
                this.mana -= 5;
                return 15; // Reduz dano em 15
            }

            return 0; // Sem defesa
        }
    };

    const inimigos = [
        { nome: "Touro", vida: 50, ataque: 8, imagem: "./img/Touro.png"},
        { nome: "Quarduanvahn", vida: 100, ataque: 12, imagem: "./img/Quarduanvahn.png" }
    ];

    let inimigoAtual = 0;
    let defesaAtual = 0; // Defesa Atual do herói

    // Desabilitar Botões
    function toggleBotoes(disabled) {
        const botoes = document.querySelectorAll('.botao-jogo');
        botoes.forEach(botao => botao.disabled = disabled);
    }    
    

    function atualizarStatus() {
        document.getElementById('heroiStatus').innerText = `${heroi.nome} - Vida: ${heroi.vida}, Mana: ${heroi.mana}`;
        document.getElementById('inimigoStatus').innerText = `${inimigos[inimigoAtual].nome} - Vida: ${inimigos[inimigoAtual].vida}`;
        document.getElementById('imagemHeroi').src = imagemHeroi;
    }

    function verificarFimDeJogo() {
        if (heroi.vida <= 0) 
        {
            mensagemJogo.innerHTML = "<strong style='color: red;'>Você perdeu! Recarregue a página para recomeçar.</strong>";

            return true;
        }

        if (inimigos[inimigoAtual].vida <= 0) 
        {
            inimigoAtual++;

            if (inimigoAtual >= inimigos.length) 
            {
                mensagemJogo.innerHTML = "<strong style='color: green;'>Você venceu o jogo! Parabéns!</strong>";
       
                return true;
            } 
            else 
            {
                const inimigoImagem = document.querySelector('.inimigo');
                inimigoImagem.src = inimigos[inimigoAtual].imagem;
                mensagemJogo.innerText = "Você derrotou o inimigo! Próximo inimigo!";
            }
        }

        return false;
    }

    function turnoDoInimigo() {
        toggleBotoes(true); // Desabilita os botões

        setTimeout(() => {
            if (inimigos[inimigoAtual].vida > 0) 
            {
                const dano = Math.max(0, inimigos[inimigoAtual].ataque + Math.floor(Math.random() * 6) + 1 - defesaAtual);
                
                heroi.vida -= dano;
                defesaAtual = 0; // Reseta a defesa para o próximo turno
                mensagemJogo.innerText = `O inimigo atacou causando ${dano} de dano!`;
                atualizarStatus();
                if (!verificarFimDeJogo()) {
                    heroi.mana = Math.min(50, heroi.mana + 3); // Regeneração de mana
                    heroi.vida = Math.min(100, heroi.vida + 5); // Regeneração de vida
                    atualizarStatus();
                }
            }
            toggleBotoes(false); // Habilita os botões
        }, 2000); // Aguarda 2 segundos
    }
       
    // Ataque Básico
    document.getElementById('ataqueBasico').addEventListener('click', () => {
        if (!verificarFimDeJogo()) 
        {
            const dano = heroi.atacar('basico');
            inimigos[inimigoAtual].vida -= dano;
            mensagemJogo.innerText = `Você causou ${dano} de dano ao inimigo!`;
            atualizarStatus();

            if (!verificarFimDeJogo()) turnoDoInimigo();
        }
    });

    // Ataque Especial
    document.getElementById('ataqueEspecial').addEventListener('click', () => {
        if (!verificarFimDeJogo()) 
        {
            if (heroi.mana < 10) 
            {
                mensagemJogo.innerText = "Mana insuficiente para o ataque especial!";

                return;
            }            

            const dano = heroi.atacar('especial');
            inimigos[inimigoAtual].vida -= dano;
            
            mensagemJogo.innerText = `Você causou ${dano} de dano ao inimigo!`;
            
            atualizarStatus();

            if (!verificarFimDeJogo()) turnoDoInimigo();
        }
    });

    // Defesa Básica
    document.getElementById('defesaBasica').addEventListener('click', () => {
        if (!verificarFimDeJogo()) 
        {
            defesaAtual = heroi.defender('basico');
            mensagemJogo.innerText = `Você se defendeu e reduzirá ${defesaAtual} de dano no próximo ataque do inimigo!`;

            turnoDoInimigo();
        }
    });

    // Defesa Especial
    document.getElementById('defesaEspecial').addEventListener('click', () => {
        if (!verificarFimDeJogo()) 
        {
            if (heroi.mana < 5) 
            {
                mensagemJogo.innerText = "Mana insuficiente para a defesa especial!";
                return;
            }            

            defesaAtual = heroi.defender('especial');
            mensagemJogo.innerText = `Você se defendeu com uma defesa especial e reduzirá ${defesaAtual} de dano no próximo ataque do inimigo!`;

            turnoDoInimigo();
        }
    });

    // Recomeçar o Jogo
    document.getElementById('recomecar').addEventListener('click', () => {
        
        heroi.vida = 100;
        heroi.mana = 50;

        inimigos.forEach(function(inimigo) {
            if (inimigo.nome === "Touro") {
                inimigo.vida = 50; 
            } else {
                inimigo.vida = 100; 
            }
        });
        
        inimigoAtual = 0;
        defesaAtual = 0;
        mensagemJogo.innerText = "O jogo foi reiniciado!";

        const inimigoImagem = document.querySelector('.inimigo');
        inimigoImagem.src = inimigos[0].imagem; 
        toggleBotoes(false);
        atualizarStatus();
    });

    atualizarStatus(); 
});




