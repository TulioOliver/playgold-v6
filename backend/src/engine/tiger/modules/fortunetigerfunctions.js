const fortunetigerfunctions = {

  getLose(aposta, perda, notcash) {
    return {
      totalGain: 0,
      tabela: perda,
      notcash
    };
  },

  getMiniWin(aposta, ganho, notcash) {
    const premio = ganho.min || 1;
    return {
      totalGain: aposta * premio,
      tabela: ganho,
      notcash
    };
  },

  getSmallWin(aposta, ganho, notcash) {
    const premio = ganho.win || 2;
    return {
      totalGain: aposta * premio,
      tabela: ganho,
      notcash
    };
  },

  getBigWin(aposta, ganho, bonus, notcash) {
    const premio = ganho.big || 10;
    return {
      totalGain: aposta * premio,
      tabela: ganho,
      bonus,
      notcash
    };
  },

  getUltraWin(aposta, ganho, bonus, notcash) {
    const premio = ganho.ultra || 50;
    return {
      totalGain: aposta * premio,
      tabela: ganho,
      bonus,
      notcash
    };
  }

};

export default fortunetigerfunctions;
