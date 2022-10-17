// 빈 값 전달
const initStateEmpty = {
  mbtiResult: '',
  page: 0,
  survey: [],
  explanation: {},
};

// 액션 Type 설정
const INIT = 'mbti/INIT';
const NEXT = 'mbti/NEXT';
const CHECK = 'mbti/CHECK';
const RESET = 'mbti/RESET';

// 액션 생성 함수
export function init(data) {
  return {
    type: INIT,
    payload: data,
  };
}

export function next() {
  return {
    type: NEXT,
  };
}

export function check(result) {
  return {
    type: CHECK,
    payload: { result },
  };
}

export function reset() {
  return {
    type: RESET,
  };
}

// 리듀서
export default function mbti(state = initStateEmpty, action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        survey: action.payload.survey,
        explanation: action.payload.explanation,
      };
    case CHECK:
      return {
        ...state,
        mbtiResult: state.mbtiResult + action.payload.result,
      };
    case NEXT:
      return {
        ...state,
        page: state.page + 1,
      };
    case RESET:
      return {
        ...state,
        page: 0,
        mbtiResult: '',
      };
    default:
      return state;
  }
}
