import controleDeBanca from "./controleDeBanca.js";
import engineTigerReal from "./tiger/engineTigerReal.js";

// -------------------------------------------
// util
// -------------------------------------------
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function escolherTipoRodadaManual(p = {}) {
  const dead = Number(p.dead ?? 0);
  const mini = Number(p.mini ?? 0);
  const win = Number(p.win ?? 0);
  const big = Number(p.big ?? 0);
  const ultra = Number(p.ultra ?? 0);

  const total = dead + mini + win + big + ultra;

  // se porcentagens não estão configuradas, cai em dead
  if (!total || total <= 0) return "dead";

  const n = rand(0, total);

  if (n < dead) return "dead";
  if (n < dead + mini) return "mini";
  if (n < dead + mini + win) return "win";
  if (n < dead + mini + win + big) return "big";
  return "ultra";
}

async function rodarSpin(apostaBase, multiplicador, tipo) {
  const spin = await engineTigerReal.executeSpin({
    bet: apostaBase,
    multiplier: multiplicador,
    roundType: tipo
  });

  // padroniza retorno esperado pelo controller (resultado.tipo e resultado.totalGain etc)
  return {
    tipo,
    ...spin
  };
}

// -------------------------------------------
// ENGINE HÍBRIDA (TIGER + BANCA PLAYGOLD)
// -------------------------------------------
export default async function engineHibridaTiger(user, apostaBase, multiplicador) {
  const c = controleDeBanca;

  const modo = c?.modoOperacao ?? "auto";

  // 1) MANUAL
  if (modo === "manual") {
    const tipo = escolherTipoRodadaManual(c?.porcentagens);
    return await rodarSpin(apostaBase, multiplicador, tipo);
  }

  // 2) AUTO
  if (modo === "auto") {
    const operacao = c?.operacao ?? {};
    const limites = c?.limites ?? {};

    const usarMetaDiaria = Boolean(c?.usarMetaDiaria);
    const metaDiaria = Number(c?.metaDiaria ?? 0);

    const totalPagoHoje = Number(operacao.totalPagoHoje ?? 0);
    const totalGanhoHoje = Number(operacao.totalGanhoHoje ?? 0);

    // Proteção: perto/atingiu meta → segura
    if (usarMetaDiaria && metaDiaria > 0 && totalPagoHoje >= metaDiaria) {
      return await rodarSpin(apostaBase, multiplicador, "dead");
    }

    // Proteção: bigs demais
    const ultimosBigs = Array.isArray(operacao.ultimosBigs) ? operacao.ultimosBigs : [];
    if (c?.controleBig && ultimosBigs.length >= Number(limites.maxBigPorHora ?? 999999)) {
      return await rodarSpin(apostaBase, multiplicador, "dead");
    }

    // Proteção: ultras demais
    const ultimosUltras = Array.isArray(operacao.ultimosUltras) ? operacao.ultimosUltras : [];
    if (c?.controleUltra && ultimosUltras.length >= Number(limites.maxUltraPorHora ?? 999999)) {
      return await rodarSpin(apostaBase, multiplicador, "dead");
    }

    // Proteção: cooldown por jogador
    const cooldownJogadores = operacao?.cooldownJogadores ?? {};
    if (c?.cooldown && user?._id && cooldownJogadores?.[String(user._id)]) {
      return await rodarSpin(apostaBase, multiplicador, "dead");
    }

    // lógica base
    const lucroHoje = totalGanhoHoje - totalPagoHoje;

    let tipo = "dead";

    if (metaDiaria > 0) {
      if (lucroHoje < 0) tipo = "dead";
      else if (lucroHoje < metaDiaria * 0.5) tipo = "mini";
      else if (lucroHoje < metaDiaria * 0.9) tipo = "win";
      else tipo = "dead";
    } else {
      // se não tem meta configurada, fica conservador
      tipo = "mini";
    }

    // liberação gradual
    if (c?.liberarBigGradual && rand(0, 100) < 1) tipo = "big";
    if (c?.liberarUltraGradual && rand(0, 100) < 0.3) tipo = "ultra";

    return await rodarSpin(apostaBase, multiplicador, tipo);
  }

  // 3) HÍBRIDO
  if (modo === "hibrido") {
    const usarManual = Math.random() < 0.5;
    const tipo = usarManual ? escolherTipoRodadaManual(c?.porcentagens) : "dead";
    return await rodarSpin(apostaBase, multiplicador, tipo);
  }

  // fallback
  return await rodarSpin(apostaBase, multiplicador, "dead");
}
