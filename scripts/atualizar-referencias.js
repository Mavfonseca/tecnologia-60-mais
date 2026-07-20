import fs from 'fs';
import path from 'path';

const PASTA_CONTEUDO = './src/content';

function processarPasta(pasta) {
  const arquivos = fs.readdirSync(pasta);
  for (const arquivo of arquivos) {
    const caminhoCompleto = path.join(pasta, arquivo);
    const stat = fs.statSync(caminhoCompleto);
    if (stat.isDirectory()) {
      processarPasta(caminhoCompleto);
      continue;
    }
    const ext = path.extname(arquivo).toLowerCase();
    if (ext !== '.md' && ext !== '.mdx') continue;
    let conteudo = fs.readFileSync(caminhoCompleto, 'utf-8');
    const original = conteudo;
    conteudo = conteudo.replace(/\/imagens\/([^\s"')]+)\.(jpg|jpeg|png)/gi, '/imagens/$1.webp');
    if (conteudo !== original) {
      fs.writeFileSync(caminhoCompleto, conteudo, 'utf-8');
      console.log(`Atualizado: ${caminhoCompleto}`);
    }
  }
}

processarPasta(PASTA_CONTEUDO);
console.log('Atualização de referências concluída.');
