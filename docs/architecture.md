# Architecture

## Princípio orientador

A arquitetura inicial deve servir ao **vertical slice mínimo**. A prioridade é implementar apenas os blocos necessários para o Marco 1, mantendo espaço para evolução futura sem transformar o repositório, desde o início, em uma engine genérica excessivamente abstrata.

## Partes próprias da engine

Os componentes abaixo são candidatos a implementação própria por fazerem parte do núcleo da experiência e do controle técnico do projeto:

### 1. Loop principal da aplicação
- atualização e renderização em ciclo contínuo;
- integração entre input, simulação e desenho;
- controle básico de tempo de frame.

### 2. Renderização 2D isométrica ortogonal
- ordenação e composição dos elementos visuais do mapa;
- transformação entre coordenadas lógicas e apresentação isométrica;
- desenho de tiles, entidades e camadas necessárias ao slice.

### 3. Sistema de mapa para a ilha inicial
- carregamento de dados do mapa;
- representação mínima de camadas, tiles e zonas de colisão;
- interface de acesso ao mapa utilizada pelo jogo.

### 4. Entidade jogável mínima
- estado do personagem principal;
- movimentação básica;
- integração com colisão e câmera.

### 5. Câmera de acompanhamento
- enquadramento do personagem;
- seguimento simples;
- limites básicos conforme o mapa exigir.

### 6. Camada de jogo
- regras específicas do slice;
- orquestração entre mapa, personagem, câmera e objetivos imediatos;
- definição do conteúdo inicial da experiência.

## Dependências externas aceitas

Dependências externas são aceitáveis quando reduzirem risco e tempo de implementação sem comprometer o controle do núcleo do projeto.

### Aceitas nesta fase
- **SDK e tooling oficial do Android** para build, empacotamento, deploy e execução;
- **bibliotecas de baixo nível** para janela/superfície, input, áudio ou renderização, se forem necessárias para viabilizar o alvo Android com menor custo;
- **bibliotecas utilitárias pequenas e objetivas** para serialização, leitura de formatos de dados, matemática ou logging;
- **formatos e ferramentas externas de assets** para autoria de mapa e sprites, desde que a integração seja simples.

## Dependências externas a evitar

Mesmo que existam soluções prontas, a fase inicial deve evitar dependências que empurrem o projeto para uma arquitetura mais ampla do que o necessário:

- engines generalistas completas;
- frameworks que imponham ECS complexo sem necessidade comprovada;
- soluções de scripting extensas para gameplay;
- stacks grandes de UI/editor interno;
- middlewares de rede, backend ou live service.

## Limites de escopo arquitetural do Marco 1

Para proteger o foco, a arquitetura inicial **não deve incluir como prioridade**:

- rede;
- scripting complexo;
- editor interno;
- save system completo;
- arquitetura de plugins genérica;
- suporte amplo a múltiplas plataformas antes da validação no Android.

## Organização inicial do repositório

- `engine/`: núcleo técnico implementado internamente e estritamente necessário ao slice.
- `game/`: regras e conteúdo específicos do jogo.
- `platform/android/`: camada de plataforma e empacotamento Android.
- `assets/`: dados de mapa, sprites e demais recursos.
- `tools/`: utilitários simples de build/pipeline.
- `docs/`: documentação viva de escopo e decisões.

## Diretriz para evolução

Novos sistemas só devem ser promovidos ao núcleo da engine quando houver necessidade concreta demonstrada pelo desenvolvimento do jogo. Se um sistema ainda não for necessário para abrir o APK, carregar o mapa da ilha, renderizar o personagem, mover e fazer a câmera seguir, ele provavelmente ainda não deve existir.
