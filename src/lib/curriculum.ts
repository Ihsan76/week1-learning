export interface Lesson {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  duration: string;
  topics: string[];
  topicsAr: string[];
  objectives: string[];
  objectivesAr: string[];
  resources: string[];
  exercises: Exercise[];
}

export interface Exercise {
  title: string;
  titleAr: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  descriptionAr: string;
}

export const week1Lessons: Lesson[] = [
  {
    id: 'html-basics',
    title: 'HTML Basics',
    titleAr: 'أساسيات HTML',
    description: 'Learn the fundamentals of HTML markup language',
    descriptionAr: 'تعرف على أساسيات لغة HTML',
    duration: '2 hours',
    topics: ['HTML Elements', 'Tags', 'Attributes', 'Document Structure'],
    topicsAr: ['عناصر HTML', 'العلامات', 'الخصائص', 'بنية المستند'],
    objectives: [
      'Understand HTML structure',
      'Learn semantic markup',
      'Create well-formed documents'
    ],
    objectivesAr: [
      'فهم بنية HTML',
      'تعلم العلامات الدلالية',
      'إنشاء وثائق منظمة'
    ],
    resources: [
      'HTML Reference Guide',
      'MDN Web Docs',
      'W3C Standards'
    ],
    exercises: [
      {
        title: 'Create Basic HTML Page',
        titleAr: 'إنشاء صفحة HTML بسيطة',
        difficulty: 'beginner',
        description: 'Create a simple HTML page with proper structure',
        descriptionAr: 'اعمل صفحة HTML ببنية حقيقية'
      }
    ]
  },
  {
    id: 'css-basics',
    title: 'CSS Styling',
    titleAr: 'تنسيق CSS',
    description: 'Master CSS for styling and layout',
    descriptionAr: 'اتقن CSS للتنسيق والتخطيط',
    duration: '2 hours',
    topics: ['Selectors', 'Properties', 'Box Model', 'Flexbox'],
    topicsAr: ['محددات', 'خصائص', 'نموذج العلبة', 'نظام Flexbox'],
    objectives: [
      'Style HTML elements',
      'Understand box model',
      'Create layouts'
    ],
    objectivesAr: [
      'تنسيق عناصر HTML',
      'فهم نموذج العلبة',
      'إنشاء تخطيطات'
    ],
    resources: [
      'CSS Guide',
      'CSS Tricks',
      'Can I Use?'
    ],
    exercises: [
      {
        title: 'Style with CSS',
        titleAr: 'تنسيق CSS',
        difficulty: 'intermediate',
        description: 'Apply CSS styling to HTML page',
        descriptionAr: 'طبق تنسيق CSS على الصفحة'
      }
    ]
  }
];

export const allWeeks = [
  { id: 1, title: 'Week 1', titleAr: 'الأسبوع الأول' },
  { id: 2, title: 'Week 2', titleAr: 'الأسبوع الثاني' },
  { id: 3, title: 'Week 3', titleAr: 'الأسبوع الثالث' },
  { id: 4, title: 'Week 4', titleAr: 'الأسبوع الرابع' },
];
