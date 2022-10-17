import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import OrangeButton from './OrangeButton';
import { next, init } from './../store/modules/mbti';
import { useEffect, useState } from 'react';

const Header = styled.p`
  font-size: 3em;
`;

const MainImg = styled.img`
  width: inherit;
`;

const SubHeader = styled.p`
  font-size: 1.5em;
  color: #777;
`;

export default function Start() {
  const [counts, setCounts] = useState(0);
  const dispatch = useDispatch();

  function makeData(survey, explanation) {
    const initData = { survey: [], explanation: {} };
    if (initData.survey.length === 0) {
      for (let i = 0; i < survey.length; i = i + 2) {
        initData.survey.push({
          question: survey[i].QUESTION_TEXT,
          answer: [
            {
              text: survey[i].ANSWER_TEXT,
              result: survey[i].RESULT,
            },
            {
              text: survey[i + 1].ANSWER_TEXT,
              result: survey[i + 1].RESULT,
            },
          ],
        });
      }
    }

    for (let i = 0; i < explanation.length; i++) {
      initData.explanation[explanation[i].MBTI_TYPE] = {
        explanation: explanation[i].EXPLANATION,
        img: explanation[i].IMG_SRC,
      };
    }

    return initData;
  }

  async function sqlFetchData() {
    // Counts 값 받아오기
    const resCount = await fetch('http://localhost:3001/data/counts');
    if (resCount.status === 200) {
      const num = await resCount.json();
      if (num[0].counts !== 0) setCounts(num[0].counts);
    } else {
      throw new Error('통신 이상');
    }

    // survey 값 받아오기
    const resSurvey = await fetch('http://localhost:3001/data/survey');
    if (resSurvey.status === 200) {
      const surveyData = await resSurvey.json();
      // explanation 값 받아오기
      const resExplanation = await fetch(
        'http://localhost:3001/data/explanation'
      );
      if (resExplanation.status === 200) {
        const explanationData = await resExplanation.json();
        const madeData = makeData(surveyData, explanationData);
        dispatch(init(madeData));
      } else {
        throw new Error('통신 이상');
      }
    } else {
      throw new Error('통신 이상');
    }
  }

  async function mongoFetchData() {
    const resCount = await fetch('http://localhost:3001/mongo/count');
    if (resCount.status === 200) {
      const num = await resCount.json();
      if (num[0].counts !== 0) setCounts(num[0].counts);
    } else {
      throw new Error('통신 이상');
    }

    // 설문 전체 데이터 받아오기
    const resData = await fetch('http://localhost:3001/mongo/getdata');
    if (resData.status === 200) {
      const data = await resData.json();
      if (data[0].survey.length !== 0) {
        dispatch(init(data[0]));
      }
    } else {
      throw new Error('통신 이상');
    }
  }

  useEffect(() => {
    mongoFetchData();
    // sqlFetchData();
  }, []);

  return (
    <>
      <Header>개발자 MBTI 조사</Header>
      <MainImg src="/images/main.jpg" alt="메인 이미지" />
      <SubHeader>
        개발자가 흔히 접하는 상황에 따라서 MBTI를 알아 봅시다!{'\n\n'}
        지금까지 {counts} 명이 참여해 주셨습니다!
      </SubHeader>
      <OrangeButton text="테스트 시작" clickEvent={() => dispatch(next())} />
    </>
  );
}
