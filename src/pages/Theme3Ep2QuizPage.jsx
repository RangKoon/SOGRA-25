import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Theme3Ep2QuizPage.css';

function Theme3Ep2QuizPage() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 정답: "달은 검은 밤을 밝히고"
    const correctAnswer = "달은 검은 밤을 밝히고";

    if (answer.trim() === correctAnswer) {
      navigate('/theme3/ep2/result/success');
    } else {
      navigate('/theme3/ep2/result/fail');
    }
  };

  return (
    <div className="ep2-quiz-container">
      <button className="back-button" onClick={handleBack}>
        &lt;
      </button>

      <div className="ep2-quiz-wrapper">
        {/* 헤더 */}
        <div className="ep2-quiz-header">
          <img
            src="/src/images/theme_3.png"
            alt="테마 아이콘"
            className="ep2-quiz-theme-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1 className="ep2-quiz-title">정답은?</h1>
        </div>

        {/* 주관식 답변 입력 */}
        <form className="ep2-quiz-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="ep2-answer-input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="암호를 입력하세요"
            required
          />

          <button type="submit" className="ep2-submit-button">
            제출
          </button>
        </form>
      </div>
    </div>
  );
}

export default Theme3Ep2QuizPage;
