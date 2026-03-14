# 🎓 EVO — الشرح الكامل والشامل للمشروع

> **اسم المشروع:** EVO (Evolution — منصة إدارة جامعية متكاملة)
> **الجامعة:** Helwan International Technological University — HITU
> **النوع:** University Management System (UMS) — Full Stack Web Application
> **الـ Stack:** Next.js 14 + Node.js/Express + PostgreSQL (Neon Cloud) + JWT

---

## 🧠 ما هو EVO؟

**EVO** هو نظام إدارة جامعي متكامل تم تطويره خصيصاً لجامعة **هيلوان الدولية للتكنولوجيا (HITU)**. الفكرة من المشروع إنه يحل محل كل الإجراءات الورقية والمتفرقة ويجمعها في منصة رقمية واحدة يستخدمها الطلاب والدكاترة والإدارة في نفس الوقت.

بمعنى تاني: EVO هو الـ **"Blackboard"** أو **"Microsoft Teams"** الخاص بالجامعة — بس مبني from scratch لتلائم الاحتياجات المحلية.

---

## 🎯 من يستخدم EVO؟ (الـ 4 User Roles)

| الدور | الرمز في الكود | الصلاحيات |
|-------|---------------|-----------|
| **الطالب** | `student` | عرض درجاته، محاضراته، تكليفاته، حضوره، إحصائياته، تقديم طلبات رسمية |
| **الدكتور** | `doctor` | إدارة محاضراته، رفع ملفات، بث مباشر، عرض إحصائيات طلابه |
| **الأدمن** | `admin` | إدارة الأخبار، مراجعة الطلبات الرسمية، إضافة/حذف مستخدمين |
| **لجنة المراقبة** | `control` | رفع كشوف الدرجات، مراجعتها، اعتمادها |

---

## 🗺️ خريطة المشروع الكاملة

```
EVO
├── 🌐 Landing Page          → واجهة الجامعة العامة
├── 🔑 Login Page            → تسجيل الدخول
│
├── 🎓 Student Portal        → لوحة الطالب
│   ├── Profile              → البيانات الشخصية
│   ├── Grades               → الدرجات
│   ├── Lectures             → المحاضرات
│   ├── Assignments          → التكليفات
│   ├── Activities           → الأنشطة
│   ├── Statistics           → الإحصائيات
│   ├── Roadmap              → خريطة الدراسة
│   ├── Payments             → المدفوعات
│   └── Live Lecture Room    → غرفة البث المباشر
│
├── 🩺 Doctor Dashboard      → لوحة الدكتور
│   ├── Profile + Schedule   → البروفايل والجدول
│   ├── Videos               → رفع الفيديوهات
│   ├── Assignments          → إدارة التكليفات
│   ├── Statistics           → إحصائيات الطلاب
│   └── Live Lecture Room    → بث مباشر
│
├── 📰 News                  → الأخبار الجامعية
│   └── News Admin           → إضافة أخبار
│
├── 📚 Library               → المكتبة الرقمية
├── ❓ FAQ                   → الأسئلة الشائعة
├── 🗺️ GPS / Campus Map      → خريطة الحرم الجامعي
├── 📋 Documents             → الطلبات الرسمية
└── ⚙️ Control Panel         → لوحة رفع الدرجات
```

---

## ✨ المميزات الكاملة للمشروع

---

### 1. 🌐 Landing Page — الواجهة الرئيسية

الصفحة الرئيسية للجامعة — تسويقية واحترافية.

**المميزات:**
- **Hero Section** بخلفية صورة الحرم الجامعي وعنوان ترحيبي
- **About Section** يشرح رسالة الجامعة وأهدافها
- **Auto-Rotating News Carousel** — عرض آخر 5 أخبار جامعية، بيتغير تلقائياً كل 4 ثواني مع Fade Animation
- **Departments Section** — عرض 9 أقسام بالتفصيل مع Scroll-Triggered Fade-Up Animation لكل قسم
- **Floating Login Button** — زرار Login عائم على جانب الصفحة
- **Cursor Glow Effect** — توهج بيتبع الماوس
- **Footer كامل** — روابط سريعة + التواصل + الأقسام + Social Media
- **Responsive Design** — متوافق مع الموبايل والـ Desktop

