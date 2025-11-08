import { useNavigate } from 'react-router-dom';
import './LoadingPage.css';

function LoadingPage() {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="loading-container" onClick={handleNavigateToLogin}>
      <div className="loading-content">
        <div className="loading-image-wrapper">
          <img
            src="/src/images/loading.png"
            alt="Loading"
            className="loading-image"
            onError={(e) => {
              // 이미지가 없을 경우 placeholder 표시
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="image-placeholder" style={{ display: 'none' }}>
            <div className="placeholder-text">loading.png</div>
            <div className="placeholder-subtext">이미지를 추가해주세요</div>
          </div>
        </div>

        <button className="start-button" onClick={handleNavigateToLogin}>
          시작하기
        </button>
      </div>
    </div>
  );
}

export default LoadingPage;
