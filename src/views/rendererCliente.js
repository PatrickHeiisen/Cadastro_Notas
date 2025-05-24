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
//=============================================================================
// Site
function irParaSite() {
    const site = document.getElementById('inputSite').value;
    
    if (site) {
        // Redireciona na mesma aba
        window.location.href = site;
    } else {
        alert("Por favor, digite uma URL válida.");
    }
}

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
let cnpj = document.getElementById('inputCpf')
let social = document.getElementById('inputSocial')
let email = document.getElementById('inputEmail')
let site = document.getElementById('inputSite')
let tel = document.getElementById('inputTelefone')
let cep = document.getElementById('inputCep')
let logradouro = document.getElementById('inputLogradouro')
let numero = document.getElementById('inputNumero')
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
    console.log(
        /**nome.value,
        cnpj.value,
        social.value,
        email.value,
        site.value,
        tel.value,
        cep.value,
        logradouro.value,
        numero.value,
        bairro.value,
        cidade.value,
        uf.value,*/
    )
    // Estrategia para usar o submit para cadastrar um novo cliente ou editar os dados de um cliente existente
    // Verificar se existe o id do cliente
    if (idClient.value === '') {
        // cadastrar um novo cliente
        const newCliente = {
            nomeCli: nome.value,
            cnpjCli: cnpj.value,
            socialCli: social.value,
            emailCli: email.value,
            siteCli: site.value,
            telCli: tel.value,
            cepCli: cep.value,
            logradouroCli: logradouro.value,
            numeroCli: numero.value,
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
            cnpjCli: cnpj.value,
            socialCli: social.value,
            emailCli: email.value,
            siteCli: site.value,
            telCli: tel.value,
            cepCli: cep.value,
            logradouroCli: logradouro.value,
            numeroCli: numero.value,
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

api.setCnpj((args) => {
    console.log("teste do IPC 'set-cpf'")
    let buscarCpf = document.getElementById('searchCliente').value
    cnpj.focus()
    foco.value = ""
    cnpj.value = buscarCpf
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
    let isCpf = /^\d{14}$/.test(input.replace(/\D/g, ''));

    if (isCpf) {
        // Buscar por CPF
        api.buscarCnpj(input)
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
            cnpj.value = c.cnpj
            social.value = c.social
            email.value = c.email
            site.value = c.site
            tel.value = c.telefone
            cep.value = c.cep
            logradouro.value = c.logradouro
            numero.value = c.numero
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
function excluirForm() {
    const idCliente = arrayClient[0]._id // Pegando o ID do cliente no array
    console.log("ID para excluir:", idCliente) // Só pra testar

    // Enviar o ID para o main via preload.js
    api.deleteCli(idCliente)
}

// Escutar o clique do botão excluir
btnDelete.addEventListener('click', excluirForm)

api.limparForm(() => {
    document.getElementById('formCliente').reset()
    arrayClient = [] // zera o array
    btnCreate.disabled = false
    btnUpdate.disabled = true
    btnDelete.disabled = true
})
// Fim Excluir Cliente =======================================================

//============================================================================