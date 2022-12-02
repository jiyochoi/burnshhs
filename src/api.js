const BASEPATH = 'https://hakgyosireo.p-e.kr/api'

export async function getScore(grade, clazz) {
  const resp = await fetch(BASEPATH + `/score/${grade}/${clazz}`, { mode: 'cors' });
  const respJson = await resp.json();

  if (!respJson.success) {
    return 0;
  } else {
    return respJson.score;
  }
}

export async function addScore(grade, clazz, score) {
  const resp = await fetch(BASEPATH + `/score/${grade}/${clazz}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ score })
  });
  const respJson = await resp.json();

  if (!respJson.success) {
    return false;
  } else {
    return true;
  }
}

export async function getRanking() {
  const resp = await fetch(BASEPATH + '/score/rank');
  const respJson = await resp.json();

  if (!respJson.success) {
    return [];
  } else {
    return respJson.scores;
  }
}
