function PagamentoDao(connection){
    this._connection = connection;
}

PagamentoDao.prototype.salva = function(pagamento, callback){
        this._connection.query('INSERT INTO pagamentos SET ?', pagamento, callback);
}

PagamentoDao.prototype.lista = function(callback){
    this._connection.query('SELECT * FROM pagamentos', callback);
}
PagamentoDao.prototype.buscarPorId = function(callback){
    this._connection.query("SELECT * FROM pagamento where id = ",[id], callback);
}

module.exports = function(){
    return PagamentoDao;
}