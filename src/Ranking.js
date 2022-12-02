import styled from 'styled-components'
import { getRanking } from './api';
import { useState, useEffect } from 'react'

function Ranking({onClose}) {
    const [ranking, setRanking] = useState(null);

    useEffect(() => {
      getRanking().then(setRanking);
    }, []);

    const handleClose = () => {
        onClose();
    }
    return (
        <Overlay>
            <InfoWrap>
                <Content>
                    <h1>서현고 폭파 랭킹</h1>
                    {
                      ranking ? (
                        <ol>

                       { ranking.map(({ grade, class: clazz, score }) => (
                        <li>
                          {grade}학년 {clazz}반 {score}점
                        </li>
                        ))}
                        </ol>
                      )
                      : <p>불러오는 중...</p>
                    }
                    <CloseButton onClick={handleClose}>그렇군요!</CloseButton>
                </Content>
            </InfoWrap>
        </Overlay>
    );
}

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
`;

const InfoWrap = styled.div`
    width: 70vw;
    height: fit-content;
    border-radius: 1rem;
    background-color: #FFFFFF;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Content = styled.div`
    margin: 2rem;
    text-align: center;
    word-break: keep-all;
    h1 {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }
    li, p {
        width: 100%;
        font-size: 1.5rem;
        line-height: 2rem;
        margin-bottom: 1rem;
        margin: 0.5rem;
    }
`;

const CloseButton = styled.button`
    width: i-fit;
    height: 2rem;
    border-radius: 1rem;
    background-color: #F2F0EF;
    border: none;
    cursor: pointer;
    i {
        font-family: CWDangamAsac-Bold;
        font-size: 2rem;
        font-weight: bold;
        color: #F2F0EF;
    }
`;

export default Ranking;
