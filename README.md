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

- `engine/`: runtime reutilizável com loop principal, renderer 2D, input abstraction, asset manager, tilemap, câmera e colisão básica.
- `game/`: conteúdo e regras do jogo, incluindo cena da ilha, personagem, configuração inicial e lógica de movimentação.
- `platform/android/`: bootstrap, empacotamento e integração com Android.
- `assets/`: recursos do jogo, como mapas, sprites, tilesets, áudio e dados.
- `tools/`: scripts e utilitários de apoio ao pipeline mínimo.
- `docs/`: documentação de escopo, arquitetura e planejamento.

## Contrato entre as camadas

A integração entre runtime e jogo deve acontecer por callbacks simples:

- `init(context)`;
- `update(context)`;
- `render(context)`.

A engine cria o `context` com acesso aos seus serviços genéricos e o jogo usa esse contexto para aplicar regras sem acoplamento direto com implementações internas do runtime.

## Documentação principal

- `docs/roadmap.md`: definição do Marco 1 e evolução prevista por etapas.
- `docs/architecture.md`: separação entre runtime da engine e camada de jogo.

## Fora de escopo no Marco 1

Nesta etapa, o projeto **não** deve investir em sistemas genéricos ou avançados que não contribuam diretamente para o vertical slice inicial, como:

- rede/multiplayer;
- sistema de scripting complexo;
- editor interno;
- save system completo;
- pipeline genérico de plugins;
- ferramentas avançadas de live ops.
