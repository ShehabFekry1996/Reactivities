type CategoryMeta = { text: string; color: string; emoji: string; photos: string[] };

export const categoryMeta: Record<string, CategoryMeta> = {
    football: { text: 'Football', color: '#16A34A', emoji: '⚽', photos: ['photo-1489944440615-453fc2b6a9a9', 'photo-1522778119026-d647f0596c20', 'photo-1434648957308-5e6a859697e8', 'photo-1629217855633-79a6925d6c47', 'photo-1563299796-b729d0af54a5'] },
    food: { text: 'Food', color: '#F97316', emoji: '🍜', photos: ['photo-1504754524776-8f4f37790ca0', 'photo-1493770348161-369560ae357d', 'photo-1547573854-74d2a71d0826', 'photo-1587574293340-e0011c4e8ecf', 'photo-1556403806-90f55c9db1e1'] },
    music: { text: 'Music', color: '#EC4899', emoji: '🎵', photos: ['photo-1470229722913-7c0e2dbbafd3', 'photo-1429962714451-bb934ecdc4ec', 'photo-1540039155733-5bb30b53aa14', 'photo-1514525253161-7a46d19cd819', 'photo-1524368535928-5b5e00ddc76b'] },
    film: { text: 'Film', color: '#EF4444', emoji: '🎬', photos: ['photo-1489599849927-2ee91cede3ba', 'photo-1561722798-9a732d141027', 'photo-1478720568477-152d9b164e26', 'photo-1608170825938-a8ea0305d46c', 'photo-1563381013529-1c922c80ac8d'] },
    travel: { text: 'Travel', color: '#0EA5E9', emoji: '✈️', photos: ['photo-1476514525535-07fb3b4ae5f1', 'photo-1469854523086-cc02fe5d8800', 'photo-1604156789095-3348604c0f43', 'photo-1506197603052-3cc9c3a201bd', 'photo-1527824404775-dce343118ebc'] },
    culture: { text: 'Culture', color: '#8B5CF6', emoji: '🏛️', photos: ['photo-1491156855053-9cdff72c7f85', 'photo-1554907984-15263bfd63bd', 'photo-1572953109213-3be62398eb95', 'photo-1544213456-bc37cb97df74', 'photo-1534445291134-f70b7a81f691'] },
    art: { text: 'Art', color: '#D946EF', emoji: '🎨', photos: ['photo-1569783721854-33a99b4c0bae', 'photo-1606819717115-9159c900370b', 'photo-1500628550463-c8881a54d4d4', 'photo-1653987255814-3b4c05832660', 'photo-1628359355624-855775b5c9c4'] },
    gaming: { text: 'Gaming', color: '#6366F1', emoji: '🎮', photos: ['photo-1511512578047-dfb367046420', 'photo-1542751371-adc38448a05e', 'photo-1493711662062-fa541adb3fc8', 'photo-1612287230202-1ff1d85d1bdf', 'photo-1534423861386-85a16f5d13fd'] },
    fitness: { text: 'Fitness', color: '#14B8A6', emoji: '🧘', photos: ['photo-1602192509154-0b900ee1f851', 'photo-1502904550040-7534597429ae', 'photo-1561579890-3ace74d8e378', 'photo-1552674605-db6ffd4facb5', 'photo-1590333748338-d629e4564ad9'] },
    hiking: { text: 'Hiking', color: '#65A30D', emoji: '🥾', photos: ['photo-1551632811-561732d1e306', 'photo-1501555088652-021faa106b9b', 'photo-1519904981063-b0cf448d479e', 'photo-1526772662000-3f88f10405ff', 'photo-1550486686-a496af34a2d5'] },
    tech: { text: 'Tech', color: '#3B82F6', emoji: '💻', photos: ['photo-1558008258-3256797b43f3', 'photo-1556761175-5973dc0f32e7', 'photo-1563461660947-507ef49e9c47', 'photo-1555066931-4365d14bab8c', 'photo-1576085898323-218337e3e43c'] },
    photography: { text: 'Photography', color: '#F59E0B', emoji: '📷', photos: ['photo-1542038784456-1ea8e935640e', 'photo-1541516160071-4bb0c5af65ba', 'photo-1513031300226-c8fb12de9ade', 'photo-1493863641943-9b68992a8d07', 'photo-1488684430052-f2d92fb178c2'] },
}

export const categoryOptions = Object.entries(categoryMeta).map(([value, meta]) => ({ text: meta.text, value }));

export const getCategory = (category: string) =>
    categoryMeta[category] ?? { text: category, color: '#6C5CE7', emoji: '📍', photos: categoryMeta.travel.photos };

export const categoryImage = (category: string, width = 1200, index = 0) => {
    const photos = getCategory(category).photos;
    return `https://images.unsplash.com/${photos[index % photos.length]}?auto=format&fit=crop&w=${width}&q=70`;
}
