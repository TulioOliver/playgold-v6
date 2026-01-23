import http from './http';

async function playFortuneTiger(payload) {
  const response = await http.post(
    '/games/fortune-tiger/play',
    payload
  );
  return response.data;
}

export default {
  playFortuneTiger
};
