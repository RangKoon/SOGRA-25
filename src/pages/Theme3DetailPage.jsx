import { useNavigate } from 'react-router-dom';
import './Theme3DetailPage.css';

function Theme3DetailPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/theme3/intro1');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="theme3-detail-container">
      <button className="back-button" onClick={handleBack}>
        &lt;
      </button>

      <div className="theme3-detail-wrapper">
        {/* 헤더 */}
        <div className="theme3-detail-header">
          <div className="header-content">
            <img
              src="/src/images/theme_3.png"
              alt="코레아 우라!"
              className="theme3-header-image"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <h1 className="theme3-detail-title">코레아 우라!</h1>
          </div>
        </div>

        {/* 포스터 */}
        <div className="theme3-poster-section">
          <img
            src="/src/images/theme3_poster.png"
            alt="테마 포스터"
            className="theme3-poster-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="poster-placeholder" style={{ display: 'none' }}>
            theme3_poster.png
          </div>
        </div>

        {/* 일정 */}
        <div className="theme3-schedule">
          <div className="schedule-day">
            <h2 className="day-title">DAY 1 – 추적의 시작</h2>
            <ul className="schedule-list">
              <li>▶ 대전 근현대사 전시관 : 독립 암호 해독</li>
              <li>▶ 공주 공산성 : 헌병 검문 회피 미션</li>
              <li>▶ 공주 한옥마을 (미션 및 숙소) : 은신처 탐색 & 비밀 쪽지 확보</li>
            </ul>
          </div>

          <div className="schedule-day">
            <h2 className="day-title">Day 2 - 감시망 돌파</h2>
            <ul className="schedule-list">
              <li>▶ 천안 아우내장터 : 선언서 안전 배포 루트 찾기</li>
              <li>▶ 병천교 : 암호 조각 조합 & 자금 전달</li>
              <li>▶ 천안 독립기념관 : 최종 암호 해독 & 거점 좌표 확보</li>
            </ul>
          </div>

          <p className="schedule-notice">
            자세한 미션은 테마 시작 후 공개됩니다 !
          </p>
        </div>

        {/* 탐험하기 버튼 */}
        <button className="explore-button" onClick={handleStart}>
          탐험하기
        </button>
      </div>
    </div>
  );
}

export default Theme3DetailPage;
