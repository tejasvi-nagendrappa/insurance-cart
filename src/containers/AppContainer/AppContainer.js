import ErrorBoundary from '../../components/ErrorBoundary';
import { App } from '../../components/App';

const AppContainer = () => {
  return (
    <div className="AppContainer">
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </div>
  );
}

export default AppContainer;
