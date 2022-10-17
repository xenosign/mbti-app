import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import OrangeButton from './OrangeButton';
import { reset } from '../store/modules/mbti';
import { useEffect } from 'react';

const Header = styled.p`
  font-size: 3em;
`;

const Explaination = styled.p`
  font-size: 1.5em;
  color: #777;
`;

const Result = styled.p`
  font-size: 3em;
  color: dodgerblue;
`;

const Addtional = styled.p`
  font-size: 2em;
  color: orange;
`;

const AddtionalImg = styled.img`
  width: 500px;
  transform: translateX(-35px);
`;

export default function Show() {
  const result = useSelector((state) => state.mbti.mbtiResult);
  const explanation = useSelector((state) => state.mbti.explanation[result]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function sendData() {
      const resInc = await fetch('http://localhost:3001/mongo/inccount', {
        method: 'POST',
      });
      if (resInc.status === 200) {
        console.log(await resInc.json());
      } else {
        throw new Error('통신 이상');
      }
    }
    sendData();
  }, []);

  return (
    <>
      <Header>당신의 개발자 MBTI 결과는?</Header>
      <Explaination>{explanation.text}</Explaination>
      <Result>{result}</Result>
      <Addtional>이건 재미로 읽어 보세요!</Addtional>
      <AddtionalImg src={explanation.img} alt="MBTI 팩폭" />
      <OrangeButton text="다시 검사하기" clickEvent={() => dispatch(reset())} />
    </>
  );
}
