/**
 * Processo de renderização
 * Tela principal
 */

// Envio de uma mensagem para o main abrir a janela clinte
function client() {
    //console.log("teste do botão cliente")
    //uso da api(autorizada no preload.js)
    api.clientWindow()
}

// Envio de uma mensagem para o main abrir a janela clinte
function nota() {
    //console.log("teste do botão cliente")
    //uso da api(autorizada no preload.js)
    api.notaWindow()
}

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
