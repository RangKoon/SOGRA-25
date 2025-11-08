import { useParams, useNavigate } from 'react-router-dom';
import './Theme3ResultPage.css';

function Theme3Ep5ResultPage() {
  const { result } = useParams();
  const navigate = useNavigate();
  const isSuccess = result === 'success';

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (isSuccess) {
      navigate('/theme3/mission5-complete');
    } else {
      navigate('/theme3/ep5/quiz');
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
          {isSuccess ? '암호 확인 완료' : '암호 회수 실패'}
        </h1>

        {/* 내용 */}
        <div className="result-content">
          {isSuccess ? (
            <div className="result-text">
              <p className="text-normal">
                이 문장은<br />
                실제 독립운동가들이<br />
                자금 전달 / 연락재개 신호로<br />
                사용한 문장과 유사합니다.
              </p>
              <p className="text-normal">
                당신은 동지에게<br />
                자금을 무사히 전달했습니다.
              </p>
            </div>
          ) : (
            <div className="result-text">
              <p className="text-normal">
                문장은 반드시 자연스럽고,<br />
                '희망이 어둠 뒤에 온다'는<br />
                의미가 담겨야 합니다.
              </p>
              <p className="text-normal">
                다시 조합하십시오.
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

export default Theme3Ep5ResultPage;
