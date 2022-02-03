import { useContext, createContext, useEffect, useState } from 'react';
import { getQuestions } from '../../../services/questions';

const QuestionContext = createContext();
const useQuestionContext = () => useContext(QuestionContext);
const QuestionContextProvider = ({ children }) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const functionForGetQuestion = async () => {
    try {
      const getAllQuestions = await getQuestions();
      setAllQuestions(getAllQuestions.data);
    } catch (error) {
      return;
    }
  };
  useEffect(() => {
    functionForGetQuestion();
  }, []);
  return (
    <QuestionContext.Provider value={{ allQuestions, setAllQuestions,functionForGetQuestion }}>
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionContextProvider, QuestionContext, useQuestionContext };
