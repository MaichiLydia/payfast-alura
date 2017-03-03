module.exports = function(app){
 app.get('/pagamentos', function(req, res){
    console.log('Recebida requisicao do teste.')
    res.send('OK. !');
});


    app.post('/pagamentos/pagamento', function(req, res){
       
        req.assert("forma_de_pagamento", 
        "Forma de pagamento é obrigatório").notEmpty();
        req.assert("valor","Valor é obrigatório e deve ser um decimal")
        .notEmpty().isFloat();
        
        var erros = req.validationErrors();
        if(erros){
            console.log("Erros de validação encontrados");
            res.status(400).send(erros);
            return;
        }
        var pagamento = req.body;
        console.log('processando uma requisicao de um novo pagamento');
        
        pagamento.status = 'Criado';
        pagamento.data = new Date;
        
        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);


        pagamentoDao.salva(pagamento, function(erro, resultado){
            if(erro){
                console.log("erro ao inserir no banco: " + erro);
                res.status(500).json(pagamento);
            }else{
                console.log('pagamento criado');
               res.location('pagamentos/pagamento/' + resultado.insertId);
               res.status(201).json(pagamento); 
            }
               
        });
    });

}