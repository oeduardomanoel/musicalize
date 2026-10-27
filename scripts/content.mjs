// Conteúdo e dados da Musicalize Camboriú. Edite aqui e rode `npm run build`.

export const SITE = 'https://www.musicalizecamboriu.com.br';

export const BIZ = {
  name: 'Musicalize Camboriú',
  legalish: 'Escola de Música Musicalize Camboriú',
  whatsapp: '5547988981229',
  phoneDisplay: '(47) 98898-1229',
  phoneE164: '+5547988981229',
  street: 'Rua Ernesto Florêncio Pereira, 17',
  postalCode: '88340-263',
  geo: { lat: -27.0204673, lng: -48.6521959 },
  district: 'Centro',
  city: 'Camboriú',
  state: 'SC',
  country: 'BR',
  instagram: 'https://www.instagram.com/musicalizecamboriu/',
  instagramHandle: '@musicalizecamboriu',
  facebook: 'https://www.facebook.com/p/Escola-de-M%C3%BAsica-Musicalize-Cambori%C3%BA-100067601375472/',
  network: 'https://www.escolamusicalize.com/',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Rua+Ernesto+Flor%C3%AAncio+Pereira+17+Centro+Cambori%C3%BA+SC',
  mapsEmbed: 'https://www.google.com/maps?q=Rua+Ernesto+Flor%C3%AAncio+Pereira,+17,+Centro,+Cambori%C3%BA+-+SC,+88340-263&output=embed',
  students: 5000,
  units: ['Camboriú', 'Itajaí', 'Itapema', 'Joinville', 'Tijucas'],
};

export const wa = (text) => `https://wa.me/${BIZ.whatsapp}?text=${encodeURIComponent(text)}`;
export const WA_DEFAULT = wa('Oi! Vim pelo site e quero agendar uma aula experimental na Musicalize Camboriú.');

// Fotos e vídeos próprios da escola (gerados por scripts/media.py e scripts/videos.sh)
export const LOGO = { src: '/assets/img/logo-80.webp', fallback: '/assets/img/logo-80.png', w: 343, h: 80 };

// Trechos curtos de apresentações (autoplay mudo, toque para ouvir)
export const REELS = [
  { key: 'daniel', label: 'Somos Drummers', text: 'Miguel, professor de baixo, e Daniel Barbosa, baterista do Luan Santana, tocando Acid Rain, do Angra' },
  { key: 'bateria', label: 'Bateria', text: 'Evento de bateria no Studio Silver Tape' },
  { key: 'guitarra', label: 'Guitarra', text: 'Apresentação de alunos no Studio Silver Tape' },
  { key: 'canto', label: 'Canto', text: 'Apresentação de alunos na loja Cordas e Acordes' },
  { key: 'baixo', label: 'Baixo', text: 'Apresentação de alunos no Studio Silver Tape' },
  { key: 'violao', label: 'Violão', text: 'Apresentação de alunos na loja Cordas e Acordes' },
  { key: 'teclado', label: 'Teclado', text: 'Apresentação de alunos na loja Cordas e Acordes' },
  { key: 'canto2', label: 'Canto', text: 'Apresentação de alunos na escola' },
  { key: 'bateria2', label: 'Bateria', text: 'Apresentação de alunos na escola' },
];

