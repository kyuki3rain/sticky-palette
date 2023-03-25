import AuthProvider from './providers/AuthProvider';
import RouteProvider from './providers/RouteProvider';

function App() {
	return (
		<AuthProvider>
			<RouteProvider />
		</AuthProvider>
	);
}

export default App;