**الأقسام الـ 9 الموجودة:**
Data Science — Cybersecurity — AI — Mechatronics — Electrical — Mechanical — Production & Industrial — Energy — Operation & Maintenance

---

### 2. 🔑 Login System

صفحة تسجيل الدخول.

**المميزات:**
- تصميم Split-Screen (معلومات الجامعة + فورم الدخول)
- خلفية Glassmorphism مع Blur effect
- Validation للبيانات مع رسائل خطأ
- JWT Authentication — بعد الدخول الناجح يتخزن الـ Token ويتوجّه المستخدم حسب دوره تلقائياً

---

### 3. 🎓 Student Portal — بوابة الطالب الكاملة

أهم وأكبر جزء في المشروع — لوحة تحكم كاملة للطالب.

**الـ Layout:**
- Sidebar على اليمين بصورة الطالب وبياناته وقائمة التنقل
- المحتوى الرئيسي على الشمال يتغير بدون إعادة تحميل الصفحة
- Responsive: على الموبايل الـ Sidebar بيتحول لـ drawer بيفتح وبيتغلق

#### 3.1 Profile — البروفايل الشخصي
- صورة الطالب + الاسم + التخصص + الرقم الجامعي
- بطاقات معلومات: الاسم، الـ ID، التخصص، التليفون، العنوان
- Badge "Student"

#### 3.2 Grades — الدرجات
- جدول درجات الفصل الحالي
- درجات: الأعمال (sup) + المنتصف (mid) + النهائي (final)
- الحرف النهائي A+, A, B, C... مع ألوان مختلفة لكل حرف
- النسبة المئوية لكل مادة

#### 3.3 Lectures — المحاضرات
- عرض المحاضرات المسجلة كـ Video Cards مع Thumbnail
- فلترة بالكورس والسنة والأسبوع
- زرار مشاهدة الفيديو
- زرار دخول الـ Live Lecture

#### 3.4 Activities — الأنشطة والفعاليات
- قائمة الأنشطة (مسابقات، ورش عمل، محاضرات ضيف، احتفالات)
- Badge لكل نشاط: `upcoming` أصفر / `completed` أخضر
- التاريخ والوصف وتصنيف النشاط

#### 3.5 Statistics — الإحصائيات الأكاديمية
Dashboard كامل بـ Charts مبنية بـ **Recharts**:
- **GPA Trend** — Line Chart بالـ GPA على مدار الفصول
- **نسبة الحضور** — Progress bar (85% مثلاً)
- **توزيع درجات المواد** — Bar Chart
- **حالة التكليفات** — Pie Chart (مسلّم / متأخر / ناقص)
- **Activity Distribution** — Weekly Bar Chart

#### 3.6 Assignments — التكليفات
- قائمة بكل التكليفات
- حالة كل تكليف: pending / submitted / graded / late
- تاريخ التسليم + الدرجة + الوصف + النقاط

#### 3.7 Roadmap — خريطة الدراسة
Timeline تفاعلي من السنة الأولى للرابعة:
- كل فصل ببيّن موادّه
- Status لكل مادة: ✅ completed / 🔵 in-progress (مع progress bar) / ⚪ upcoming
- يمكن الضغط على أي فصل لعرض تفاصيله

#### 3.8 Payments — المدفوعات
- إجمالي الرسوم الدراسية
- المبلغ المدفوع والمتبقي
- جدول الفواتير مع الحالة (paid / pending)
- تاريخ الدفع لكل فاتورة

---

### 4. 📡 Live Lecture Room — غرفة البث المباشر

متاحة لكل من الطالب والدكتور.

**المميزات:**
- منطقة عرض الـ Live Stream (جاهزة للربط بـ WebRTC)
- **Live Chat مباشر** — رسائل نصية بين الطالب والدكتور
- إرسال ملفات في الـ Chat
- ظهور اسم كل مرسل + الوقت
- رسائل الدكتور بتتميز بشكل مختلف
- زرار BACK للرجوع
- Route ديناميكي: `/live-lecture/[id]`