// Depoimentos em vídeo. Os textos vêm das legendas dos próprios vídeos.
export const DEPOS = [
  { n: 18, c: 'violao', who: 'Aluna de violão', points: ['Achava que era tarde para aprender', 'Teve uma boa evolução'] },
  { n: 10, c: 'canto', who: 'Aluno de técnica vocal', points: ['Realizando o sonho de cantar', 'Investimento que vale a pena'] },
  { n: 13, c: 'bateria', who: 'Aluna de bateria', points: ['Escutava rock e metal desde pequena', 'Já tocava e queria dar continuidade'] },
  { n: 26, c: 'violao', who: 'Aluno de violão', points: ['Tinha o violão parado em casa', 'Arte é você se expressar de alguma forma'] },
  { n: 1, c: 'ukulele', who: 'Aluno de ukulele', points: ['Experimenta bateria e teclado', 'Aulas divertidas'] },
  { n: 6, c: 'teclado', who: 'Aluno de teclado e técnica vocal', points: ['Toca por hobby', 'Música como terapia'] },
  { n: 29, c: 'baixo', who: 'Aluna de baixo', points: ['Começou a tocar para poder tocar na igreja', 'Está gostando do seu aprendizado'] },
  { n: 19, c: 'guitarra', who: 'Aluna de guitarra', points: ['Gosta de rock', 'Queria ter um hobby'] },
  { n: 11, c: 'bateria', who: 'Aluno de bateria', points: ['Sonha tocar em uma banda', 'Tocava desde pequeno em casa'] },
  { n: 34, c: 'canto', who: 'Aluna de técnica vocal', points: ['Tem o sonho de ser cantora', 'Gosta das atividades na aula'] },
  { n: 33, c: 'teclado', who: 'Aluna de teclado', points: ['Começou por indicação da família', 'Gosta do professor e das aulas'] },
  { n: 5, c: 'violao', who: 'Aluno de violão', points: ['Objetivo de tocar na igreja', 'Ótimo desenvolvimento nas aulas'] },
  { n: 7, c: 'baixo', who: 'Aluno de baixo', points: ['Aprende prática e teoria', 'Desenvolve a coordenação motora'] },
  { n: 21, c: 'guitarra', who: 'Aluno de guitarra', points: ['Gosta de rock', 'No início achou difícil'] },
  { n: 32, c: 'canto', who: 'Aluna de técnica vocal', points: ['Já cantava na igreja', 'Queria se aprofundar nas técnicas vocais'] },
  { n: 15, c: 'teclado', who: 'Aluno de teclado', points: ['Pretende tocar na igreja', 'Aulas dinâmicas'] },
  { n: 16, c: 'teclado', who: 'Aluna de teclado', points: ['Toca para fazer adoração', 'A música acalma'] },
  { n: 23, c: 'teclado', who: 'Aluno de teclado e violão', points: ['Já tocava antes', 'Toca por hobby'] },
  { n: 9, c: 'violao', who: 'Aluno de violão', points: ['Tinha o violão parado em casa', 'Toca por hobby'] },
];

// Workshops e eventos com artistas convidados
export const ARTISTS = [
  {
    name: 'Daniel Barbosa', role: 'Baterista do Luan Santana', event: 'Somos Drummers',
    text: 'Workshop de bateria e passagem de som com a equipe Musicalize. No palco, ainda dividiu Acid Rain, do Angra, com o Miguel, professor de baixo da escola.',
    photos: ['artista-daniel-1', 'artista-daniel-2'], reel: 'daniel',
  },
  {
    name: 'Ricardo Confessori', role: 'Ex-Angra e ex-Shaman', event: 'Workshop de bateria',
    text: 'Um dos bateristas mais respeitados do metal brasileiro, num workshop de bateria lotado.',
    photos: ['artista-confessori'],
  },
  {
    name: 'Théo Dornellas, Patrick Souza e Maurício Alabama', role: 'Grandes guitarristas brasileiros', event: 'Workshop de guitarra',
    text: 'Três guitarristas no mesmo palco, com técnica, timbre e conversa franca sobre a vida de músico.',
    photos: ['artista-guitarras-1', 'artista-theo-1', 'artista-theo-2'],
  },
];

// Faixas de fotos da galeria
export const GALLERY = {
  portrait: ['violao-1', 'guitarra-1', 'canto-1', 'bateria-1', 'teclado-1', 'baixo-1', 'ukulele-1', 'canto-4', 'bateria-2', 'pro-guitarra-5', 'baixo-3', 'canto-2', 'guitarra-3', 'baixo-6', 'teclado-2', 'pro-baixo-3', 'violao-2', 'banda-2', 'canto-3', 'pro-guitarra-2', 'bateria-3', 'baixo-2', 'guitarra-prof', 'escola'],
  landscape: ['pro-canto-1', 'pro-bateria-1', 'pro-guitarra-3', 'pro-canto-4', 'pro-canto-2', 'pro-guitarra-4', 'pro-bateria-2', 'pro-baixo-1', 'pro-canto-3', 'pro-baixo-4', 'aula-baixo'],
};

