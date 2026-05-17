export type ActivityType = 'transport' | 'sightseeing' | 'food' | 'accommodation' | 'leisure';

export interface Activity {
  time: string;
  title: string;
  description?: string;
  type: ActivityType;
  isFreeEntry?: boolean;
  freeEntryNote?: string;
  aiCity?: string;
}

export interface TripDay {
  id: string;
  date: string; // YYYY-MM-DD
  dayLabel: string;
  dayNumber: number;
  city: string;
  cityEmoji: string;
  activities: Activity[];
}

export interface Attraction {
  id: string;
  name: string;
  city: string;
  dayNumbers: number[];
  freeEntry?: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  checkIn: string;
  checkOut: string;
  nights: number;
}

export interface TransportItem {
  id: string;
  type: 'flight' | 'train' | 'bus';
  from: string;
  to: string;
  date: string;
  departTime: string;
  arriveTime: string;
  operator: string;
  notes?: string;
  ticketKey?: string;
}

export const TRIP_START = '2026-05-20';
export const TRIP_END = '2026-06-03';

export const CITIES = [
  { name: 'Barcelona', emoji: '🏛️', days: 'May 20–23 & Jun 3' },
  { name: 'Granada', emoji: '🕌', days: 'May 24–25' },
  { name: 'Córdoba', emoji: '🌸', days: 'May 26–27' },
  { name: 'Sevilla', emoji: '💃', days: 'May 27–29' },
  { name: 'Ronda', emoji: '🌉', days: 'May 29 (day trip)' },
  { name: 'Madrid', emoji: '👑', days: 'May 30 – Jun 2' },
];

