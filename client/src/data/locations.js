export const locations = [
  {
    id: 'grand-line',
    name: 'Grand Line Harbor',
    anime: 'One Piece',
    description:
      'A lively harbor for pirate crews, treasure hunters, and adventure seekers.',
  },
  {
    id: 'mushi-forest',
    name: 'Mushi Forest',
    anime: 'Mushishi',
    description:
      'A quiet forest where nature, folklore, and mysterious phenomena meet.',
  },
  {
    id: 'european-archive',
    name: 'European Archive',
    anime: 'Master Keaton',
    description:
      'A gathering place for archaeology, history, mysteries, and investigation.',
  },
  {
    id: 'neo-tokyo',
    name: 'Neo Tokyo',
    anime: 'Anime Community',
    description:
      'A neon-lit hub for cosplay, screenings, gaming, and anime culture.',
  },
];

export function getLocationById(locationId) {
  return locations.find((location) => location.id === locationId);
}