---

### 5. 🩺 Doctor Dashboard — لوحة الدكتور

#### البروفايل Banner
- صورة + الاسم + الدرجة العلمية + القسم
- إحصائيات: Rating / عدد الطلاب / عدد المحاضرات
- Hover effects على الصورة

#### Active Lecture Bar
- اسم المحاضرة الحالية الـ live + رقم القاعة + الوقت + عدد الطلاب
- Badge "LIVE NOW"
- زرار **Start Live Stream**
- Upload file سريع لملف محاضرة

#### Today's Timeline
- جدول اليوم بكل المحاضرات
- اسم المادة + القسم + السنة + القاعة + الوقت
- Badge أخضر للمحاضرة الـ Live الحالية
- زرار **View Full Week Schedule** يفتح Modal بجدول الأسبوع كامل

#### Doctor Information
- Biography نصية
- Research Areas كـ Tags تفاعلية
- Contact Info: Email + Office Phone + Location
- Social Links: LinkedIn + Twitter + GitHub

#### Quick Action Cards (3 كروت)
| الكارت | الرابط |
|--------|--------|
| Videos | `/doctor/videos` |
| Assignments | `/doctor/assignments` |
| Statistics | `/doctor/statistics` |

---

### 6. 📹 Doctor — Videos

**المميزات:**
- فلترة بالقسم (Mechatronics, CS, Civil, ...) والسنة والمادة
- Dropdown ديناميكي — المواد بتتغير حسب القسم والسنة
- Drag & Drop لرفع الفيديوهات
- عرض الفيديوهات المرفوعة في جدول
- اسم الفيديو + الحجم + التاريخ + الحالة

---

### 7. 📝 Doctor — Assignments

**المميزات:**
- Drag & Drop أو Choose File
- يقبل: PDF, DOC, DOCX, XLSX, ZIP
- قائمة بالملفات المرفوعة مع الاسم والحجم والتاريخ وحالة الرفع
- Delete لأي ملف

---

### 8. 📊 Doctor — Statistics

Dashboard إحصائي للدكتور عن طلابه:
- **Attendance Bar Chart** — حضور الطلاب يومياً (Sat→Thu)
- **Grades Distribution** — Bar Chart لتوزيع الدرجات A+, A, B+...
- **Activity Line Chart** — محاضرات + تكليفات + كويزات أسبوعياً
- **Class Distribution Pie** — توزيع الطلاب بالسنة الدراسية
- فلترة بالفترة الزمنية (Week / Month / Semester)

---

### 9. 📰 News System — نظام الأخبار

#### صفحة الأخبار العامة
- Grid layout للأخبار
- بحث نصي real-time
- فلترة بالـ Category (Technology, Events, Academic...)
- فلترة بالتاريخ: Recent / Older
- زرار "+ Add News" للأدمن

#### News Admin Panel
- Login بكلمة مرور
- فورم إضافة خبر: العنوان + التاريخ + صورة (URL) + الوصف + التصنيف + رابط فيديو + المصدر
- بعد الإضافة يظهر فوراً في الصفحة الرئيسية والـ Landing Page

---

### 10. 📚 Library — المكتبة الرقمية

**المميزات:**
- عرض الكتب في Grid بصور الأغلفة
- بحث بالعنوان (real-time)
- فلترة بالقسم (9 أقسام) عبر Dropdown مع Notification dot لما يكون فيه فلتر مفعّل
- زرار **Read** — بيفتح PDF في Google Docs Viewer في تاب جديد
- زرار **Download** — لتحميل الكتاب
- Hover animation على كل كتاب

---

### 11. ❓ FAQ System — نظام الأسئلة الشائعة

نظام كامل لإدارة الأسئلة الشائعة بـ 3 حالات تشغيل:

**للطالب:**
- عرض الأسئلة المجاب عليها كـ Accordion (تفتح وتقفل)
- بحث في الأسئلة والإجابات
- إضافة سؤال جديد → بيتحول لـ "Pending" انتظاراً للإجابة
- عداد الأسئلة المعلقة

