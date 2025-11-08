import { useNavigate, useParams } from 'react-router-dom';
import './Theme3ResultPage.css';

function Theme3Ep2ResultPage() {
  const navigate = useNavigate();
  const { result } = useParams(); // 'success' or 'fail'
  const isSuccess = result === 'success';

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (isSuccess) {
      navigate('/theme3/mission2-complete');
    }
  };

  const handleRetry = () => {
    navigate('/theme3/ep2/quiz');
  };

  return (
    <div className="result-container">
      <button className="back-button" onClick={handleBack}>
        &lt;
      </button>

      <div className="result-wrapper">
        {/* 제목 */}
        <h1 className="result-title">
          {isSuccess ? '검문 통과' : '암호 불일치'}
        </h1>

        {/* 내용 */}
        <div className="result-content">
          {isSuccess ? (
            <div className="result-text">
              <p className="text-normal">
                헌병은 잠시 당신을 의심했지만,<br />
                암호는 정확했습니다.
              </p>
              <p className="text-normal">
                당신은 '조선상회 배달원'으로<br />
                위장한 채 산성 안쪽으로 진입합니다.
              </p>
            </div>
          ) : (
            <div className="result-text">
              <p className="text-normal">
                헌병이 더욱 의심하기 시작했습니다.
              </p>
              <p className="text-normal">
                전시관에서 얻은 문장을<br />
                정확히 입력하십시오.
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
          <button className="retry-button" onClick={handleRetry}>
            다시 풀러 가기
          </button>
        )}
      </div>
    </div>
  );
}

export default Theme3Ep2ResultPage;
