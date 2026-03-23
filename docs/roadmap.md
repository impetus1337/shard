# Roadmap

## Diretriz geral

O desenvolvimento começa por um **Marco 1 estritamente focado em um vertical slice mínimo**. O objetivo não é entregar uma engine genérica completa, e sim validar o núcleo jogável e a viabilidade técnica no Android.

## Marco 1 — Vertical slice mínimo

### Objetivo

Disponibilizar um APK funcional que demonstre o loop principal do jogo em um cenário inicial simples.

### Escopo explícito

O Marco 1 deve cobrir, no mínimo:

1. **Abrir APK**
   - gerar e iniciar um APK executável no dispositivo ou emulador Android;
   - validar inicialização da aplicação e ciclo básico de vida.

2. **Carregar mapa da ilha**
   - carregar os dados do mapa inicial da ilha;
   - preparar tiles, camadas e colisões mínimas necessárias para navegação básica.

3. **Renderizar personagem**
   - exibir o personagem principal no mapa;
   - garantir posicionamento consistente no espaço isométrico ortogonal.

4. **Mover personagem**
   - suportar input básico de movimentação;
   - atualizar posição, orientação e colisão mínima conforme necessário.

5. **Câmera seguir personagem**
   - manter o personagem enquadrado;
   - acompanhar deslocamento com comportamento simples e previsível.

## Critério de sucesso do Marco 1

O marco será considerado concluído quando um build Android permitir iniciar o jogo, entrar no mapa da ilha, ver o personagem, movê-lo e observar a câmera acompanhando sua movimentação.

## Itens explicitamente fora de escopo

Para evitar dispersão, os itens abaixo não fazem parte do Marco 1:

- rede e multiplayer;
- scripting avançado ou sistema de mods;
- editor interno de mapas, UI ou entidades;
- save system completo;
- inventário completo, crafting ou progressão ampla;
- IA complexa de NPCs;
- otimizações prematuras para múltiplas plataformas.

## Próximos passos após o Marco 1

Somente após validar esse slice inicial o projeto deve decidir a próxima prioridade, por exemplo:

- expansão do conteúdo jogável;
- melhorias na pipeline de assets;
- ferramentas internas pontuais;
- refinamento de arquitetura motivado por uso real.
