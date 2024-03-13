# Sistema de Gerenciamento de Clientes (facilita.juridico)
![veja aqui o video]([https://github.com/indiodev/facilita.juridico/assets/67079657/81cecafb-1bf3-4955-bb4a-8b09606294a5](https://youtu.be/mMAYszSkAfs))

Esta é uma solução para o desafio proposto pela Facilita Jurídico: o desenvolvimento de um sistema de gerenciamento de clientes para uma empresa de limpeza residencial.

## Sobre o sistema

Para atender às necessidades de uma empresa, criamos uma plataforma composta por um backend em Node.js utilizando PostgreSQL como banco de dados, e um frontend em React. Este sistema permite o cadastro e visualização dos clientes, centralizando as informações que antes eram controladas em planilhas.

#### Funcionalidades Implementadas:

- **Listagem e Filtragem de Clientes:** Os clientes podem ser listados e filtrados com base nas informações cadastradas, como nome, email e telefone.
  
- **Cadastro de Novos Clientes:** É possível cadastrar novos clientes, inserindo suas informações na base de dados.

### Otimização de Rotas de Atendimento

Além do gerenciamento básico de clientes, buscamos otimizar as rotas de atendimento da empresa. Considerando um mapa bidimensional com as localizações dos clientes, implementamos um algoritmo para calcular a rota partindo da empresa e passando por todas as localizações dos clientes cadastrados, retornando à empresa no final. A rota é calculada para minimizar a distância percorrida.

#### Funcionalidades Implementadas:

- **Cálculo da Rota:** Desenvolvemos um algoritmo eficiente para calcular a rota ideal, levando em consideração a localização de todos os clientes cadastrados.
  
- **Visualização da Ordem de Visitação:** Ao clicar em um botão na tela de clientes, uma modal é aberta, exibindo a ordem de visitação dos clientes na rota calculada. Isso permite uma organização eficaz das visitas, maximizando a eficiência no atendimento.

### Preview
1. INDEX (HOME) - LISTAGEM DE CLIENTES X FILTRO X PESQUISA
![image](https://github.com/indiodev/facilita.juridico/assets/67079657/81cecafb-1bf3-4955-bb4a-8b09606294a5)
2. VISUALIZAR DETALHES DO CLIENTE
![image](https://github.com/indiodev/facilita.juridico/assets/67079657/2793306c-66b7-44fe-bd57-f5d4ee84d003)
3. ADICIONAR NOVO CLIENTE
![image](https://github.com/indiodev/facilita.juridico/assets/67079657/aa4bbca7-949c-4dd5-9f91-b93a514b70b4)
4. ROTA OTIMIZADA (MENOR DISTANCIA)
![image](https://github.com/indiodev/facilita.juridico/assets/67079657/fe14e6fe-d9ac-4d89-bf9a-a180cdf17d6d)

### Como Executar

Para executar o sistema localmente, siga as instruções abaixo:

1. Certifique-se de ter o Docker (ou Docker Engine) e o Docker Compose instalado em sua máquina.

2. Clone este repositório:
```bash 
  git clone git@github.com:indiodev/facilita.juridico.git
```
3. Entre no diretório:
```bash 
  cd facilita.juridico
```

4. Configurar as variáveis de ambiente 
```bash
cp ./facilita.juridico.api/.env.example .env
cp ./facilita.juridico.api/.env.example ./facilita.juridico.api/.env
cp ./facilita.juridico.web/.env.example ./facilita.juridico.web/.env
```
5. Subir os containers da aplicação:
```bash 
  docker compose up -d
  //ou
  docker-compose up -d
```
6. A aplicação estará disponível em:
API: http://localhost:3333/
WEB: http://localhost:5173/

---

> Solução proposta por Marcos Jhollyfer (@indio.dev) 

