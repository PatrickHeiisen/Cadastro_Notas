/**
 * Arquivo de pré carregamento(mais desempenho) e reforço de segurança na comunicação entre processos (IPC)
 */

// importação dos recursos do framework electron
// contextBridge (segurança) ipcRenderer (comunicação)
const { contextBridge, ipcRenderer } = require('electron')

// Enviar ao main um pedido para conexão com o banco de dados e troca do ícone no processo de rendirzação (index.html - renderer.html)
ipcRenderer.send('db-connect')

// expor (autorizar a comunicação entre processos)
contextBridge.exposeInMainWorld('api', {
    // Cadastro Cliente
    clientWindow: () => ipcRenderer.send('client-window'),
    dbStatus: (message) => ipcRenderer.on('db-status', message),
    aboutExit: () => ipcRenderer.send('about-exit'),
    createCliente: (newCliente) => ipcRenderer.send('create-cliente', newCliente),
    resetForm: (args) => ipcRenderer.on('reset-form', args),
    resetCpf: (args) => ipcRenderer.on('reset-cpf', args),
    searchName: (cliName) => ipcRenderer.send('search-name', cliName),
    renderClient: (client) => ipcRenderer.on('render-client', client),
    validateSearch: () => ipcRenderer.send('validate-search'),
    setName: (args) => ipcRenderer.on('set-name', args),
    buscarCpf: (cliCpf) => ipcRenderer.send('search-cpf', cliCpf),
    setCpf: (args) => ipcRenderer.on('set-cpf', args),
    deleteCli: (id) => ipcRenderer.send('delete-cli', id),
    limparForm: (callback) => ipcRenderer.on('limpar-form', callback),
    updateClient: (client) => ipcRenderer.send('update-client', client),
    // Cadastro Nota
})