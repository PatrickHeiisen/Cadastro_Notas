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
})
//= FIM =========================================================================

//= Buscar Nota =================================================================
api.setNota((args) => {
    console.log("teste do IPC 'set-name'")
    // "recortar" o nome na busca e setar no campo nome do form
    let busca = document.getElementById('searchNota').value
    // foco no campo de busca
    nota.focus()
    // limpar o campo de busca
    foco.value = ""
    // copiar o nome do cliente para o campo nome
    nota.value = busca
    // restaurar tecla enter
    restaurarEnter()
})

function buscarNota() {
    let input = document.getElementById('searchNota').value.trim()
    console.log(input)

    api.renderNota((event, nota) => {
        const notaData = JSON.parse(nota)
        arrayClient = notaData
        // Uso do forEach para percorrer o vetor
        arrayNota.forEach((c) => {
            nome.value = c.nome
            nota.value = c.nota
            chave.value = c.chave
            cnpj.value = c.cnpj
            data.value = c.data
            entrega.value = c.entrega
            pagamento.value = c.pagamento
            total.value = c.total
            item.value = c.item
            quantidade.value = c.quantidade
            unitario.value = c.unitario
            restaurarEnter()
            //desativar o botão adicionar
            btnCreate.disabled = true
            // ativar e desativar o botão editar e excluir
            btnUpdate.disabled = false
            btnDelete.disabled = false
        })

    })
}
//===============================================================================