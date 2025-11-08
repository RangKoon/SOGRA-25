import { useParams, useNavigate } from 'react-router-dom';
import './Theme3ResultPage.css';

function Theme3Ep6ResultPage() {
  const { result } = useParams();
  const navigate = useNavigate();
  const isSuccess = result === 'success';

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (isSuccess) {
      navigate('/theme3/mission6-complete');
    } else {
      navigate('/theme3/ep6/quiz');
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
          {isSuccess ? '최종 암호 해독 성공' : '암호 해독 실패'}
        </h1>

        {/* 내용 */}
        <div className="result-content">
          {isSuccess ? (
            <div className="result-text">
              <p className="text-normal">
                모든 암호 조각을 성공적으로 조합했습니다.
              </p>
              <p className="text-normal">
                당신은 독립운동의 모든 임무를<br />
                완수했습니다.
              </p>
              <p className="text-normal">
                조국의 자유를 위해 헌신한<br />
                당신의 용기에 경의를 표합니다.
              </p>
            </div>
          ) : (
            <div className="result-text">
              <p className="text-normal">
                문장은 반드시 '나라 → 겨레 → 눈 → 새벽'<br />
                의 의미 흐름을 가져야 합니다.
              </p>
              <p className="text-normal">
                전시 속 기록을 다시 떠올리세요.<br />
                올바른 조합만이 최종 거점을 열 수 있습니다.
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

export default Theme3Ep6ResultPage;
