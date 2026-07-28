# Regador de Plantas — CLAUDE.md do projeto

Este arquivo guarda as specs, decisões e o estado **deste projeto
específico** (Projeto 1 da trilha). As regras gerais compartilhadas
por todos os 10 projetos estão no `CLAUDE.md` da raiz
(`../CLAUDE.md`) — leia os dois.

## O desafio

Cadastro de plantas de casa, com controle de rega: cada planta tem um
intervalo de rega (em dias); o sistema calcula quando a próxima rega
vence e mostra visualmente se está em dia, perto de vencer, vencendo
hoje, ou atrasada.

## Grau de ajuda do Claude neste projeto

**Máximo — modo Socrático completo, com uma exceção adicional.** Este é
o primeiro projeto da trilha, focado em fixar a mecânica básica: rota
Express, query SQL, fetch no React, estado. O Claude guia por
perguntas, uma etapa de cada vez, nunca escreve código de lógica da
aplicação, sempre espera a resposta de Marco e avalia antes de
avançar. As exceções são este próprio CLAUDE.md, o prompt do Claude
Design, o README final, verificações de estado (`ls`, `git status`,
etc.) — mesmas exceções

**Exceção adicional (decidida por Marco em 2026-07-24):** blocos de
CSS puro em `styled-components` — sem prop dinâmica, sem lógica, sem
conceito novo de React — o Claude pode escrever direto a partir da
especificação de valores (cores, espaçamentos) já acordada com Marco,
em vez de Marco digitar manualmente. Motivo: é cópia mecânica de
valores de design, não ensina mecânica nova (o foco do projeto é
Express/SQL/fetch/estado, não CSS). Continua Socrático pleno pra tudo
que envolve JS/React de verdade — estado, efeitos, eventos, lógica de
negócio, chamadas de API.
fixas de toda a trilha.

## Modelo de dados

Uma tabela só, sem relação com outras tabelas (conceito de relação
1-N fica reservado pro Projeto 2 — decidido explicitamente com Marco
quando ele propôs guardar histórico de regas e a gente resolveu manter
o escopo original do Projeto 1).

### `plants`

| Campo | Tipo | Observação |
|---|---|---|
| `id` | PK | |
| `name` | texto | nome da planta |
| `species` | texto | espécie |
| `watering_interval_days` | inteiro | a cada quantos dias regar; digitado por Marco no cadastro |
| `last_watered_date` | data, nulável | `NULL` = nunca foi regada. Sobrescrita a cada nova rega (sem histórico) |

Não guarda histórico de regas — só a última data. Decisão tomada para
manter o Projeto 1 fiel ao escopo "uma tabela só, sem relação" do
roadmap geral.

## Regra de negócio: status da planta

Calculado a partir de `last_watered_date` + `watering_interval_days`
(campo derivado, não armazenado):

| Status | Cor | Condição |
|---|---|---|
| Aguardando 1ª rega | Cinza claro (neutro) | `last_watered_date IS NULL` |
| Em dia | Verde | regada, faltam mais de 2 dias pra próxima rega |
| Perto de vencer | Amarelo | faltam 2 ou 1 dias pra próxima rega |
| Vence hoje | Laranja avermelhado | 0 dias restantes (vence hoje) |
| Vencida | Vermelho | passou da data da próxima rega |

## Ação de regar

Ao registrar uma rega (seja a primeira ou uma nova), Marco escolhe a
**data em que a rega aconteceu** — o campo vem preenchido com a data de
hoje por padrão, mas pode ser alterado (ex: regou ontem e esqueceu de
anotar). Essa data sobrescreve `last_watered_date`.

## CRUD

Completo, porém simples:
- Cadastrar planta (nome, espécie, intervalo de rega)
- Listar plantas com status calculado
- Editar planta (nome, espécie, intervalo)
- Excluir planta
- Registrar rega (com escolha de data)

## Stack

React + Vite + styled-components (frontend); Node.js + Express, ES
Modules (backend); PostgreSQL via Neon (banco). Mesma stack fixa
de toda a trilha (ver nota sobre a troca de Supabase pra Neon no
`CLAUDE.md` da raiz).

## Prompt do Claude Design

Gerado — ver `design-prompt.md` nesta pasta.

## Endpoints implementados

| Método | Rota | O que faz |
|---|---|---|
| `GET` | `/plants` | Lista todas as plantas, cada uma com `status` calculado (`calculateStatus`, em `backend/utils/plantStatus.js`) |
| `POST` | `/plants` | Cadastra planta (`name`, `species`, `watering_interval_days`); `last_watered_date` nasce `NULL` |
| `PATCH` | `/plants/:id` | Edita `name`, `species`, `watering_interval_days` de uma planta existente |
| `PATCH` | `/plants/:id/water` | Registra rega: sobrescreve `last_watered_date` com a data enviada no corpo |
| `DELETE` | `/plants/:id` | Remove a planta |

Todos os endpoints de escrita usam queries parametrizadas (`$1`, `$2`,
...) e devolvem `404` quando o `id` não corresponde a nenhuma linha
(`rowCount === 0`).

## Onde estamos agora

Backend completo: banco (Neon) conectado via `db.js` (com type parser
customizado pra coluna `DATE` não vir com hora/fuso — ver commit
`c5b58f0`), servidor Express de pé, e todo o CRUD + regra de status
implementados e testados via Socrático completo, com Marco escrevendo
o código linha a linha.

Frontend completo (Vite + React + styled-components), seguindo a
referência visual "Organic" (`visualReference/`): `GlobalStyle`
configurado (paleta, fonte Manrope via Google Fonts), tela `Home`
consumindo todos os endpoints do backend via `services/plantsApi.js`,
grid de cards com status colorido (`utils/plantStatusStyles.js`) e
data formatada (`utils/formatDate.js`), e os 4 modais (cadastrar,
editar, excluir, registrar rega) com estado único de modal
(`{ type, plant }`) e formulários controlados. CRUD completo de ponta
a ponta, testado manualmente.

Próximo passo: revisão geral (testes de UI mais completos, possíveis
ajustes finos de layout) e, ao final, o README.md do projeto.