**للأدمن:**
- زرار "Admin Mode" يكشف لوحة الأسئلة المعلقة
- كتابة الإجابة + نشرها أو رفض وحذف السؤال
- حذف أي سؤال مجاب عليه

**الترتيب الذكي:**
- الأسئلة المجاب عليها حديثاً بتظهر أول
- الأسئلة المعلقة مرتبة بالأقدم أولاً

---

### 12. 🗺️ GPS / Campus Navigator — خريطة الحرم الجامعي

**المميزات:**
- Sidebar مع قائمة المباني (A, C, D, F, G) — كل مبنى بلون مختلف
- الضغط على مبنى بيعرض قائمة غرفه
- أنواع الغرف: 🎓 Lecture / 🏫 Class / 🔬 Lab / 💬 Seminar / 🏢 Office / 📚 Library / 📍 Other
- **Search Tab** — تقدر تدور على أي غرفة بالاسم أو الرقم أو النوع
- خريطة 3D بـ Animated Grid Background
- Building Dots تفاعلية على الخريطة مع Pulse Animations بألوان كل مبنى
- كارت معلومات يظهر لما تختار غرفة
- Room Type Filter Chips في أعلى الخريطة
- Legend في أسفل الخريطة
- **مستقبلاً:** تكامل Three.js أو Mapbox لخريطة 3D حقيقية

---

### 13. 📋 Documents System — نظام الطلبات الرسمية

نظام متكامل لتقديم ومراجعة الطلبات الرسمية.

**7 أنواع طلبات مدعومة:**
| النوع | المستندات المطلوبة |
|-------|------------------|
| شهادة قيد | رقم قومي طالب + ولي أمر + إيصال + كود الطالب |
| اشتراك مترو | بطاقة + رقم ولي أمر + صورة شخصية + شهادة قيد + نموذج |
| موقف التجنيد | رقم قومي + شهادة ميلاد + 3 صور + شهادة قيد |
| كشف درجات رسمي | رقم قومي + كارت الطالب + إيصال + نموذج رسمي |
| بطاقة الطالب | صورة شخصية + رقم قومي + إيصال + نموذج |
| انتقال لكلية أخرى | بيان قيد + كشف درجات + رقم قومي + نموذج |
| عذر فصل دراسي | طلب رسمي + رقم قومي + وثيقة العذر + بيان قيد |

**للطالب:**
- اختيار نوع الطلب → ظهور الحقول المطلوبة ديناميكياً
- حقول نصية (أرقام قومية) وحقول رفع ملفات (صور، PDF)
- ملاحظات إضافية اختيارية
- جدول "طلباتي السابقة" مع الحالة وتاريخ الاستلام

**للأدمن:**
- إحصائيات: إجمالي الطلبات / Pending / Approved / Rejected
- جدول بكل الطلبات قابل للـ Expand/Collapse بـ animation سلسة
- عرض كل المستندات المقدمة لكل طلب
- تعيين تاريخ الاستلام
- زرار Approve ✅ أو Reject ❌
- **طباعة الطلب** — بيفتح نافذة طباعة HTML منسقة
- طباعة كل مستند على حدة

---

### 14. ⚙️ Control Panel — لوحة رفع الدرجات

**للجنة المراقبة فقط.**

**المميزات:**
- Dropdowns: اختر المادة + السنة الدراسية + القسم
- Drag & Drop أو Choose File — يقبل XLSX و CSV فقط
- **Excel/CSV Preview تفاعلي:**
  - بيقرأ الملف بـ SheetJS (لـ Excel) أو JS native (لـ CSV)
  - بيعرض الجدول كامل في الصفحة قبل الإرسال
  - عدد الصفوف + Header Sticky
  - ألوان متناوبة للصفوف
- زرار مسح الملف والبدء من جديد

---

### 15. 🔐 Security & Authentication

**JWT (JSON Web Token):**
- كل الـ API Routes محمية بـ `authenticateToken` middleware
- الـ Token بيتبعت في كل request في الـ `Authorization: Bearer <token>` header
- Token منتهي الصلاحية → **403 Forbidden**
- مفيش token → **401 Unauthorized**

