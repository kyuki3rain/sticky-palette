import { useState, useEffect, FormEvent } from 'react';
import { supabase } from '@/lib/initSupabase';
import { sessionAtom } from '@/states/session';
import { useAtomValue } from 'jotai';

export default function Account() {
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState<string | null>(null);
	const [website, setWebsite] = useState<string | null>(null);

	const session = useAtomValue(sessionAtom);

	useEffect(() => {
		async function getProfile() {
			if (session === null) return;

			setLoading(true);
			const { user } = session;

			let { data, error } = await supabase
				.from('profiles')
				.select('username, website, avatar_url')
				.eq('id', user.id)
				.single();

			if (error) {
				console.warn(error);
			} else if (data) {
				setUsername(data.username);
				setWebsite(data.website);
			}

			setLoading(false);
		}

		getProfile();
	}, [session]);

	async function updateProfile(event: FormEvent) {
		event.preventDefault();
		if (session === null) return;

		setLoading(true);
		const { user } = session;

		const updates = {
			id: user.id,
			username,
			website,
		};

		let { error } = await supabase.from('profiles').upsert(updates);

		if (error) {
			alert(error.message);
		}
		setLoading(false);
	}

	return (
		<form onSubmit={updateProfile} className="form-widget">
			<div>
				<label htmlFor="email">Email</label>
				<input id="email" type="text" value={session?.user.email} disabled />
			</div>
			<div>
				<label htmlFor="username">Name</label>
				<input
					id="username"
					type="text"
					required
					value={username || ''}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="website">Website</label>
				<input
					id="website"
					type="website"
					value={website || ''}
					onChange={(e) => setWebsite(e.target.value)}
				/>
			</div>

			<div>
				<button className="button block primary" type="submit" disabled={loading}>
					{loading ? 'Loading ...' : 'Update'}
				</button>
			</div>

			<div>
				<button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
					Sign Out
				</button>
			</div>
		</form>
	);
}