// Cursos. A ordem define o grid da home (banda fica no meio, em destaque).
export const COURSES = [
  {
    slug: 'violao', photos: ['violao-1','violao-2','canto-5'], name: 'Violão', program: 'Play Guitar', nounLower: 'violão',
    card: 'Acordes, ritmo e repertório pra tocar com segurança desde o começo.',
    lead: 'Do primeiro acorde à música inteira. No Play Guitar você aprende acordes, ritmo e repertório pra tocar com segurança desde o começo, com a teoria entrando quando faz sentido na mão.',
    skills: ['Acordes e trocas limpas', 'Batidas e levadas de ritmo', 'Dedilhado e independência das mãos', 'Repertório pra tocar de verdade'],
    stage: [['Audição PlayGuitar', 'Palco'], ['Formação de banda', 'Play Band']],
  },
  {
    slug: 'guitarra', photos: ['guitarra-1','pro-guitarra-5','pro-guitarra-2','guitarra-3','guitarra-2','pro-guitarra-1','guitarra-prof'], name: 'Guitarra', program: 'Play Guitar', nounLower: 'guitarra',
    card: 'Riffs, solos, timbre e as músicas que te fizeram querer tocar.',
    lead: 'Riffs, solos, timbre e as músicas que te fizeram pegar a guitarra pela primeira vez. A guitarra vai muito além dos acordes, e no Play Guitar a técnica anda junto com o repertório.',
    skills: ['Power chords e riffs', 'Escalas, solos e fraseado', 'Timbre, efeitos e pedais', 'Tocar junto com a banda'],
    stage: [['Audição PlayGuitar', 'Palco'], ['Talkshow Guitar Idol', 'Rede'], ['Musicalize Tour', 'Turnê']],
  },
  {
    slug: 'canto', photos: ['canto-1','pro-canto-2','canto-4','canto-2','canto-3','canto-5','pro-canto-1','pro-canto-4'], name: 'Canto', program: 'Play Voice', nounLower: 'canto', h1: 'Aula de canto em Camboriú',
    card: 'Técnica vocal, afinação e confiança pra cantar na frente de gente.',
    lead: 'Cante com técnica, confiança e presença. O Play Voice trabalha respiração, afinação e interpretação em cima das músicas que você quer cantar.',
    skills: ['Respiração e apoio', 'Afinação e percepção', 'Extensão e cuidado com a voz', 'Interpretação e presença de palco'],
    stage: [['Audição PlayVoice', 'Palco'], ['Talkshow WAV, We Are Voices', 'Rede'], ['Show WorshipM', 'Gospel']],
  },
  {
    slug: 'bateria', photos: ['bateria-1','bateria-2','bateria-3','bateria-4','bateria-prof','pro-bateria-1','pro-bateria-2'], name: 'Bateria', program: 'Play Drums', nounLower: 'bateria',
    card: 'Ritmo, coordenação e pegada com segurança desde o início.',
    lead: 'Ritmo, coordenação e pegada. No Play Drums você desenvolve o toque com segurança desde o início e aprende tocando junto com a música.',
    skills: ['Coordenação entre mãos e pés', 'Grooves dos estilos que você curte', 'Viradas e dinâmica', 'Tempo firme pra tocar em banda'],
    stage: [['Audição PlayBand', 'Palco'], ['Talkshow Somos Drummers', 'Rede'], ['Musicalize Tour', 'Turnê']],
  },
  {
    slug: 'banda', photos: ['banda-1','pro-guitarra-4','banda-2','pro-bateria-1','pro-baixo-4'], name: 'Banda', program: 'Play Band', nounLower: 'formação de bandas', h1: 'Formação de bandas em Camboriú', feature: true,
    card: 'Monte banda com outros alunos, ensaie e suba no palco de verdade. Foi assim que nasceu a Resistência, banda da Musicalize Camboriú no Musicalize Tour.',
    lead: 'Tocar sozinho é uma coisa. Tocar com mais gente é outra. No Play Band os alunos montam banda, ensaiam e vivem a experiência real de palco, show e público.',
    skills: ['Ensaio em grupo', 'Arranjo e divisão de partes', 'Entrosamento e dinâmica', 'Show com público de verdade'],
    stage: [['Audição PlayBand', 'Palco'], ['Musicalize Tour', 'Turnê'], ['Musicalize Festival', 'Festival']],
  },
  {
    slug: 'teclado', photos: ['teclado-1','teclado-2'], name: 'Teclado', program: 'Play Keys', nounLower: 'teclado',
    card: 'Harmonia na prática e músicas completas já nas primeiras aulas.',
    lead: 'No teclado cada mão tem um papel diferente, e as duas precisam trabalhar juntas. No Play Keys você entende a harmonia tocando e chega em músicas completas desde as primeiras aulas.',
    skills: ['Acordes e harmonia', 'Independência entre as mãos', 'Leitura de cifras', 'Acompanhamento pra voz e banda'],
    stage: [['Audição PlayKeys', 'Palco'], ['Formação de banda', 'Play Band']],
  },
  {
    slug: 'baixo', photos: ['baixo-1','baixo-3','baixo-2','baixo-4','baixo-6','pro-baixo-2','baixo-prof','pro-baixo-1'], name: 'Baixo', program: 'Play Bass', nounLower: 'baixo',
    card: 'Groove, base e musicalidade pra segurar a banda inteira.',
    lead: 'O baixo liga o ritmo à harmonia. No Play Bass você constrói groove, base e musicalidade pra sustentar a música com confiança.',
    skills: ['Groove e tempo', 'Linhas de baixo sobre a harmonia', 'Técnica das duas mãos', 'Tocar colado na bateria'],
    stage: [['Audição PlayBass', 'Palco'], ['Formação de banda', 'Play Band']],
  },
  {
    slug: 'ukulele', photos: ['ukulele-1'], name: 'Ukulele', program: 'Ukulele', nounLower: 'ukulele',
    card: 'Pequeno, leve e divertido. Uma porta de entrada gostosa pra música.',
    lead: 'Quatro cordas, som leve e um caminho gostoso pras primeiras músicas. O ukulele é uma ótima porta de entrada pra quem quer começar a tocar sem complicação.',
    skills: ['Acordes básicos e trocas', 'Batidas e ritmo', 'Músicas completas cantando junto', 'Base pra seguir no violão ou na guitarra'],
    stage: [['Apresentações dos alunos', 'Palco']],
  },
];

