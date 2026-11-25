# Modelo: site de personal trainer

Site de exemplo de um personal trainer autônomo fictício (Rafael Exemplo) para mostrar a clientes. Mesmas funções do modelo de arquitetura, mais a área de formação.

## Arquivos

- `index.html`: todos os textos e fotos do site
- `css/style.css`: cores, letras e layout (as cores ficam no começo, em `:root`)
- `js/main.js`: interações e os links do cliente

## Como adaptar para um cliente

1. **Links:** no começo de `js/main.js`, troque o `CONFIG`:
   - `whatsapp`: número com DDI e DDD, só números (ex.: `5541999998888`)
   - `instagram`: endereço do perfil
   - `google`: link para avaliar no Google (Perfil da Empresa → "Pedir avaliações")
2. **Textos:** troque nome, endereço, telefone, e-mail, serviços, etapas e perguntas no `index.html`.
3. **Fotos:** troque os endereços das imagens pelas fotos do cliente (de preferência em `.webp`, até 300 KB cada).
4. **Cores:** mude `--destaque` (verde-limão), `--escuro` e `--fundo` no começo do `style.css`.
6. **Planos:** troque os preços "R$ 000" pelos valores do cliente.
7. **CREF:** coloque o registro real do profissional (obrigatório para personal).
5. **Mapa:** troque o endereço no link do mapa, na seção Contato.

## O que tem

- Sobre mim em primeira pessoa, com foto, nome, CREF e assinatura
- Formação: linha do tempo (graduação, pós, especialização), cursos e cartão do CREF

- Carrossel no topo com transição suave e zoom nas fotos (Swiper.js)
- Números que sobem ao aparecer na tela
- Galeria com filtros, foto ampliada (setas, teclado e deslizar no celular)
- Comparador "antes × depois" que se arrasta (use só fotos de alunos com autorização por escrito)
- Avaliações em carrossel com os @ do Instagram e botões para comentar no Instagram e avaliar no Google
- Grade de fotos no estilo do Instagram
- Perguntas que abrem e fecham
- Formulário que abre o WhatsApp com a mensagem pronta
- Botão fixo do WhatsApp e menu de celular
- Respeita quem prefere menos movimento no celular/computador

## Publicar

Grátis no GitHub Pages ou Netlify (é só enviar a pasta). Domínio `.com.br` no registro.br.

## Fotos

As fotos do exemplo são do Unsplash (uso gratuito, inclusive comercial). Para clientes reais, use as fotos dos próprios projetos.
