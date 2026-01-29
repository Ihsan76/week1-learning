# المساهمة في آفاق (Frontend)

شكرًا لاهتمامك بالمساهمة في منصة آفاق التعليمية.

## متطلبات عامة
- Node.js (يفضل LTS)
- npm / pnpm / yarn

## تشغيل المشروع محليًا
1) ثبّت الاعتمادات:
```bash
npm install
أنشئ .env.local:

bash
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
شغّل:

bash
npm run dev
أسلوب العمل (Workflow)
افتح Issue أولًا (Bug/Feature) قبل التغيير الكبير.

أنشئ فرعًا باسم واضح:

feat/<name> ميزة جديدة

fix/<name> إصلاح

chore/<name> مهام/تنظيف

اعمل PR مع وصف واضح وصور/فيديو إن أمكن.

معايير القبول
لا تكسر RTL/العربية.

حافظ على اتساق الواجهة (Buttons, Modals, Forms).

أي تغيير يمس API لازم يكون موثق.