export const EVENTS = [
  {
    title: 'Audições Play', pill: 'Por instrumento',
    text: 'Cada curso tem a sua audição. É o momento de mostrar no palco o que você trabalhou em aula, com plateia, luz e som.',
    tags: ['PlayVoice', 'PlayGuitar', 'PlayBass', 'PlayKeys', 'PlayBand'],
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
    title: 'Workshops com artistas', pill: 'Bate-papo',
    text: 'Encontros sobre técnica, carreira e bastidores com quem vive de música. Já passaram por aqui Daniel Barbosa (baterista do Luan Santana), Ricardo Confessori (ex-Angra e ex-Shaman), Théo Dornellas, Patrick Souza e Maurício Alabama.',
    tags: ['Somos Drummers', 'WAV, We Are Voices', 'Guitar Idol'],
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
    a: 'Violão, guitarra, baixo, bateria, teclado, canto (técnica vocal), ukulele e formação de bandas.',
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
    q: 'Quais artistas já fizeram workshop na Musicalize?',
    a: 'Já passaram pelos eventos da Musicalize Daniel Barbosa, baterista do Luan Santana, no Somos Drummers; Ricardo Confessori, ex-Angra e ex-Shaman, em workshop de bateria; e os guitarristas Théo Dornellas, Patrick Souza e Maurício Alabama, em workshop de guitarra.',
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
