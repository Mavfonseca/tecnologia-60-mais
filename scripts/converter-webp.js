import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PASTA_IMAGENS = './public/imagens';
const QUALIDADE = 80;

async function converterPasta(pasta) {
  const arquivos = fs.readdirSync(pasta);
  for (const arquivo of arquivos) {
    const caminhoCompleto = path.join(pasta, arquivo);
    const stat = fs.statSync(caminhoCompleto);
    if (stat.isDirectory()) {
      await converterPasta(caminhoCompleto);
      continue;
    }
    const ext = path.extname(arquivo).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') continue;
    const nomeBase = path.basename(arquivo, ext);
    const saida = path.join(pasta, `${nomeBase}.webp`);
    if (fs.existsSync(saida)) {
      console.log(`Já existe, pulando: ${saida}`);
      continue;
    }
    await sharp(caminhoCompleto).webp({ quality: QUALIDADE }).toFile(saida);
    fs.unlinkSync(caminhoCompleto);
    console.log(`Convertido e original apagado: ${arquivo} → ${nomeBase}.webp`);
  }
}

converterPasta(PASTA_IMAGENS)
  .then(() => console.log('Conversão concluída.'))
  .catch((err) => console.error('Erro na conversão:', err));
