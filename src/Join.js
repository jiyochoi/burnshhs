import React from 'react';
import './Join.css';
import styled from 'styled-components';
import { getScore } from './api';

function Join ({onJoin}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget).entries());

        getScore(data.grade, data.class).then((score) => {
            onJoin({ ...data, score });
        })
    }
    return (
        <Overlay>
        <StyledForm onSubmit={handleSubmit}>
            <Content>
            <h1>시작하기 위해 반을 입력해주세요</h1>
            <h2>학년을 입력해주세요</h2>
            <select name="grade" id="grade">
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
            <h2>반을 입력해주세요</h2>
            <select name="class" id="class">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <h2>이름을 입력해주세요</h2>
            <input type="text" name="name" id="name" />
            </Content>
            <StartButton>시작하기</StartButton>
            </StyledForm>
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

const StyledForm = styled.form`
    width: fit-content;
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
    h2 {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    select {
        border-radius: 0.5rem;
        width: 50%;
        text-align: center;
        font-size: 1.5rem;
        line-height: 2rem;
        margin-bottom: 1rem;
        margin: 0.5rem;
    }
    input {
        border-radius: 0.5rem;
        font-family: 'CWDangamAsac';
        width: 50%;
        text-align: center;
        font-size: 1.5rem;
        line-height: 2rem;
        margin-bottom: 1rem;
        margin: 0.5rem;
    }
`;

const StartButton = styled.button`
    width: 30%;
    height: 3rem;
    border-radius: 1.5rem;
    background-color: #Ffc500;
    border: none;
    cursor: pointer;
    font-family: 'CWDangamAsac-Bold';
    font-size: 1.5rem;
    font-weight: bold;
    color: #FFFFFF;
    margin: 1rem;
    margin-bottom: 2rem;
`;


export default Join;
