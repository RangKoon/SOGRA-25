import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './Theme3QRScanPage.css';

function Theme3SubQuestQRScanPage() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleStartScan = () => {
    setScanning(true);

    setTimeout(() => {
      try {
        const scanner = new Html5QrcodeScanner(
          "qr-reader",
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
            rememberLastUsedCamera: true
          },
          false
        );

        scannerRef.current = scanner;

        scanner.render(
          (decodedText) => {
            console.log('QR 코드 스캔:', decodedText);
            stopScanner();
            navigate('/theme3/sub-quest/quiz');
          },
          (error) => {
            // 스캔 실패 (무시)
          }
        );
      } catch (error) {
        console.error('스캐너 초기화 오류:', error);
        alert('카메라를 시작할 수 없습니다. 브라우저 설정에서 카메라 권한을 확인해주세요.');
        setScanning(false);
      }
    }, 100);
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear()
        .then(() => {
          scannerRef.current = null;
        })
        .catch((error) => {
          console.error('스캐너 정리 오류:', error);
        });
    }
  };

  const handleCancelScan = () => {
    stopScanner();
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="qr-scan-container">
      <button className="back-button" onClick={handleBack}>
        &lt;
      </button>

      <div className="qr-scan-wrapper">
        {!scanning ? (
          <>
            {/* QR 코드 이미지 */}
            <div className="qr-image-section">
              <img
                src="/src/images/theme3_sub_quest.png"
                alt="서브 퀘스트"
                className="qr-code-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="qr-image-placeholder" style={{ display: 'none' }}>
                theme3_sub_quest.png
              </div>
            </div>

            {/* QR 스캔 버튼 */}
            <button className="qr-scan-button" onClick={handleStartScan}>
              QR 스캔하기
            </button>

            {/* 테스트용 우회 버튼 */}
            <button
              className="skip-qr-button"
              onClick={() => navigate('/theme3/sub-quest/quiz')}
            >
              테스트: 바로 퀴즈로 이동
            </button>
          </>
        ) : (
          <>
            {/* QR 스캐너 */}
            <div className="qr-scanner-section">
              <h2 className="scanner-title">QR 코드를 스캔하세요</h2>
              <div id="qr-reader"></div>
              <button className="cancel-scan-button" onClick={handleCancelScan}>
                취소
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Theme3SubQuestQRScanPage;
