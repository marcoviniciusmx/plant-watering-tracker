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

**Máximo — modo Socrático completo, sem exceção.** Este é o primeiro
projeto da trilha, focado em fixar a mecânica básica: rota Express,
query SQL, fetch no React, estado. O Claude guia por perguntas, uma
etapa de cada vez, nunca escreve código da aplicação, sempre espera a
resposta de Marco e avalia antes de avançar. As únicas exceções são
este próprio CLAUDE.md, o prompt do Claude Design, o README final, e
verificações de estado (`ls`, `git status`, etc.) — mesmas exceções
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
Modules (backend); PostgreSQL via Supabase (banco). Mesma stack fixa
de toda a trilha.

## Prompt do Claude Design

Gerado — ver `design-prompt.md` nesta pasta.

## Onde estamos agora

Modelagem de domínio concluída via Socrático (campos da planta, regra
de status, ação de regar, CRUD completo). Próximo passo: schema SQL da
tabela `plants` e início do backend (rotas + controllers), também via
Socrático, com Marco escrevendo o código.
