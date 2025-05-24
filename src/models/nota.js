const { model, Schema } = require('mongoose')

const notaSchema = new Schema({
    nome: { type: String },
    nota: { type: String },
    chave: { type: String },
    cnpj: { type: String, unique: true},
    data: { type: String},
    entrega: { type: String },
    pagamento: { type: String },
    total: { type: String },
    item: { type: String },
    quantidade: { type: String },
    unitario: { type: String }
}, {versionKey: false})

module.exports = model('Notas', notaSchema)
