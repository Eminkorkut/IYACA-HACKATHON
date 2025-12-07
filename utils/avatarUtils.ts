// Avatar utility functions

export const getAvatarEmoji = (avatar: string): string => {
  const avatarMap: { [key: string]: string } = {
    'superman': '🦸',
    'batman': '🦇',
    'spiderman': '🕷️',
    'wonderwoman': '👸',
    'ironman': '🤖',
    'hulk': '💪',
    'thor': '⚡',
    'captain': '🛡️',
    'flash': '⚡',
    'aquaman': '🌊',
    'greenlantern': '💚',
    'blackwidow': '🕵️',
    'wolverine': '🐺',
    'storm': '🌩️',
    'deadpool': '🔴',
    'venom': '🕸️',
    'antman': '🐜',
    'doctorstrange': '🔮',
    'blackpanther': '🐆',
    'captainmarvel': '⭐',
    // Legacy support
    'rabbit': '🦸',
    'bear': '🦇',
    'astronaut': '🕷️',
    'heart': '❤️',
    'lion': '🦁',
    'tiger': '🐯',
    'panda': '🐼',
    'fox': '🦊',
    'cat': '🐱',
  }
  return avatarMap[avatar] || '🦸'
}

export const getAllAvatars = () => {
  return [
    { id: 'superman', emoji: '🦸', name: 'Süperman' },
    { id: 'batman', emoji: '🦇', name: 'Batman' },
    { id: 'spiderman', emoji: '🕷️', name: 'Örümcek Adam' },
    { id: 'wonderwoman', emoji: '👸', name: 'Harika Kadın' },
    { id: 'ironman', emoji: '🤖', name: 'Demir Adam' },
    { id: 'hulk', emoji: '💪', name: 'Hulk' },
    { id: 'thor', emoji: '⚡', name: 'Thor' },
    { id: 'captain', emoji: '🛡️', name: 'Kaptan Amerika' },
    { id: 'flash', emoji: '⚡', name: 'Flash' },
    { id: 'aquaman', emoji: '🌊', name: 'Aquaman' },
    { id: 'greenlantern', emoji: '💚', name: 'Yeşil Fener' },
    { id: 'blackwidow', emoji: '🕵️', name: 'Kara Dul' },
    { id: 'wolverine', emoji: '🐺', name: 'Wolverine' },
    { id: 'storm', emoji: '🌩️', name: 'Storm' },
    { id: 'deadpool', emoji: '🔴', name: 'Deadpool' },
    { id: 'venom', emoji: '🕸️', name: 'Venom' },
    { id: 'antman', emoji: '🐜', name: 'Karınca Adam' },
    { id: 'doctorstrange', emoji: '🔮', name: 'Doktor Strange' },
    { id: 'blackpanther', emoji: '🐆', name: 'Kara Panter' },
    { id: 'captainmarvel', emoji: '⭐', name: 'Kaptan Marvel' },
  ]
}

