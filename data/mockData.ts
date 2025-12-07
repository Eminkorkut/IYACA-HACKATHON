export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'volunteer' | 'child';
  text: string;
  timestamp: Date;
  aiAnalysis?: {
    toxicity: 'safe' | 'warning' | 'danger';
    stressLevel: number; // 0-100
    sentiment: 'positive' | 'neutral' | 'negative';
    suggestions?: string[];
  };
}

export interface Child {
  id: string;
  name: string;
  avatar: string;
  age?: number;
  interests?: string[];
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
  supportType: 'psychological' | 'educational' | 'general';
  stressLevel?: number; // 0-100, different for each child
}

export interface StressDataPoint {
  timestamp: number;
  stressLevel: number;
}

// Kardeş #1 için mesajlar (Orta stres seviyesi)
export const mockMessagesChild1: Message[] = [
  {
    id: '1',
    senderId: 'child-1',
    senderName: 'Kardeş #1',
    senderType: 'child',
    text: 'Merhaba. Bugün okulda çok kötü bir şey oldu.',
    timestamp: new Date('2024-01-15T10:00:00'),
    aiAnalysis: {
      toxicity: 'safe',
      stressLevel: 75,
      sentiment: 'negative',
      suggestions: ['Çocuk üzgün görünüyor. Empati gösterin ve dinlemeye açık olduğunuzu belirtin.']
    }
  },
  {
    id: '2',
    senderId: 'volunteer-1',
    senderName: 'Mentör',
    senderType: 'volunteer',
    text: 'Merhaba, seni dinliyorum. Ne olduğunu anlatmak ister misin?',
    timestamp: new Date('2024-01-15T10:02:00'),
    aiAnalysis: {
      toxicity: 'safe',
      stressLevel: 70,
      sentiment: 'neutral',
      suggestions: ['Çocuğu dinlemeye açık olduğunuzu belirtin. Açık uçlu sorular sorun.']
    }
  },
  {
    id: '3',
    senderId: 'child-1',
    senderName: 'Kardeş #1',
    senderType: 'child',
    text: 'Sınavdan çok düşük not aldım. Ailem çok kızdı. Kendimi çok kötü hissediyorum.',
    timestamp: new Date('2024-01-15T10:05:00'),
    aiAnalysis: {
      toxicity: 'safe',
      stressLevel: 85,
      sentiment: 'negative',
      suggestions: [
        'Çocuk akademik baskı ve aile beklentileri konusunda stresli.',
        'Kendi deneyimlerinizi paylaşarak normalleştirin.',
        'Başarısızlığın öğrenme sürecinin bir parçası olduğunu vurgulayın.'
      ]
    }
  },
  {
    id: '4',
    senderId: 'volunteer-1',
    senderName: 'Mentör',
    senderType: 'volunteer',
    text: 'Anlıyorum. Sınav notları bazen hayal kırıklığı yaratabilir. Ben de senin yaşındayken benzer durumlar yaşamıştım. Önemli olan buradan ne öğrenebileceğimiz.',
    timestamp: new Date('2024-01-15T10:07:00'),
    aiAnalysis: {
      toxicity: 'safe',
      stressLevel: 75,
      sentiment: 'positive',
      suggestions: ['Çocuk iyileşme gösteriyor. Olumlu geri bildirim verin ve destekleyin.']
    }
  },
  {
    id: '5',
    senderId: 'child-1',
    senderName: 'Kardeş #1',
    senderType: 'child',
    text: 'Gerçekten mi? Sen de mi düşük not aldın?',
    timestamp: new Date('2024-01-15T10:10:00'),
    aiAnalysis: {
      toxicity: 'safe',
      stressLevel: 60,
      sentiment: 'neutral',
      suggestions: ['Çocuk ilgi gösteriyor. Kişisel hikayenizi paylaşarak bağlantı kurun.']
    }
  },
  {
    id: '6',
    senderId: 'volunteer-1',
    senderName: 'Mentör',
    senderType: 'volunteer',
    text: 'Evet, tabii ki! Herkes zaman zaman zorlanır. Ben de matematik dersinde çok zorlanmıştım. Ama pes etmedim ve çalışmaya devam ettim. Sen de yapabilirsin!',
    timestamp: new Date('2024-01-15T10:12:00'),
    aiAnalysis: {
      toxicity: 'safe',
      stressLevel: 55,
      sentiment: 'positive',
      suggestions: ['Çocuk ilerleme gösteriyor. Motivasyonunu destekleyin ve başarılarını takdir edin.']
    }
  },
  {
    id: '7',
    senderId: 'child-1',
    senderName: 'Kardeş #1',
    senderType: 'child',
    text: 'Teşekkür ederim. Biraz daha iyi hissettim. Belki gerçekten çalışmaya devam edebilirim.',
    timestamp: new Date('2024-01-15T10:15:00'),
    aiAnalysis: {
      toxicity: 'safe',
      stressLevel: 45,
      sentiment: 'positive',
      suggestions: ['Çocuk iyileşme gösteriyor. Motivasyonunu destekleyin ve ilerlemesini takdir edin.']
    }
  },
  {
    id: '8',
    senderId: 'volunteer-1',
    senderName: 'Mentör',
    senderType: 'volunteer',
    text: 'Harika! Sen zaten cesur bir adım attın, buraya gelip konuşmak. Bu çok önemli. Eğer başka bir şey paylaşmak istersen, buradayım.',
    timestamp: new Date('2024-01-15T10:17:00'),
    aiAnalysis: {
      toxicity: 'safe',
      stressLevel: 40,
      sentiment: 'positive',
      suggestions: ['Çocuk iyi durumda. Pozitif konuşmayı sürdürün ve güçlü yönlerini vurgulayın.']
    }
  }
];

