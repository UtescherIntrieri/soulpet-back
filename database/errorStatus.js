function errorStatus(err, req, res, next) {
    const timestamp = new Date();

    //erro de validação
    if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(500).json(
            {
                error: " Já existe um registro com esse valor",
                rota: req.path,
                método: req.method,
                dataHora: timestamp
            });

        //erro database
    } else if (err.name === 'SequelizeForeignKeyConstraintError') {
        res.status(500).json(
            {
                error: "Um erro aconteceu. O registro solicitado não existe na tabela de referência.",
                rota: req.path,
                método: req.method,
                dataHora: timestamp
            });

            //erro de tempo esgotado
    } else if (err.name === 'SequelizeTimeoutError') {
        res.status(500).json(
            {
                error: "Um erro aconteceu. Tempo esgotado aguardando uma requisição.",
                rota: req.path,
                método: req.method,
                dataHora: timestamp
            });

            //erro para excluir
    } else if (err.name === 'SequelizeExclusionConstraintError') {
        res.status(500).json(
            {
                error: "Ocorreu um erro na exclusão de um item no banco de dados.",
                rota: req.path,
                método: req.method,
                dataHora: timestamp
            });

            // erro na busca
    } else if (err.name === 'SequelizeUnknownConstraintError') {
        res.status(500).json(
            {
                error: "Ocorreu um erro ao encontrar o nome da restrição no banco de dados.",
                rota: req.path,
                método: req.method,
                dataHora: timestamp
            });

        //erro de conexão 
    } else if (err.name === 'SequelizeHostNotFoundError') {
        res.status(500).json(
            {
                error: "Ocorreu um erro ao tentar encontrar o servidor.",
                rota: req.path,
                método: req.method,
                dataHora: timestamp
            });

        //erro de estabilidade
    } else if (err.name === 'SequelizeInvalidConnectionError') {
        res.status(500).json({
            error: "Ocorreu um erro ao tentar estabelecer uma conexão.",
            rota: req.path,
            método: req.method,
            dataHora: timestamp
        });

        //erro no tempo de conexão
    } else if (err.name === 'SequelizeConnectionTimedOutError') {
        res.status(500).json({
            error: "Ocorreu um erro. O tempo de conexão se esgotou.",
            rota: req.path,
            método: req.method,
            dataHora: timestamp
        });

        //erro de acesso
        } else if (err.name === 'SequelizeAccessDeniedError') {
        res.status(500).json({
            error: "Ocorreu um erro. O acesso foi negado",
            rota: req.path,
            método: req.method,
            dataHora: timestamp
        });

            //erro no tempo de conexão
    } else if (err.name === 'SequelizeConnectionAcquireTimeoutError') {
        res.status(500).json({
            error: "Erro lançado quando a conexão não é adquirida devido ao tempo limite.",
            rota: req.path,
            método: req.method,
            dataHora: timestamp
        });

        //erro na conexão com o BD
    } else if (err.name === 'SequelizeConnectionRefusedError') {
        res.status(500).json({
            error: "Erro lançado quando uma conexão com um banco de dados é recusada.",
            rota: req.path,
            método: req.method,
            dataHora: timestamp
        });

        //erros de conexão
    } else if (err.name === 'SequelizeConnectionError') {
        res.status(500).json({
            error: "Ocorreu um erro de conexão.",
            rota: req.path,
            método: req.method,
            dataHora: timestamp
        });
        
        //erro do tempo da operação
    } else if (err.name === 'SequelizeOperationTimedOutError') {
        res.status(500).json({
            error: "Ocorreu um erro. O tempo na operação se esgotou.",
            rota: req.path,
            método: req.method,
            dataHora: timestamp
        });

        //erro de validar algum campo
    } else if (err.name === 'SequelizeValidationError') {
        res.status(500).json({
            error: "Ocorreu um erro na tentativa de validar algum campo.",
            rota: req.path,
            método: req.method,
            dataHora: timestamp
        });

        //erro de consulta de escopo
    } else if (err.name === 'SequelizeScopeError') {
        res.status(500).json({
            error: "Ocorreu um erro quando o sequelize não pode consultar o escopo especificado.",
            rota: req.path,
            método: req.method,
            dataHora: timestamp
        });

        //erro de busca nos registros
    } else if (err.name === 'SequelizeEmptyResultError') {
        res.status(500).json({
            error: "Ocorreu um erro. O registro não foi encontrado.",
            rota: req.path,
            método: req.method,
            dataHora: timestamp
        });

        //erro no BD
    } else if (err.name === 'SequelizeDatabaseError') {
        res.status(500).json({
            error: "Ocorreu um erro no banco de dados.",
            rota: req.path,
            método: req.method,
            dataHora: timestamp
        });
    }} 

    module.exports = errorStatus