export const TRIP_DAYS: TripDay[] = [
  {
    id: 'd1', date: '2026-05-20', dayLabel: 'May 20 (Wed)', dayNumber: 1,
    city: 'Barcelona', cityEmoji: '🏛️',
    activities: [
      { time: '9:20 AM', title: 'Arrive Barcelona', description: 'Flight AC820 from Toronto (YYZ→BCN) lands', type: 'transport' },
      { time: '11:00 AM', title: 'Airport Bus A1', description: 'Bus to Plaça de Catalunya terminal, buy return ticket. Check in Hotel Cortés.', type: 'transport' },
      { time: '12:00 PM', title: 'Lunch', description: 'Buy family 8-trip transit card (T-Casual) — valid 75 min with transfers', type: 'food' },
      { time: '2:00 PM', title: 'Gothic Quarter', description: 'Cathedral, Pont del Bisbe (Kiss Wall), neighbourhood stroll', type: 'sightseeing' },
      { time: '3:00 PM', title: 'Hospital de la Santa Creu i Sant Pau', description: 'UNESCO-listed Art Nouveau complex', type: 'sightseeing' },
      { time: '7:00 PM', title: 'Tibidabo Hill', description: 'Sacred Heart of Jesus church — panoramic sunset views over Barcelona', type: 'sightseeing' },
    ],
  },
  {
    id: 'd2', date: '2026-05-21', dayLabel: 'May 21 (Thu)', dayNumber: 2,
    city: 'Barcelona', cityEmoji: '🏛️',
    activities: [
      { time: '7:00 AM', title: 'Sunrise at the Beach', description: 'Barceloneta Beach sunrise + Los Cubos (Four Cubes) sculpture', type: 'leisure' },
      { time: '9:15 AM', title: 'Casa Milà (La Pedrera)', description: 'Gaudí masterpiece — rooftop & interior', type: 'sightseeing' },
      { time: '11:15 AM', title: 'Casa Batlló', description: "Gaudí's iconic facade on Passeig de Gràcia", type: 'sightseeing' },
      { time: '3:45 PM', title: 'Sagrada Família', description: "Gaudí's unfinished basilica — book tickets in advance!", type: 'sightseeing' },
      { time: '7:00 PM', title: 'Picasso Museum', description: 'Free every Thursday after 7 PM', type: 'sightseeing', isFreeEntry: true, freeEntryNote: 'Free Thu after 7 PM' },
    ],
  },
  {
    id: 'd3', date: '2026-05-22', dayLabel: 'May 22 (Fri)', dayNumber: 3,
    city: 'Barcelona', cityEmoji: '🏛️',
    activities: [
      { time: '8:45 AM', title: 'Bus to Tossa de Mar', description: 'Teisa/Alsa bus from Estació del Nord (Barcelona). ~90 min journey along the Costa Brava coast. Buy ticket at the station or online.', type: 'transport' },
      { time: '10:00 AM', title: 'Vila Vella & Museu Municipal', description: "Enter the medieval old town through the arched gate. Museu Municipal houses Roman mosaics and a collection of 20th-century paintings. Free to walk the old town streets.", type: 'sightseeing' },
      { time: '11:00 AM', title: 'Castle Fortress Walls', description: 'Walk the 12th-century medieval ramparts (Vila Vella fortified walls) for panoramic views of the turquoise coves below. The lighthouse at the top offers the best photo spot.', type: 'sightseeing' },
      { time: '1:00 PM', title: 'Lunch in Tossa', description: 'Fresh seafood along the beachfront. Recommended: grilled fish, fideuà (seafood noodles), or local tapas near Platja Gran.', type: 'food', aiCity: 'Tossa de Mar' },
      { time: '2:30 PM', title: 'Platja Gran Beach', description: 'Main beach — calm, clear water backed by the castle walls. Great for swimming. Smaller cove Platja Mar Menuda (5 min walk north) is quieter.', type: 'leisure' },
      { time: '3:45 PM', title: 'Return Bus to Barcelona', description: 'Teisa/Alsa bus back to Estació del Nord. ~90 min. Check the return schedule at the bus stop near the main roundabout.', type: 'transport' },
      { time: '5:00 PM', title: 'Park Güell', description: "Gaudí's colorful mosaic park with panoramic city views", type: 'sightseeing' },
    ],
  },
  {
    id: 'd4', date: '2026-05-23', dayLabel: 'May 23 (Sat)', dayNumber: 4,
    city: 'Barcelona', cityEmoji: '🏛️',
    activities: [
      { time: '7:45 AM', title: 'Head to Plaça Espanya', description: 'Take metro L1 or L3 to Espanya station. Head to the FGC (Ferrocarrils de la Generalitat) platform — separate from the metro, follow signs for FGC.', type: 'transport' },
      { time: '8:32 AM', title: 'FGC R5 Train to Montserrat', description: 'Departs Plaça Espanya every hour at :32. Get off at Aeri de Montserrat station (~65 min journey). Validate your all-inclusive Montserrat ticket before boarding.', type: 'transport' },
      { time: '9:40 AM', title: 'Cable Car (Aeri de Montserrat)', description: 'Board the aerial cable car at the station. ~5 min ride up the dramatic rocky mountainside to the monastery. Runs every 15 min. Stunning views of the serrated peaks.', type: 'sightseeing' },
      { time: '9:50 AM', title: 'Atrium & Basilica Facade', description: 'Arrive at Plaça de Santa Maria — the main courtyard atrium. Admire the 16th-century Gothic facade and the Romanesque doorway of Sant Miquel. The atrium connects the main square to the Basilica entrance.', type: 'sightseeing' },
      { time: '10:10 AM', title: 'Montserrat Museum', description: 'World-class collection across two floors: Egyptian & Near-Eastern antiquities (mummies, sarcophagi), and fine art including works by El Greco, Caravaggio, Monet, Picasso, and Dalí. Allow 60–90 min.', type: 'sightseeing' },
      { time: '11:45 AM', title: 'Basilica & La Moreneta', description: "Enter the Basilica to see the Black Madonna (La Moreneta) — Catalonia's patron saint, housed in the Cambril chapel above the main altar. Queue moves steadily; arrive early to avoid crowds. The Basilica interior has beautiful mosaics and gilded altar.", type: 'sightseeing' },
      { time: '12:30 PM', title: 'Lunch at the Monastery', description: "Cafeteria Self-Service or Restaurant Montserrat on the main plaza. Try the local Pa amb tomàquet (bread with tomato), Catalan stews, or the monastery's own wine and liqueur.", type: 'food', aiCity: 'Montserrat' },
      { time: '1:45 PM', title: 'Sant Joan Funicular & Trails', description: 'Take the Sant Joan funicular up another 250 m to the top station. Short hike (20 min) to Sant Joan Chapel with breathtaking 360° views of the Pyrenees and Barcelona coast. Or hike down the Santa Cova path (45 min, 15 Mysteries rosary sculptures).', type: 'leisure' },
      { time: '3:45 PM', title: 'Cable Car Back Down', description: 'Return to Aeri de Montserrat station via cable car. Allow 15–20 min walk from the monastery to the cable car station.', type: 'transport' },
      { time: '4:44 PM', title: 'FGC R5 Train Back to Barcelona', description: 'Departs Aeri de Montserrat every hour at :44. ~65 min back to Plaça Espanya, Barcelona. Arrive ~5:50 PM.', type: 'transport' },
    ],
  },
  {
    id: 'd5', date: '2026-05-24', dayLabel: 'May 24 (Sun)', dayNumber: 5,
    city: 'Granada', cityEmoji: '🕌',
    activities: [
      { time: '12:00 PM', title: 'Fly to Granada', description: 'Flight VY2012 Barcelona→Granada (12:00–13:35)', type: 'transport' },
      { time: '1:00 PM', title: 'Lunch on plane', description: 'Bring your own food', type: 'food' },
      { time: '2:00 PM', title: 'Arrive Granada', description: 'Airport bus 0245 to city centre (cathedral stop). Pick up Granada Card. Walk to hotel.', type: 'transport' },
      { time: '2:30 PM', title: 'Check in Hotel', description: 'Pensión Boutique Gomérez Gallegos', type: 'accommodation' },
      { time: '3:00 PM', title: 'Carthusian Monastery & Churches', description: 'Cartuja Monastery, Basílica de San Juan de Dios, San Jerónimo Monastery', type: 'sightseeing' },
      { time: '6:00 PM', title: 'Dinner', type: 'food' },
      { time: '7:40 PM', title: 'Arab Baths (Hammam)', description: 'Hammam Al Ándalus — book 7:40 PM entry slot in advance', type: 'leisure' },
      { time: '10:00 PM', title: 'Back to hotel', type: 'accommodation' },
    ],
  },
  {
    id: 'd6', date: '2026-05-25', dayLabel: 'May 25 (Mon)', dayNumber: 6,
    city: 'Granada', cityEmoji: '🕌',
    activities: [
      { time: '10:00 AM', title: 'Granada Cathedral & Royal Chapel', description: 'Royal tombs of Ferdinand and Isabella', type: 'sightseeing' },
      { time: '12:00 PM', title: 'Lunch', type: 'food' },
      { time: '2:00 PM', title: 'Alhambra', description: 'Bus C32 to Justice Gate. Alhambra palace & Generalife gardens — book way in advance!', type: 'sightseeing' },
      { time: '5:00 PM', title: 'Alhambra — Palacios Nazaríes', description: 'The Nasrid Palaces, most intricate section of the Alhambra', type: 'sightseeing' },
      { time: '6:00 PM', title: 'Dinner', type: 'food' },
      { time: '8:00 PM', title: 'San Nicolás Viewpoint', description: 'Bus to Mirador San Nicolás for sunset over the Alhambra', type: 'sightseeing' },
      { time: '10:00 PM', title: 'Back to hotel', type: 'accommodation' },
    ],
  },
  {
    id: 'd7', date: '2026-05-26', dayLabel: 'May 26 (Tue)', dayNumber: 7,
    city: 'Córdoba', cityEmoji: '🌸',
    activities: [
      { time: '9:00 AM', title: 'Granada Mini Train Tour', description: '1.5-hour sightseeing train around Granada before departure', type: 'sightseeing' },
      { time: '12:48 PM', title: 'Train to Córdoba', description: 'Granada→Córdoba (12:48–14:46)', type: 'transport' },
      { time: '3:00 PM', title: 'Check in Hotel', description: 'Eurostars Conquistador', type: 'accommodation' },
      { time: '4:00 PM', title: 'Córdoba Old Town', description: 'Calleja de las Flores, Jewish Quarter, Roman Bridge, Alcázar de los Reyes Cristianos', type: 'sightseeing' },
    ],
  },
  {
    id: 'd8', date: '2026-05-27', dayLabel: 'May 27 (Wed)', dayNumber: 8,
    city: 'Sevilla', cityEmoji: '💃',
    activities: [
      { time: '8:30 AM', title: 'Mezquita-Catedral', description: 'Free entry 8:30–9:30 AM. Stunning mosque-cathedral hybrid in Córdoba.', type: 'sightseeing', isFreeEntry: true, freeEntryNote: 'Free Mon–Sat 8:30–9:30 AM' },
      { time: '11:20 AM', title: 'Train to Sevilla', description: 'Córdoba→Sevilla (11:20–12:28)', type: 'transport' },
      { time: '2:00 PM', title: 'Buy Cathedral Combo Ticket', description: 'At Iglesia Colegial del Divino Salvador — combo for Cathedral + Giralda + Alcázar', type: 'sightseeing' },
      { time: '3:00 PM', title: 'Check in', description: 'Rey de Sevilla Flats - Arenal', type: 'accommodation' },
      { time: '5:45 PM', title: 'Plaza de Toros (Bullring)', description: 'Free entry every Wednesday after 17:45', type: 'sightseeing', isFreeEntry: true, freeEntryNote: 'Free Wed after 5:45 PM' },
      { time: '7:00 PM', title: 'Teatro Flamenco Sevilla', description: 'Live flamenco show at 19:00 — book tickets in advance', type: 'leisure' },
      { time: '9:00 PM', title: 'Metropol Parasol', description: 'Las Setas — rooftop walkway with night views over Sevilla', type: 'sightseeing' },
    ],
  },
  {
    id: 'd9', date: '2026-05-28', dayLabel: 'May 28 (Thu)', dayNumber: 9,
    city: 'Sevilla', cityEmoji: '💃',
    activities: [
      { time: '9:00 AM', title: 'Sevilla Cathedral, Royal Alcázar & Giralda', description: 'Cathedral 9 AM, Royal Alcázar at 11:30, Giralda tower & Sevilla University', type: 'sightseeing' },
      { time: '1:00 PM', title: 'Lunch', type: 'food' },
      { time: '6:00 PM', title: 'María Luisa Park', description: 'Beautiful park with fountains and gardens', type: 'leisure' },
      { time: '7:00 PM', title: 'Plaza de España', description: "Sevilla's grand semicircular plaza — stunning tile work and canal", type: 'sightseeing' },
    ],
  },
  {
    id: 'd10', date: '2026-05-29', dayLabel: 'May 29 (Fri)', dayNumber: 10,
    city: 'Ronda', cityEmoji: '🌉',
    activities: [
      { time: '8:00 AM', title: 'DAMAS Bus to Ronda', description: 'Board at Prado de San Sebastián bus station, Sevilla. ~2 hr journey through Andalusian hill country. Buy ticket at the station or online at damas-sa.es. Return buses at 16:30 & 18:00 — check schedule at the Ronda bus station.', type: 'transport' },
      { time: '10:15 AM', title: 'Puente Nuevo & El Tajo Gorge', description: "Ronda's iconic 18th-century bridge spanning 120 m across the El Tajo gorge. Cross the bridge and head to Mirador del Puente Nuevo (on the La Ciudad side) for the classic postcard view. The gorge drops 120 m straight down — genuinely breathtaking.", type: 'sightseeing' },
      { time: '11:15 AM', title: 'Plaza de Toros — Ronda Bullring', description: "Spain's oldest bullring (built 1785) and birthplace of modern bullfighting. The Romero family invented the style still used today. Visit the museum inside — goya-era costumes, vintage posters, memorabilia. The sand arena and neoclassical grandstand are stunning.", type: 'sightseeing' },
      { time: '12:15 PM', title: 'Arab Baths (Baños Árabes)', description: "Among the best-preserved Moorish baths in Spain (13th century). Honeycomb-vaulted ceilings with star-shaped skylights that filter soft natural light into the cold, warm, and hot pools. Wander the adjacent Barrio de San Francisco alleys and the Mondragón Palace courtyard.", type: 'sightseeing' },
      { time: '1:30 PM', title: 'Lunch in Ronda', description: 'Ronda cuisine is hearty mountain fare. Try rabo de toro (slow-braised oxtail stew), berza rondena (chickpea & meat stew), or secreto ibérico. Restaurants along Calle Nueva and near Plaza del Socorro are good bets.', type: 'food', aiCity: 'Ronda' },
      { time: '3:00 PM', title: 'Casa del Rey Moro & Hanging Gardens', description: "Descend 231 steps carved into the cliff face to La Mina — a secret Moorish water mine used to haul water from the river below. The hanging gardens cling to the gorge wall at dramatic height. Spectacular and rarely crowded.", type: 'sightseeing' },
      { time: '4:00 PM', title: 'Alameda del Tajo & Gorge Viewpoints', description: 'Stroll the 19th-century Alameda promenade lined with orange trees and roses. Continue to Mirador de Aldehuela for the best full-frame view of Puente Nuevo against the gorge. Watch for vultures and eagles circling below the cliff edge.', type: 'leisure' },
      { time: '5:00 PM', title: 'Bus Back to Sevilla', description: 'Return DAMAS bus from Ronda bus station. ~2 hr journey back to Prado de San Sebastián, Sevilla.', type: 'transport' },
    ],
  },
  {
    id: 'd11', date: '2026-05-30', dayLabel: 'May 30 (Sat)', dayNumber: 11,
    city: 'Madrid', cityEmoji: '👑',
    activities: [
      { time: '7:30 AM', title: 'Train Sevilla → Madrid', description: 'High-speed AVE train', type: 'transport' },
      { time: '12:00 PM', title: 'Check in', description: 'Mediodía Hotel', type: 'accommodation' },
      { time: '1:00 PM', title: 'Retiro Park & Squares', description: 'Parque del Retiro, Plaza de la Independencia, Fuente de Cibeles, Puerta del Sol, Plaza Mayor', type: 'sightseeing' },
      { time: '7:00 PM', title: 'Reina Sofía Museum', description: 'Guernica by Picasso. Free after 7 PM Mon/Wed–Sat.', type: 'sightseeing', isFreeEntry: true, freeEntryNote: 'Free Mon/Wed–Sat after 7 PM' },
    ],
  },
  {
    id: 'd12', date: '2026-05-31', dayLabel: 'May 31 (Sun)', dayNumber: 12,
    city: 'Madrid', cityEmoji: '👑',
    activities: [
      { time: '9:00 AM', title: 'Madrid Sightseeing', description: 'Templo de Debod, Cerralbo Museum (free Sun, closes early), Cervantes Monument', type: 'sightseeing' },
      { time: '12:30 PM', title: 'Lunch', description: 'Chiangju Restaurant', type: 'food' },
      { time: '2:30 PM', title: 'Madrid Royal Palace & Almudena', description: 'Palacio Real at 14:30, Almudena Cathedral', type: 'sightseeing' },
      { time: '5:00 PM', title: 'Prado Museum', description: 'Free entry last 2 hours before closing', type: 'sightseeing', isFreeEntry: true, freeEntryNote: 'Free last 2 hrs (6–8 PM)' },
    ],
  },
  {
    id: 'd13', date: '2026-06-01', dayLabel: 'Jun 1 (Mon)', dayNumber: 13,
    city: 'Madrid', cityEmoji: '👑',
    activities: [
      { time: '9:00 AM', title: 'Toledo & Segovia Day Trip', description: 'Guided group tour — Toledo medieval city + Segovia Roman aqueduct & Alcázar', type: 'sightseeing' },
    ],
  },
  {
    id: 'd14', date: '2026-06-02', dayLabel: 'Jun 2 (Tue)', dayNumber: 14,
    city: 'Madrid', cityEmoji: '👑',
    activities: [
      { time: '9:00 AM', title: 'Bernabéu Stadium, El Corte Inglés & Gran Vía', description: "Real Madrid stadium tour, famous department store, Madrid's main boulevard", type: 'sightseeing' },
      { time: '5:00 PM', title: 'Prado Museum', description: 'Free entry last 2 hours before closing', type: 'sightseeing', isFreeEntry: true, freeEntryNote: 'Free last 2 hrs (6–8 PM)' },
      { time: '7:00 PM', title: 'Train Madrid → Barcelona', description: 'Madrid Atocha → Barcelona Sants overnight', type: 'transport' },
      { time: '8:00 PM', title: 'Check in Airport Hotel', description: 'Alberg Centre Esplai — near Barcelona airport', type: 'accommodation' },
    ],
  },
  {
    id: 'd15', date: '2026-06-03', dayLabel: 'Jun 3 (Wed)', dayNumber: 15,
    city: 'Barcelona', cityEmoji: '🏛️',
    activities: [
      { time: '11:00 AM', title: 'Head to Airport', type: 'transport' },
      { time: '1:15 PM', title: 'Fly Home', description: 'Flight AC821 Barcelona→Toronto (BCN→YYZ) 13:15–16:00', type: 'transport' },
    ],
  },
];

