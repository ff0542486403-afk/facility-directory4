import { LocationItem, CorridorNode } from '../types/navigation';

export const INITIAL_LOCATIONS: LocationItem[] = [
  // --- الدور الأرضي (Ground Floor) ---
  // الجناح الأيسر
  {
    id: 'loc-coffee',
    name: 'كوفي وجلسات الانتظار',
    floor: 0,
    wing: 'left',
    direction: 'left',
    directionText: 'اتجه يساراً باتجاه منطقة الجلسات والكوفي',
    description: 'جهة اليسار - منطقة الجلسات والضيافة المفتوحة',
    detailedPath: [
      'الدخول من البوابة والمدخل الرئيسي',
      'التقدم في الممر الأوسط لمسافة 5 أمتار',
      'الانعطاف يساراً نحو منطقة الجلسات والكوفي'
    ],
    distanceMeters: 12,
    walkTimeSeconds: 15,
    iconName: 'Coffee',
    roomNumber: 'G-L01',
    colorScheme: 'amber',
    devices: [
      {
        id: 'dev-coffee-1',
        name: 'آلة كوفي أتوماتيكية',
        type: 'other',
        brand: 'DeLonghi Professional',
        model: 'Magnifica S Plus',
        assetTag: 'MOE-MED-CF01',
        status: 'working',
        notes: 'خدمة الضيافة الذاتية للزوار والموظفين'
      },
      {
        id: 'dev-coffee-2',
        name: 'شاشة عرض إعلانية 65 بوصة',
        type: 'screen',
        brand: 'Samsung',
        model: 'Crystal UHD 4K 65"',
        assetTag: 'MOE-MED-SCR04',
        status: 'working',
        notes: 'تعرض تعليمات وإعلانات إدارة التعليم وبوابة تواصل'
      }
    ],
    mapCoordinates: { x: 50, y: 50, width: 220, height: 110, doorX: 270, doorY: 105 }
  },
  {
    id: 'loc-serv1',
    name: 'خدمة المستفيد (مكتب 1)',
    floor: 0,
    wing: 'left',
    direction: 'left',
    directionText: 'اتجه يساراً إلى مكتب خدمة المستفيد الأول',
    description: 'جهة اليسار - مكتب استقبال واستلام المعاملات للرجال',
    detailedPath: [
      'الدخول من البوابة والمدخل الرئيسي',
      'السير في الممر الأوسط نحو المنتصف',
      'الانعطاف يساراً بعد الكوفي إلى مكتب خدمة المستفيد 1'
    ],
    distanceMeters: 18,
    walkTimeSeconds: 22,
    iconName: 'Headphones',
    roomNumber: 'G-L02',
    colorScheme: 'emerald',
    devices: [
      {
        id: 'dev-s1-1',
        name: 'جهاز كمبيوتر HP Pro',
        type: 'computer',
        brand: 'HP',
        model: 'ProDesk 400 G7 SFF',
        serialNumber: 'CZC12459X0',
        assetTag: 'MOE-MED-PC102',
        status: 'working',
        notes: 'Core i7 / 16GB RAM / 512GB SSD'
      },
      {
        id: 'dev-s1-2',
        name: 'طابعة متعددة المهام HP',
        type: 'printer',
        brand: 'HP',
        model: 'LaserJet Pro MFP M428fdw',
        serialNumber: 'VNC3K98210',
        assetTag: 'MOE-MED-PR045',
        status: 'working',
        notes: 'طباعة/مسح/تصوير شبكي'
      },
      {
        id: 'dev-s1-3',
        name: 'ماسح ضوئي (Scanner)',
        type: 'scanner',
        brand: 'HP',
        model: 'ScanJet Pro 2500 f1',
        serialNumber: 'CN6593B12',
        assetTag: 'MOE-MED-SC019',
        status: 'working',
        notes: 'أرشفة وثائق المستفيدين السريعة'
      }
    ],
    mapCoordinates: { x: 50, y: 180, width: 220, height: 120, doorX: 270, doorY: 240 }
  },
  {
    id: 'loc-serv2',
    name: 'خدمة المستفيد (مكتب 2)',
    floor: 0,
    wing: 'left',
    direction: 'left',
    directionText: 'اتجه يساراً للأمام نحو مكتب خدمة المستفيد الثاني',
    description: 'جهة اليسار - مكتب تدقيق الطلبات والمصادقات',
    detailedPath: [
      'الدخول من البوابة والمدخل الرئيسي',
      'السير للأمام في الممر الأوسط لمسافة 18 متراً',
      'الانعطاف يساراً في الممر الفرعي - المكتب رقم 2'
    ],
    distanceMeters: 24,
    walkTimeSeconds: 28,
    iconName: 'UserCog',
    roomNumber: 'G-L03',
    colorScheme: 'blue',
    devices: [
      {
        id: 'dev-s2-1',
        name: 'جهاز HP All-in-One',
        type: 'computer',
        brand: 'HP',
        model: 'ProOne 440 G9 23.8"',
        serialNumber: '8CG24991PL',
        assetTag: 'MOE-MED-PC103',
        status: 'working',
        notes: 'جهاز الكل في واحد مع كاميرا مدمجة'
      },
      {
        id: 'dev-s2-2',
        name: 'طابعة حرارية للمواعيد',
        type: 'printer',
        brand: 'Epson',
        model: 'TM-T20III Thermal',
        serialNumber: 'E98412850',
        assetTag: 'MOE-MED-Q012',
        status: 'working',
        notes: 'طباعة أرقام وتذاكر الانتظار'
      }
    ],
    mapCoordinates: { x: 50, y: 320, width: 220, height: 120, doorX: 270, doorY: 380 }
  },

  // الجناح الأيمن
  {
    id: 'loc-serv-main',
    name: 'كاونتر خدمة المستفيدين الرئيسي',
    floor: 0,
    wing: 'right',
    direction: 'right',
    directionText: 'اتجه يميناً مباشرة في الممر الرئيسي',
    description: 'جهة اليمين - كاونتر الخدمة والاستقبال الشامل',
    detailedPath: [
      'الدخول من البوابة والمدخل الرئيسي',
      'الانعطاف مباشرة إلى اليمين لمسافة 6 أمتار',
      'الوصول إلى كاونتر الاستقبال الرئيسي'
    ],
    distanceMeters: 8,
    walkTimeSeconds: 10,
    iconName: 'Users',
    roomNumber: 'G-R01',
    colorScheme: 'emerald',
    devices: [
      {
        id: 'dev-m-1',
        name: 'جهاز PC HP EliteDesk',
        type: 'computer',
        brand: 'HP',
        model: 'EliteDesk 800 G6 Micro',
        serialNumber: 'MXL03429DF',
        assetTag: 'MOE-MED-PC089',
        status: 'working',
        notes: 'شاشتان عرض متصلتان لإدارة النظام'
      },
      {
        id: 'dev-m-2',
        name: 'طابعة HP LaserJet',
        type: 'printer',
        brand: 'HP',
        model: 'LaserJet Enterprise M507dn',
        serialNumber: 'JPH382109',
        assetTag: 'MOE-MED-PR012',
        status: 'working',
        notes: 'طابعة شبكية عالية السرعة'
      },
      {
        id: 'dev-m-3',
        name: 'جهاز تقييم الخدمة',
        type: 'kiosk',
        brand: 'Samsung Tab',
        model: 'Galaxy Tab A9+ Kiosk Mode',
        assetTag: 'MOE-MED-EV005',
        status: 'working',
        notes: 'لوحة لمسية لقياس رضا المستفيدين فورياً'
      },
      {
        id: 'dev-m-4',
        name: 'تليفون شبكي IP Phone',
        type: 'network',
        brand: 'Cisco',
        model: 'IP Phone 8841',
        serialNumber: 'FCH2145A8',
        assetTag: 'MOE-MED-TEL01',
        status: 'working',
        notes: 'التحويلة المباشرة: 1001'
      }
    ],
    mapCoordinates: { x: 530, y: 50, width: 220, height: 110, doorX: 530, doorY: 105 }
  },
  {
    id: 'loc-activity',
    name: 'النشاط الطلابي',
    floor: 0,
    wing: 'right',
    direction: 'right',
    directionText: 'اتجه يميناً في الممر الأوسط نحو مكتب النشاط',
    description: 'جهة اليمين - مكتب البرامج والأنشطة الطلابية',
    detailedPath: [
      'الدخول من البوابة والمدخل الرئيسي',
      'السير في الممر الأوسط لمسافة 14 متراً',
      'الانعطاف يميناً إلى مكتب النشاط الطلابي'
    ],
    distanceMeters: 17,
    walkTimeSeconds: 20,
    iconName: 'Award',
    roomNumber: 'G-R02',
    colorScheme: 'purple',
    devices: [
      {
        id: 'dev-act-1',
        name: 'جهاز HP الكمبيوتر',
        type: 'computer',
        brand: 'HP',
        model: 'Pavilion Gaming Desktop TG01',
        serialNumber: 'CZC981442K',
        assetTag: 'MOE-MED-PC140',
        status: 'working',
        notes: 'مخصص لتصميم الشهادات والمواد الإعلانية'
      },
      {
        id: 'dev-act-2',
        name: 'طابعة ألوان ملونة',
        type: 'printer',
        brand: 'Epson',
        model: 'EcoTank L8050 Photo & ID',
        serialNumber: 'X82N001429',
        assetTag: 'MOE-MED-PR078',
        status: 'working',
        notes: 'طباعة البوسترات والشهادات التقديرية'
      }
    ],
    mapCoordinates: { x: 530, y: 180, width: 220, height: 120, doorX: 530, doorY: 240 }
  },
  {
    id: 'loc-waiting-chairs',
    name: 'كراسي الانتظار',
    floor: 0,
    wing: 'right',
    direction: 'right',
    directionText: 'اتجه يميناً لصالة الانتظار الرئيسية',
    description: 'جهة اليمين - صالة كراسي انتظار المستفيدين المريحة',
    detailedPath: [
      'الدخول من البوابة والمدخل الرئيسي',
      'الانعطاف يميناً لمسافة 10 أمتار أمام كاونتر الخدمة',
      'مقاعد الاستراحة المجهزة بشاشات أرقام الانتظار'
    ],
    distanceMeters: 12,
    walkTimeSeconds: 14,
    iconName: 'Armchair',
    roomNumber: 'G-R03',
    colorScheme: 'cyan',
    devices: [
      {
        id: 'dev-wait-1',
        name: 'شاشة استدعاء الأرقام 55 بوصة',
        type: 'screen',
        brand: 'LG',
        model: 'Commercial Display 55UT',
        assetTag: 'MOE-MED-SCR01',
        status: 'working',
        notes: 'متصلة بنظام النداء الصوتي والمنظومة الرقمية'
      }
    ],
    mapCoordinates: { x: 530, y: 320, width: 220, height: 120, doorX: 530, doorY: 380 }
  },

  // --- ممر العقد المركزية (Central Corridor Nodes) ---
  {
    id: 'loc-entrance',
    name: 'المدخل الرئيسي',
    floor: 0,
    wing: 'center',
    direction: 'straight',
    directionText: 'أنت الآن عند المدخل الرئيسي للمبنى',
    description: 'بوابة الدخول الرئيسية المطلة على الشارع العام ومواقف الزوار',
    detailedPath: ['البوابة الأمنية والاستقبال الأولي'],
    distanceMeters: 0,
    walkTimeSeconds: 0,
    iconName: 'DoorOpen',
    roomNumber: 'ENT-01',
    colorScheme: 'slate',
    devices: [
      {
        id: 'dev-ent-1',
        name: 'بوابة الكشف الأمني الحساسة',
        type: 'other',
        brand: 'Garrett',
        model: 'Magnascanner MS-3500',
        assetTag: 'MOE-MED-SEC01',
        status: 'working',
        notes: 'فحص الدخول المزدوج'
      }
    ],
    mapCoordinates: { x: 340, y: 400, width: 120, height: 70, doorX: 400, doorY: 400 }
  },
  {
    id: 'loc-corridor',
    name: 'الممر الأوسط',
    floor: 0,
    wing: 'center',
    direction: 'straight',
    directionText: 'استمر للأمام مباشرة على طول الممر الأوسط',
    description: 'الشريان المركزي لمبنى الملك فهد الموصل لجميع الأجنحة',
    detailedPath: ['السير من المدخل الرئيسي باتجاه عمق المبنى'],
    distanceMeters: 10,
    walkTimeSeconds: 12,
    iconName: 'ArrowUpDown',
    roomNumber: 'HALL-C',
    colorScheme: 'slate',
    devices: [
      {
        id: 'dev-hall-1',
        name: 'كاميرا مراقبة بانورامية 360',
        type: 'network',
        brand: 'Hikvision',
        model: 'DS-2CD63C5G0-IVS',
        assetTag: 'MOE-MED-CAM03',
        status: 'working'
      }
    ],
    mapCoordinates: { x: 350, y: 220, width: 100, height: 160, doorX: 400, doorY: 300 }
  },
  {
    id: 'loc-elevator',
    name: 'المصاعد المركزية',
    floor: 0,
    wing: 'center',
    direction: 'elevator',
    directionText: 'استمر للأمام حتى نهاية الممر الأوسط نحو المصاعد',
    description: 'المصاعد المجهزة للصعود للأدوار العليا وذوي الإعاقة',
    detailedPath: [
      'الدخول من البوابة والمدخل الرئيسي',
      'المشي للأمام في الممر الأوسط مسافة 25 متراً',
      'المصاعد على اليسار في نهاية الممر'
    ],
    distanceMeters: 26,
    walkTimeSeconds: 30,
    iconName: 'Box',
    roomNumber: 'ELEV-01',
    colorScheme: 'indigo',
    devices: [
      {
        id: 'dev-elev-1',
        name: 'شاشة استدعاء المصعد الذكية',
        type: 'screen',
        brand: 'Otis',
        model: 'SmartCompass Touch',
        assetTag: 'MOE-MED-ELV01',
        status: 'working'
      }
    ],
    mapCoordinates: { x: 330, y: 110, width: 65, height: 90, doorX: 362, doorY: 155 }
  },
  {
    id: 'loc-stairs',
    name: 'الدرج الرئيسي',
    floor: 0,
    wing: 'center',
    direction: 'stairs',
    directionText: 'اتجه للأمام حتى نهاية الممر، الدرج على يمين المصاعد',
    description: 'السلالم الرئيسية الرخامية المؤدية للدور الأول وبقية الأدوار',
    detailedPath: [
      'الدخول من البوابة والمدخل الرئيسي',
      'السير في الممر الأوسط حتى النهاية',
      'الصعود عبر الدرج إلى الدور الأول'
    ],
    distanceMeters: 28,
    walkTimeSeconds: 34,
    iconName: 'Footprints',
    roomNumber: 'STR-01',
    colorScheme: 'indigo',
    devices: [],
    mapCoordinates: { x: 405, y: 110, width: 65, height: 90, doorX: 437, doorY: 155 }
  },

  // --- الدور الأول (First Floor) ---
  {
    id: 'loc-director',
    name: 'مكتب مدير عام التعليم',
    floor: 1,
    wing: 'left',
    direction: 'left',
    directionText: 'اصعد للدور الأول ثم اتجه يساراً إلى الجناح الرئاسي',
    description: 'الدور الأول - مكتب المدير العام وسكرتارية الإدارة',
    detailedPath: [
      'الصعود للدور الأول عبر المصعد أو الدرج',
      'الانعطاف يساراً في الردهة العلوية',
      'المكتب الرئاسي في نهاية الجناح'
    ],
    distanceMeters: 45,
    walkTimeSeconds: 55,
    iconName: 'Briefcase',
    roomNumber: '1-L01',
    colorScheme: 'amber',
    devices: [
      {
        id: 'dev-dir-1',
        name: 'جهاز كمبيوتر HP EliteOne 800',
        type: 'computer',
        brand: 'HP',
        model: 'EliteOne 800 G8 AiO',
        serialNumber: '5CD21949KK',
        assetTag: 'MOE-MED-PC001',
        status: 'working',
        notes: 'مكتب المدير العام'
      },
      {
        id: 'dev-dir-2',
        name: 'طابعة ليزر سرية آمنة',
        type: 'printer',
        brand: 'HP',
        model: 'LaserJet Enterprise Flow M635z',
        serialNumber: 'CNB198421',
        assetTag: 'MOE-MED-PR001',
        status: 'working',
        notes: 'طباعة مشفرة ببصمة الكارت'
      }
    ],
    mapCoordinates: { x: 50, y: 60, width: 230, height: 160, doorX: 280, doorY: 140 }
  },
  {
    id: 'loc-it-support',
    name: 'تقنية المعلومات والدعم الفني',
    floor: 1,
    wing: 'right',
    direction: 'right',
    directionText: 'اصعد للدور الأول ثم اتجه يميناً إلى قسم التقنية',
    description: 'الدور الأول - قسم الدعم الفني، الخوادم والشبكات',
    detailedPath: [
      'الصعود للدور الأول عبر المصعد أو الدرج',
      'الانعطاف يميناً في الردهة العلوية',
      'مكاتب الدعم الفني وصيانة الأجهزة على اليمين'
    ],
    distanceMeters: 42,
    walkTimeSeconds: 50,
    iconName: 'Server',
    roomNumber: '1-R01',
    colorScheme: 'blue',
    devices: [
      {
        id: 'dev-it-1',
        name: 'محطة عمل HP Z4 G4 Workstation',
        type: 'computer',
        brand: 'HP',
        model: 'Z4 G4 Xeon W-2223',
        serialNumber: 'CZC0492190',
        assetTag: 'MOE-MED-WS001',
        status: 'working',
        notes: 'إدارة الشبكات ونظام الدخول'
      },
      {
        id: 'dev-it-2',
        name: 'سويتش شبكي Cisco Catalyst',
        type: 'network',
        brand: 'Cisco',
        model: 'Catalyst 9300 48-Port PoE',
        assetTag: 'MOE-MED-SW01',
        status: 'working'
      },
      {
        id: 'dev-it-3',
        name: 'طابعة باركود وملصقات أصول',
        type: 'printer',
        brand: 'Zebra',
        model: 'ZD421 Barcode Thermal',
        assetTag: 'MOE-MED-PR099',
        status: 'working',
        notes: 'طباعة ملصقات جرد الأجهزة والمعدات'
      }
    ],
    mapCoordinates: { x: 520, y: 60, width: 230, height: 160, doorX: 520, doorY: 140 }
  },
  {
    id: 'loc-conference',
    name: 'قاعة الاجتماعات الرئيسية',
    floor: 1,
    wing: 'left',
    direction: 'left',
    directionText: 'اصعد للدور الأول ثم اتجه يساراً إلى قاعة الاجتماعات',
    description: 'الدور الأول - قاعة المؤتمرات والاتصال المرئي المتطورة',
    detailedPath: [
      'الصعود للدور الأول',
      'السير يساراً في الممر',
      'القاعة الرئيسية على اليسار'
    ],
    distanceMeters: 38,
    walkTimeSeconds: 46,
    iconName: 'Presentation',
    roomNumber: '1-L02',
    colorScheme: 'purple',
    devices: [
      {
        id: 'dev-conf-1',
        name: 'شاشة تفاعلية ذكية 86 بوصة',
        type: 'screen',
        brand: 'Clevertouch',
        model: 'Impact Plus 86" 4K',
        assetTag: 'MOE-MED-IFP01',
        status: 'working',
        notes: 'شاشة تفاعلية بلمس متعدد واجتماعات Teams'
      },
      {
        id: 'dev-conf-2',
        name: 'نظام كاميرا وميكروفونات المؤتمرات',
        type: 'other',
        brand: 'Logitech',
        model: 'Rally Plus Video System',
        assetTag: 'MOE-MED-VC002',
        status: 'working'
      }
    ],
    mapCoordinates: { x: 50, y: 250, width: 230, height: 180, doorX: 280, doorY: 340 }
  },
  {
    id: 'loc-school-affairs',
    name: 'إدارة الشؤون المدرسية',
    floor: 1,
    wing: 'right',
    direction: 'right',
    directionText: 'اصعد للدور الأول ثم اتجه يميناً للأمام إلى الشؤون المدرسية',
    description: 'الدور الأول - متابعة المدارس والتجهيزات المدرسية',
    detailedPath: [
      'الصعود للدور الأول',
      'الانعطاف يميناً والمتابعة لنهاية الجناح',
      'إدارة الشؤون المدرسية'
    ],
    distanceMeters: 48,
    walkTimeSeconds: 58,
    iconName: 'GraduationCap',
    roomNumber: '1-R02',
    colorScheme: 'emerald',
    devices: [
      {
        id: 'dev-sch-1',
        name: 'كمبيوتر مكتبي HP ProDesk',
        type: 'computer',
        brand: 'HP',
        model: 'ProDesk 400 G7',
        assetTag: 'MOE-MED-PC190',
        status: 'working'
      },
      {
        id: 'dev-sch-2',
        name: 'طابعة ليزرية كانون ملونة',
        type: 'printer',
        brand: 'Canon',
        model: 'i-SENSYS LBP663Cdw',
        assetTag: 'MOE-MED-PR052',
        status: 'working'
      }
    ],
    mapCoordinates: { x: 520, y: 250, width: 230, height: 180, doorX: 520, doorY: 340 }
  }
];

export const CORRIDOR_NODES: CorridorNode[] = [
  { id: 'nodeStairs', name: 'الدرج', iconName: 'Stairs', x: 437, y: 155, floor: 0 },
  { id: 'nodeElevator', name: 'المصاعد', iconName: 'Elevator', x: 362, y: 155, floor: 0 },
  { id: 'nodeCorridor', name: 'الممر الأوسط', iconName: 'ArrowUpDown', x: 400, y: 280, floor: 0 },
  { id: 'nodeEntrance', name: 'المدخل الرئيسي', iconName: 'DoorOpen', x: 400, y: 430, floor: 0 }
];
