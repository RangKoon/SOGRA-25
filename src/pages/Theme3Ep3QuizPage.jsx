import { useNavigate } from 'react-router-dom';
import './Theme3Ep3QuizPage.css';

function Theme3Ep3QuizPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleAnswer = (answerNumber) => {
    if (answerNumber === 2) {
      navigate('/theme3/ep3/result/success');
    } else {
      navigate('/theme3/ep3/result/fail');
    }
  };

  return (
    <div className="ep3-quiz-container">
      <button className="back-button" onClick={handleBack}>
        &lt;
      </button>

      <div className="ep3-quiz-wrapper">
        {/* 헤더 */}
        <div className="ep3-quiz-header">
          <img
            src="/src/images/theme3_T.png"
            alt="테마 아이콘"
            className="ep3-quiz-theme-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1 className="ep3-quiz-title">은신처 선택</h1>
          <p className="ep3-quiz-description">
            야간에 가장 안전한 은신처는?
          </p>
        </div>

        {/* 답변 버튼들 - 세로 배치 */}
        <div className="ep3-quiz-answers">
          <button className="ep3-answer-button" onClick={() => handleAnswer(1)}>
            <span className="ep3-answer-number">1</span>
          </button>

          <button className="ep3-answer-button" onClick={() => handleAnswer(2)}>
            <span className="ep3-answer-number">2</span>
          </button>

          <button className="ep3-answer-button" onClick={() => handleAnswer(3)}>
            <span className="ep3-answer-number">3</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Theme3Ep3QuizPage;