// Kardeş #2 için mesajlar (Yüksek stres seviyesi)
export const mockMessagesChild2: Message[] = [
  {
    id: '2-1',
    senderId: 'child-2',
    senderName: 'Kardeş #2',
    senderType: 'child',
    text: 'Merhaba. Bugün çok kötü bir gün geçirdim.',
    timestamp: new Date('2024-01-15T09:00:00'),
    aiAnalysis: {
      toxicity: 'safe',
      stressLevel: 80,
      sentiment: 'negative',
      suggestions: [
        'Stres seviyesi yüksek. Yumuşak ve destekleyici bir dil kullanın.',
        '"Nasıl yardımcı olabilirim?" gibi açık uçlu sorular sorun.',
        'Çocuğun duygularını doğrulayın: "Bu gerçekten zor olmalı"'
      ]
    }
  },
  {
    id: '2-2',
    senderId: 'volunteer-1',
    senderName: 'Mentör',
    senderType: 'volunteer',
    text: 'Merhaba, seni dinliyorum. Ne olduğunu paylaşmak ister misin?',
    timestamp: new Date('2024-01-15T09:02:00'),
    aiAnalysis: {
      toxicity: 'safe',
      stressLevel: 75,
      sentiment: 'neutral',
      suggestions: ['Stres seviyesi yüksek. Yumuşak bir dil kullanın ve çocuğu dinleyin.']
    }
  },
  {
    id: '2-3',
    senderId: 'child-2',
    senderName: 'Kardeş #2',
    senderType: 'child',
    text: 'Arkadaşlarım beni dışladı. Kimse benimle konuşmuyor. Kendimi çok yalnız hissediyorum.',
    timestamp: new Date('2024-01-15T09:05:00'),
    aiAnalysis: {
      toxicity: 'safe',
      stressLevel: 90,
      sentiment: 'negative',
      suggestions: [
        'Stres seviyesi çok yüksek! Empati gösterin: "Bu gerçekten acı verici olmalı"',
        'Yalnızlık duygusunu normalleştirin: "Herkes zaman zaman yalnız hisseder"',
        'Güven oluşturun: "Burada güvendesin, seni dinliyorum"',
        'Açık uçlu sorular sorun: "Bu ne zaman başladı?"'
      ]
    }
  },
  {
    id: '2-4',
    senderId: 'volunteer-1',
    senderName: 'Mentör',
    senderType: 'volunteer',
    text: 'Bu gerçekten zor bir durum. Yalnız hissetmen çok normal. Seni dinliyorum ve buradayım.',
    timestamp: new Date('2024-01-15T09:07:00'),
    aiAnalysis: {
      toxicity: 'safe',
      stressLevel: 85,
      sentiment: 'positive',
      suggestions: ['Stres seviyesi çok yüksek ama çocuk olumlu yanıt veriyor. Desteklemeye devam edin.']
    }
  },
  {
    id: '2-5',
    senderId: 'child-2',
    senderName: 'Kardeş #2',
    senderType: 'child',
    text: 'Teşekkür ederim. Biraz daha iyi hissettim ama hala korkuyorum.',
    timestamp: new Date('2024-01-15T09:10:00'),
    aiAnalysis: {
      toxicity: 'safe',
      stressLevel: 70,
      sentiment: 'neutral',
      suggestions: [
        'Korku duygusunu kabul edin: "Korkmak normal, cesur olmak korkmamak değil"',
        'Güvenlik hissi verin: "Burada güvendesin"',
        'Küçük adımlar önerin: "Her gün küçük bir adım atabilirsin"'
      ]
    }
  }
];

