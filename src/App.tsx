import { useAuthState } from 'react-firebase-hooks/auth';

import { useAuth } from './libs/firebase';
import BurritoPage from './pages/burrito.page';
import LoginPage from './pages/login.page';

function App() {
  const auth = useAuth();
  const [user, loading, error] = useAuthState(auth);

  return <div className="App">{user ? <BurritoPage /> : <LoginPage />}</div>;
}

export default App;
