export default {

  // ============================
  // MODO DE OPERAÇÃO
  // ============================
  // auto     → sistema toma decisões sozinho
  // manual   → você define porcentagens e meta
  // hibrido  → sistema ajusta mas respeita suas configs
  modoOperacao: "auto",

  // ============================
  // CONFIGURAÇÃO MANUAL (SE MODO = MANUAL)
  // ============================
  porcentagens: {
    dead: 70,
    mini: 20,
    win: 8,
    big: 1.5,
    ultra: 0.5,
  },

  // ============================
  // CONTROLES INDIVIDUAIS
  // ============================
  controleBig: true,             // controla quando o BIG pode sair
  controleUltra: true,           // controla quando o ULTRA pode sair
  distribuirVitorias: true,      // evita todos os ganhos indo para 1 jogador
  liberarBigGradual: true,       // BIG só libera quando seguro
  liberarUltraGradual: true,     // ULTRA só sai no timing certo
  cooldown: true,                // jogador que ganhou demais entra em espera
  antiExplosao: true,            // previne sequência anormal de ganhos
  protegerJogadorNovo: true,     // aumenta win no início do jogador (se quiser)
  protegerBanca: true,           // ativa proteção automática da banca

  // ============================
  // META DIÁRIA
  // ============================
  usarMetaDiaria: true,          // ativa o sistema de meta
  metaDiaria: 5000,              // meta manual (usada no modo manual)
  metaAutoMultiplicador: 3,      // lucro alvo baseado nos últimos dias

  // ============================
  // AJUSTES DINÂMICOS (USADOS NO MODO AUTO)
  // ============================
  ajusteAutomatico: {
    aumentarDeadQuandoPerder: true,  // se a banca perde demais
    aumentarMiniQuandoMuitaDead: true,
    aumentarWinQuandoTráfegoAlto: true,
    liberarBigQuandoBancaAlta: true,
    bloquearUltraSeMetaProxima: true,
    reduzirGanhosSequenciais: true,
  },

  // ============================
  // LIMITES E SEGURANÇAS
  // ============================
  limites: {
    maxUltraPorHora: 1,
    maxBigPorHora: 3,
    maxWinSeguidos: 5,
    maxPerdasSeguidasPermitidas: 15,

    limitePagamentoHora: 3000,   // máximo que a banca paga por hora
    limitePagamentoDia: 20000,   // máximo que a banca paga por dia
  },

  // ============================
  // VARIÁVEIS OPERACIONAIS (SISTEMA ATUALIZA)
  // ============================
  operacao: {
    totalPagoHoje: 0,
    totalGanhoHoje: 0,
    horaAtual: null,
    ultimosBigs: [],
    ultimosUltras: [],
    cooldownJogadores: {},
  },
};
