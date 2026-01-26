import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import OnlineConsulting from './pages/OnlineConsulting';
import Estimator from './pages/Estimator';
import Shop from './pages/Shop';
import Services from './pages/Services';
import Pros from './pages/Pros';
import Invest from './pages/Invest';
import Emergency from './pages/Emergency';
import HandymanServices from './pages/HandymanServices';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/online-consulting" element={<OnlineConsulting />} />
          <Route path="/estimator" element={<Estimator />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pros" element={<Pros />} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/handyman" element={<HandymanServices />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
