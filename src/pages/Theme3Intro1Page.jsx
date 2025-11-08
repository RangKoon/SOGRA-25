import { useNavigate } from 'react-router-dom';
import './Theme3IntroPage.css';

function Theme3Intro1Page() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    navigate('/theme3/intro2');
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
            src="/src/images/theme3_intro1.png"
            alt="인트로 1"
            className="intro-slide-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="intro-image-placeholder" style={{ display: 'none' }}>
            theme3_intro1.png
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="intro-navigation">
          <button className="nav-button next-button" onClick={handleNext}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Theme3Intro1Page;
