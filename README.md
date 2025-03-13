# Product-Manager

## Aplicação desenvolvida em Angular 18 + .NET 8

### Requisitos
Antes de rodar a aplicação, certifique-se de ter os seguintes requisitos instalados:

### Front-end (Angular 18)
Node.js (versão recomendada: 18+)
Angular CLI (versão compatível com Angular 18)

### Back-end (.NET 8)
.NET SDK 8+

### Configuração do Projeto
1. Clonar o o Repositório
   https://github.com/EdsonJunioor/Product-Manager
   ### cd Product-Manager (para navegar para o repositório)

2. Configurando o Back-end
   Acesse a pasta do projeto back-end:
   ### cd Product-Manager\API\ProductManagerAPI
   Restaure os pacotes NuGet:
   ### dotnet restore
   Execute a API: Selecione o arquivo .sln como inicializador (clicando 2x) do projeto e execute o mesmo usando o VS, ao iniciar o back-end ira abrir um navegador com o swagger da aplicação tendo as rotas e parametros da API.

   #### Obs: não é necessário execução para banco de dados, a aplicação usado o MongoDB e está publicado.
   
   Arquivo .sln
   
   ![image](https://github.com/user-attachments/assets/846a1916-dd8c-4815-b6e0-9080abeac820)
   
   Inicialização do projeto
   
   ![image](https://github.com/user-attachments/assets/8c2118f0-abd0-4ec2-b230-fd45c391587b)

4. Configurando o Front-end
   Acesse a pasta do projeto front-end usando o VS Code (pasta Angular do repositório)
   Instale as dependências do Angular:
   ### npm install
   Execute a aplicação Angular:
   ### ng serve
   O front-end rodará por padrão em http://localhost:4200/.

## Testando a Aplicação
1. Certifique-se de que a API está rodando antes de iniciar o front-end.
2. Abra o navegador e acesse http://localhost:4200/
3. A comunicação entre o Angular e o .NET deve estar funcionando corretamente.


Para dúvidas ou suporte, estou a disposição !
