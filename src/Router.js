import App from './App';
import Login from './Login';
import Register from './Register';
import './styles.css';

function Router() {
  const path = window.location.pathname;
  if (path === '/login') return <Login />;
  if (path === '/register') return <Register />;
  return <App />;
}

export default Router;
