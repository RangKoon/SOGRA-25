import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Theme3Ep6QuizPage.css';

function Theme3Ep6QuizPage() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswer = "나라 없는 겨레는 눈을 감지 않는다";

    if (answer.trim() === correctAnswer) {
      navigate('/theme3/ep6/result/success');
    } else {
      navigate('/theme3/ep6/result/fail');
    }
  };

  return (
    <div className="ep6-quiz-container">
      <button className="back-button" onClick={handleBack}>
        &lt;
      </button>

      <div className="ep6-quiz-wrapper">
        {/* 헤더 */}
        <div className="ep6-quiz-header">
          <img
            src="/src/images/theme3_T.png"
            alt="테마 아이콘"
            className="ep6-quiz-theme-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1 className="ep6-quiz-title">최종 암호 해독</h1>
          <p className="ep6-quiz-description">
            모든 조각을 조합하여 완전한 문장을 완성하세요
          </p>
        </div>

        {/* 주관식 답변 입력 */}
        <form className="ep6-quiz-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="ep6-answer-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder='"조각 1" "조각 2"는 "조각3"
식으로 문장을 조합하세요!'
            required
          />

          <button type="submit" className="ep6-submit-button">
            제출
          </button>
        </form>
      </div>
    </div>
  );
}

export default Theme3Ep6QuizPage;
