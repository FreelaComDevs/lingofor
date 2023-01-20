# Lingo
Lingo - WEB to support Lingo App

## Configurações Iniciais
## Pacotes

### Node.JS
Versão 8.16.2 até 10.16.3

see https://nodejs.org/en/download/

### Docker

see https://www.docker.com/products/docker-desktop

### AWS CLI
Versão v1 ou v2

see https://aws.amazon.com/pt/cli/

## Passo a passo do processo de buil:
```
[QAS]
Step 01: Iniciar o docker.
Step 02: Rrealizar o login na AWS pela CLI. 
Step 03: Executar o script yarn build  
Step 04: Copiar a pasta build para a pasta docker  
Steo 05: Entrar na pasta docker com o script cd .\docker\ 
Step 06: Executar o script docker build -t lingo-react-dev .
Step 07: Executar o script docker tag lingo-react-dev:latest 684082078336.dkr.ecr.us-east-1.amazonaws.com/lingo-react-dev:latest 
Step 08: Executar o script docker push 684082078336.dkr.ecr.us-east-1.amazonaws.com/lingo-react-dev:latest
Step 09: Reiniciar o conteiner na AWS.

[PROD - API]
Step 01: Iniciar o docker.
Step 02: Rrealizar o login na AWS pela CLI. 
Step 03: Executar o script yarn build  
Step 04: Copiar a pasta build para a pasta docker  
Steo 05: Entrar na pasta docker com o script cd .\docker\ 
Step 06: Executar o script docker build -t lingo-repository-front-prod .
Step 07: Executar o script docker tag lingo-repository-front-prod:latest 684082078336.dkr.ecr.us-east-1.amazonaws.com/lingo-repository-front-prod:latest
Step 08: Executar o script docker push 684082078336.dkr.ecr.us-east-1.amazonaws.com/lingo-repository-front-prod:latest 
Step 09: Reiniciar o conteiner na AWS.
```
### Obs: consultar do cumentação de acessos no SharePoint para o login na AWS via CLI.
### Obs2: consultar do cumentação de AWS para localizar o container que deve ser reiniciado.
### https://blendmobi.sharepoint.com/sites/Kron-Operacoes/Lingo%20%20Plataforma%20de%20Ensino/Forms/AllItems.aspx

## setup

The app works with Node.js v8.12.0. I recommend you to install using `nvm`.

```
git clone <this repo>
yarn install
yarn start
```