**CORS Policy:**
- مسموح بـ localhost:3000, localhost:3001
- مسموح بكل Vercel و Netlify deployments

---

## 🏗️ البنية التقنية (Tech Stack)

### الـ Backend
| التقنية | الاستخدام |
|---------|----------|
| **Node.js + Express.js** | الـ Server الأساسي |
| **PostgreSQL (Neon Cloud)** | قاعدة البيانات السحابية |
| **JWT (jsonwebtoken)** | Authentication |
| **CORS** | Cross-Origin Resource Sharing |
| **dotenv** | إدارة متغيرات البيئة |
| **pg (node-postgres)** | الاتصال بقاعدة البيانات |
| **bodyParser** | قراءة الـ Request Body |

### الـ Frontend
| التقنية | الاستخدام |
|---------|----------|
| **Next.js 14 (App Router)** | الـ Framework الأساسي |
| **React 18** | بناء الـ UI |
| **Tailwind CSS** | Utility-first styling |
| **Bootstrap 5** | Grid و Components إضافية |
| **Recharts** | الـ Charts والإحصائيات |
| **SheetJS (xlsx)** | قراءة ملفات Excel |
| **Bootstrap Icons** | الأيقونات |

### الـ Deployment
| الخدمة | الاستخدام |
|--------|----------|
| **Neon** | Serverless PostgreSQL |
| **Vercel** | Frontend Hosting |
| **Google Cloud Run** | Backend Hosting (مخطط) |

---

## 🗄️ قاعدة البيانات — الجداول الـ 25

| الجدول | الوصف |
|--------|-------|
| `USER` | جدول المستخدمين الأساسي (base لكل الأدوار) |
| `students` | بيانات الطلاب التفصيلية |
| `doctor` | بيانات الدكاترة |
| `admin` | الأدمن والصلاحيات |
| `control` | أعضاء لجنة المراقبة |
| `student_affairs` | موظفو شؤون الطلاب |
| `specialization` | التخصصات (9 أقسام) |
| `course` | المواد الدراسية |
| `lecture` | المحاضرات (schedule + live_url + status) |
| `lecture_materials` | ملفات المحاضرات (PDF, Videos...) |
| `assignment` | التكليفات |
| `grade` | درجات الطلاب |
| `upload_grades` | كشوف الدرجات المرفوعة للمراجعة |
| `enrollments` | تسجيل الطلاب في المواد |
| `semesters` | الفصول الدراسية |
| `study_plan` | خطط الدراسة بالتخصص |
| `attendance` | سجل الحضور والغياب |
| `live` | جلسات البث المباشر |
| `messages` | الرسائل بين المستخدمين |
| `news` | الأخبار الجامعية |
| `faq` | الأسئلة الشائعة |
| `library` | كتب المكتبة الرقمية |
| `building` | المباني والقاعات |
| `student_request` | الطلبات الرسمية للطلاب |
| `request_type` | أنواع الطلبات الرسمية |

---

## 🔗 الـ API Routes الـ 25 (ملخص)

كل route بيدعم **GET + GET/:id + POST + PUT/:id + DELETE/:id**

| Route | الوظيفة |
|-------|---------|
| `/api/USER` | إدارة المستخدمين |
| `/api/admin` | إدارة الأدمن |
| `/api/students` | إدارة الطلاب |
| `/api/doctor` | إدارة الدكاترة |
| `/api/course` | المواد الدراسية |
| `/api/lecture` | المحاضرات |
| `/api/lecture_materials` | ملفات المحاضرات |
| `/api/assignment` | التكليفات |
| `/api/grade` | الدرجات |
| `/api/upload_grades` | كشوف الدرجات |
| `/api/enrollments` | التسجيل |
| `/api/semesters` | الفصول الدراسية |
| `/api/specialization` | التخصصات |
| `/api/study_plan` | خطط الدراسة |
| `/api/live` | البث المباشر |
| `/api/attendance` | الحضور والغياب |
| `/api/messages` | الرسائل |
| `/api/news` | الأخبار |
| `/api/faq` | الأسئلة الشائعة |
| `/api/building` | المباني والقاعات |
| `/api/control` | لجنة المراقبة |
| `/api/student_request` | الطلبات الرسمية |
| `/api/request_type` | أنواع الطلبات |
| `/api/library` | المكتبة الرقمية |
| `/api/student_affairs` | شؤون الطلاب |

