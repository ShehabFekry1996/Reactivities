import { divIcon } from 'leaflet';
import { getCategory } from '../../features/activities/details/form/categoryOptions';

export const categoryIcon = (category?: string) => {
  const meta = getCategory(category ?? '');
  return divIcon({
    className: '',
    html: `<div class="category-marker" style="background:${meta.color}"><span>${meta.emoji}</span></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -34]
  });
}

export const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const tileAttribution = '&copy; OpenStreetMap contributors';
