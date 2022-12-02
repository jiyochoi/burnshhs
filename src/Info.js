import styled from 'styled-components'

function Info ({onClose}) {
    const handleClose = () => {
        onClose();
    }
    return (
        <Overlay>
            <InfoWrap>
                <Content>
                    <h1>서현고를 폭파하다</h1>
                    <p>
                    <br/>개발 : 최지요
                    <br/>디자인 : 최지요
                    <br/>음악 : 최진호
                    <br/>목소리 제공: 김선우, 김주하, 박민하, 최지요
                    <br/>제작 도움: SHIC 파이썬 부원들
                    <br/> <a href = "https://github.com/RanolP">제작 도움 : 임상원</a>
                    </p>
                    <h1>그렇다</h1>
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
    p {
        width: 100%;
        font-size: 1.5rem;
        line-height: 2rem;
        margin-bottom: 1rem;
        margin: 0.5rem;
    }
`;

const CloseButton = styled.button`
    width: 12rem;
    height: 3rem;
    border-radius: 1.5rem;
    background-color: #Ffc500;
    border: none;
    cursor: pointer;
    font-family: 'CWDangamAsac-Bold';
    font-size: 1.5rem;
    font-weight: bold;
    color: #FFFFFF;
`;

export default Info;