---

## 🎨 الهوية البصرية للمشروع

### الألوان
| الاسم | الكود | أين يُستخدم |
|-------|-------|------------|
| Navy Blue | `#0b3a6e` | الـ Primary color العام |
| Gold | `#caa13c` / `#e4bd63` | الأزرار والـ Accents |
| Dark Blue | `#2b3a55` | لوحة الدكتور |
| Light Blue | `#6fc3ff` | لوحة الطالب |
| Campus Gold | `#c9860a` | GPS وDocuments |
| Dark Background | `#1a1a2e` | الـ Student/Doctor portals |

### الـ Shared UI Elements
- **CircularMenu** — قائمة دائرية عائمة في كل صفحة للتنقل
- **Cursor Glow** — توهج يتبع الماوس في Landing و Doctor pages
- **Glassmorphism Cards** — كروت شفافة مع Backdrop Blur
- **Hover Animations** — كل element تقريباً بيتحرك عند الـ hover
- **Gradient Backgrounds** — gradients بدل الألوان الصلبة في الأزرار والكروت

---

## 💡 الفائدة والإفادة من EVO

### للطالب
- ✅ مش محتاج يروح الكلية عشان يعرف درجاته — كل حاجة أونلاين
- ✅ بيشوف جدوله وخطة دراسته الكاملة من أول يوم
- ✅ بيدخل المحاضرات المسجلة والـ Live في أي وقت
- ✅ بيقدم طلباته الرسمية (شهادة قيد، كشف درجات...) من الموبايل
- ✅ بيعرف موقفه المالي بالكامل
- ✅ بيتواصل مع الدكتور في الـ Live Chat
- ✅ بيعرف يدور على أي قاعة في الحرم الجامعي بالـ GPS

### للدكتور
- ✅ لوحة واحدة لإدارة كل محاضراته وموادّه
- ✅ بث مباشر للمحاضرات بدون تطبيق خارجي
- ✅ رفع ملفات وتكليفات بـ Drag & Drop
- ✅ Dashboard إحصائي يوري نسب الحضور وتوزيع الدرجات فوراً
- ✅ جدوله الأسبوعي موجود في نظرة واحدة

### للإدارة
- ✅ إدارة الأخبار الجامعية بسهولة
- ✅ مراجعة واعتماد أو رفض الطلبات الرسمية للطلاب
- ✅ طباعة الطلبات والمستندات مباشرة

### للجنة المراقبة
- ✅ رفع كشوف الدرجات بـ Excel مع Preview قبل الإرسال
- ✅ مراجعة واعتماد الكشوف بدون ورق

---

## 📁 هيكل الملفات الكامل

