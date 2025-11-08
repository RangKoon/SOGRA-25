import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Firebase Authentication으로 로그인
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("로그인 성공:", userCredential.user);

      // 테마 선택 페이지로 이동
      navigate("/themes");
    } catch (error) {
      console.error("로그인 오류:", error);

      // Firebase 오류 메시지 처리
      switch (error.code) {
        case "auth/invalid-email":
          setError("유효하지 않은 이메일 주소입니다.");
          break;
        case "auth/user-disabled":
          setError("비활성화된 계정입니다.");
          break;
        case "auth/user-not-found":
          setError("존재하지 않는 사용자입니다.");
          break;
        case "auth/wrong-password":
          setError("비밀번호가 올바르지 않습니다.");
          break;
        default:
          setError("로그인 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="login-container">
      <button className="back-button" onClick={handleBack}>
        &lt;
      </button>

      <div className="login-wrapper">
        <div className="login-content">
          <div className="login-header">
            <div className="logo-title-wrapper">
              <img
                src="/src/images/logo.png"
                alt="대충여지도 로고"
                className="logo-image"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
              <div className="logo-placeholder" style={{ display: "none" }}>
                Logo
              </div>
              <h1 className="login-title">대충여지도</h1>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                이메일
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "로그인 중..." : "로그인"}
            </button>

            <button
              type="button"
              className="signup-button"
              onClick={handleSignup}
            >
              회원가입
            </button>
          </form>
        </div>

        <div className="app-description">
          <p className="description-text">
            대전,충청도 지역의 관광 활성화를 위한
            <br />
            미션퀘스트 형식의 지자체 운영 앱입니다
          </p>
        </div>

        <div className="theme-images">
          <div className="theme-image-wrapper">
            <img
              src="/src/images/theme_1.png"
              alt="테마 1"
              className="theme-image"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextElementSibling.style.display = "flex";
              }}
            />
            <div className="theme-placeholder" style={{ display: "none" }}>
              테마_1.png
            </div>
          </div>

          <div className="theme-image-wrapper">
            <img
              src="/src/images/theme_2.png"
              alt="테마 2"
              className="theme-image"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextElementSibling.style.display = "flex";
              }}
            />
            <div className="theme-placeholder" style={{ display: "none" }}>
              테마_2.png
            </div>
          </div>

          <div className="theme-image-wrapper">
            <img
              src="/src/images/theme_3.png"
              alt="테마 3"
              className="theme-image"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextElementSibling.style.display = "flex";
              }}
            />
            <div className="theme-placeholder" style={{ display: "none" }}>
              테마_3.png
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
