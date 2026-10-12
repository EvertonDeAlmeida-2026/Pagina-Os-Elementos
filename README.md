
# Pagina Os Elementos

Projeto voltado a criar e apresentar a pagina sobre o jogo Os Elementos.

Os arquivos fonte do site são `index.html`, `wishlist.html` e as pastas
`css/`, `js/` e `assets/` na raiz do projeto. Edite esses arquivos.

Para publicar, execute na raiz:

```sh
npx wrangler deploy
```

O Wrangler recria automaticamente `public/` com os arquivos fonte antes de
publicar, removendo a versão anterior dessa pasta. `public/` é uma pasta gerada;
não edite seus arquivos diretamente. O deploy substitui a versão do Worker
`pagina-os-elementos` existente.

Para testar localmente, execute `npm run preview`. Para apenas gerar os arquivos
de publicação, execute `npm run build`.

A wishlist envia nome e e-mail para a equipe pelo Cloudflare Email Service,
usando o mesmo remetente e destinatários do site Procics. As inscrições ficam
nos e-mails recebidos; não há banco de dados nem avisos automáticos de lançamento.
O sucesso só aparece após o serviço aceitar o envio. É necessário publicar na
mesma conta Cloudflare em que o domínio de envio da Procics está habilitado.
Para verificar a integração sem enviar e-mails: `node --test scripts/wishlist.test.mjs`.

