import { useParams, useNavigate } from 'react-router-dom';
import './Theme3ResultPage.css';

function Theme3Ep4ResultPage() {
  const { result } = useParams();
  const navigate = useNavigate();
  const isSuccess = result === 'success';

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (isSuccess) {
      navigate('/theme3/mission4-complete');
    } else {
      navigate('/theme3/ep4/quiz');
    }
  };

  return (
    <div className="result-container">
      <button className="back-button" onClick={handleBack}>
        &lt;
      </button>

      <div className="result-wrapper">
        {/* 제목 */}
        <h1 className="result-title">
          {isSuccess ? '선언서 배포 성공' : '헌병에게 의심받았습니다.'}
        </h1>

        {/* 내용 */}
        <div className="result-content">
          {isSuccess ? (
            <div className="result-text">
              <p className="text-normal">
                실제로 헌병의 시야가 닿지 않는<br />
                골목, 우물가, 곡물창고 주변은<br />
                독립선언서를 남기기 좋은 지역이었습니다.
              </p>
              <p className="text-normal">
                독립선언서 배포에 성공한 당신!<br />
                당신은 암호 조각 하나를 확보했습니다.
              </p>
              <p className="text-normal">
                📜 "새벽은"
              </p>
              <p className="text-normal">
                이 조각을 계속 간직하고 있길 바랍니다.
              </p>
            </div>
          ) : (
            <div className="result-text">
              <p className="text-normal">
                아우내 장터의 중심부는<br />
                일본군이 집중 감시했습니다.
              </p>
              <p className="text-normal">
                사람들의 시선이 닿지 않는 곳을<br />
                다시 선택하십시오.
              </p>
            </div>
          )}

          {/* 하단 이미지 */}
          <div className="result-image-wrapper">
            <img
              src={isSuccess ? '/src/images/theme3_T.png' : '/src/images/theme3_F.png'}
              alt={isSuccess ? '성공' : '실패'}
              className="result-image"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* 버튼 */}
        {isSuccess ? (
          <button className="next-button" onClick={handleNext}>
            다음
          </button>
        ) : (
          <button className="retry-button" onClick={handleNext}>
            다시 풀러 가기
          </button>
        )}
      </div>
    </div>
  );
}

export default Theme3Ep4ResultPage;
