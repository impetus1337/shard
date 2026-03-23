# Especificação isométrica

## Objetivo

Este documento define a convenção espacial mínima do projeto para o **Marco 1**. A intenção é fixar, antes da produção de conteúdo, como o mapa isométrico será representado logicamente, como ele será convertido para a tela, como a ordem de desenho funcionará e como colisão básica será interpretada.

A prioridade aqui é previsibilidade: mapa, câmera, renderização, colisão e assets devem operar sobre a mesma convenção.

## 1. Grid lógico do mapa

### 1.1 Coordenadas de tiles

O mundo é representado por um **grid lógico bidimensional** composto por tiles indexados por coordenadas inteiras:

- `tx`: coluna do tile no mapa;
- `ty`: linha do tile no mapa.

Convenção adotada:

- `tx` cresce para a direita no grid lógico;
- `ty` cresce para baixo no grid lógico;
- cada tile ocupa uma célula lógica única `(tx, ty)`;
- a posição lógica de referência de um tile é sempre o seu **centro no plano do mundo**, não o canto visual do losango.

Exemplo de indexação lógica:

```text
            tx →
        0    1    2    3
ty 0  (0,0)(1,0)(2,0)(3,0)
   1  (0,1)(1,1)(2,1)(3,1)
   2  (0,2)(1,2)(2,2)(3,2)
   3  (0,3)(1,3)(2,3)(3,3)
```

### 1.2 Tamanho do tile

Para o Marco 1, o tile visual padrão deve seguir a proporção clássica de losango isométrico 2:1:

- `tileWidth = 64 px`;
- `tileHeight = 32 px`.

Derivações úteis:

- `halfTileWidth = 32 px`;
- `halfTileHeight = 16 px`.

Esses valores definem a malha-base de câmera, posicionamento e assets de chão. Se no futuro o projeto mudar de resolução-base, essa mudança deve ser tratada como alteração explícita de convenção, não como ajuste local de arte.

### 1.3 Origem do mundo

A origem lógica do mundo fica em:

- `worldOriginTile = (0, 0)`.

A origem em tela correspondente é um ponto âncora chamado:

- `screenOrigin = (originX, originY)`.

Esse ponto representa **onde o centro do tile `(0, 0)` é projetado na tela**.

Para evitar ambiguidade entre câmera e mapa:

- o mapa nunca embute offsets mágicos por asset;
- a câmera controla o deslocamento global alterando `originX` e `originY`;
- tiles e entidades compartilham a mesma origem de mundo.

## 2. Conversão de coordenadas do mundo para a tela

### 2.1 Fórmula de tile para tela

A projeção isométrica ortogonal do tile lógico `(tx, ty)` para a tela é:

```text
screenX = originX + (tx - ty) * halfTileWidth
screenY = originY + (tx + ty) * halfTileHeight
```

Com os valores do Marco 1:

```text
screenX = originX + (tx - ty) * 32
screenY = originY + (tx + ty) * 16
```

Interpretação:

- mover `+1` em `tx` desloca o tile para baixo e à direita na tela;
- mover `+1` em `ty` desloca o tile para baixo e à esquerda na tela.

### 2.2 Ponto de ancoragem visual

A convenção visual do projeto deve usar:

- **tiles de chão ancorados pelo centro do losango**;
- **entidades ancoradas pelo pé/base no chão**.

Na prática:

- o resultado de `worldToScreen(tx, ty)` indica o ponto central do tile no plano do chão;
- para desenhar a imagem de um tile, o renderer normalmente converte esse ponto para o canto superior esquerdo do sprite com:

```text
drawX = screenX - tileWidth / 2
drawY = screenY - tileHeight / 2
```

- para desenhar uma entidade, o ponto `(screenX, screenY)` corresponde ao pé da entidade sobre o chão; o sprite da entidade sobe visualmente a partir desse ponto.

### 2.3 Exemplos simples de conversão

Assumindo `originX = 400` e `originY = 120`:

| Tile | screenX | screenY |
| --- | ---: | ---: |
| `(0,0)` | 400 | 120 |
| `(1,0)` | 432 | 136 |
| `(0,1)` | 368 | 136 |
| `(1,1)` | 400 | 152 |
| `(2,1)` | 432 | 168 |

Visualmente:

```text
                (0,0)
                 400,120
                   /\
                  /  \
         (0,1)   /    \   (1,0)
        368,136  \    /  432,136
                   \  /
                    \/
                  (1,1)
                  400,152
```

## 3. Ordem de renderização

### 3.1 Regra principal

Para evitar sobreposição visual incorreta, a ordenação base deve seguir a profundidade isométrica:

- quanto maior `tx + ty`, mais “à frente” o elemento está na cena;
- elementos com menor `tx + ty` devem ser desenhados primeiro.

Chave básica de ordenação:

```text
depth = tx + ty
```

Ordem de desenho:

1. ordenar por `depth` crescente;
2. em empate, ordenar por `ty` crescente;
3. se ainda houver empate, ordenar por `tx` crescente;
4. entidades sobre o mesmo tile devem ser desenhadas após o chão desse tile.

Isso produz uma regra simples, determinística e suficiente para o Marco 1.

### 3.2 Ordem recomendada por camadas

Para manter o pipeline previsível, a renderização deve ocorrer em fases:

1. **camada de chão**;
2. **camada de bloqueios baixos / decoração de base**;
3. **entidades**;
4. **camada de sobreposição simples**, se existir algo que deva passar por cima do personagem.

