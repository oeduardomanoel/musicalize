// Conteúdo e dados da Musicalize Camboriú. Edite aqui e rode `npm run build`.

export const SITE = 'https://www.musicalizecamboriu.com.br';

export const BIZ = {
  name: 'Musicalize Camboriú',
  legalish: 'Escola de Música Musicalize Camboriú',
  whatsapp: '5547988981229',
  phoneDisplay: '(47) 98898-1229',
  phoneE164: '+5547988981229',
  street: 'Rua Gustavo Richard, 289, 2º andar',
  district: 'Centro',
  city: 'Camboriú',
  state: 'SC',
  country: 'BR',
  instagram: 'https://www.instagram.com/musicalizecamboriu/',
  instagramHandle: '@musicalizecamboriu',
  facebook: 'https://www.facebook.com/p/Escola-de-M%C3%BAsica-Musicalize-Cambori%C3%BA-100067601375472/',
  network: 'https://www.escolamusicalize.com/',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Musicalize+Cambori%C3%BA+Rua+Gustavo+Richard+289+Cambori%C3%BA+SC',
  mapsEmbed: 'https://www.google.com/maps?q=Rua+Gustavo+Richard,+289,+Centro,+Cambori%C3%BA+-+SC&output=embed',
  students: 3000,
  units: ['Camboriú', 'Itajaí', 'Itapema', 'Joinville', 'Tijucas'],
};

export const wa = (text) => `https://wa.me/${BIZ.whatsapp}?text=${encodeURIComponent(text)}`;
export const WA_DEFAULT = wa('Oi! Vim pelo site e quero agendar uma aula experimental na Musicalize Camboriú.');

// Imagens da rede Musicalize (Cloudinary, com otimização automática f_auto/q_auto)
const CL = 'https://res.cloudinary.com/dscwgkjcm/image/upload';
export const cl = (path, w) => `${CL}/f_auto,q_auto,c_limit,w_${w}/${path}`;
export const IMG = {
  logo: `${CL}/f_auto,q_auto,h_96/v1771304645/logo_musicalize_certa_AMARELA_NOVO_n7bvld.png`,
  hero: 'v1774739784/IMG_1078_1_l63wqj.jpg',
  stage: 'v1774739439/_DSC0017_weekk1.jpg',
  method: 'v1774737277/IMG_0330_ry9g7n.jpg',
  courses: 'v1774802566/IMG_7875_jbskw0.jpg',
};

// Fotos reais da unidade Camboriú (Wix CDN, com conversão automática de formato)
export const wix = (id, w, h) => `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},al_c,q_80,enc_auto/${id}`;
const p = (hash) => `d411cd_${hash}f000.jpg`;

export const POSTERS = [
  { id: p('7df9ac554da44d38a8723ce390755262'), label: 'Guitarra', c: 'guitarra' },
  { id: p('0561fd5e4ba543b494298dbf2610045f'), label: 'Violão', c: 'violao' },
  { id: p('5f96696390f34ab183818007d0445cc2'), label: 'Canto', c: 'canto' },
  { id: p('cf19fb0fe8734aa591dc8da8a4599fa3'), label: 'Bateria', c: 'bateria' },
  { id: p('98e0b6af042040d28472c76e5c67e9f2'), label: 'Teclado', c: 'teclado' },
  { id: p('5591771150be4019a12af645341a4181'), label: 'Baixo', c: 'baixo' },
  { id: p('ffe345a36b454edd87a52069babbd283'), label: 'Ukulele', c: 'ukulele' },
  { id: p('ae4949249db84384a03bfbeb672f21e2'), label: 'Violino', c: 'violino' },
  { id: p('f20eb188f25044d9b3371df8d5827516'), label: 'Guitarra', c: 'guitarra' },
  { id: p('506fbd34eb294bea9da695980053a587'), label: 'Violão', c: 'violao' },
  { id: p('dba176b2b975474fa123fbcc0b116c71'), label: 'Canto', c: 'canto' },
  { id: p('ec5e07d9d087413b99d2db3f73baac78'), label: 'Bateria', c: 'bateria' },
  { id: p('b3cf87c802f7480090c59ea695e98d73'), label: 'Teclado', c: 'teclado' },
  { id: p('e73e18e06e44493192b14f41a7c11136'), label: 'Baixo', c: 'baixo' },
  { id: p('42001450341e4b61aaa6c80286c96807'), label: 'Guitarra', c: 'guitarra' },
  { id: p('34a80b22e959426ea7d44399f5a44150'), label: 'Violão', c: 'violao' },
  { id: p('b3c02ea635cf4551a237a0c14586f150'), label: 'Canto', c: 'canto' },
  { id: p('10ef889d5de54d449adcdb41d573670b'), label: 'Teclado', c: 'teclado' },
  { id: p('475f429a997747fd93b23e9d5b181ca4'), label: 'Guitarra', c: 'guitarra' },
  { id: p('1ccf89ad36be4f9983d90215940efefd'), label: 'Violão', c: 'violao' },
  { id: p('94cd0cee100d4969bd831edf7e5e3066'), label: 'Canto', c: 'canto' },
  { id: p('6023337eb08846e7a64e3ed94e87f6f8'), label: 'Teclado', c: 'teclado' },
  { id: p('0922f9fb3974468495a17adaa03e4bc2'), label: 'Guitarra', c: 'guitarra' },
  { id: p('d9bc0c5de5194a77be6d78dbdebecbb6'), label: 'Violão', c: 'violao' },
  { id: p('6cf4bf3d10734e18b9d6126d3b18cbee'), label: 'Canto', c: 'canto' },
  { id: p('c9acbf37da524a3e96b50e7b88e3ec87'), label: 'Teclado', c: 'teclado' },
  { id: p('8231df337f6d46109a0535e2db90c099'), label: 'Guitarra', c: 'guitarra' },
  { id: p('7920a85c39544ea6bcc5d6f45b5afee5'), label: 'Violão', c: 'violao' },
  { id: p('f0b1320446ce4b0e847c5f3600f6d16f'), label: 'Guitarra', c: 'guitarra' },
  { id: p('a2153db10ac1435188e0a82808d89d1f'), label: 'Violão', c: 'violao' },
  { id: p('71baf7ed9eab41948d77e96d2176e426'), label: 'Teclado e canto', c: 'teclado' },
  { id: p('2ef26cb6e8494a2fb758bf80a1db5cd3'), label: 'Teclado e violão', c: 'teclado' },
];

