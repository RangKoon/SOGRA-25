import { useParams, useNavigate } from 'react-router-dom';
import './Theme3ResultPage.css';

function Theme3SubQuestResultPage() {
  const { result } = useParams();
  const navigate = useNavigate();
  const isSuccess = result === 'success';

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    if (isSuccess) {
      navigate('/theme3/mission3-complete');
    } else {
      navigate('/theme3/sub-quest/quiz');
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
          {isSuccess ? '쪽지 해독 완료' : '쪽지 해독 실패'}
        </h1>

        {/* 내용 */}
        <div className="result-content">
          {isSuccess ? (
            <div className="result-text">
              <p className="text-normal">
                '유관순의 땅' ㅡ<br />
                그것은 천안 병천 아우내장터.
              </p>
              <p className="text-normal">
                1919년 4월 1일, 이곳에서<br />
                유관순 열사와 수많은 동지들이<br />
                만세를 외쳤습니다.
              </p>
              <p className="text-normal">
                당신은 다음 목적지 좌표를 확보했습니다.
              </p>
            </div>
          ) : (
            <div className="result-text">
              <p className="text-normal">
                문장에 작은 단어가 빠져도<br />
                동지는 당신을 인정하지 않습니다.
              </p>
              <p className="text-normal">
                쪽지를 다시 확인하고,<br />
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
          <button className="retry-button" onClick={handleNext}>
            다시 풀러 가기
          </button>
        )}
      </div>
    </div>
  );
}

export default Theme3SubQuestResultPage;
