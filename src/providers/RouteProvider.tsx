import Main from '@/apps/auth/Main';
import Field from '@/apps/palette/Field';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthGuardProvider from './AuthGuardPRovider';

const router = createBrowserRouter([
	{
		path: '/auth',
		element: <Main />,
	},
	{
		path: '/',
		element: (
			<AuthGuardProvider>
				<Field />
			</AuthGuardProvider>
		),
	},
]);

export default function RouteProvider() {
	return <RouterProvider router={router} />;
}