export const ATTRACTIONS: Attraction[] = [
  { id: 'a1',  name: 'Gothic Quarter',                  city: 'Barcelona', dayNumbers: [1] },
  { id: 'a2',  name: 'Park Güell',                       city: 'Barcelona', dayNumbers: [3] },
  { id: 'a3',  name: 'Casa Milà (La Pedrera)',            city: 'Barcelona', dayNumbers: [2] },
  { id: 'a4',  name: 'Casa Batlló',                      city: 'Barcelona', dayNumbers: [2] },
  { id: 'a5',  name: 'Hospital de la Santa Creu i Sant Pau', city: 'Barcelona', dayNumbers: [1] },
  { id: 'a6',  name: 'Sagrada Família',                  city: 'Barcelona', dayNumbers: [2] },
  { id: 'a7',  name: 'Picasso Museum',                   city: 'Barcelona', dayNumbers: [2], freeEntry: 'Free Thu after 7 PM' },
  { id: 'a8',  name: 'Tossa de Mar Day Trip',            city: 'Barcelona', dayNumbers: [3] },
  { id: 'a9',  name: 'Tibidabo Hill & Sacred Heart',     city: 'Barcelona', dayNumbers: [1] },
  { id: 'a10', name: 'Montserrat Day Trip',              city: 'Barcelona', dayNumbers: [4] },
  { id: 'a11', name: 'Arab Baths (Hammam)',              city: 'Granada',   dayNumbers: [5] },
  { id: 'a12', name: 'Granada Cathedral & Royal Chapel', city: 'Granada',   dayNumbers: [6] },
  { id: 'a13', name: 'Alhambra & Generalife',            city: 'Granada',   dayNumbers: [6] },
  { id: 'a14', name: 'San Nicolás Viewpoint (sunset)',   city: 'Granada',   dayNumbers: [6] },
  { id: 'a15', name: 'Córdoba Old Town & Roman Bridge',  city: 'Córdoba',   dayNumbers: [7] },
  { id: 'a16', name: 'Mezquita-Catedral',                city: 'Córdoba',   dayNumbers: [8], freeEntry: 'Free Mon–Sat 8:30–9:30 AM' },
  { id: 'a17', name: 'Plaza de Toros (Bullring)',        city: 'Sevilla',   dayNumbers: [8], freeEntry: 'Free Wed after 5:45 PM' },
  { id: 'a18', name: 'Teatro Flamenco Sevilla',          city: 'Sevilla',   dayNumbers: [8] },
  { id: 'a19', name: 'Metropol Parasol (Las Setas)',     city: 'Sevilla',   dayNumbers: [8] },
  { id: 'a20', name: 'Sevilla Cathedral & Giralda',      city: 'Sevilla',   dayNumbers: [9] },
  { id: 'a21', name: 'Royal Alcázar of Sevilla',         city: 'Sevilla',   dayNumbers: [9] },
  { id: 'a22', name: 'Plaza de España (Sevilla)',        city: 'Sevilla',   dayNumbers: [9] },
  { id: 'a23', name: 'Puente Nuevo & El Tajo Gorge',    city: 'Ronda',     dayNumbers: [10] },
  { id: 'a24', name: "Ronda's Oldest Bullring",          city: 'Ronda',     dayNumbers: [10] },
  { id: 'a25', name: 'Retiro Park & Squares',            city: 'Madrid',    dayNumbers: [11] },
  { id: 'a26', name: 'Templo de Debod',                  city: 'Madrid',    dayNumbers: [12] },
  { id: 'a27', name: 'Cerralbo Museum',                  city: 'Madrid',    dayNumbers: [12] },
  { id: 'a28', name: 'Madrid Royal Palace & Almudena',   city: 'Madrid',    dayNumbers: [12] },
  { id: 'a29', name: 'Prado Museum',                     city: 'Madrid',    dayNumbers: [12, 14], freeEntry: 'Free last 2 hrs (6–8 PM)' },
  { id: 'a30', name: 'Reina Sofía Museum',               city: 'Madrid',    dayNumbers: [11], freeEntry: 'Free Mon/Wed–Sat after 7 PM' },
  { id: 'a31', name: 'Toledo & Segovia Day Trip',        city: 'Madrid',    dayNumbers: [13] },
  { id: 'a32', name: 'Bernabéu Stadium & Gran Vía',     city: 'Madrid',    dayNumbers: [14] },
];

