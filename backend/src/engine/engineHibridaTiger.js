import controleDeBanca from "./controleDeBanca.js";
import gerarSpinOriginal from "./tiger/fortunetiger.js"; 
// esta função será a ponte para a engine real que você enviou

//-------------------------------------------
// UTILITÁRIOS
//-------------------------------------------
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function escolherTipoRodadaManual(p) {
  const n = rand(0, 100);

  if (n < p.dead) return "dead";
  if (n < p.dead + p.mini) return "mini";
  if (n < p.dead + p.mini + p.win) return "win";
  if (n < p.dead + p.mini + p.win + p.big) return "big";
  return "ultra";
}

//-------------------------------------------
// ENGINE HÍBRIDA (TIGER + BANCA PLAYGOLD)
//-------------------------------------------
export default async function engineHibridaTiger(user, apostaBase, multiplicador) {
  const c = controleDeBanca;

  //-------------------------------------------
  // 1. MODO MANUAL
  //-------------------------------------------
  if (c.modoOperacao === "manual") {
    const tipo = escolherTipoRodadaManual(c.porcentagens);
    const resultadoOriginal = await gerarSpinOriginal(apostaBase, multiplicador, tipo);

    return {
      tipo,
      ...resultadoOriginal
    };
  }

  //-------------------------------------------
  // 2. MODO AUTOMÁTICO
  //-------------------------------------------
  if (c.modoOperacao === "auto") {

    // Proteção: banca próxima da meta
    if (c.usarMetaDiaria && c.operacao.totalPagoHoje >= c.metaDiaria) {
      return await gerarSpinOriginal(apostaBase, multiplicador, "dead");
    }

    // Proteção: bigs demais na hora
    if (c.controleBig && c.operacao.ultimosBigs.length >= c.limites.maxBigPorHora) {
      return await gerarSpinOriginal(apostaBase, multiplicador, "dead");
    }

    // Proteção: ultras demais
    if (c.controleUltra && c.operacao.ultimosUltras.length >= c.limites.maxUltraPorHora) {
      return await gerarSpinOriginal(apostaBase, multiplicador, "dead");
    }

    // Jogador em cooldown (ganhou demais recentemente)
    if (c.cooldown && c.operacao.cooldownJogadores[user._id]) {
      return await gerarSpinOriginal(apostaBase, multiplicador, "dead");
    }

    // LOGICA AUTOMÁTICA BASEADA NO DESEMPENHO DA BANCA
    const lucroHoje = c.operacao.totalGanhoHoje - c.operacao.totalPagoHoje;

    let tipo;

    if (lucroHoje < 0) {
      tipo = "dead"; // banca perdeu → segura
    } else if (lucroHoje < c.metaDiaria * 0.5) {
      tipo = "mini"; // banca indo bem → mini
    } else if (lucroHoje < c.metaDiaria * 0.9) {
      tipo = "win";  // banca saudável → win
    } else {
      tipo = "dead"; // perto da meta → segura
    }

    // Liberação gradual do BIG / ULTRA
    if (c.liberarBigGradual && rand(0,100) < 1) tipo = "big";
    if (c.liberarUltraGradual && rand(0,100) < 0.3) tipo = "ultra";

    const resultadoOriginal = await gerarSpinOriginal(apostaBase, multiplicador, tipo);

    return {
      tipo,
      ...resultadoOriginal
    };
  }

  //-------------------------------------------
  // 3. MODO HÍBRIDO
  //-------------------------------------------
  if (c.modoOperacao === "hibrido") {
    // 50% automático + 50% manual
    const usarAuto = Math.random() < 0.5;

    let tipo = usarAuto
      ? escolherTipoRodadaManual(c.porcentagens)
      : "dead";

    const resultadoOriginal = await gerarSpinOriginal(apostaBase, multiplicador, tipo);

    return {
      tipo,
      ...resultadoOriginal
    };
  }

  //-------------------------------------------
  // fallback
  //-------------------------------------------
  const resultadoOriginal = await gerarSpinOriginal(apostaBase, multiplicador, "dead");
  return {
    tipo: "dead",
    ...resultadoOriginal
  };
}
