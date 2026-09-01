export interface WorkItemData {
  id: string;
  image: string;
  alt: string;
  category: string;
  title: string;
  year?: string;
  context: string;
  credit: string;
}

export interface ProjectData {
  id: string;
  year: string;
  title: string;
  kind: string;
  place: string;
  showOnHome?: boolean;
}

export const workItems: WorkItemData[] = [
  {
    id: 'masker',
    image: 'https://images.squarespace-cdn.com/content/v1/5bf404ca70e8026f5a085d80/92c0dc63-a0bc-4686-81b0-d0bcc698c06b/Unknown.jpeg',
    alt: 'Lichtblauw en lila hoofdobject van Studio Wievien met kralen voor het gezicht',
    category: 'Masker / object',
    title: 'Masker',
    context: 'Studio Wievien',
    credit: 'Beeld via FASHIONCLASH',
  },
  {
    id: 'juunam-2025',
    image: 'https://images.squarespace-cdn.com/content/v1/5bf404ca70e8026f5a085d80/1767703456320-YMAS5DUHNMV0VR29ZRLF/MVS_20251120_0093_WEB.jpg',
    alt: 'Presentatie bij Juunam tijdens FASHIONCLASH Festival 2025',
    category: 'Presentatie',
    title: 'Juunam',
    year: '2025',
    context: 'FASHIONCLASH Festival',
    credit: 'Foto: Mitch van Schijndel',
  },
  {
    id: 'carnavalproject-2026',
    image: 'https://images.squarespace-cdn.com/content/v1/5bf404ca70e8026f5a085d80/1772014449994-RK7LCIFVZK23UJQJ4WWS/538A4606_JonathanWiddershoven.jpg',
    alt: 'Beeld uit het FASHIONCLASH carnavalproject 2026',
    category: 'Project',
    title: 'Carnavalproject',
    year: '2026',
    context: 'FASHIONCLASH',
    credit: 'Foto: Jonathan Widdershoven',
  },
];

function requireWork(id: string): WorkItemData {
  const item = workItems.find((work) => work.id === id);
  if (!item) throw new Error(`Unknown work item: ${id}`);
  return item;
}

export const heroWork = requireWork('masker');
export const homepageWork = [requireWork('juunam-2025'), requireWork('carnavalproject-2026')];

export const projects: ProjectData[] = [
  {
    id: 'ecopolitan-cover-2026',
    year: '2026',
    title: 'Fancy Boogers · cover ECOPOLITAN #7',
    kind: 'Kleding / publicatie',
    place: 'ECOPOLITAN',
    showOnHome: true,
  },
  {
    id: 'carnavalproject-2026',
    year: '2026',
    title: 'Carnavalproject',
    kind: 'Project',
    place: 'FASHIONCLASH',
    showOnHome: true,
  },
  {
    id: 'juunam-2025',
    year: '2025',
    title: 'Presentatie bij Juunam',
    kind: 'Presentatie',
    place: 'FASHIONCLASH Festival',
    showOnHome: true,
  },
  {
    id: 'fashion-makes-sense-2025',
    year: '2025',
    title: 'Fashion Makes Sense',
    kind: 'Talk / participatie',
    place: 'FASHIONCLASH',
  },
  {
    id: 'new-fashion-narratives-2024',
    year: '2024',
    title: 'New Fashion Narratives',
    kind: 'Presentatie',
    place: 'Bureau Europa',
    showOnHome: true,
  },
];

export const homepageProjects = projects.filter((project) => project.showOnHome);
