import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Theme3Ep5QuizPage.css';

function Theme3Ep5QuizPage() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswer = "새벽은";

    if (answer.trim() === correctAnswer) {
      navigate('/theme3/ep5/result/success');
    } else {
      navigate('/theme3/ep5/result/fail');
    }
  };

  return (
    <div className="ep5-quiz-container">
      <button className="back-button" onClick={handleBack}>
        &lt;
      </button>

      <div className="ep5-quiz-wrapper">
        {/* 헤더 */}
        <div className="ep5-quiz-header">
          <img
            src="/src/images/theme3_T.png"
            alt="테마 아이콘"
            className="ep5-quiz-theme-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1 className="ep5-quiz-title">암호 조각 확인</h1>
          <p className="ep5-quiz-description">
            앞서 획득한 암호 조각을 입력하세요
          </p>
        </div>

        {/* 주관식 답변 입력 */}
        <form className="ep5-quiz-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="ep5-answer-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="암호 조각을 입력하세요"
            required
          />

          <button type="submit" className="ep5-submit-button">
            제출
          </button>
        </form>
      </div>
    </div>
  );
}

export default Theme3Ep5QuizPage;
