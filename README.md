# PlayGold V6

PlayGold V6 é um projeto de cassino online proprietário, desenvolvido com backend e frontend próprios, focado em escalabilidade, controle de banca inteligente e integração de jogos baseados em engine real (JSON-based).

O projeto utiliza uma arquitetura modular que separa claramente:
- lógica de negócio
- controle de banca
- engine dos jogos
- camada de apresentação

Toda a lógica dos jogos é baseada em arquivos **.json**, preservando fidelidade às engines originais. A aplicação **não recria jogos manualmente em JavaScript**.

## Stack
- **Backend:** Node.js, Express, MongoDB
- **Frontend:** React 18, Vite
- **Autenticação:** JWT
- **Controle de versão:** Git / GitHub

## Status
🚧 Em desenvolvimento ativo.

## Como rodar o projeto

### Backend
```bash
cd backend
npm install
npm run dev
Frontend
bash
Copiar código
cd frontend
npm install
npm run dev
Observações Importantes
O controle de banca é centralizado e atua apenas no timing das rodadas, nunca alterando a lógica interna dos jogos.

Os jogos utilizam engines reais baseadas em JSON, mantendo probabilidades e RTP originais.

A documentação técnica detalhada, decisões de arquitetura e estado real do projeto são mantidos em arquivos de backup internos em TXT, utilizados para continuidade do desenvolvimento e coordenação com outras IAs.

© PlayGold — Todos os direitos reservados
