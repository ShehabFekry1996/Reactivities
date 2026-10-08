export const categoryOptions = [
    { text: 'Drinks', value: 'drinks' },
    { text: 'Culture', value: 'culture' },
    { text: 'Film', value: 'film' },
    { text: 'Food', value: 'food' },
    { text: 'Travel', value: 'travel' },
    { text: 'Music', value: 'music' },
]

export const categoryMeta: Record<string, { color: string; emoji: string }> = {
    drinks: { color: '#F59E0B', emoji: '🍹' },
    culture: { color: '#8B5CF6', emoji: '🏛️' },
    film: { color: '#EF4444', emoji: '🎬' },
    food: { color: '#10B981', emoji: '🍜' },
    travel: { color: '#0EA5E9', emoji: '✈️' },
    music: { color: '#EC4899', emoji: '🎵' },
}

export const getCategory = (category: string) =>
    categoryMeta[category] ?? { color: '#6C5CE7', emoji: '📍' };