export const MOMENTS = [
  { id: 'd411cd_6097d6e6bcba41c0bd3396f73ba98b66f003.jpg', label: 'Apresentação dos alunos' },
  { id: 'd411cd_4ae376b2d36b4186b140b8c2acadbb02~mv2.png', label: 'Entrega de certificados' },
  { id: 'd411cd_a429784bd5824d2b8f372e951a97eae6f003.jpg', label: 'Apresentação dos alunos' },
  { id: 'd411cd_efe5543ee8354c6f8388e50a0c10367c~mv2.png', label: 'Entrega de certificados' },
  { id: 'd411cd_ebb7b260b9bc4972a009d01fb0299fb1f003.jpg', label: 'Apresentação dos alunos' },
  { id: 'd411cd_f0a62d2dae19487ea310ad308437a111~mv2.png', label: 'Entrega de certificados' },
  { id: 'd411cd_cbb2998649414050a60b018385b0c26ff003.jpg', label: 'Apresentação dos alunos' },
  { id: 'd411cd_8de19de982a745cd86856d1ac1bd13f8~mv2.png', label: 'Entrega de certificados' },
  { id: 'd411cd_7568b9a5c0074ff5801d37fa24dc0e84f003.jpg', label: 'Apresentação dos alunos' },
  { id: 'd411cd_772257aa0dfc4cd680669c750bd2c47c~mv2.png', label: 'Entrega de certificados' },
];

