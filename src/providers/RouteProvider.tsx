import Auth from '@/apps/auth/Main';
import Palette from '@/apps/palette/Main';
import List from '@/apps/list/Main';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthGuardProvider from './AuthGuardPRovider';

const router = createBrowserRouter([
	{
		path: '/auth',
		element: <Auth />,
	},
	{
		path: '/',
		element: (
			<AuthGuardProvider>
				<Palette />
			</AuthGuardProvider>
		),
	},
	{
		path: '/list',
		element: (
			<AuthGuardProvider>
				<List />
			</AuthGuardProvider>
		),
	},
]);

export default function RouteProvider() {
	return <RouterProvider router={router} />;
}