// Kardeş #3 için mesajlar (Düşük stres seviyesi)
export const mockMessagesChild3: Message[] = [
  {
    id: '3-1',
    senderId: 'child-3',
    senderName: 'Kardeş #3',
    senderType: 'child',
    text: 'Merhaba! Nasılsın?',
    timestamp: new Date('2024-01-14T16:00:00'),
    aiAnalysis: {
      toxicity: 'safe',
      stressLevel: 30,
      sentiment: 'positive',
      suggestions: ['Çocuk iyi görünüyor. Pozitif bir konuşma başlatabilirsiniz.']
    }
  },
  {
    id: '3-2',
    senderId: 'volunteer-1',
    senderName: 'Mentör',
    senderType: 'volunteer',
    text: 'Merhaba! İyiyim, teşekkür ederim. Sen nasılsın?',
    timestamp: new Date('2024-01-14T16:02:00'),
    aiAnalysis: {
      toxicity: 'safe',
      stressLevel: 25,
      sentiment: 'positive'
    }
  },
  {
    id: '3-3',
    senderId: 'child-3',
    senderName: 'Kardeş #3',
    senderType: 'child',
    text: 'Ben de iyiyim! Bugün güzel bir gün geçirdim.',
    timestamp: new Date('2024-01-14T16:05:00'),
    aiAnalysis: {
      toxicity: 'safe',
      stressLevel: 20,
      sentiment: 'positive',
      suggestions: ['Çocuk mutlu görünüyor. Olumlu deneyimlerini paylaşmasını teşvik edin.']
    }
  }
];

// Tüm mesajları birleştir (geriye dönük uyumluluk için)
export const mockMessages: Message[] = mockMessagesChild1;

// Kardeş ID'sine göre mesajları getir
export const getMessagesByChildId = (childId: string): Message[] => {
  switch (childId) {
    case 'child-1':
      return mockMessagesChild1;
    case 'child-2':
      return mockMessagesChild2;
    case 'child-3':
      return mockMessagesChild3;
    default:
      return mockMessagesChild1;
  }
};

// Memorable names for children with combination (e.g., "GüneşKaplanı", "AyFaresi")
const generateChildName = (id: string): string => {
  const firstParts = ['Güneş', 'Ay', 'Yıldız', 'Deniz', 'Bulut', 'Rüzgar', 'Gökkuşağı', 'Yıldırım', 'Kartal', 'Aslan', 'Kaplan', 'Ejder', 'Kelebek', 'Gül', 'Çiçek', 'Yaprak', 'Meşe', 'Çınar', 'Zeytin', 'Nar']
  const secondParts = ['Kaplanı', 'Faresi', 'Kedisi', 'Kuşu', 'Balığı', 'Yıldızı', 'Çiçeği', 'Ağacı', 'Bulutu', 'Rüzgarı', 'Denizi', 'Ayı', 'Güneşi', 'Yıldırımı', 'Kartalı', 'Aslanı', 'Ejderi', 'Kelebeği', 'Gülü', 'Çiçeği']
  // Use id to get consistent name
  const index = parseInt(id.replace('child-', '')) || 1
  const firstIndex = (index - 1) % firstParts.length
  const secondIndex = (index * 3) % secondParts.length // Different multiplier for variety
  return `${firstParts[firstIndex]}${secondParts[secondIndex]}`
}

