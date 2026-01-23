import fortunetigerfunctions from "./modules/fortunetigerfunctions.js";
import linhaganhotiger from "./modules/linhaganhotiger.js";
import linhaperdatiger from "./modules/linhaperdatiger.js";
import linhabonustiger from "./modules/linhabonustiger.js";
import notcashtiger from "./modules/notcashtiger.js";

// ============================================================
// GERADOR OFICIAL DE SPIN DO FORTUNE TIGER REAL
// ADAPTADO PARA O PLAYGOLD V6
// ============================================================
//
// tipoRodada → "dead" | "mini" | "win" | "big" | "ultra"
//
// A engine oficial recebe:
// - aposta base (cs)
// - multiplicador (ml)
// - tipo da rodada (tipoRodada)
// ============================================================

export default async function gerarSpinOriginal(cs, ml, tipoRodada = "dead") {
  
  // FUNÇÕES NATIVAS DO TIGER REAL
  const f = fortunetigerfunctions;

  // define aposta final
  const apostaFinal = cs * ml * 5;

  // gerador do Tiger
  const gerador = {
    dead() {
      return f.getLose(
        apostaFinal,
        linhaperdatiger,
        notcashtiger
      );
    },

    mini() {
      return f.getMiniWin(
        apostaFinal,
        linhaganhotiger,
        notcashtiger
      );
    },

    win() {
      return f.getSmallWin(
        apostaFinal,
        linhaganhotiger,
        notcashtiger
      );
    },

    big() {
      return f.getBigWin(
        apostaFinal,
        linhaganhotiger,
        linhabonustiger,
        notcashtiger
      );
    },

    ultra() {
      return f.getUltraWin(
        apostaFinal,
        linhaganhotiger,
        linhabonustiger,
        notcashtiger
      );
    }
  };

  // executa
  const result = gerador[tipoRodada]
    ? gerador[tipoRodada]()
    : gerador["dead"]();

  // retorno padronizado
  return {
    tipoRodada,
    aposta: apostaFinal,
    ...result
  };
}
