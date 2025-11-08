import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Theme3IntroPage.css';

function Theme3IntroPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/src/images/theme3_intro1.png',
      alt: '인트로 1'
    },
    {
      id: 2,
      image: '/src/images/theme3_intro2.png',
      alt: '인트로 2'
    }
  ];

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleBack = () => {
    navigate(-1);
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
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
            className="intro-slide-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="intro-image-placeholder" style={{ display: 'none' }}>
            theme3_intro{currentSlide + 1}.png
          </div>
        </div>

        {/* 슬라이드 인디케이터 */}
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        {/* 네비게이션 버튼 */}
        <div className="intro-navigation">
          <button
            className="nav-button prev-button"
            onClick={handlePrevious}
            disabled={currentSlide === 0}
          >
            &lt;
          </button>

          <div className="slide-counter">
            {currentSlide + 1} / {slides.length}
          </div>

          <button
            className="nav-button next-button"
            onClick={handleNext}
            disabled={currentSlide === slides.length - 1}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Theme3IntroPage;