// Cursos. A ordem define o grid da home (banda fica no meio, em destaque).
export const COURSES = [
  {
    slug: 'violao', name: 'Violão', program: 'Play Acoustic', nounLower: 'violão',
    card: 'Acordes, ritmo e repertório pra tocar com segurança desde o começo.',
    lead: 'Do primeiro acorde à música inteira. No Play Acoustic você aprende acordes, ritmo e repertório pra tocar com segurança desde o começo, com a teoria entrando quando faz sentido na mão.',
    skills: ['Acordes e trocas limpas', 'Batidas e levadas de ritmo', 'Dedilhado e independência das mãos', 'Repertório pra tocar de verdade'],
    stage: [['Audição PlayAcoustic', 'Palco'], ['Formação de banda', 'Play Band']],
  },
  {
    slug: 'guitarra', name: 'Guitarra', program: 'Play Guitar', nounLower: 'guitarra',
    card: 'Riffs, solos, timbre e as músicas que te fizeram querer tocar.',
    lead: 'Riffs, solos, timbre e as músicas que te fizeram pegar a guitarra pela primeira vez. A guitarra vai muito além dos acordes, e no Play Guitar a técnica anda junto com o repertório.',
    skills: ['Power chords e riffs', 'Escalas, solos e fraseado', 'Timbre, efeitos e pedais', 'Tocar junto com a banda'],
    stage: [['Audição PlayGuitar', 'Palco'], ['Talkshow Guitar Idol', 'Rede'], ['Musicalize Tour', 'Turnê']],
  },
  {
    slug: 'canto', name: 'Canto', program: 'Play Voice', nounLower: 'canto', h1: 'Aula de canto em Camboriú',
    card: 'Técnica vocal, afinação e confiança pra cantar na frente de gente.',
    lead: 'Cante com técnica, confiança e presença. O Play Voice trabalha respiração, afinação e interpretação em cima das músicas que você quer cantar.',
    skills: ['Respiração e apoio', 'Afinação e percepção', 'Extensão e cuidado com a voz', 'Interpretação e presença de palco'],
    stage: [['Audição PlayVoice', 'Palco'], ['Talkshow WAV, We Are Voices', 'Rede'], ['Show WorshipM', 'Gospel']],
  },
  {
    slug: 'bateria', name: 'Bateria', program: 'Play Drums', nounLower: 'bateria',
    card: 'Ritmo, coordenação e pegada com segurança desde o início.',
    lead: 'Ritmo, coordenação e pegada. No Play Drums você desenvolve o toque com segurança desde o início e aprende tocando junto com a música.',
    skills: ['Coordenação entre mãos e pés', 'Grooves dos estilos que você curte', 'Viradas e dinâmica', 'Tempo firme pra tocar em banda'],
    stage: [['Audição PlayBand', 'Palco'], ['Talkshow Somos Drummers', 'Rede'], ['Musicalize Tour', 'Turnê']],
  },
  {
    slug: 'banda', name: 'Banda', program: 'Play Band', nounLower: 'formação de bandas', h1: 'Formação de bandas em Camboriú', feature: true,
    card: 'Monte banda com outros alunos, ensaie e suba no palco de verdade. Foi assim que nasceu a Resistência, banda da Musicalize Camboriú no Musicalize Tour.',
    lead: 'Tocar sozinho é uma coisa. Tocar com mais gente é outra. No Play Band os alunos montam banda, ensaiam e vivem a experiência real de palco, show e público.',
    skills: ['Ensaio em grupo', 'Arranjo e divisão de partes', 'Entrosamento e dinâmica', 'Show com público de verdade'],
    stage: [['Audição PlayBand', 'Palco'], ['Musicalize Tour', 'Turnê'], ['Musicalize Festival', 'Festival']],
  },
  {
    slug: 'teclado', name: 'Teclado', program: 'Play Keys', nounLower: 'teclado',
    card: 'Harmonia na prática e músicas completas já nas primeiras aulas.',
    lead: 'No teclado cada mão tem um papel diferente, e as duas precisam trabalhar juntas. No Play Keys você entende a harmonia tocando e chega em músicas completas desde as primeiras aulas.',
    skills: ['Acordes e harmonia', 'Independência entre as mãos', 'Leitura de cifras', 'Acompanhamento pra voz e banda'],
    stage: [['Audição PlayKeys', 'Palco'], ['Formação de banda', 'Play Band']],
  },
  {
    slug: 'baixo', name: 'Baixo', program: 'Play Bass', nounLower: 'baixo',
    card: 'Groove, base e musicalidade pra segurar a banda inteira.',
    lead: 'O baixo liga o ritmo à harmonia. No Play Bass você constrói groove, base e musicalidade pra sustentar a música com confiança.',
    skills: ['Groove e tempo', 'Linhas de baixo sobre a harmonia', 'Técnica das duas mãos', 'Tocar colado na bateria'],
    stage: [['Audição PlayBass', 'Palco'], ['Formação de banda', 'Play Band']],
  },
  {
    slug: 'ukulele', name: 'Ukulele', program: 'Ukulele', nounLower: 'ukulele',
    card: 'Pequeno, leve e divertido. Uma porta de entrada gostosa pra música.',
    lead: 'Quatro cordas, som leve e um caminho gostoso pras primeiras músicas. O ukulele é uma ótima porta de entrada pra quem quer começar a tocar sem complicação.',
    skills: ['Acordes básicos e trocas', 'Batidas e ritmo', 'Músicas completas cantando junto', 'Base pra seguir no violão ou na guitarra'],
    stage: [['Apresentações dos alunos', 'Palco']],
  },
  {
    slug: 'violino', name: 'Violino', program: 'Violino', nounLower: 'violino',
    card: 'Postura, arco e afinação com base sólida, do primeiro som às primeiras peças.',
    lead: 'Postura, arco e afinação com base sólida. A aula de violino na Musicalize Camboriú te leva do primeiro som limpo às primeiras músicas, com direção clara em cada etapa.',
    skills: ['Postura e empunhadura', 'Controle do arco', 'Afinação e percepção', 'Primeiras peças e repertório'],
    stage: [['Apresentações dos alunos', 'Palco']],
  },
];

