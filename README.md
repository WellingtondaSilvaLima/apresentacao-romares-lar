# Apresentação · Romares Academy 360°

Slides em HTML para apresentar o **Romares Academy 360°** à diretoria: a ideia por trás do sistema, os 14 módulos, o que já funciona hoje e as respostas às seis perguntas da gestão.

Site estático, sem build e sem dependências: HTML, CSS e JavaScript puros. A única coisa externa é a fonte Manrope, que vem do Google Fonts (sem internet, o navegador usa uma fonte do sistema).

## Como abrir

Abra o `index.html` no navegador (Chrome ou Edge, de preferência em tela cheia).

Para abrir direto num slide, use o número no endereço: `index.html#10` abre o slide 10. O endereço acompanha o slide atual.

## Atalhos

| Tecla | Ação |
|---|---|
| `→` `PageDown` `Espaço` `Enter` | Próximo slide |
| `←` `PageUp` `Backspace` | Slide anterior |
| `Home` / `End` | Primeiro / último slide |
| `F` | Tela cheia |
| `P` | Mostrar ou ocultar o apresentador |
| `?` ou `H` | Ajuda com os atalhos |

Também dá para navegar pelo mouse e pelo toque:

- Clique na tela para avançar. Um clique no quarto esquerdo da tela volta.
- No celular ou tablet, deslize para os lados.
- No slide 6, clique numa pergunta para ir direto à resposta dela.
- No slide 4, passe o mouse ou clique nos módulos para ver o detalhe de cada um.

## Roteiro (14 slides)

| # | Slide | Conteúdo |
|---|---|---|
| 1 | Capa | Academy 360° · apresentação à diretoria |
| 2 | Ponto de partida | A ideia do Victor e os três problemas: falta de padrão, pouco acompanhamento, conhecimento desigual |
| 3 | O que buscávamos | Menos erros, mais qualidade, evolução visível, mão de obra qualificada |
| 4 | Ecossistema 360° | Os 14 módulos, em órbita interativa, com o status de cada um |
| 5 | Onde estamos | 12 de 14 módulos funcionando, 2 pendentes e o que é novo |
| 6 | Divisor | As seis perguntas da diretoria |
| 7 | Pergunta 1 · Admissão | Quando o portal entra e como é o acesso (matrícula e senha calculada) |
| 8 | Pergunta 2 · Responsabilidades | Quem é responsável por cada parte: RH, gestor do contrato e síndico. Permissões dadas pelo administrador |
| 9 | Pergunta 3 · Não conclusão | O que o sistema garante e a régua de prazos proposta (D0, D+7, D+15, D+30) |
| 10 | Pergunta 4 · Trilhas | Base comum mais a trilha do cargo, ligada ao ERP |
| 11 | Pergunta 5 · Gamificação | O que o XP e o ranking valem e o que não valem |
| 12 | Pergunta 6 · Cliente | O que o síndico enxerga (exemplo ilustrativo) e por que isso pesa na venda |
| 13 | Decisões | Seis decisões pedidas à diretoria e o piloto sugerido |
| 14 | Encerramento | Resumo e agradecimento |

Nas respostas, as etiquetas mostram a situação de cada ponto: **JÁ FUNCIONA** (está no sistema hoje), **PROPOSTA** (depende de decisão da diretoria) e **PRÓXIMA ETAPA** (ainda vai ser desenvolvido).

## Estrutura

```
index.html        Todos os slides (cada <section class="slide"> é um slide)
css/style.css     Visual: cores da marca (azul-marinho, dourado e prata), layout e animações
js/app.js         Navegação, animações, órbita dos módulos e apresentador
assets/           Logo da Romares e fotos do apresentador (eu_1 a eu_4.jpg)
imagens/          Imagens de referência das posições do apresentador
base.txt          Texto-base: a visão do Victor para cada módulo e as seis perguntas
```

## Como editar

- **Textos dos slides:** no `index.html`. Os elementos com a classe `rv` entram com animação, na ordem em que aparecem.
- **Módulos do slide 4:** na lista `MOD`, no começo do `js/app.js`. Cada módulo tem ícone, nome, grupo, descrição, status e o texto "hoje". O status pode ser `disp` (em funcionamento), `parc` (parcial) ou `evol` (pendente).
- **Gráfico do slide 5:** se o número de módulos mudar, atualize no `index.html` o título, o `data-v` e o `data-o` dos segmentos (`.seg`), o contador (`data-to`) e as linhas ao lado.
- **Apresentador:** cada slide pode ter os atributos abaixo. Slide sem `data-eu` não mostra o apresentador.
  - `data-eu="1".."4"`: qual foto usar.
  - `data-at="hero|side|mini"`: posição e tamanho do apresentador.
  - `data-fala="..."`: o texto do balão.

## Mantendo em dia com o sistema

Os slides descrevem o estado real do repositório `RomaresAcademy360`. Quando entrar uma função nova lá, confira os slides 4, 5 e as perguntas relacionadas.

Última revisão: 22/11/2026. Inclui:

- trilha do cargo;
- reciclagem com prazo em meses;
- login do colaborador com matrícula;
- superusuário e permissões de acesso.
