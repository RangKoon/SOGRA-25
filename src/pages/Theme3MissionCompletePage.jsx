import { useNavigate } from 'react-router-dom';
import './Theme3MissionCompletePage.css';

function Theme3MissionCompletePage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleNextQuiz = () => {
    // Episode 2 QR 스캔 페이지로 이동
    navigate('/theme3/ep2/qr-scan');
  };

  return (
    <div className="mission-complete-container">
      <button className="back-button" onClick={handleBack}>
        &lt;
      </button>

      <div className="mission-complete-wrapper">
        {/* 미션 완료 이미지 */}
        <div className="mission-complete-image-section">
          <img
            src="/src/images/theme3_mission1_complete.png"
            alt="미션 완료"
            className="mission-complete-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="mission-image-placeholder" style={{ display: 'none' }}>
            theme3_mission1_complete.png
          </div>
        </div>

        {/* 다음 퀴즈 버튼 */}
        <button className="next-quiz-button" onClick={handleNextQuiz}>
          다음 퀴즈
        </button>
      </div>
    </div>
  );
}

export default Theme3MissionCompletePage;
