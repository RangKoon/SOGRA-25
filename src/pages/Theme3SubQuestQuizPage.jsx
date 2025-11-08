import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Theme3SubQuestQuizPage.css';

function Theme3SubQuestQuizPage() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswer = "유관순의 땅을 지나, 새벽을 찾으라";

    if (answer.trim() === correctAnswer) {
      navigate('/theme3/sub-quest/result/success');
    } else {
      navigate('/theme3/sub-quest/result/fail');
    }
  };

  return (
    <div className="subquest-quiz-container">
      <button className="back-button" onClick={handleBack}>
        &lt;
      </button>

      <div className="subquest-quiz-wrapper">
        {/* 헤더 */}
        <div className="subquest-quiz-header">
          <img
            src="/src/images/theme3_T.png"
            alt="테마 아이콘"
            className="subquest-quiz-theme-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1 className="subquest-quiz-title">쪽지 해독</h1>
          <p className="subquest-quiz-description">
            숨겨진 쪽지의 내용을 정확히 입력하세요
          </p>
        </div>

        {/* 주관식 답변 입력 */}
        <form className="subquest-quiz-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="subquest-answer-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="문장을 입력하세요"
            required
          />

          <button type="submit" className="subquest-submit-button">
            제출
          </button>
        </form>
      </div>
    </div>
  );
}

export default Theme3SubQuestQuizPage;
