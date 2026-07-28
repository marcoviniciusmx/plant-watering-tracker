<h1 align="center">Regador de Plantas</h1>

<p align="center">
  Cadastro de plantas de casa com controle de rega: cada planta tem um intervalo de dias entre regas, e o sistema calcula automaticamente quando ela precisa ser regada de novo — mostrando visualmente se está em dia, perto de vencer, vencendo hoje ou atrasada.
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-ias-utilizadas">IAs utilizadas</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-estrutura-do-projeto">Estrutura do projeto</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#-decisões-técnicas">Decisões técnicas</a>
</p>

---

## 🌱 Sobre o projeto

O **Regador de Plantas** é o primeiro de uma trilha de 10 projetos de
portfólio, criada para consolidar backend (Node/Express/SQL) e
frontend (React) do zero. É intencionalmente o mais simples da
trilha: uma tabela só, sem relacionamento com outras tabelas e sem
autenticação — o foco aqui é fixar a mecânica básica de uma aplicação
full stack: rota Express, query SQL parametrizada, fetch no React e
gerenciamento de estado.

A regra central do projeto é o cálculo de status: a partir da data da
última rega e do intervalo de rega cadastrado, o backend calcula em
tempo real (não armazena no banco) se a planta está em dia, perto de
vencer, vencendo hoje ou atrasada — e o frontend traduz isso numa cor
diferente pra cada situação.

---

## 🧰 Funcionalidades

- Cadastro de planta (nome, espécie e intervalo de rega em dias)
- Listagem de todas as plantas com status de rega calculado automaticamente
- Edição de planta (nome, espécie e intervalo)
- Exclusão de planta
- Registro de rega com escolha da data (o campo já vem preenchido com
  a data de hoje, mas pode ser alterado — por exemplo, se a rega
  aconteceu ontem e a pessoa esqueceu de anotar na hora)
- 5 status visuais, cada um com sua cor: Aguardando 1ª rega, Em dia,
  Perto de vencer, Vence hoje, Vencida

---

## 💻 Tecnologias

**Frontend**
- React
- Vite
- styled-components

**Backend**
- Node.js + Express (ES Modules)
- PostgreSQL (via `pg`), hospedado no [Neon](https://neon.tech)
- dotenv

---

## 🤖 IAs utilizadas

- **Claude Design**: gerou a referência visual do projeto (paleta,
  tipografia e layout dos cards/modais), usada como guia enquanto o
  frontend era construído — o código foi todo implementado à mão, não
  importado.
- **Claude Code**: atuou como mentor durante praticamente todo o
  desenvolvimento, no grau de ajuda mais alto de toda a trilha (é o
  primeiro projeto). Guiou por perguntas, uma etapa de cada vez, sem
  escrever nenhuma linha de lógica da aplicação — cada rota Express,
  query SQL, hook do React e chamada de API foi digitada e entendida
  por mim, com o Claude Code revisando e apontando erros antes de eu
  seguir pra próxima etapa. A única exceção, concedida por mim já na
  reta final do frontend, foi liberar blocos de CSS puro em
  `styled-components` (sem prop dinâmica nem lógica) pra serem
  escritos diretamente, por ser cópia mecânica de valores de design
  que não ensinava nada de novo — toda a lógica em JavaScript
  continuou sendo escrita por mim, com mentoria socrática completa.

---

## 👷 Estrutura do projeto

```
backend/
  controllers/   # regras de cada rota (plants)
  routes/        # definição das rotas Express
  database/      # conexão com o Postgres (db.js), schema.sql
  utils/         # cálculo de status da planta (plantStatus.js)
frontend/
  src/
    pages/         # Home (listagem + modais de cadastro/edição/rega/exclusão)
    services/      # chamadas à API (plantsApi.js)
    utils/         # cores por status e formatação de data
    GlobalStyles/  # paleta de cores e fonte compartilhadas
```

---

## 🔰 Como executar

### Pré-requisitos
- Node.js
- Uma conta no [Neon](https://neon.tech) (ou outro Postgres de sua preferência)

### Clonar o repositório
```bash
git clone https://github.com/marcoviniciusmx/plant-watering-tracker.git
cd plant-watering-tracker
```

### Banco de dados
Crie um projeto no Neon e copie a connection string. Depois, rode o
`backend/database/schema.sql` nele (pelo SQL Editor do próprio Neon,
ou via `psql`), pra criar a tabela `plants`.

### Backend
```bash
cd backend
npm install
cp .env.example .env
```
Preencha o `.env` com a connection string do passo anterior. Depois:
```bash
npm run dev
```
API disponível em `http://localhost:3000`.

### Frontend
Em outro terminal:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Aplicação disponível em `http://localhost:5173`.

---

## 🏗️ Decisões técnicas

- **Uma tabela só, sem relacionamento**: a coluna `last_watered_date`
  guarda só a data da última rega (sobrescrita a cada nova rega, sem
  histórico) — decisão tomada pra manter o escopo original do
  Projeto 1 ("uma tabela só"); guardar histórico de regas exigiria uma
  segunda tabela relacionada, conceito reservado pro Projeto 2 da
  trilha (relação 1-N).
- **Status calculado, nunca armazenado**: o status de cada planta é
  derivado em tempo real no backend (`calculateStatus`, em
  `backend/utils/plantStatus.js`) a partir de `last_watered_date` e
  `watering_interval_days` — nunca fica salvo no banco, porque mudaria
  sozinho a cada dia que passa.
- **Métodos `UTC` do `Date` no cálculo de status**: somar dias e
  comparar datas usando os métodos padrão do `Date` (sem `UTC`) gerava
  um bug de fuso horário (a data podia "voltar" um dia dependendo do
  fuso local). Resolvido usando só os métodos `getUTCDate`/`setUTCDate`
  em todo o cálculo.
- **Type parser customizado do `pg` pra colunas `DATE`**: por padrão,
  o driver `pg` converte colunas `DATE` em objetos `Date` do
  JavaScript, que carregam fuso horário e contaminavam tanto a
  resposta da API quanto o próprio cálculo de status. Resolvido
  registrando um parser customizado (`pg.types.setTypeParser`) que
  devolve a data como string simples (`"YYYY-MM-DD"`).
- **Registrar rega é uma rota separada de "editar planta"**
  (`PATCH /plants/:id/water`, distinta de `PATCH /plants/:id`): editar
  os dados cadastrais (nome, espécie, intervalo) é uma ação diferente
  de registrar que a planta foi regada numa data específica — e essa
  segunda ação precisa validar e tratar só a data, não os outros
  campos.
- **Neon em vez de Supabase**: a stack original da trilha usa Supabase
  em todos os 10 projetos, mas a conta já tinha os 2 projetos do plano
  free ocupados por outros trabalhos. Trocado para Neon logo no início
  deste projeto, evitando esbarrar nesse limite ao longo da trilha
  inteira.
- **Um único estado de modal**: os 4 modais (cadastrar, editar,
  excluir, registrar rega) são controlados por um único `useState`
  (`{ type, plant }`) no lugar de um booleano por modal — evita estado
  duplicado e deixa explícito que só um modal pode estar aberto por
  vez.
