function buscarEndereco() {
    let cep = document.getElementById('inputCep').value
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`

    fetch(urlAPI)
        .then(response => response.json())
        .then(dados => {
            document.getElementById('inputLogradouro').value = dados.logradouro
            document.getElementById('inputBairro').value = dados.bairro
            document.getElementById('inputCidade').value = dados.localidade
            document.getElementById('inputUf').value = dados.uf;
        })
}

function resetForm() {
    document.getElementById("formCliente").reset();
    document.getElementById("cpfErro").style.display = "none";
    document.getElementById("mensagemSucesso").style.display = "none";
}

// Validação de CNPJ
function validarCNPJ() {
    let cnpjInput = document.getElementById('inputCpf');
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

// Validação de e-mail
function validarEmail() {
    let email = document.getElementById('inputEmail').value;
    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailInput = document.getElementById('inputEmail');

    if (!regexEmail.test(email)) {
        alert('E-mail inválido! Insira um e-mail válido.');
        emailInput.focus();
        return false;
    }
    return true;
}

// Validar Formulario
function validarFormulario(event) {
    event.preventDefault();
    let form = document.getElementById("formCliente");
    let inputs = form.querySelectorAll("input[required]");
    let valido = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            valido = false;
        }
    });

    if (!validarCPF()) {
        valido = false;
    }

    if (valido) {
        document.getElementById("mensagemSucesso").style.display = "block";
        form.reset();
    }
}
//===========================================================================
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
//=============================================================================
// processo de cadastro do cliente
const foco = document.getElementById('searchCliente')
// Criar um vetor global para extrair os dados do cliente
let arrayClient = []
document.addEventListener('DOMContentLoaded', () => {
    btnUpdate.disabled = true
    btnDelete.disabled = true
    // Ativar o botao adicionar
    btnCreate.disabled = false
    foco.focus()
})
//=============================================================================
// Captura de dados
let formCli = document.getElementById('formCliente')
let nome = document.getElementById('inputNome')
let sexo = document.getElementById('inputSexo')
let cpf = document.getElementById('inputCpf')
let email = document.getElementById('inputEmail')
let tel = document.getElementById('inputTelefone')
let cep = document.getElementById('inputCep')
let logradouro = document.getElementById('inputLogradouro')
let numero = document.getElementById('inputNumero')
let complemento = document.getElementById('inputComplemento')
let bairro = document.getElementById('inputBairro')
let cidade = document.getElementById('inputCidade')
let uf = document.getElementById('inputUf')
// Uso do id do delete e update
let idClient = document.getElementById('inputIdClient')
//============================================================================
//= CRUD CREATE ==============================================================
// Evento associado ao submit
formCli.addEventListener('submit', async (event) => {
    // evitar comportamento padrão de recarregar a página
    event.preventDefault()
    /*console.log(
        nome.value,
        sexo.value,
        cpf.value,
        email.value,
        tel.value,
        cep.value,
        logradouro.value,
        numero.value,
        complemento.value,
        bairro.value,
        cidade.value,
        uf.value,
    )*/
    // Estrategia para usar o submit para cadastrar um novo cliente ou editar os dados de um cliente existente
    // Verificar se existe o id do cliente
    if (idClient.value === '') {
        // cadastrar um novo cliente
        const newCliente = {
            nomeCli: nome.value,
            sexoCli: sexo.value,
            cpfCli: cpf.value,
            emailCli: email.value,
            telCli: tel.value,
            cepCli: cep.value,
            logradouroCli: logradouro.value,
            numeroCli: numero.value,
            complementoCli: complemento.value,
            bairroCli: bairro.value,
            cidadeCli: cidade.value,
            ufCli: uf.value
        }
        // Enviar ao main
        api.createCliente(newCliente)
    } else {
        // Alterar os dados de um cliente existente
        // Teste de validação do id
        //console.log(idClient.value)
        // Editar um cliente existente
        const client = {
            idCli: idClient.value,
            nomeCli: nome.value,
            sexoCli: sexo.value,
            cpfCli: cpf.value,
            emailCli: email.value,
            telCli: tel.value,
            cepCli: cep.value,
            logradouroCli: logradouro.value,
            numeroCli: numero.value,
            complementoCli: complemento.value,
            bairroCli: bairro.value,
            cidadeCli: cidade.value,
            ufCli: uf.value
        }
        // Enviar ao main o objeto cliente Passo - 2
        api.updateClient(client)
    }
})
//==================================================================
//= RESET FORM =====================================================
function resetForm() {
    location.reload()
}
api.resetForm((args) => {
    resetForm()
})
//= FIM RESET FORM =================================================

// Reset CPF =======================================================
function resetCpf() {
    const erroCpf = document.getElementById('inputCpf')
    erroCpf.style.border = "2px solid red";
    erroCpf.value = ""
    erroCpf.focus()
}
api.resetCpf((args) => {
    resetCpf()
})
//==================================================================

//= CRUD CREATE ====================================================
// Setar o nome do cliente para fazer um novo cadastro se a busca retornar que o cliente não esta cadastrado
api.setName((args) => {
    console.log("teste do IPC 'set-name'")
    // "recortar" o nome na busca e setar no campo nome do form
    let busca = document.getElementById('searchCliente').value
    // foco no campo de busca
    nome.focus()
    // limpar o campo de busca
    foco.value = ""
    // copiar o nome do cliente para o campo nome
    nome.value = busca
    // restaurar tecla enter
    restaurarEnter()
})

api.setCpf((args) => {
    console.log("teste do IPC 'set-cpf'")
    let buscaCpf = document.getElementById('searchCliente').value
    nome.focus()
    foco.value = ""
    cpf.value = buscaCpf
    restaurarEnter()
})

function searchName() {
    let input = document.getElementById('searchCliente').value.trim()
    console.log(input)

    if (input === "") {
        api.validateSearch()
        return
    }

    // Verifica se é CPF (somente números e 11 dígitos)
    let isCpf = /^\d{11}$/.test(input.replace(/\D/g, ''))

    if (isCpf) {
        // Buscar por CPF
        api.buscarCpf(input)
    } else {
        // Buscar por nome
        api.searchName(input)
    }

    api.renderClient((event, client) => {
        const clientData = JSON.parse(client)
        arrayClient = clientData
        // Uso do forEach para percorrer o vetor
        arrayClient.forEach((c) => {
            idClient.value = c._id
            nome.value = c.nome
            sexo.value = c.sexo
            cpf.value = c.cpf
            email.value = c.email
            tel.value = c.telefone
            cep.value = c.cep
            logradouro.value = c.logradouro
            numero.value = c.numero
            complemento.value = c.complemento
            bairro.value = c.bairro
            cidade.value = c.cidade
            uf.value = c.uf
            restaurarEnter()
            //desativar o botão adicionar
            btnCreate.disabled = true
            // ativar e desativar o botão editar e excluir
            btnUpdate.disabled = false
            btnDelete.disabled = false
        })

    })
}
// FIM =======================================================================

//============================================================================

//= Manipulação do Enter =====================================================
function teclaEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault() //ignorar o comportamento padrão
        // executar o metodo de busca do cliente
        searchName()
    }
}

// "Escuta" do teclado ('keydown' = pressionar tecla)
formCli.addEventListener('keydown', teclaEnter)

// função para restaurar o padrão (tecla enter)
function restaurarEnter() {
    formCli.removeEventListener('keydown', teclaEnter)
}
//= FIM Manipulação do Enter =================================================

//============================================================================

// Excluir Cliente ===========================================================
// Função para deletar cliente
const btnDelete = document.getElementById('btnDelete')

// Função para excluir cliente
function excluirCliente() {
    const idCliente = arrayClient[0]._id // Pegando o ID do cliente no array
    console.log("ID para excluir:", idCliente) // Só pra testar

    // Enviar o ID para o main via preload.js
    api.deleteCli(idCliente)
}

// Escutar o clique do botão excluir
btnDelete.addEventListener('click', excluirCliente)

api.limparForm(() => {
    document.getElementById('formCliente').reset()
    arrayClient = [] // zera o array
    btnCreate.disabled = false
    btnUpdate.disabled = true
    btnDelete.disabled = true
})
// Fim Excluir Cliente =======================================================

//============================================================================

// Editar Cliente ============================================================


// Fim Editar Cliente ========================================================
//============================================================================