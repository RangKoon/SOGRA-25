import { useNavigate } from 'react-router-dom';
import './Theme3MissionCompletePage.css';

function Theme3Mission2CompletePage() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/theme3/ep3/qr-scan');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="mission-complete-container">
      <button className="back-button" onClick={handleBack}>
        &lt;
      </button>

      <div className="mission-complete-wrapper">
        <div className="mission-image-section">
          <img
            src="/src/images/theme3_mission2_complete.png"
            alt="미션 2 완료"
            className="mission-complete-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="mission-image-placeholder" style={{ display: 'none' }}>
            theme3_mission2_complete.png
          </div>
        </div>

        <button className="next-quiz-button" onClick={handleNext}>
          다음 퀴즈
        </button>
      </div>
    </div>
  );
}

export default Theme3Mission2CompletePage;
