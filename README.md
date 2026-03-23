# Shard

Estrutura inicial de um projeto com **engine própria** para um jogo **2D isométrico ortogonal**, com **alvo inicial em Android**.

## Objetivo do projeto

O foco deste repositório é construir uma base técnica enxuta para viabilizar um **vertical slice mínimo**, validando cedo a experiência principal do jogo antes de expandir a engine.

Em vez de começar por uma engine genérica e completa, o projeto prioriza apenas o que for necessário para colocar um primeiro marco funcional em execução:

- abrir um APK no Android;
- carregar o mapa inicial da ilha;
- renderizar o personagem principal;
- permitir movimentação básica;
- fazer a câmera acompanhar o personagem.

## Princípios desta fase

- **Vertical slice primeiro**: provar o loop principal antes de abstrações amplas.
- **Engine própria, mas pragmática**: criar internamente apenas os sistemas centrais para o jogo.
- **Escopo controlado**: evitar infraestrutura prematura e sistemas não essenciais.
- **Android como alvo inicial**: decisões técnicas devem considerar esse ambiente desde o início.

## Estrutura inicial

- `engine/`: código dos subsistemas próprios da engine necessários para o Marco 1.
- `game/`: regras, conteúdo e integração específica do jogo.
- `platform/android/`: bootstrap, empacotamento e integração com Android.
- `assets/`: recursos do jogo, como mapas, sprites, tilesets, áudio e dados.
- `tools/`: scripts e utilitários de apoio ao pipeline mínimo.
- `docs/`: documentação de escopo, arquitetura e planejamento.

## Documentação principal

- `docs/roadmap.md`: definição do Marco 1 e evolução prevista por etapas.
- `docs/architecture.md`: separação entre partes próprias da engine e dependências externas aceitas.

## Fora de escopo no Marco 1

Nesta etapa, o projeto **não** deve investir em sistemas genéricos ou avançados que não contribuam diretamente para o vertical slice inicial, como:

- rede/multiplayer;
- sistema de scripting complexo;
- editor interno;
- save system completo;
- pipeline genérico de plugins;
- ferramentas avançadas de live ops.
