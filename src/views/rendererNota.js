// Validação de CNPJ
function validarCNPJ() {
    let cnpjInput = document.getElementById('inputCnpj')
    let cnpj = cnpjInput.value.replace(/\D/g, '') // Remove caracteres não numéricos

    // Resetando o estilo
    cnpjInput.style.border = ""

    // CNPJ deve ter 14 dígitos
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
        cnpjInput.style.border = "2px solid red"
        return
    }

    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho)
    let digitos = cnpj.substring(tamanho)
    let soma = 0
    let pos = tamanho - 7

    // Validação do primeiro dígito
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--
        if (pos < 2) pos = 9
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
    if (resultado !== parseInt(digitos.charAt(0))) {
        cnpjInput.style.border = "2px solid red"
        return
    }

    // Validação do segundo dígito
    tamanho += 1
    numeros = cnpj.substring(0, tamanho)
    soma = 0
    pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--
        if (pos < 2) pos = 9
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
    if (resultado !== parseInt(digitos.charAt(1))) {
        cnpjInput.style.border = "2px solid red"
        return
    }

    // CNPJ válido, remove borda vermelha
    cnpjInput.style.border = ""
}

//=============================================================================
// Função somar itens
function calcularTotal() {
    let total = 0
    const linhas = document.querySelectorAll('.item-row')

    linhas.forEach(row => {
        const qtd = parseFloat(row.querySelector('.inputQtd').value) || 0
        const unit = parseFloat(row.querySelector('.inputUnitario').value) || 0
        total += qtd * unit
    })

    document.getElementById('inputTotal').value = total.toFixed(2)
}

// Monitorar mudanças em todos os inputs de item
document.addEventListener('input', function (event) {
    if (event.target.classList.contains('inputQtd') || event.target.classList.contains('inputUnitario')) {
        calcularTotal()
    }
})
//===============================================================================

//===============================================================================
// Limpar formulario
document.getElementById("btnLimpar").addEventListener("click", function () {
    const form = document.getElementById("formNota")

    // Limpa o formulário
    form.reset()

    // Remove classes de erro (se estiver usando)
    const inputs = form.querySelectorAll(".form-control, .form-select")
    inputs.forEach(input => input.classList.remove("is-invalid"))

    // Foco no campo "Nome da Empresa"
    document.getElementById("inputNome").focus()
})
//===============================================================================

//===============================================================================
// Validar Formulario

//===============================================================================

//= RESET FORM ==================================================================
function resetForm() {
    location.reload()
}
api.resetForm((args) => {
    resetForm()
})
//= FIM RESET FORM ==============================================================

// Processo de cadastro do cliente ==============================================
// Captura de dados
let formNota = document.getElementById('formNota')
let nome = document.getElementById('inputNome')
let nota = document.getElementById('inputNota')
let chave = document.getElementById('inputChave')
let cnpj = document.getElementById('inputCnpj')
let data = document.getElementById('inputData')
let entrega = document.getElementById('inputEntrega')
let pagamento = document.getElementById('inputPagamento')
let total = document.getElementById('inputTotal')
let item = document.getElementById('inputItem')
let quantidade = document.getElementById('inputQtde')
let unitario = document.getElementById('inputUnitario')
let idNota = document.getElementById('inputIdNota')
//============================================================================

