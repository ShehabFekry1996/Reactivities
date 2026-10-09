type CategoryMeta = { text: string; color: string; emoji: string; photo: string };

export const categoryMeta: Record<string, CategoryMeta> = {
    football: { text: 'Football', color: '#16A34A', emoji: '⚽', photo: 'photo-1489944440615-453fc2b6a9a9' },
    food: { text: 'Food', color: '#F97316', emoji: '🍜', photo: 'photo-1576866209830-589e1bfbaa4d' },
    music: { text: 'Music', color: '#EC4899', emoji: '🎵', photo: 'photo-1470229722913-7c0e2dbbafd3' },
    film: { text: 'Film', color: '#EF4444', emoji: '🎬', photo: 'photo-1489599849927-2ee91cede3ba' },
    travel: { text: 'Travel', color: '#0EA5E9', emoji: '✈️', photo: 'photo-1476514525535-07fb3b4ae5f1' },
    culture: { text: 'Culture', color: '#8B5CF6', emoji: '🏛️', photo: 'photo-1491156855053-9cdff72c7f85' },
    art: { text: 'Art', color: '#D946EF', emoji: '🎨', photo: 'photo-1569783721854-33a99b4c0bae' },
    gaming: { text: 'Gaming', color: '#6366F1', emoji: '🎮', photo: 'photo-1511512578047-dfb367046420' },
    fitness: { text: 'Fitness', color: '#14B8A6', emoji: '🧘', photo: 'photo-1602192509154-0b900ee1f851' },
    hiking: { text: 'Hiking', color: '#65A30D', emoji: '🥾', photo: 'photo-1551632811-561732d1e306' },
    tech: { text: 'Tech', color: '#3B82F6', emoji: '💻', photo: 'photo-1558008258-3256797b43f3' },
    photography: { text: 'Photography', color: '#F59E0B', emoji: '📷', photo: 'photo-1542038784456-1ea8e935640e' },
}

export const categoryOptions = Object.entries(categoryMeta).map(([value, meta]) => ({ text: meta.text, value }));

export const getCategory = (category: string) =>
    categoryMeta[category] ?? { text: category, color: '#6C5CE7', emoji: '📍', photo: categoryMeta.travel.photo };

export const categoryImage = (category: string, width = 1200) =>
    `https://images.unsplash.com/${getCategory(category).photo}?auto=format&fit=crop&w=${width}&q=80`;
