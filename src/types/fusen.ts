import type { Database } from '@/lib/schema';

export type Fusen = Database['public']['Tables']['fusens']['Row'];

export function createFusen(fusen: Partial<Fusen>): Fusen {
	return {
		color: fusen.color ?? 'gray',
		size: fusen.size ?? 'small',
		is_archived: fusen.is_archived ?? false,
		id: fusen.id ?? '',
		title: fusen.title ?? '',
		content: fusen.content ?? '',
		inserted_at: fusen.inserted_at ?? '',
		updated_at: fusen.updated_at ?? '',
		user_id: fusen.user_id ?? '',
		x: fusen.x ?? 0,
		y: fusen.y ?? 0,
	};
}
