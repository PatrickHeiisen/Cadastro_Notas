// Receber data
function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-BR', options)
}

document.getElementById('dataAtual').innerHTML = obterData()

// Troca do ícone do banco de dados (usando a api do preload.js)
api.dbStatus((event, message) => {
    //teste do recebimento da mensagem do main
    console.log(message)
    if (message === "conectado") {
        document.getElementById('statusdb').src = "../public/img/dbon.png"
    } else {
        document.getElementById('statusdb').src = "../public/img/dboff.png"
    }
})

// Validação de CNPJ
function validarCNPJ() {
    let cnpjInput = document.getElementById('inputCnpj');
    let cnpj = cnpjInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Resetando o estilo
    cnpjInput.style.border = "";

    // CNPJ deve ter 14 dígitos
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
        cnpjInput.style.border = "2px solid red";
        return;
    }

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    // Validação do primeiro dígito
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) {
        cnpjInput.style.border = "2px solid red";
        return;
    }

    // Validação do segundo dígito
    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) {
        cnpjInput.style.border = "2px solid red";
        return;
    }

    // CNPJ válido, remove borda vermelha
    cnpjInput.style.border = "";
}

//= RESET FORM ================================================================
function resetForm() {
    location.reload()
}
api.resetForm((args) => {
    resetForm()
})
//= FIM RESET FORM ============================================================

// Processo de cadastro do cliente ============================================
// Captura de dados
let formNota = document.getElementById('formNota')
let nota = document.getElementById('inputNota')
let empresa = document.getElementById('inputEmpresa')
let cnpj = document.getElementById('inputCnpj')
let data = document.getElementById('inputData')
let valor = document.getElementById('inputTotal')
let item = document.getElementById('inputItem')
let quantidade = document.getElementById('inputQtd')
let unitario = document.getElementById('inputUnitario')
//============================================================================

//= CRUD CREATE ==============================================================
// Enviar ao banco de dados
formNota.addEventListener('submit', async (event) => {
    // evitar comportamento padrão de recarregar a página
    event.preventDefault()
    console.log(
        nota.value,
        empresa.value,
        cnpj.value,
        data.value,
        valor.value,
        item.value,
        quantidade.value,
        unitario.value
    )
    const newNota = {
        notaCad: nota.value,
        empresaCad: empresa.value,
        cnpjCad: cnpj.value,
        dataCad: data.value,
        valorCad: valor.value,
        itemCad: item.value,
        quantidadeCad: quantidade.value,
        unitarioCad: unitario.value
    }
    // Enviar ao main
    api.createNota(newNota)
})
//= FIM =========================================================================
