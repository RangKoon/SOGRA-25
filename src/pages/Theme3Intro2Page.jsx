import { useNavigate } from 'react-router-dom';
import './Theme3IntroPage.css';

function Theme3Intro2Page() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    navigate('/theme3/qr-scan');
  };

  return (
    <div className="theme3-intro-container">
      <button className="back-button" onClick={handleBack}>
        &lt;
      </button>

      <div className="theme3-intro-wrapper">
        {/* 슬라이드 이미지 */}
        <div className="intro-slide">
          <img
            src="/src/images/theme3_intro2.png"
            alt="인트로 2"
            className="intro-slide-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="intro-image-placeholder" style={{ display: 'none' }}>
            theme3_intro2.png
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="intro-navigation-two">
          <button className="nav-button" onClick={handleBack}>
            &lt;
          </button>

          <button className="nav-button" onClick={handleNext}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Theme3Intro2Page;
