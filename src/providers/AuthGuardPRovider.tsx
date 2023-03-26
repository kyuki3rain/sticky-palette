import { shouldAuthAtom } from '@/states/session';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
	children: React.ReactNode;
};

export default function AuthGuardProvider({ children }: Props) {
	const shouldAuth = useAtomValue(shouldAuthAtom);
	const navigate = useNavigate();

	useEffect(() => {
		if (shouldAuth) navigate('/auth');
	}, [shouldAuth]);

	return <>{children}</>;
}
