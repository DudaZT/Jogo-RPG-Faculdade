// O nome tem que ter pelo menos uma letra (não números, caracteres especiais ou espaços)
const regexNome = /^[a-zA-Zà-úÀ-Ú\s]+$/;

// A idade deve ser um número entre 1 e 120, com duas casas decimais 
const regexIdade = /^(?:1[01]?\d|120)$/;

// o texto não pode ser apenas espaços.
const regexMelhorias = /^(?!\s*$).+/;

// o texto não pode ser apenas espaços.
const regexMensagem = /^(?!\s*$).+/;

// Validações
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    let nome = document.getElementById('nome').value;
    let idade = document.getElementById('idade').value;
    let melhorias = document.getElementById('melhorias').value;
    let mensagem = document.getElementById('mensagem').value;

    if (!regexNome.test(nome)) 
    {
        alert('Nome inválido. Apenas letras e espaços são permitidos.');
        return;
    }

    if (!regexIdade.test(idade)) 
    {
        alert('Idade inválida. Insira um número entre 1 e 120.');
        return;
    }

    if (!regexMelhorias.test(melhorias)) 
    {
        alert('Campo de melhorias não pode estar vazio.');
        return;
    }

    if (!regexMensagem.test(mensagem)) 
    {
        alert('Campo de mensagem não pode estar vazio.');
        return;
    }

    alert('Formulário enviado com sucesso!');
});
