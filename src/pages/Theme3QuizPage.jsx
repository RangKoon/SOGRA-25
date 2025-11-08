import { useNavigate } from 'react-router-dom';
import './Theme3QuizPage.css';

function Theme3QuizPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleAnswer = (answerNumber) => {
    // 정답은 3번
    if (answerNumber === 3) {
      navigate('/theme3/result/success');
    } else {
      navigate('/theme3/result/fail');
    }
  };

  return (
    <div className="quiz-container">
      <button className="back-button" onClick={handleBack}>
        &lt;
      </button>

      <div className="quiz-wrapper">
        {/* 헤더 */}
        <div className="quiz-header">
          <img
            src="/src/images/theme_3.png"
            alt="테마 아이콘"
            className="quiz-theme-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1 className="quiz-title">정답은?</h1>
        </div>

        {/* 답변 버튼들 */}
        <div className="quiz-answers">
          <button className="answer-button" onClick={() => handleAnswer(1)}>
            <span className="answer-number">1</span>
          </button>

          <button className="answer-button" onClick={() => handleAnswer(2)}>
            <span className="answer-number">2</span>
          </button>

          <button className="answer-button" onClick={() => handleAnswer(3)}>
            <span className="answer-number">3</span>
          </button>

          <button className="answer-button" onClick={() => handleAnswer(4)}>
            <span className="answer-number">4</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Theme3QuizPage;
