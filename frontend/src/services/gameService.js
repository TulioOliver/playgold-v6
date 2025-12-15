import api from "./http";

const gameService = {
  async playTiger(bet) {
    const res = await api.post("/games/fortune-tiger/play", { bet: Number(bet) });
    return res.data;
  },
};

export default gameService;