```
EVO/
│
├── back/                          ← الـ Backend
│   ├── server.js                  ← نقطة البداية
│   ├── .env                       ← المتغيرات السرية
│   ├── config/
│   │   ├── db.js                  ← الاتصال بـ PostgreSQL
│   │   └── test_db.js             ← اختبار الاتصال
│   ├── middleware/
│   │   └── auth.js                ← JWT Middleware
│   ├── routes/                    ← الـ 25 Route Files
│   │   ├── USER.js
│   │   ├── students.js
│   │   ├── doctor.js
│   │   ├── course.js
│   │   ├── lecture.js
│   │   ├── lecture_materials.js
│   │   ├── assignment.js
│   │   ├── grade.js
│   │   ├── upload_grades.js
│   │   ├── enrollments.js
│   │   ├── semesters.js
│   │   ├── specialization.js
│   │   ├── study_plan.js
│   │   ├── live.js
│   │   ├── attendance.js
│   │   ├── messages.js
│   │   ├── news.js
│   │   ├── faq.js
│   │   ├── building.js
│   │   ├── control.js
│   │   ├── admin.js
│   │   ├── student_request.js
│   │   ├── request_type.js
│   │   ├── library.js
│   │   └── student_affairs.js
│   ├── utils/
│   │   ├── helpers.js
│   │   └── sestem.sql             ← SQL schema
│   └── scripts/
│       ├── generateRoutes.js      ← Auto-generate routes
│       └── update_routes.js
│
└── front/                         ← الـ Frontend (Next.js 14)
    ├── app/
    │   ├── page.js                ← Landing Page
    │   ├── layout.js              ← Root Layout
    │   ├── components/
    │   │   ├── Header.js
    │   │   ├── CircularMenu.jsx
    │   │   ├── Icons.js
    │   │   ├── NewsCard.jsx
    │   │   ├── NewsCarousel.js
    │   │   └── newsStore.js
    │   └── (pages)/
    │       ├── login/page.js
    │       ├── student-page/
    │       │   ├── page.js
    │       │   ├── live-lecture/[id]/page.js
    │       │   └── components/    ← 8 Sub-Components
    │       ├── doctor/
    │       │   ├── page.js
    │       │   ├── assignments/page.js
    │       │   ├── statistics/page.js
    │       │   ├── videos/page.js
    │       │   └── live-lecture/[id]/page.js
    │       ├── news/
    │       │   ├── page.js
    │       │   └── admin/page.js
    │       ├── library/page.js
    │       ├── faq/page.js
    │       ├── gps/page.js
    │       ├── documents/page.js
    │       └── control/page.js
    └── styles/                    ← 13 CSS File
```

---

## ⚡ نقاط القوة في المشروع

| النقطة | التفصيل |
|--------|---------|
| **Architecture نظيفة** | الـ Backend منفصل تماماً عن الـ Frontend (REST API) |
| **Dynamic Route Loading** | الـ server بيلود الـ routes أوتوماتيكياً — إضافة route جديد بمجرد إضافة ملف |
| **JWT Security** | كل الـ API endpoints محمية |
| **Responsive Design** | التطبيق بيشتغل على الموبايل والـ Desktop |
| **Real Charts** | Recharts للإحصائيات الحقيقية |
| **File Handling** | رفع Excel + CSV + PDF + Video مع Preview |
| **Print System** | طباعة الطلبات الرسمية مباشرة من المتصفح |
| **Interactive 3D Map** | خريطة الحرم الجامعي جاهزة للـ 3D integration |
| **Glassmorphism UI** | تصميم عصري بـ Blur + Transparency |
| **Scroll Animations** | FadeUp animations للعناصر عند التمرير |

---

## ⚠️ النقاط التي تحتاج تحسين

| المشكلة | الأولوية | الحل المقترح |
|---------|---------|-------------|
| **لا يوجد `/api/auth/login`** | 🔴 عالية | إضافة login endpoint يرجع JWT |
| **Password Plain Text** | 🔴 عالية | إضافة bcrypt لـ hashing |
| **الـ Frontend لا يستخدم JWT حقيقي** | 🔴 عالية | ربط الـ login بالـ API |
| **البيانات hardcoded في الـ Frontend** | 🟡 متوسطة | استبدالها بـ API calls |
| **Live Stream placeholder** | 🟡 متوسطة | ربطه بـ WebRTC أو Zoom SDK |
| **bug في students.js** (age مكرر) | 🟡 متوسطة | تصحيح الـ SQL query |
| **3D Map placeholder** | 🟢 منخفضة | Three.js أو Mapbox integration |
| **Payments لا يوجد لها Backend Route** | 🟡 متوسطة | إضافة `/api/payments` |

---

## 🚀 طريقة تشغيل المشروع

### الـ Backend
```bash
cd back
npm install
# إنشاء .env بالقيم دي:
# DATABASE_URL=postgresql://...
# JWT_SECRET=your_secret
# PORT=5000
npm start
```

### الـ Frontend
```bash
cd front
npm install
# إنشاء .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev
```

**الـ Frontend:** `http://localhost:3000`
**الـ Backend:** `http://localhost:5000`
**Health Check:** `http://localhost:5000/health`

---

*تم توثيق هذا المشروع بالكامل بواسطة Claude بناءً على الكود الفعلي — EVO @ HITU*
