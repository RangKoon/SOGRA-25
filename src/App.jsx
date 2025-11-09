import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ThemeSelectionPage from './pages/ThemeSelectionPage';
import Theme3DetailPage from './pages/Theme3DetailPage';
import Theme3Intro1Page from './pages/Theme3Intro1Page';
import Theme3Intro2Page from './pages/Theme3Intro2Page';
import Theme3QRScanPage from './pages/Theme3QRScanPage';
import Theme3QuizPage from './pages/Theme3QuizPage';
import Theme3ResultPage from './pages/Theme3ResultPage';
import Theme3MissionCompletePage from './pages/Theme3MissionCompletePage';
import Theme3Ep2QRScanPage from './pages/Theme3Ep2QRScanPage';
import Theme3Ep2QuizPage from './pages/Theme3Ep2QuizPage';
import Theme3Ep2ResultPage from './pages/Theme3Ep2ResultPage';
import Theme3Mission2CompletePage from './pages/Theme3Mission2CompletePage';
import Theme3Ep3QRScanPage from './pages/Theme3Ep3QRScanPage';
import Theme3Ep3QuizPage from './pages/Theme3Ep3QuizPage';
import Theme3Ep3ResultPage from './pages/Theme3Ep3ResultPage';
import Theme3SubQuestQRScanPage from './pages/Theme3SubQuestQRScanPage';
import Theme3SubQuestQuizPage from './pages/Theme3SubQuestQuizPage';
import Theme3SubQuestResultPage from './pages/Theme3SubQuestResultPage';
import Theme3Mission3CompletePage from './pages/Theme3Mission3CompletePage';
import Theme3Ep4QRScanPage from './pages/Theme3Ep4QRScanPage';
import Theme3Ep4QuizPage from './pages/Theme3Ep4QuizPage';
import Theme3Ep4ResultPage from './pages/Theme3Ep4ResultPage';
import Theme3Mission4CompletePage from './pages/Theme3Mission4CompletePage';
import Theme3Ep5QRScanPage from './pages/Theme3Ep5QRScanPage';
import Theme3Ep5QuizPage from './pages/Theme3Ep5QuizPage';
import Theme3Ep5ResultPage from './pages/Theme3Ep5ResultPage';
import Theme3Mission5CompletePage from './pages/Theme3Mission5CompletePage';
import Theme3Ep6QRScanPage from './pages/Theme3Ep6QRScanPage';
import Theme3Ep6QuizPage from './pages/Theme3Ep6QuizPage';
import Theme3Ep6ResultPage from './pages/Theme3Ep6ResultPage';
import Theme3Mission6CompletePage from './pages/Theme3Mission6CompletePage';
import MapPage from './pages/MapPage'; // Import MapPage
import NaverMapPage from './pages/NaverMapPage'; // Import NaverMapPage
import MissionSecurityPage from './pages/MissionSecurityPage'; // Import MissionSecurityPage
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/themes" element={<ThemeSelectionPage />} />
        <Route path="/theme3/detail" element={<Theme3DetailPage />} />
        <Route path="/theme3/intro1" element={<Theme3Intro1Page />} />
        <Route path="/theme3/intro2" element={<Theme3Intro2Page />} />
        <Route path="/theme3/qr-scan" element={<Theme3QRScanPage />} />
        <Route path="/theme3/quiz" element={<Theme3QuizPage />} />
        <Route path="/theme3/result/:result" element={<Theme3ResultPage />} />
        <Route path="/theme3/mission-complete" element={<Theme3MissionCompletePage />} />
        <Route path="/theme3/ep2/qr-scan" element={<Theme3Ep2QRScanPage />} />
        <Route path="/theme3/ep2/quiz" element={<Theme3Ep2QuizPage />} />
        <Route path="/theme3/ep2/result/:result" element={<Theme3Ep2ResultPage />} />
        <Route path="/theme3/mission2-complete" element={<Theme3Mission2CompletePage />} />
        <Route path="/theme3/ep3/qr-scan" element={<Theme3Ep3QRScanPage />} />
        <Route path="/theme3/ep3/quiz" element={<Theme3Ep3QuizPage />} />
        <Route path="/theme3/ep3/result/:result" element={<Theme3Ep3ResultPage />} />
        <Route path="/theme3/sub-quest/qr-scan" element={<Theme3SubQuestQRScanPage />} />
        <Route path="/theme3/sub-quest/quiz" element={<Theme3SubQuestQuizPage />} />
        <Route path="/theme3/sub-quest/result/:result" element={<Theme3SubQuestResultPage />} />
        <Route path="/theme3/mission3-complete" element={<Theme3Mission3CompletePage />} />
        <Route path="/theme3/ep4/qr-scan" element={<Theme3Ep4QRScanPage />} />
        <Route path="/theme3/ep4/quiz" element={<Theme3Ep4QuizPage />} />
        <Route path="/theme3/ep4/result/:result" element={<Theme3Ep4ResultPage />} />
        <Route path="/theme3/mission4-complete" element={<Theme3Mission4CompletePage />} />
        <Route path="/theme3/ep5/qr-scan" element={<Theme3Ep5QRScanPage />} />
        <Route path="/theme3/ep5/quiz" element={<Theme3Ep5QuizPage />} />
        <Route path="/theme3/ep5/result/:result" element={<Theme3Ep5ResultPage />} />
        <Route path="/theme3/mission5-complete" element={<Theme3Mission5CompletePage />} />
        <Route path="/theme3/ep6/qr-scan" element={<Theme3Ep6QRScanPage />} />
        <Route path="/theme3/ep6/quiz" element={<Theme3Ep6QuizPage />} />
        <Route path="/theme3/ep6/result/:result" element={<Theme3Ep6ResultPage />} />
        <Route path="/theme3/mission6-complete" element={<Theme3Mission6CompletePage />} />
        <Route path="/map" element={<MapPage />} /> {/* Add MapPage route */}
        <Route path="/naver-map" element={<NaverMapPage />} /> {/* Add NaverMapPage route */}
        <Route path="/mission-security" element={<MissionSecurityPage />} /> {/* Add MissionSecurityPage route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
