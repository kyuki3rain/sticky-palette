import { useEffect } from 'react';
import Field from './components/Field';
import { useAddTestData } from './hooks/useAddTestData';

function App() {
	useAddTestData();
	return <Field />;
}

export default App;