// Anonimleştirilmiş children list
export const mockChildren: Child[] = [
  {
    id: 'child-1',
    name: 'Ayşe',
    avatar: 'superman',
    age: 12,
    interests: ['Resim', 'Müzik'],
    lastMessage: 'Teşekkürler, çok yardımcı oldunuz!',
    lastMessageTime: new Date(2024, 11, 5, 14, 30),
    unreadCount: 0,
    supportType: 'psychological',
    stressLevel: 45 // Medium stress
  },
  {
    id: 'child-2',
    name: 'Mehmet',
    avatar: 'batman',
    age: 10,
    interests: ['Futbol', 'Bilim'],
    lastMessage: 'Yarın görüşürüz!',
    lastMessageTime: new Date(2024, 11, 5, 16, 45),
    unreadCount: 2,
    supportType: 'educational',
    stressLevel: 25 // Low stress
  },
  {
    id: 'child-3',
    name: 'Zeynep',
    avatar: 'wonderwoman',
    age: 14,
    interests: ['Kitap Okuma', 'Yazı Yazma'],
    lastMessage: 'Bugün biraz üzgünüm...',
    lastMessageTime: new Date(2024, 11, 4, 10, 15),
    unreadCount: 1,
    supportType: 'general',
    stressLevel: 60 // Medium-high stress
  }
];

// Generate stress data points for the chart
export const generateStressData = (messages: Message[]): StressDataPoint[] => {
  return messages
    .filter(m => m.aiAnalysis)
    .map((m, index) => ({
      timestamp: `${index + 1}. Dakika`,
      stressLevel: m.aiAnalysis!.stressLevel
    }));
};

// Current stress level (for real-time display)
export const getCurrentStressLevel = (messages?: Message[]): number => {
  const messagesToUse = messages || mockMessages;
  if (messagesToUse.length === 0) return 40;
  const lastMessage = messagesToUse[messagesToUse.length - 1];
  return lastMessage.aiAnalysis?.stressLevel || 40;
};

// Stres seviyesine göre genel öneriler üret
const generateSuggestionsByStress = (stressLevel: number, sentiment: 'positive' | 'neutral' | 'negative'): string[] => {
  const suggestions: string[] = [];

  if (stressLevel > 70) {
    // Yüksek stres - Çok kibar ve dikkatli konuş
    suggestions.push('⚠️ Stres seviyesi çok yüksek! Çok kibar ve yumuşak bir dil kullanın.');
    suggestions.push('"Nasıl yardımcı olabilirim?" gibi açık uçlu sorular sorun.');
    suggestions.push('"Bu gerçekten zor olmalı" gibi empati ifadeleri kullanın.');
    suggestions.push('Çocuğun duygularını doğrulayın ve güven verin.');
    suggestions.push('Daha kibar konuşun, sert tonlardan kaçının.');
    suggestions.push('Sabırlı olun, çocuğa zaman tanıyın.');
    if (sentiment === 'negative') {
      suggestions.push('Çocuk üzgün görünüyor. Dinlemeye açık olduğunuzu belirtin.');
    }
  } else if (stressLevel > 50) {
    // Orta stres - Dikkatli ve anlayışlı
    suggestions.push('Stres seviyesi orta seviyede. Dikkatli ve anlayışlı olun.');
    suggestions.push('Çocuğun kendini ifade etmesine izin verin.');
    suggestions.push('Kendi deneyimlerinizi paylaşarak normalleştirin.');
    suggestions.push('Nazik bir dil kullanın, destekleyici olun.');
    if (sentiment === 'negative') {
      suggestions.push('Çocuk zorlanıyor. Destekleyici olun ve umut verin.');
    }
  } else {
    // Düşük stres - Normal konuş
    suggestions.push('Stres seviyesi düşük. Pozitif bir konuşma sürdürün.');
    suggestions.push('Çocuğun olumlu deneyimlerini paylaşmasını teşvik edin.');
    suggestions.push('Güçlü yönlerini vurgulayın ve takdir edin.');
    if (sentiment === 'positive') {
      suggestions.push('Çocuk iyi görünüyor. Motivasyonunu destekleyin.');
    }
  }

  return suggestions;
};

// Current AI suggestions - Her zaman öneri döndür
export const getCurrentSuggestions = (messages?: Message[]): string[] => {
  const messagesToUse = messages || mockMessages;
  if (messagesToUse.length === 0) {
    return ['Henüz mesaj yok. İlk mesajınızı gönderin.'];
  }

  const lastMessage = messagesToUse[messagesToUse.length - 1];

  // Eğer mesajda öneri varsa onu kullan
  if (lastMessage.aiAnalysis?.suggestions && lastMessage.aiAnalysis.suggestions.length > 0) {
    return lastMessage.aiAnalysis.suggestions;
  }

  // Yoksa stres seviyesine göre öneri üret
  const stressLevel = lastMessage.aiAnalysis?.stressLevel || 40;
  const sentiment = lastMessage.aiAnalysis?.sentiment || 'neutral';
  return generateSuggestionsByStress(stressLevel, sentiment);
};


