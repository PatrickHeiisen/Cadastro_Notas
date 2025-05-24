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
    resetCnpj: (args) => ipcRenderer.on('reset-Cnpj', args),
    searchName: (cliName) => ipcRenderer.send('search-name', cliName),
    renderClient: (client) => ipcRenderer.on('render-client', client),
    validateSearch: () => ipcRenderer.send('validate-search'),
    setName: (args) => ipcRenderer.on('set-name', args),
    buscarCnpj: (cliCpf) => ipcRenderer.send('search-cnpj', cliCpf),
    setCnpj: (args) => ipcRenderer.on('set-cnpj', args),
    deleteCli: (id) => ipcRenderer.send('delete-cli', id),
    limparForm: (callback) => ipcRenderer.on('limpar-form', callback),
    updateClient: (client) => ipcRenderer.send('update-client', client),
    // Cadastro Nota
    notaWindow: () => ipcRenderer.send('nota-window'),
    createNota: (newNota) => ipcRenderer.send('create-nota', newNota),
    setNota: (args) => ipcRenderer.on('set-nota', args),
    searchNota: (cliNota) => ipcRenderer.send('search-nota', cliNota),
    renderNota: (nota) => ipcRenderer.on('render-nota', nota)
})