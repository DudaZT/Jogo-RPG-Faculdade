const cartas = [
    { frente: "Elliot", verso: "Herói Destemido e Pronto para Lutar!" },
    { frente: "Dorothy", verso: "Heroina Elegante e Forte" },
    { frente: "Touro", verso: "Cuidado, o dano dele pode te surpreender!" },
    { frente: "Quarduanvahn", verso: "Exige muita preparação antes de enfrentá-lo!" }
];

function flipCard(id) {
    // Seleciona a carta clicada
    var carta = document.querySelector(`#carta${id}`);
    var info = document.querySelector(`#info${id}`); 

    carta.classList.toggle('flipped');

    if (carta.classList.contains('flipped')) 
    {
        info.innerHTML = cartas[id - 1].verso;
    } 
    else 
    {
        info.innerHTML = cartas[id - 1].frente;
    }
}