export const EVENTS = [
  {
    title: 'Audições Play', pill: 'Por instrumento',
    text: 'Cada curso tem a sua audição. É o momento de mostrar no palco o que você trabalhou em aula, com plateia, luz e som.',
    tags: ['PlayVoice', 'PlayGuitar', 'PlayBass', 'PlayAcoustic', 'PlayKeys', 'PlayBand'],
  },
  {
    title: 'Musicalize Tour', pill: 'Turnê',
    text: 'Bandas formadas por alunos saem da sala de aula pra viver palco, show, público e estrada pela região. A Resistência, direto da Musicalize Camboriú, chegou ao Tour com set intenso, riffs marcantes e muita presença de palco.',
    tags: ['Bandas de alunos', 'Palcos pela região'],
  },
  {
    title: 'Shows temáticos', pill: 'Rede Musicalize',
    text: 'Eventos com estilo definido, onde alunos e professores dividem o palco.',
    tags: ['Damas Primeiro, Cavalheiros Depois', 'WorshipM', 'Arena Country'],
  },
  {
    title: 'Musicalize Festival', pill: 'Anual',
    text: 'O grande festival do ano, que junta alunos de todas as unidades da rede no mesmo palco.',
    tags: ['Todas as unidades', 'Uma vez por ano'],
  },
  {
    title: 'Talkshows com artistas', pill: 'Bate-papo',
    text: 'Encontros sobre técnica, carreira e bastidores com quem vive de música.',
    tags: ['WAV, We Are Voices', 'Somos Drummers', 'Guitar Idol'],
  },
];

export const HOME_FAQ = [
  {
    q: 'Onde fica a Musicalize Camboriú?',
    a: `Na ${BIZ.street}, no Centro de Camboriú (SC). Pra combinar sua visita, chama no WhatsApp ${BIZ.phoneDisplay}.`,
  },
  {
    q: 'Preciso saber tocar alguma coisa pra começar?',
    a: 'Não. Os cursos atendem quem nunca tocou, quem já toca um pouco e quem quer voltar depois de um tempo parado. A jornada começa do seu nível.',
  },
  {
    q: 'Como funciona a aula experimental?',
    a: 'Você manda uma mensagem no WhatsApp, conta qual instrumento te interessa e agenda um horário. Na aula você conhece a escola, o professor e sente na prática como funciona o método antes de se matricular.',
  },
  {
    q: 'Quais cursos a Musicalize Camboriú oferece?',
    a: 'Violão, guitarra, baixo, bateria, teclado, canto (técnica vocal), ukulele, violino e formação de bandas.',
  },
  {
    q: 'Quando posso me matricular?',
    a: 'As matrículas ficam abertas o ano todo. Não precisa esperar começo de semestre.',
  },
  {
    q: 'Os alunos se apresentam em público?',
    a: 'Sim. O palco faz parte da jornada: tem audições por instrumento, shows temáticos, o Musicalize Tour com bandas de alunos e o Musicalize Festival, que junta todas as unidades.',
  },
  {
    q: 'Quanto custa a mensalidade?',
    a: `O valor depende do curso e do plano. A equipe passa todas as opções pelo WhatsApp ${BIZ.phoneDisplay}.`,
  },
  {
    q: 'A Musicalize é uma rede de escolas?',
    a: 'Sim. A Musicalize tem unidades em Camboriú, Itajaí, Itapema, Joinville e Tijucas, todas em Santa Catarina, com o mesmo método de prática, ensaio e palco.',
  },
  {
    q: 'Moro em Balneário Camboriú. A escola fica perto?',
    a: 'A unidade fica no Centro de Camboriú, cidade vizinha de Balneário Camboriú. Muitos alunos vêm das duas cidades.',
  },
];

export const courseFaq = (c) => {
  const audition = c.stage[0][0];
  return [
    {
      q: `Nunca toquei ${c.slug === 'canto' ? 'nem cantei' : c.nounLower}. Consigo acompanhar?`,
      a: `Consegue. As aulas de ${c.nounLower} atendem iniciantes, quem já tem alguma base e quem está voltando depois de um tempo. O ponto de partida é o seu nível.`,
    },
    {
      q: 'Vou tocar músicas que eu gosto?',
      a: 'Vai. Repertório faz parte do método desde o começo, porque é tocando música de verdade que a técnica ganha sentido.',
    },
    {
      q: `Tem apresentação pra quem faz ${c.nounLower}?`,
      a: `Tem. ${audition} e outros eventos da rede Musicalize colocam os alunos no palco ao longo do ano.`,
    },
    {
      q: `Como agendo a aula experimental de ${c.nounLower}?`,
      a: `Manda uma mensagem no WhatsApp ${BIZ.phoneDisplay} dizendo que quer fazer aula de ${c.nounLower}. A equipe combina o melhor horário com você.`,
    },
  ];
};