//= CRUD CREATE ==============================================================
// Enviar ao banco de dados
formNota.addEventListener('submit', async (event) => {
    // evitar comportamento padrão de recarregar a página
    event.preventDefault()
    console.log(
        nome.value,
        nota.value,
        chave.value,
        cnpj.value,
        data.value,
        entrega.value,
        pagamento.value,
        total.value,
        item.value,
        quantidade.value,
        unitario.value
    )
    if (idNota.value === '') {
        const newNota = {
            nomeCad: nome.value,
            notaCad: nota.value,
            chaveCad: chave.value,
            cnpjCad: cnpj.value,
            dataCad: data.value,
            entregaCad: entrega.value,
            pagamentoCad: pagamento.value,
            totalCad: total.value,
            itemCad: item.value,
            quantidadeCad: quantidade.value,
            unitarioCad: unitario.value
        }
        // Enviar ao main
        api.createNota(newNota)
    } else {
        const nota = {
            idNota: idNota.value,
            nomeCad: nome.value,
            notaCad: nota.value,
            chaveCad: chave.value,
            cnpjCad: cnpj.value,
            dataCad: data.value,
            entregaCad: entrega.value,
            pagamentoCad: pagamento.value,
            totalCad: total.value,
            itemCad: item.value,
            quantidadeCad: quantidade.value,
            unitarioCad: unitario.value
        }
        api.updateNota(nota)
    }
})
//= FIM =========================================================================

//= Buscar Nota =================================================================
// Função que limpa o campo buscarNota e cola no campo nome
api.setNota(() => {
    const campoBusca = document.getElementById('buscarNota');
    const campoNome = document.getElementById('inputNota');

    if (campoNome && campoBusca) {
        campoNome.value = campoBusca.value;
        campoBusca.value = "";
        campoNome.focus(); // foco no campo nome
    }

    restaurarEnter();
});

function searchNota() {
    const input = document.getElementById('buscarNota').value.trim();

    if (input === "") {
        api.validateSearch();
        return;
    }

    api.searchNota(input); // envia pro main
}

// Recebe a nota vinda do main e preenche os campos
api.renderNota((event, nota) => {
    const dados = JSON.parse(nota)
    const notaInfo = dados[0] // se for array

    // Preenche os campos (garanta que os IDs estão corretos)
    document.getElementById('inputNome').value = notaInfo.nome
    document.getElementById('inputNota').value = notaInfo.nota
    document.getElementById('inputChave').value = notaInfo.chave
    document.getElementById('inputCnpj').value = notaInfo.cnpj
    document.getElementById('inputData').value = notaInfo.data
    document.getElementById('inputEntrega').value = notaInfo.entrega
    document.getElementById('inputPagamento').value = notaInfo.pagamento
    document.getElementById('inputTotal').value = notaInfo.total
    document.getElementById('inputItem').value = notaInfo.item
    document.getElementById('inputQtde').value = notaInfo.quantidade
    document.getElementById('inputUnitario').value = notaInfo.unitario

    // Atualiza botões
    btnCreate.disabled = true
    btnUpdate.disabled = false
    btnDelete.disabled = false

    restaurarEnter()
});
//===============================================================================

//= Manipulação do Enter ========================================================
function teclaEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault() //ignorar o comportamento padrão
        // executar o metodo de busca do cliente
        searchNota()
    }
}

// "Escuta" do teclado ('keydown' = pressionar tecla)
formNota.addEventListener('keydown', teclaEnter)

// função para restaurar o padrão (tecla enter)
function restaurarEnter() {
    formNota.removeEventListener('keydown', teclaEnter)
}
//= FIM Manipulação do Enter ====================================================

// Excluir Nota ==============================================================
// Função para deletar Nota
// Pega o botão de excluir
const btnDelete = document.getElementById('btnDelete');

// Função para excluir a nota
function excluirNota() {
    if (!arrayNota.length) return; // Garante que tem uma nota carregada

    const idNota = arrayNota[0]._id;
    console.log("ID para excluir:", idNota);

    // Envia o ID da nota para o processo principal
    api.deleteNota(idNota);
}

// Escuta o clique no botão
btnDelete.addEventListener('click', excluirNota);

// Escuta a limpeza do formulário vinda do main
api.limparForm(() => {
    document.getElementById('formNota').reset();

    // Reseta os botões
    btnCreate.disabled = false;
    btnUpdate.disabled = true;
    btnDelete.disabled = true;

    // Limpa o array da nota
    arrayNota = [];

    // Coloca o foco no campo nome
    document.getElementById('inputNome').focus();
});

// Fim Excluir Nota ==========================================================