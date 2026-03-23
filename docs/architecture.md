# Architecture

## Princípio orientador

A arquitetura inicial deve servir ao **vertical slice mínimo**. A prioridade é implementar apenas os blocos necessários para o Marco 1, mantendo espaço para evolução futura sem transformar o repositório, desde o início, em uma engine genérica excessivamente abstrata.

## Fronteira entre engine e game

A divisão principal do projeto é entre um **runtime reutilizável** e uma **camada de jogo orientada a conteúdo**.

### `engine/` — runtime reutilizável

O diretório `engine/` deve conter apenas sistemas genéricos, reaproveitáveis e independentes de nomes ou regras específicas do jogo.

Responsabilidades da engine nesta fase:

- loop principal e ciclo de frame;
- renderer 2D;
- abstração de input;
- asset manager;
- tilemap;
- câmera 2D;
- colisão básica baseada no mapa;
- contrato de integração com o jogo via callbacks.

A engine **não deve** conhecer conceitos como "ilha inicial", "personagem principal", missões, inventário ou qualquer nome específico do conteúdo.

### `game/` — conteúdo e regras do jogo

O diretório `game/` deve conter apenas aquilo que define a experiência jogável concreta.

Responsabilidades do jogo nesta fase:

- cena da ilha;
- definição do personagem;
- configuração inicial da sessão;
- lógica de movimentação;
- uso dos serviços expostos pela engine.

O jogo pode compor os sistemas da engine, mas não deve reimplementar serviços genéricos dentro de `game/`.

## Interface de integração

A engine inicializa os subsistemas compartilhados e chama callbacks simples do jogo:

- `init(context)`: prepara estado inicial, registra assets e conecta câmera/entidades;
- `update(context)`: executa regras do jogo a cada frame;
- `render(context)`: envia comandos de desenho usando o renderer fornecido pela engine.

O `context` é o único ponto de contato principal entre as camadas e oferece acesso a serviços genéricos como input, assets, tilemap, câmera, colisão e renderer.

## Fluxo de execução

Diagrama textual simplificado:

```text
platform/android
    -> engine/EngineRuntime
        -> cria Input, Assets, Tilemap, Camera, Collision, Renderer
        -> chama game.init(context)
        -> loop:
            -> coleta input
            -> chama game.update(context)
            -> chama game.render(context)
            -> apresenta frame

game/
    -> define islandScene, PlayerCharacter e regras de movimento
    -> usa apenas interfaces expostas pelo context
```

## Organização atual do repositório

- `engine/runtime.js`: inicialização do runtime, criação do `context` e coordenação do loop.
- `engine/renderer2d.js`: renderer 2D baseado em comandos de desenho.
- `engine/input.js`: abstração de input por eixos.
- `engine/assets.js`: registro e resolução de assets.
- `engine/tilemap.js`: representação de mapa e leitura de colisão.
- `engine/camera.js`: câmera com seguimento simples.
- `engine/collision.js`: colisão básica baseada no tilemap.
- `game/island-scene.js`: conteúdo da cena inicial da ilha.
- `game/character.js`: definição do personagem.
- `game/bootstrap.js`: configuração inicial do jogo e callbacks `init`, `update` e `render`.

## Regras de acoplamento

Para preservar a separação:

1. classes da engine não importam módulos de `game/`;
2. `game/` interage com a engine apenas pelos módulos públicos e pelo `context`;
3. nomes específicos do conteúdo ficam restritos a `game/` e `assets/`;
4. novos sistemas só entram em `engine/` se forem reutilizáveis por mais de um conteúdo ou necessários ao runtime base.

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

## Diretriz para evolução

Novos sistemas só devem ser promovidos ao núcleo da engine quando houver necessidade concreta demonstrada pelo desenvolvimento do jogo. Se um sistema ainda não for necessário para abrir o APK, carregar o mapa da ilha, renderizar o personagem, mover e fazer a câmera seguir, ele provavelmente ainda não deve existir.
