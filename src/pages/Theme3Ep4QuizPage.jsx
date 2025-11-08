import { useNavigate } from 'react-router-dom';
import './Theme3Ep4QuizPage.css';

function Theme3Ep4QuizPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleAnswer = (answerNumber) => {
    if (answerNumber === 2) {
      navigate('/theme3/ep4/result/success');
    } else {
      navigate('/theme3/ep4/result/fail');
    }
  };

  return (
    <div className="ep4-quiz-container">
      <button className="back-button" onClick={handleBack}>
        &lt;
      </button>

      <div className="ep4-quiz-wrapper">
        {/* 헤더 */}
        <div className="ep4-quiz-header">
          <img
            src="/src/images/theme3_T.png"
            alt="테마 아이콘"
            className="ep4-quiz-theme-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1 className="ep4-quiz-title">선언서 배포 장소</h1>
          <p className="ep4-quiz-description">
            독립선언서를 남기기에 가장 적절한 곳은?
          </p>
        </div>

        {/* 답변 버튼들 - 세로 배치 */}
        <div className="ep4-quiz-answers">
          <button className="ep4-answer-button" onClick={() => handleAnswer(1)}>
            <span className="ep4-answer-number">1</span>
          </button>

          <button className="ep4-answer-button" onClick={() => handleAnswer(2)}>
            <span className="ep4-answer-number">2</span>
          </button>

          <button className="ep4-answer-button" onClick={() => handleAnswer(3)}>
            <span className="ep4-answer-number">3</span>
          </button>

          <button className="ep4-answer-button" onClick={() => handleAnswer(4)}>
            <span className="ep4-answer-number">4</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Theme3Ep4QuizPage;