Mesmo usando camadas, a ordenação dentro de cada fase deve respeitar a regra de profundidade quando aplicável.

### 3.3 Regra prática para entidades

Entidades móveis devem usar como referência de profundidade o tile onde está seu ponto de apoio no chão.

Exemplo:

- personagem em `(3,4)` → `depth = 7`;
- árvore-base em `(3,5)` → `depth = 8`.

Resultado:

- o personagem é desenhado antes da árvore-base;
- a árvore aparece à frente se estiver em uma linha mais baixa no grid, evitando o efeito de “andar por cima” de objetos que deveriam estar à frente.

## 4. Representação de altura no Marco 1

### Decisão

Para o Marco 1, a altura será representada por **camadas simples, sem altura física real**.

Isso significa:

- não existe coordenada vertical contínua de mundo para gameplay;
- não existe cálculo de elevação real por vértice ou por pixel;
- não existe navegação entre níveis com rampas, quedas ou salto dependente de altura.

### Como aplicar

O mapa pode ter, no máximo, distinções simples como:

- chão base caminhável;
- tile bloqueado que visualmente sugere parede, rocha, água ou borda;
- sobreposição visual opcional para copas, telhados curtos ou elementos acima da cabeça do personagem.

### Justificativa

Essa abordagem reduz risco em quatro frentes:

- simplifica a fórmula espacial;
- elimina ambiguidade na colisão inicial;
- facilita a produção dos primeiros assets;
- permite validar câmera e navegação antes de introduzir elevação discreta ou altura real.

Se o projeto precisar de desníveis depois do slice inicial, a próxima evolução recomendada é **elevação discreta por tile**, e não altura contínua.

## 5. Colisão básica no Marco 1

### 5.1 Regra de colisão

Cada tile deve declarar apenas um estado básico de navegação:

- `walkable`: tile caminhável;
- `blocked`: tile bloqueado.

Não há, neste marco:

- colisão por polígono;
- colisão parcial por subárea do tile;
- alturas diferentes alterando acesso;
- slopes, jump links ou volumes complexos.

### 5.2 Interpretação no movimento

A movimentação básica consulta o tile lógico de destino:

- se o tile de destino for `walkable`, o deslocamento é permitido;
- se o tile de destino for `blocked`, o deslocamento é negado.

Essa regra vale tanto para input em passos por tile quanto para movimento contínuo com amostragem de célula-alvo.

### 5.3 Convenção para conteúdo

Durante a autoria de mapa e assets:

- o visual do tile deve comunicar claramente se ele é caminhável ou bloqueado;
- água profunda, paredões, rochas fechadas e bordas fora da ilha devem ser `blocked`;
- chão, trilhas e áreas abertas devem ser `walkable`.

A documentação e os dados do mapa devem sempre tratar colisão como atributo lógico do tile, nunca como inferência implícita do sprite.

Exemplo:

```text
Legenda: . = walkable   # = blocked

        tx →
      0 1 2 3 4
ty 0  # # # # #
   1  # . . . #
   2  # . # . #
   3  # . . . #
   4  # # # # #
```

## 6. Exemplos visuais para assets e câmera

### 6.1 Forma do tile base

O tile de chão deve ser pensado como um losango inscrito em uma caixa de `64x32 px`:

```text
                32 px
         <---------------->
              ______
           .-'      '-.
         .'            '.
        /                \
        \                /
         '.            .'
           '-.______.-'
               32 px de altura total
```

Leitura prática para arte:

- a área útil do chão é o losango;
- transparência fora do losango é esperada;
- detalhes que ultrapassem muito a caixa base devem ser reservados para objetos, não para o tile de chão.

### 6.2 Relação entre tiles vizinhos

Os tiles se encaixam pela metade da largura e da altura:

```text
                 (1,0)
                   /\
                  /  \
         (0,0)   /____\   (2,0)
           /\    \    /    /\
          /  \    \  /    /  \
         /____\    \/    /____\
            (0,1)  /\
                  /  \
                 /____\
```

A arte deve preservar esse encaixe para que a malha não apresente frestas visuais.

### 6.3 Enquadramento da câmera

A câmera deve mirar o plano do chão, não o topo do sprite. Para o personagem:

- o ponto seguido pela câmera é o ponto do pé no tile;
- sprites altos podem ultrapassar o centro da tela para cima sem alterar o ponto lógico de acompanhamento.

Exemplo conceitual:

```text
                 topo do sprite
                      ^
                      |
                    [###]
                   [#####]
                      |
----------------------+--------------------
              ponto seguido pela câmera
                (pé/base da entidade)
```

Isso evita jitter visual e mantém colisão, profundidade e enquadramento falando a mesma linguagem espacial.

## 7. Resumo normativo do Marco 1

Para o Marco 1, o projeto adota as seguintes convenções obrigatórias:

- grid lógico em coordenadas inteiras `(tx, ty)`;
- tile base com `64x32 px`;
- origem do mundo no tile `(0,0)`;
- projeção para tela dada por `screenX = originX + (tx - ty) * 32` e `screenY = originY + (tx + ty) * 16`;
- ordenação base por `depth = tx + ty`;
- altura representada apenas por camadas simples, sem elevação real;
- colisão binária por tile: `walkable` ou `blocked`;
- câmera seguindo o ponto de apoio da entidade no chão.

Nenhum conteúdo novo de mapa, câmera ou asset do Marco 1 deve contrariar esta convenção sem atualização explícita desta especificação.
