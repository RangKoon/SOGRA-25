import { useNavigate, useParams } from 'react-router-dom';
import './Theme3ResultPage.css';

function Theme3ResultPage() {
  const navigate = useNavigate();
  const { result } = useParams(); // 'success' or 'fail'
  const isSuccess = result === 'success';

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (isSuccess) {
      navigate('/theme3/mission-complete');
    }
  };

  const handleRetry = () => {
    navigate('/theme3/quiz');
  };

  return (
    <div className="result-container">
      <button className="back-button" onClick={handleBack}>
        &lt;
      </button>

      <div className="result-wrapper">
        {/* 제목 */}
        <h1 className="result-title">
          {isSuccess ? '암호 해독 성공' : '암호 해독 실패'}
        </h1>

        {/* 내용 */}
        <div className="result-content">
          {isSuccess ? (
            <div className="result-text">
              <p className="text-highlight">"달은 검은 밤을 밝히고" —</p>
              <p className="text-normal">
                실제 독립운동에서<br />
                '작전 개시' 또는 '야간 이동'의 암호로<br />
                사용된 은유 표현입니다.
              </p>
              <p className="text-normal">당신은 암호를 확보했습니다.</p>
              <p className="text-normal">
                이 문장은<br />
                다음 검문에서<br />
                생사를 가를 열쇠가 됩니다.
              </p>
            </div>
          ) : (
            <div className="result-text">
              <p className="text-normal">
                당시 독립운동 조직은<br />
                서신 검열을 피하기 위해
              </p>
              <p className="text-normal">
                '밤, 달, 별, 새벽' 등<br />
                자연 은유를 사용했습니다.
              </p>
              <p className="text-normal">다시 시도하십시오.</p>
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

export default Theme3ResultPage;
