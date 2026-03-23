# Stack técnica principal

## Objetivo inicial

A engine será desenvolvida com foco inicial em **Android**, sem perder de vista a necessidade de **suporte futuro a desktop**. A arquitetura e as decisões técnicas devem favorecer portabilidade desde o começo, mesmo que a primeira entrega prática seja concentrada no ecossistema Android.

## Linguagem principal da engine

A linguagem principal da engine será **C++20**.

Essa escolha concentra a maior parte da lógica da engine em uma base de código nativa, com foco em desempenho, controle de memória, portabilidade e reutilização entre plataformas. O código central de runtime, sistemas de rendering, áudio, input, asset management e demais subsistemas da engine deve permanecer prioritariamente em C++.

## Camada de plataforma

A camada de plataforma principal será **SDL3**.

O SDL3 será responsável por fornecer a base de:

- criação e gerenciamento de janelas;
- tratamento de input;
- áudio;
- integração multiplataforma;
- abstrações de tempo, eventos e ciclo de aplicação conforme necessário.

Essa decisão reduz a quantidade de código específico por plataforma e ajuda a preservar uma interface de plataforma consistente entre Android e futuras versões desktop.

## Backend gráfico inicial

O backend gráfico inicial no Android será **OpenGL ES 3.0**.

Essa será a primeira API gráfica suportada pela engine durante a fase inicial de implementação no Android. A escolha deve orientar a camada de rendering, shaders, inicialização gráfica e organização dos recursos visuais no curto prazo.

Mesmo com esse foco inicial, a arquitetura de rendering deve ser organizada para permitir evolução posterior para outros backends, caso o roadmap venha a exigir isso.

## Build e empacotamento

O sistema de build principal da engine será **CMake**.

O CMake deve ser usado para organizar:

- targets da engine;
- bibliotecas e dependências nativas;
- configuração de builds por plataforma;
- integração com toolchains nativas.

Para o empacotamento Android, o plano é utilizar **Gradle + Android NDK**.

Nesse modelo:

- o **CMake** compila a engine e os módulos nativos;
- o **Android NDK** fornece o toolchain e a integração nativa para Android;
- o **Gradle** gerencia o projeto Android e o empacotamento final do APK.

## Estrutura reservada para Android

O diretório **`platform/android/`** ficará reservado para o bootstrap mínimo de Android em **Kotlin/JNI**.

A intenção é manter nessa área apenas o necessário para:

- inicialização da aplicação Android;
- integração com ciclo de vida da plataforma;
- ponte JNI mínima entre a camada Android e a engine nativa;
- configuração específica exigida pelo empacotamento do APK.

Quase toda a lógica da engine deve permanecer no código **C++**, evitando deslocar regras de negócio, sistemas centrais ou comportamento de runtime para o lado Kotlin.

## Diretriz de portabilidade

Desde já, fica definido que a engine deve ser projetada para **compilar tanto para Android quanto para desktop futuramente**.

Mesmo que o primeiro alvo de implementação seja apenas Android, as decisões de organização de código, separação entre core e plataforma, abstrações de janela/input/rendering e fluxo de build devem evitar acoplamentos desnecessários com uma única plataforma.

## Resumo das decisões

- **Linguagem principal da engine:** C++20;
- **Camada de plataforma:** SDL3;
- **Backend gráfico inicial no Android:** OpenGL ES 3.0;
- **Build da engine:** CMake;
- **Empacotamento Android:** Gradle + Android NDK;
- **Bootstrap Android:** `platform/android/` com Kotlin/JNI mínimo;
- **Diretriz arquitetural:** base preparada para Android agora e desktop no futuro.
