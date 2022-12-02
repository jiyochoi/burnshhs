import { render } from '@testing-library/react';
import { CSSTransition } from 'react-transition-group'
import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import gunSound from './snd/gun2.mp3';
import backgroundSound from './snd/jyo.mp3';
import Join from './Join';
import Info from './Info';
import Ranking from './Ranking';
import { getScore, addScore } from './api';
import { debounce } from 'lodash';

const bgm = new Audio(backgroundSound);

function App() {
  
  const getImg = () => {
    return "img/hakgyo.png";
  }

  const nodeRef = React.useRef(null);

  const [click, setClick] = useState(0);

  const [clickState, setClickState] = useState(false);

  const [bgmState, setBgmState] = useState(true);

  const [hakgyoImg, setHakgyoImg] = useState(getImg);

  const [audioImg, setAudioImg] = useState("img/audio_on.png");
  const [isJoin, setIsJoin] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [isRank, setIsRank] = useState(false);
  const [player, setPlayer] = useState(null);
  const [classScore, setClassScore] = useState(0);

  const onClickInfo = () => {
    setIsInfo(true);
  }
  const onClickRank = () => {
    setIsRank(true);
  }

  const syncClassScore = async () => {
    setClassScore(await getScore(player.grade, player.class));
  }

  const uploadClicks = useCallback(debounce(async (player, click) => {
    await addScore(player.grade, player.class, click);
    await syncClassScore();
    setClick(0);
  }, 2000), []);
/*
  const useAudio = () => {
    const [loaded, setLoaded] = useState(0);

    useEffect(() => {
      //AudioContext 생성
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();

      //AudioContext를 통해 AudioBufferSourceNode 생성
      const fromis9 = [];

      fromis9.push(
        new Promise(async(resolve) => {
          //오디오 파일 로드
          const res = await fetch("snd/gun2.mp3");
          //arrayBuffer로 이진 데이터로 변환
          const arrayBuffer = await res.ArrayBuffer;
          //AudioContext를 통해 AudioBuffer 생성
          const audioBuffer = await AudioContext.decodeAudioData(arrayBuffer);
          //AudioBufferSourceNode 생성
          const AudioBufferSourceNode = await audioContext.createBufferSource();
          
          //AudioBufferSourceNode에 AudioBuffer 연결
          AudioBufferSourceNode.buffer = audioBuffer;
          //스피커에 연결
          AudioBufferSourceNode.connect(audioContext.destination);

          AudioBufferSourceNode.start();

          resolve();
        })
      );

      Promise.all(fromis9).then(() => {
        setLoaded(true);
      })
    });

    return{
      loaded,
      audios
    };
  }
*/
  const audio = new Audio(gunSound);
  audio.loop = false;
  audio.volume = 0.5;

  bgm.loop = true;
  bgm.volume = 0.3;

  const toggleBackgroundMusic = () => setBgmState(old => !old);
  
  useEffect(() => {
    if (bgmState) {
      bgm.play();
      setAudioImg("img/audio_on.png");
    } else{
      bgm.pause();
      bgm.currentTime = 0;
      setAudioImg("img/audio_off.png");
    }
  }, [bgmState])
  
  const StartClick = () => {
    if (!isJoin || isInfo) return;
    setClick(click + 1);
    setClickState(false);
    setHakgyoImg("img/hakgyoboom.png");
    audio.play();
  }

  const endClick = () => {
    if (!isJoin || isInfo) return;
    setClickState(true);
    setHakgyoImg(getImg);
    uploadClicks(player, click);
  }

  return(
    <div onPointerDown={StartClick} onPointerUp={endClick} onLostPointerCapture={endClick}>
          <div className="App">
            {
              !isJoin 
              ? (
                <Join
                  open={!isJoin}
                  onJoin={({ score, ...playerData }) => {
                    setPlayer(playerData);
                    setClassScore(score);
                    setIsJoin(true);
                  }}
                />)
              : `${player.class}-${player.grade} ${player.name}`
            }
          </div>
      <h1>BURN SeoHyunHighSchool</h1>
      <div class = "states">
        <img id = "audiostate" src = {audioImg} onClick={toggleBackgroundMusic} />
        <div>
          <img id = "rank" src = "img/rank.png" onClick={onClickRank}/>
          {isRank && (<Ranking
            open={isRank}
            onClose={() => {
              setIsRank(false);
            }}
          />)}
          </div>
        <div>
          <img id = "info" src = "img/info.png" onClick={onClickInfo}/>
          {isInfo && (<Info
            open={isInfo}
            onClose={() => {
              setIsInfo(false);
            }}
          />)}
          </div>
      </div>
      <CSSTransition
        nodeRef={nodeRef}
        in={clickState}
        timeout={30}
        classNames="hakgyo"
        onEnter={()=>{setHakgyoImg("img/hakgyo.png");}}
        onExited={()=>{setHakgyoImg("img/hakgyoboom.png");}}
        >
        <div className="count">{click + classScore}</div>
      </CSSTransition>
      <img class="hakgyo" src={hakgyoImg} />
    </div>
  );
}

export default App;
