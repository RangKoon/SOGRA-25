import { useNavigate } from 'react-router-dom';
import './ThemeSelectionPage.css';

function ThemeSelectionPage() {
  const navigate = useNavigate();

  const themes = [
    {
      id: 1,
      type: '1박 2일 테마',
      title: '꿈돌AI 탈출 사건',
      description: '인공지능 \'꿈봇\'이 대전을 탈출했다! 끔돌이와 함께 대전 곳곳을 추적하며, 사라진 AI의 흔적을 찾아라!QR 미션으로 즐기는 대전 과학도시 탐험!',
      image: '/src/images/theme_1.png'
    },
    {
      id: 2,
      type: '1박 2일 테마',
      title: '빵 왕국의 음모',
      description: '대전 지하철을 따라 숨겨진 황금 효모의 전설! 검은 효모단의 음모를 막고, 사라진 밀의 비밀을 밝혀라!',
      image: '/src/images/theme_2.png'
    },
    {
      id: 3,
      type: '선택형 테마',
      title: '코레아 우라!',
      description: '당신은 대전 연락책이다. QR과 GPS로 이어지는 비밀 루트를 따라 독립자금과 문서를 동지에게 전달하라!',
      image: '/src/images/theme_3.png'
    }
  ];

  const handleThemeSelect = (themeId) => {
    console.log('선택된 테마:', themeId);
    // 테마 선택 후 다음 페이지로 이동
    if (themeId === 3) {
      navigate('/theme3/detail');
    }
    // 다른 테마는 아직 구현하지 않음
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="theme-container">
      <button className="back-button" onClick={handleBack}>
        &lt;
      </button>

      <div className="theme-wrapper">
        {/* 헤더 */}
        <div className="theme-header">
          <div className="logo-title-wrapper">
            <img
              src="/src/images/logo.png"
              alt="대충여지도 로고"
              className="logo-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="logo-placeholder" style={{ display: 'none' }}>
              Logo
            </div>
            <h1 className="theme-title">테마 선택</h1>
          </div>
        </div>

        {/* 테마 리스트 */}
        <div className="theme-list">
          {themes.map((theme) => (
            <div key={theme.id} className="theme-card" onClick={() => handleThemeSelect(theme.id)}>
              <div className="theme-card-header">
                <span className="theme-type">{theme.type}</span>
              </div>

              <div className="theme-card-content">
                <div className="theme-image-container">
                  <img
                    src={theme.image}
                    alt={theme.title}
                    className="theme-card-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="theme-image-placeholder" style={{ display: 'none' }}>
                    테마_{theme.id}
                  </div>
                </div>

                <div className="theme-info">
                  <h2 className="theme-card-title">{theme.title}</h2>
                </div>
              </div>

              <div className="theme-card-footer">
                <p className="theme-description">{theme.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThemeSelectionPage;
