const { model, Schema } = require('mongoose')

const clinteSchema = new Schema({
    nome: { type: String },
    cnpj: { type: String, unique: true, index: true},
    social: { type: String },
    email: { type: String},
    telefone: { type: String },
    site: { type: String },
    cep: { type: String },
    logradouro: { type: String },
    numero: { type: String },
    bairro: { type: String },
    cidade: { type: String },
    uf: { type: String }
}, {versionKey: false})

module.exports = model('Clientes', clinteSchema)