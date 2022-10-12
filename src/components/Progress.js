import styled from 'styled-components';

const MyProgress = styled.div`
  margin-top: 3em;
`;

const Fill = styled.div`
  width: 100%;
  height: 0.75em;
  background-color: #777;
  margin-top: 1em;
  text-align: left;
`;

const Gauge = styled.div`
  display: inline-block;
  height: inherit;
  position: relative;
  background-color: skyblue;
  width: ${(props) => props.percent}%;
  top: -2px;
`;

export default function Progress({ page, maxPage }) {
  return (
    <MyProgress>
      <div>
        {page} / {maxPage}
      </div>
      <Fill>
        <Gauge percent={(page / maxPage) * 100} />
      </Fill>
    </MyProgress>
  );
}
