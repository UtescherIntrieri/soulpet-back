# SoulPet API (Back-End)
Bem-vindo(a), aqui você irá aprender como a API funciona e como utilizá-la. 

Front-End -> [README.md]

>[MIT License  
Copyright (c) 2023 SoulPet]

#

## Index
- [Para que serve a API](#para-que-serve-a-api)
- [O que conseguirei dessa API](#o-que-conseguirei-dessa-api)
- [Instalação](#instalação)
  - [Dependências necessárias](#dependências-necessárias)
  - [Ferramentas necessárias](#ferramentas-necessárias-necessárias)
- [Utilização](#utilização)
  - [Inicialização](#inicialização)
  - [Models](#models)
    - [Clientes](#clientes)
    - [Endereço](#endereco)
    - [Pets](#pets)
    - [Produtos](#produtos)
    - [Agendamentos](#agendamentos)
    - [Serviços](#serviços)
  - [Rotas Disponíveis](#rotas-disponíveis)
    - [Clientes](#clientes-1)
    - [Pets](#pets-1)
    - [Produtos](#produtos-1)
    - [Agendamentos](#agendamentos-1)
    - [Serviços](#servic3a7os-1)
- [Devs](#devs)


#

## Para que serve a API? 
&ensp;&ensp;A SoulPet API é uma aplicação para sistemas internos de petshops, que provê a integração de um banco de dados para cadastro e manipulação de clientes, pets, produtos, serviços e pedidos.  
&ensp;&ensp;A clareza visual é um foco para essa API, onde os funcionários que estarão trabalhando com ela têm uma interface clara e amigável, facilitando o fluxo de trabalho. Além disso, todas os dados são validados de acordo com seu tipo e informação.

#
 ## O que conseguirei dessa API?
### &ensp;&ensp;A API oferece diversos recursos e ferramentas, assim como:
- A realização e manutenção do cadastro de clientes, com seu nome, e-mail e telefone, assim como a de seus respectivos pets, com nome, tipo, porte, e data de nascimento. 
- Cadastrar produtos e checar sua disponibilidade em estoque. 
- O agendamentos de serviços
- Criação e organização de pedidos   
- E muito mais.  

&ensp;&ensp;Com a utilização dessa API, os petshops mantem um banco de dados único que otimiza o trabalho e o fluxo de informações dentro da empresa, indiretamente diminuindo erros e tempo desperdiçado.  

# Instalação
&ensp;&ensp;Realizar um `Git Clone` do repositório.  
&ensp;&ensp;`npm install` para instalar todas as dependências necessárias.  

&ensp;&ensp;Configurar o arquivo `.env`:  
DB_HOST=localhost   
DB_NAME=soulpet_db  
DB_USER=root  
DB_PASSWORD=(senha do mySQL)

## Dependências Necessárias

>[@hapi/joi] | [dotenv] | [express] | [morgan] | [mysql2] | [sequelize] 

## Ferramentas necessárias:
>[MySQl]  
[Git]  
[Node js]  


# Utilização
&ensp;&ensp;Deve-se primeiro inicializar o repositório
## Inicialização
`npm start`  
&ensp;&ensp; Abre em: http://localhost:3001

## Models:
### **Clientes**
- `nome`  
  - String, com no máximo 130 caracteres  
  - Obrigatório  
- `email` 
  - String, com no máximo 130 caracteres no formato padrão de e-mail
  - Deve ser um e-mail único
  - Obrigatório  
- `telefone`
  - String, com no máximo 130 caracteres
  - Obrigatório
- `endereco`
  - Deve satisfazer as condições no model "endereco"
  - Opcional
  #
### **Endereco**
- `uf`
  - String com no máximo 2 caracteres
  - Obrigatório
- `cidade`
  - String com no máximo 255 caracteres
  - Obrigatório
- `cep`
  - String com no máximo 9 caracteres
  - Obrigatório
- `rua`
  - String com no máximo 255 caracteres
  - Obrigatório
- `numero`
  - String com no máximo 255 caracteres
  - Obrigatório
  #
### **Pets**
- `nome`
  - String, com no máximo 130 caracteres
  - Obrigatório
- `tipo`
  - String com no máximo 100 caracteres
  - Obrigatório
- `porte`
  - String com no máximo 100 caracteres
  - Obrigatório
- `dataNasc`
  - Data no formato YYYY/MM/DD
  - Obrigatório
  #
### **Produtos**
- `nome`
  - String com no máximo 255 caracteres
  - Obrigatório
- `preco`
  - Número float
  - Obrigatório
- `descricao`
  - String com no máximo 150 caracteres
  - Obrigatório
- `desconto`
  - Número float
  - Obrigatório
- `dataDesconto`
  - Data no formato YYYY/MM/DD
  - Obrigatório
- `categoria`
  - String com no máximo 255 caracteres
  - Obrigatório
### **Agendamentos**
- `dataAgendada`
  - Data no formato YYYY/MM/DD
  - Obrigatório
- `realizada`
  - Boolean (TRUE/FALSE)
  - Obrigatório
### **Serviços**
- `nome`
  - String com no máximo 255 caracteres
  - Obrigatório
- `preco`
  - Número float
  - Obrigatório

## Rotas disponíveis:

### **Clientes**
### GET
- Lista todos os clientes http://localhost:3001/clientes  
- Filtra os clientes por id http://localhost:3001/clientes/:id
  - Params:  
&ensp;&ensp;*`id` = o id do cliente gerado pelo mySQL*  

- Lista o endereco de um cliente escolhido pelo id http://localhost:3001/clientes/:clienteId/endereco 
  - Params:  
&ensp;&ensp;*`clienteId` = o id do cliente gerado pelo mySQL* 
  
### POST
- Cadastra um novo cliente http://localhost:3001/clientes  

  - Body:  
&ensp;&ensp;*`nome` = Nome do cliente*  
&ensp;&ensp;*`email` = Email do cliente*  
&ensp;&ensp;*`telefone` = Telefone do cliente*  
&ensp;&ensp;*`endereco` (opcional) = Endereço do cliente, inclui: UF, Cidade, Cep, Rua, Número*

### PUT
- Atualiza os dados de um cliente http://localhost:3001/clientes/:id  
  - Params:  
&ensp;&ensp;*`id` = o id do cliente gerado pelo mySQL*  
  - Body:  
&ensp;&ensp;*`nome` = Nome do cliente*  
&ensp;&ensp;*`email` = Email do cliente*  
&ensp;&ensp;*`telefone` = Telefone do cliente*  
&ensp;&ensp;*`endereco` (opcional) = Endereço do cliente, inclui: UF, Cidade, Cep, Rua, Número*

### DELETE
- Deleta um cliente http://localhost:3001/clientes/:id  
  - Params:  
&ensp;&ensp;*`id` = O id do cliente gerado pelo mySQL* 
#

### **Pets**
### GET
- Lista todos os pets http://localhost:3001/pets  
- Filtra os pets por id http://localhost:3001/pets/:id  
  - Params:  
&ensp;&ensp;*`id` = O id do cliente gerado pelo mySQL* 

- Filtra os pets pelo id do cliente http://localhost:3001/clientes/:clienteId/pets  

  - Params:  
&ensp;&ensp;*`clienteId` = O id do cliente gerado pelo mySQL* 

### POST
- Cadastra um novo pet http://localhost:3001/pets  
  - Body:  
&ensp;&ensp;*`nome` = Nome do pet*  
&ensp;&ensp;*`tipo` = Tipo do pet*  
&ensp;&ensp;*`porte` = Porte do pet*  
&ensp;&ensp;*`dataNasc` =  Data de nascimento do pet*  
&ensp;&ensp;*`clienteId` =  O id do pet gerado pelo mySQL*

### PUT
- Atualiza os dados de um pet http://localhost:3001/pets/:id  
  - Params:  
&ensp;&ensp;*`id` = O id do pet gerado pelo mySQL* 
  - Body:  
&ensp;&ensp;*`nome` = Nome do pet*  
&ensp;&ensp;*`tipo` = Tipo do pet*  
&ensp;&ensp;*`porte` = Porte do pet*  
&ensp;&ensp;*`dataNasc` =  Data de nascimento do pet*  
&ensp;&ensp;*`clienteId` =  O id do cliente gerado pelo mySQL*

### DELETE
- Deleta um pet http://localhost:3001/pets/:id 
  - Params:  
&ensp;&ensp;*`id` = O id do cliente gerado pelo mySQL* 

#
### **Produtos**
### GET
- Lista todos os produtos http://localhost:3001/produtos
  - Query:  
&ensp;&ensp;*`nome` = Nome do produto*  
&ensp;&ensp;*`preco` = Preço do produto*  
&ensp;&ensp;*`categoria` = Categoria do produto*  
- Filtra os produtos por id http://localhost:3001/produtos/:id  
  - Params:  
&ensp;&ensp;*`id` = O id do produto gerado pelo mySQL* 

### POST
- Cadastra um novo produto http://localhost:3001/produtos 
  - Body:  
&ensp;&ensp;*`nome` = Nome do produto*  
&ensp;&ensp;*`descricao` = Descrição do produto*  
&ensp;&ensp;*`preco` = Preço do produto*  
&ensp;&ensp;*`desconto` =  Desconto a ser aplicado no produto*  
&ensp;&ensp;*`dataDesconto` =  Data de vencimento do desconto*  
&ensp;&ensp;*`categoria` =  Categoria do produto*

### PUT
- Atualiza os dados de um produto http://localhost:3001/produtos/:id 
  - Params:  
&ensp;&ensp;*`id` = O id do produto gerado pelo mySQL* 
  - Body:  
&ensp;&ensp;*`nome` = Nome do produto*  
&ensp;&ensp;*`descricao` = Descrição do produto*  
&ensp;&ensp;*`preco` = Preço do produto*  
&ensp;&ensp;*`desconto` =  Desconto a ser aplicado no produto*  
&ensp;&ensp;*`dataDesconto` =  Data de vencimento do desconto*  
&ensp;&ensp;*`categoria` =  Categoria do produto*
### DELETE
- Deleta todos os produtos http://localhost:3001/produtos/all 
- Deleta um produtos http://localhost:3001/produtos/:id 
  - Params:  
&ensp;&ensp;*`id` = O id do produto gerado pelo mySQL* 

#
### **Agendamentos**
### GET
- Lista todos os agendamentos http://localhost:3001/agendamentos  
- Filtra os agendamentos por id http://localhost:3001/agendamentos/:id  
  - Params:  
&ensp;&ensp;*`id` = O id do agendamento gerado pelo mySQL*  
 
### POST
- Cadastra um novo agendamento http://localhost:3001/agendamentos 
  - Body:  
&ensp;&ensp;*`dataAgendada` = Data agendada para o serviço*  
&ensp;&ensp;*`petId` = O id do pet gerado pelo mySQL*  
&ensp;&ensp;*`ServicoId` = O id do serviço gerado pelo mySQL* 
### PUT
- Atualiza os dados de um agendamento http://localhost:3001/agendamentos/:id 
  - Params:  
&ensp;&ensp;*`id` = O id do agendamento gerado pelo mySQL*  
  - Body:  
&ensp;&ensp;*`dataAgendada` = Data agendada para o serviço*  
&ensp;&ensp;*`realizada` = Se o serviço já foi realizado*  
&ensp;&ensp;*`petId` = O id do pet gerado pelo mySQL*  
&ensp;&ensp;*`ServicoId` = O id do serviço gerado pelo mySQL* 
### DELETE
- Deleta todos agendamentos http://localhost:3001/agendamentos/all 
- Deleta um agendamento http://localhost:3001/agendamentos/:id 
  - Params:  
&ensp;&ensp;*`id` = O id do agendamento gerado pelo mySQL* 
#
### **Serviços**
### GET
- Lista todos os servicos http://localhost:3001/servicos  
- Filtra os servicos por id http://localhost:3001/servicos/:id
  - Params:  
&ensp;&ensp;*`id` = O id do serviço gerado pelo mySQL*  
 
### POST
- Cadastra um novo servico http://localhost:3001/servicos  
  - Body:  
&ensp;&ensp;*`nome` = Nome do serviço*  
&ensp;&ensp;*`preco` = Preço do serviço*  

### DELETE
- Deleta todos os serviços http://localhost:3001/servicos/all 
- Deleta um servico http://localhost:3001/servicos/:id 
  - Params:  
&ensp;&ensp;*`id` = O id do serviço gerado pelo mySQL*  
#

## Devs:
>## - [Nai'a Utescher]
>## - [Juliana Andrade]
>## - [Gabriel Camilo]
>## - [Yuri Schuery]
>## - [Daniela Guilhoto]
#

[MIT License  
Copyright (c) 2023 SoulPet]: LICENSE.md
[README.md]: ../soulpet-front/README.md
[@hapi/joi]: https://www.npmjs.com/package/react-joi
[dotenv]: https://www.npmjs.com/package/dotenv
[express]: https://www.react.express
[morgan]: https://www.npmjs.com/package/morgan
[mysql2]: https://www.npmjs.com/package/mysql2
[sequelize]: https://www.npmjs.com/package/sequelize
[MySQl]: https://dev.mysql.com/downloads/installer/
[Git]: https://git-scm.com/downloads
[Node js]: https://nodejs.org/en/download
[Nai'a Utescher]: https://github.com/UtescherIntrieri
[Juliana Andrade]: https://github.com/andradeju
[Gabriel Camilo]: https://github.com/gabrielcamilo21
[Yuri Schuery]: https://github.com/souzaschuery
[Daniela Guilhoto]: https://github.com/DGuilhoto