export const HOTELS: Hotel[] = [
  { id: 'h1', name: 'Hotel Cortés',                       city: 'Barcelona', checkIn: 'May 20', checkOut: 'May 24', nights: 4 },
  { id: 'h2', name: 'Pensión Boutique Gomérez Gallegos',  city: 'Granada',   checkIn: 'May 24', checkOut: 'May 26', nights: 2 },
  { id: 'h3', name: 'Eurostars Conquistador',             city: 'Córdoba',   checkIn: 'May 26', checkOut: 'May 27', nights: 1 },
  { id: 'h4', name: 'Rey de Sevilla Flats - Arenal',      city: 'Sevilla',   checkIn: 'May 27', checkOut: 'May 30', nights: 3 },
  { id: 'h5', name: 'Mediodía Hotel',                     city: 'Madrid',    checkIn: 'May 30', checkOut: 'Jun 2',  nights: 3 },
  { id: 'h6', name: 'Alberg Centre Esplai',               city: 'Barcelona', checkIn: 'Jun 2',  checkOut: 'Jun 3',  nights: 1 },
];

export const TRANSPORT: TransportItem[] = [
  { id: 't1',  type: 'flight', from: 'Toronto (YYZ)',          to: 'Barcelona (BCN)',       date: 'May 19–20', departTime: '19:30',      arriveTime: '9:20 (+1)', operator: 'Air Canada AC820' },
  { id: 't2',  type: 'bus',    from: 'Barcelona Airport',      to: 'City Centre (Pl. Catalunya)', date: 'May 20', departTime: 'On arrival', arriveTime: '~11:00 AM', operator: 'Aerobus A1', notes: 'Buy return ticket', ticketKey: 'barcelona-2026-05-20-11am' },
  { id: 't2b', type: 'bus',    from: 'City Centre (Pl. Catalunya)', to: 'Barcelona Airport', date: 'May 24',    departTime: '9:30',       arriveTime: '~10:15',    operator: 'Aerobus A1', ticketKey: 'granada-2026-05-24-9_30am' },
  { id: 't3',  type: 'flight', from: 'Barcelona (BCN)',        to: 'Granada (GRX)',         date: 'May 24',    departTime: '12:00',      arriveTime: '13:35',     operator: 'Vueling VY2012', ticketKey: 'granada-2026-05-24-12pm' },
  { id: 't4',  type: 'bus',    from: 'Granada Airport',        to: 'City Centre (Cathedral)', date: 'May 24',  departTime: 'On arrival', arriveTime: '~14:30',    operator: 'Bus 0245' },
  { id: 't5',  type: 'train',  from: 'Granada',                to: 'Córdoba',               date: 'May 26',    departTime: '12:48',      arriveTime: '14:46',     operator: 'Renfe',      ticketKey: 'cordoba-2026-05-26-12_48pm' },
  { id: 't6',  type: 'train',  from: 'Córdoba',                to: 'Sevilla',               date: 'May 27',    departTime: '11:20',      arriveTime: '12:28',     operator: 'Renfe',      ticketKey: 'sevilla-2026-05-27-11_20am' },
  { id: 't7',  type: 'bus',    from: 'Sevilla',                to: 'Ronda (day trip)',      date: 'May 29',    departTime: '9:00',       arriveTime: '~11:00',    operator: 'DAMAS Bus', notes: 'Return same day' },
  { id: 't8',  type: 'train',  from: 'Sevilla',                to: 'Madrid',                date: 'May 30',    departTime: '7:30',       arriveTime: '~11:00',    operator: 'Renfe AVE',  ticketKey: 'madrid-2026-05-30-7_30am' },
  { id: 't9',  type: 'train',  from: 'Madrid Atocha',          to: 'Barcelona Sants',       date: 'Jun 2',     departTime: '~19:00',     arriveTime: '~21:30',    operator: 'Renfe AVE',  ticketKey: 'madrid-2026-06-02-7pm' },
  { id: 't10', type: 'flight', from: 'Barcelona (BCN)',        to: 'Toronto (YYZ)',         date: 'Jun 3',     departTime: '13:15',      arriveTime: '16:00',     operator: 'Air Canada AC821' },
];
