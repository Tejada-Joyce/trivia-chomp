export const questionReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUESTIONS": {
      return { ...state, questions: action.questions };
    }
    case "SET_CUR_QUESTION_IDX": {
      return { ...state, curQuestionIdx: state.curQuestionIdx + 1 };
    }
    case "SET_QUESTION_DATA": {
      return {
        ...state,
        questionData: [...state.questionData, action.questionData],
      };
    }
    case "SET_CUR_POSIBLE_ANSWERS": {
      return { ...state, possibleAnswers: action.possibleAnswers };
    }
    case "SET_CUR_CORRECT_ANSWER": {
      return { ...state, correctAnswer: action.correctAnswer };
    }
    case "SET_RESET": {
      return {
        questions: [],
        curQuestionIdx: 0,
        questionData: [],
        possibleAnswers: [],
        correctAnswer: null,
      };
    }
    default: {
      throw new Error(
        `No handler for ${action.type} in questionReducer reducer`
      );
    }
  }
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_CHOICE": {
      return { ...state, userChoice: action.userChoice };
    }
    case "SET_ANSWER_POINT": {
      return { ...state, isCorrect: action.isCorrect };
    }
    case "SET_WAS_ANSWERED": {
      return { ...state, answered: action.answered };
    }
    default: {
      throw new Error(`No handler for ${action.type} in userReducer reducer`);
    }
  }
};
