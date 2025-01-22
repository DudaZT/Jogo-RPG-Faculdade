document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('heroi1').addEventListener('click', () => selecionarHeroi('Elliot', './img/heroi1.png'));
    // document.getElementById('heroi2').addEventListener('click', () => selecionarHeroi('Dorothy', './img/Inimigo2.png'));
});

function selecionarHeroi(nome, imagem) {
    localStorage.setItem('heroiSelecionado', nome); 
    localStorage.setItem('imagemHeroi', imagem);
    window.location.href = 'combate.html'; 
}