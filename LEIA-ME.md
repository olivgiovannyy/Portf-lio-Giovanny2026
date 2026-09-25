# Portfólio do Giovanny

HTML, CSS e JavaScript puro. Não precisa instalar pacotes nem compilar.

## Abrir
1. Extraia o ZIP.
2. No VS Code, clique em Arquivo > Abrir Pasta e selecione a pasta extraída.
3. Abra index.html no navegador. Se preferir, use a extensão Live Server do VS Code.

## Colocar sua foto
Sua foto já está incluída. Para trocar, salve outra foto vertical em formato PNG com o nome foto-giovanny.png dentro da pasta assets.
O site substitui automaticamente o cartão de iniciais pela foto quando ela existe.
Ajuste object-position em .portrait img no style.css se precisar mudar o enquadramento.

## Editar informações e links
Abra index.html. Cada seção tem seu próprio id: inicio, sobre, trajetoria, projetos, conhecimentos e contato.
Os contatos reais já estão cadastrados. Para trocar o e-mail, altere também a constante email em script.js.

## Cadastrar projetos
No início de script.js, edite o array projetos. Cada objeto tem:
- titulo: nome do projeto;
- categoria: Front-end, Python ou Dados;
- descricao: explicação curta;
- tecnologias: lista de tecnologias;
- imagem: caminho da imagem, por exemplo assets/meu-projeto.jpg;
- demo: endereço completo da demonstração, começando com https://;
- codigo: endereço completo do repositório;
- simbolo: texto mostrado caso não tenha imagem;
- placeholder: mude para false quando cadastrar um projeto real.

Os três cards mostram seus projetos Monte Sião, ISAH e Clareza. Os links fornecidos abrem as demonstrações em outra aba. Os botões de código aparecerão quando você preencher as URLs dos repositórios.
Os botões só ficam ativos quando você adicionar URLs válidas. Duplique um objeto para adicionar outro projeto.

## Cores e animação
A paleta Homem-Aranha está no último :root de style.css: azul-marinho, vermelho #df1f2d, vermelho escuro #b11313, azul #2b3784 e azul #447bbe. A fonte de todo o site é Arial, sem serifa e sem itálico.
A teia de aranha com raios e fios curvos é desenhada em canvas em toda a página. Ela se move continuamente e reage ao mouse e à rolagem. O botão no canto inferior permite pausar o movimento.
Os ícones estão na pasta assets/icons e funcionam offline. SQL usa um símbolo genérico de banco de dados e o Illustrator usa a imagem fornecida por você. O código funciona sem bibliotecas externas. Estatísticas do GitHub dependem de um serviço externo e mostram uma mensagem alternativa em caso de falha.
As animações respeitam a preferência por movimento reduzido do dispositivo.

## Conteúdo
Baseado no README fornecido. A marcação educacional de 2024 foi preservada sem atribuir uma data de conclusão não confirmada.
O site informa que você busca estágio em TI; não apresenta estágio como cargo atual.
