import { useParams, useNavigate } from 'react-router-dom';
import './Theme3ResultPage.css';

function Theme3Ep3ResultPage() {
  const { result } = useParams();
  const navigate = useNavigate();
  const isSuccess = result === 'success';

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (isSuccess) {
      navigate('/theme3/sub-quest/qr-scan');
    } else {
      navigate('/theme3/ep3/quiz');
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
          {isSuccess ? '야간 은신 성공' : '발각 위험이 높습니다!'}
        </h1>

        {/* 내용 */}
        <div className="result-content">
          {isSuccess ? (
            <div className="result-text">
              <p className="text-normal">
                '샘 근처 후미진 한옥'은<br />
                실제로 발각 위험이 낮아
              </p>
              <p className="text-normal">
                독립군, 연락책, 학도병들이<br />
                자주 은신하던 방식과 일치합니다.
              </p>
              <p className="text-normal">
                다음으로<br />
                당신은 내부에 숨겨진 쪽지를 찾아야합니다.
              </p>
            </div>
          ) : (
            <div className="result-text">
              <p className="text-normal">
                헌병의 순찰은<br />
                대부분 시장과 큰 길을 중심으로<br />
                이루어졌습니다.
              </p>
              <p className="text-normal">
                은밀한 장소를 다시 선택하십시오.
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

export default Theme3Ep3ResultPage;
