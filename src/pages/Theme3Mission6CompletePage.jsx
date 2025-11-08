import { useNavigate } from 'react-router-dom';
import './Theme3MissionCompletePage.css';

function Theme3Mission6CompletePage() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/themes');
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
            src="/src/images/theme3_mission6_complete.png"
            alt="미션 6 완료"
            className="mission-complete-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="mission-image-placeholder" style={{ display: 'none' }}>
            theme3_mission6_complete.png
          </div>
        </div>

        <button className="next-quiz-button" onClick={handleHome}>
          처음으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default Theme3Mission6CompletePage;
