
# آفاق | Afaq — الواجهة الأمامية (Frontend)

منصة **آفاق التعليمية** هي نظام إدارة تعلم (LMS) عام يدعم إنشاء الكورسات والوحدات والدروس وتتبع تقدم الطلاب، مع لوحة تحكم للإدارة.

## روابط مهمة
- الواجهة (Production): https://week1-learning.vercel.app/  *(حدّثها عند تغيير الدومين)*  [page:94]
- API (Backend): https://week1-backend.onrender.com/  *(المسارات تكون تحت /api/...)*  [page:94]

## التقنيات
- Next.js (App Router) + TypeScript. [page:94]
- ESLint. [page:94]

## المزايا (حاليًا)
- تطوير واجهة الإدارة وتجربة المستخدم (مثل تحسينات النوافذ/المودالات). [page:94]
- ملف تحسينات التصميم: `DESIGN_IMPROVEMENTS.md`. [page:94]

## خارطة الطريق (MVP)
- إدارة الكورسات (إنشاء/تعديل/نشر).
- هيكلة المحتوى: Course → Module → Lesson.
- تسجيل الطالب (Enrollment) + تتبع التقدم (Progress).
- تعدد اللغات (الافتراضي: العربية) مع إمكانية إضافة لغات من لوحة الإدارة.

## التشغيل محليًا
### المتطلبات
- Node.js (يفضل LTS)
- npm (أو pnpm/yarn)

### التثبيت
```bash
npm install
إعداد متغيرات البيئة
أنشئ ملف .env.local:

```bash
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
عند ربطك بـ Render استخدم رابط السيرفر في متغيرات بيئة Vercel.

التشغيل
```bash
npm run dev
ثم افتح:

http://localhost:3000

النشر
المشروع منشور عبر Vercel، وتوجد إعدادات إنتاج في .env.production. [page:94]

المساهمة
أي اقتراحات أو تحسينات مرحب بها عبر Issues/PRs.

