# 🎨 EVO — شرح الـ Frontend بالكامل

> **المشروع:** EVO (منصة جامعية متكاملة لجامعة HITU)
> **التقنيات:** Next.js 14 (App Router) + Tailwind CSS + Bootstrap + Recharts
> **المتغيرات المطلوبة:** `.env.local` → `NEXT_PUBLIC_API_URL=http://localhost:5000`

---

## 🏗️ نظرة عامة على هيكل الفرونت

```
front/
├── app/
│   ├── page.js                    ← الصفحة الرئيسية (Landing Page)
│   ├── layout.js                  ← الـ Root Layout
│   ├── components/                ← Components المشتركة
│   │   ├── Header.js
│   │   ├── CircularMenu.jsx
│   │   ├── Icons.js
│   │   ├── NewsCard.jsx
│   │   ├── NewsCarousel.js
│   │   └── newsStore.js
│   └── (pages)/                   ← صفحات التطبيق
│       ├── login/page.js
│       ├── student-page/
│       │   ├── page.js
│       │   ├── live-lecture/[id]/page.js
│       │   └── components/
│       │       ├── ProfileComponent.js
│       │       ├── GradesComponent.js
│       │       ├── LecturesComponent.js
│       │       ├── ActivitiesComponent.js
│       │       ├── StatisticsComponent.js
│       │       ├── AssignmentsComponent.js
│       │       ├── PaymentsComponent.js
│       │       └── RoadmapComponent.jsx
│       ├── doctor/
│       │   ├── page.js
│       │   ├── assignments/page.js
│       │   ├── statistics/page.js
│       │   ├── videos/page.js
│       │   └── live-lecture/[id]/page.js
│       ├── news/
│       │   ├── page.js
│       │   ├── admin/page.js
│       │   └── update.jsx
│       ├── library/page.js
│       ├── faq/page.js
│       ├── gps/page.js
│       ├── documents/page.js
│       └── control/page.js
├── styles/                        ← ملفات CSS
└── lib/utils.js
```

---

## 🌐 Shared Components

### 1. `Header.js`
الـ header العلوي الموجود في كل الصفحات.

**Props:**
| Prop | النوع | الوصف |
|------|-------|-------|
| `title` | string | عنوان الصفحة الظاهر في الهيدر |
| `onMenuToggle` | function | callback لفتح/غلق الـ sidebar (في صفحة الطالب) |
| `showMenuButton` | boolean | هل يظهر زرار الـ menu أم لا |

---

### 2. `CircularMenu.jsx`
الـ floating circular menu اللي بيظهر في كل الصفحات — زرار دائري بيفتح قائمة تنقل بين الصفحات.

**لا يأخذ أي props** — يظهر تلقائياً في أسفل الشاشة.

**الروابط الموجودة فيه (Inferred من المشروع):**
- Home `/`
- Student Portal `/student-page`
- Doctor Dashboard `/doctor`
- Library `/library`
- News `/news`
- FAQ `/faq`
- GPS/Map `/gps`
- Documents `/documents`

---

### 3. `Icons.js`
ملف centralized لكل الـ SVG icons في المشروع.

**الـ Icons المتاحة:**
```javascript
ChartBarIcon, VideoIcon, TargetIcon, TrendUpIcon,
CheckCircleIcon, MapIcon, CreditCardIcon,
CalendarIcon, UserIcon, IdCardIcon, GraduationIcon,
PhoneIcon, LocationIcon, SendIcon, PaperclipIcon,
FileTextIcon, ArrowLeftIcon, LiveDotIcon, FilterIcon
```

**كل icon بيقبل:** `size` (number) و `color` (string)

---

### 4. `newsStore.js`
State management بسيط للأخبار — مش Redux، هو عبارة عن Zustand-style store بسيط أو React Context.

**الـ State:**
```javascript
newsList: [] // قائمة الأخبار
```

**الـ Actions:**
```javascript
addNews(newsItem) // أضف خبر جديد
```

**ملاحظة:** الأخبار دلوقتي بتتخزن في الـ memory (مش في API) — لازم تتربط بالـ `/api/news` endpoint.

---

### 5. `NewsCard.jsx`
كارت عرض الأخبار.

**Props:**
```javascript
{ news: { id, title, description, date, category, image, videoLink, sourceLink } }
```

---

## 📄 الصفحات بالتفصيل

---

### 🏠 1. Landing Page — `app/page.js`

**الوصف:** الصفحة الرئيسية لجامعة HITU — صفحة تسويقية جميلة.

**الأقسام:**
| القسم | المحتوى |
|-------|---------|
| **Hero Section** | عنوان ترحيبي + صورة Campus + زرار Login عائم على جنب |
| **About Section** | وصف الجامعة + صورة |
| **News Section** | Carousel أوتوماتيكي لـ 5 أخبار مع pagination |
| **Departments Section** | عرض 9 أقسام بالتفصيل مع Scroll Animation |
| **Footer** | روابط سريعة + أقسام + تواصل |

**الـ Animations:**
- `FadeUp` component — بيستخدم `IntersectionObserver` للـ scroll animation
- Cursor glow effect (يتبع الماوس)
- Auto-rotating news carousel (كل 4 ثواني)

**الـ Data المطلوبة من API:**
```javascript
// الأخبار — من /api/news
GET /api/news → [ { id, title, text, image } ]

// الأقسام — حالياً hardcoded، المفروض من:
GET /api/specialization → [ { id, name, description, image } ]
```

**الـ Departments الموجودة (9 أقسام):**
1. Data Science
2. Cybersecurity
3. Artificial Intelligence
4. Mechatronics Technology
5. Electrical Technology
6. Mechanical Technology
7. Production & Industrial Technology
8. Energy Technology
9. Operation & Maintenance Technology

---

### 🔑 2. Login Page — `(pages)/login/page.js`

**الوصف:** صفحة تسجيل الدخول.

**المكونات:**
- يسار: صورة خلفية + شعار HITU + زرار "Learn More"
- يمين: فورم Login (Username + Password)

**الحالة الحالية:**
- الـ form validation موجود (اسم المستخدم + كلمة المرور)
- **لكن مفيش API call حقيقي** — بس بيعرض رسالة نجاح/فشل وهمية
- لازم تتربط بـ login endpoint لإنشاء JWT

**الـ Data المطلوبة من API:**
```javascript
// المفروض يتعمل POST لـ:
POST /api/auth/login
Body: { username: string, password: string }
Response: { token: string, user: { id, role, name } }

// بعدين يتخزن الـ token في:
localStorage.setItem('token', token)
```

---

### 🎓 3. Student Portal — `(pages)/student-page/page.js`

**الوصف:** لوحة تحكم الطالب الكاملة — أهم صفحة في المشروع.

**الـ Layout:**
- Sidebar على اليمين بيحتوي على: صورة الطالب + اسمه + التخصص + قائمة التنقل
- Main Content على الشمال بيعرض الـ component المختار

**قائمة التنقل (Tabs):**

| التاب | الـ Component | الوصف |
|-------|-------------|-------|
| Profile | `ProfileComponent` | بيانات الطالب الشخصية |
| Grades | `GradesComponent` | درجات الفصل الحالي |
| Lectures | `LecturesComponent` | محاضرات الأسبوع |
| Activities | `ActivitiesComponent` | الأنشطة والفعاليات |
| Statistics | `StatisticsComponent` | إحصائيات أكاديمية |
| Assignments | `AssignmentsComponent` | التكليفات |
| Roadmap | `RoadmapComponent` | خريطة الدراسة |
| Payments | `PaymentsComponent` | المدفوعات |

**الـ Responsive Behavior:**
- Desktop: sidebar ثابت على اليمين
- Mobile: sidebar قابل للإخفاء مع زرار toggle في الهيدر

**الـ Data المطلوبة من API:**
```javascript
// بيانات الطالب الأساسية
GET /api/students/:id
→ { name, specialty, studentId, phone, address, image, current_semester, year_level }

// Token من localStorage
const token = localStorage.getItem('studentToken')
```

---

#### 📊 3.1 GradesComponent

**الوصف:** جدول درجات الفصل الحالي.

**البيانات المعروضة:**
- المادة، درجة الأعمال (sup)، درجة المنتصف (mid)، الدرجة النهائية (final)، الحرف (A/B/C...)، النسبة المئوية

**الـ API المطلوبة:**
```javascript
GET /api/grade?student_id={id}&semester_id={current}
Authorization: Bearer <token>

// Response:
[
  {
    id, course_id, course_name, semester_id,
    sup_grades, mid_grades, final_grades, letter_grades
  }
]
```

---

#### 🎬 3.2 LecturesComponent

**الوصف:** عرض المحاضرات المسجلة مع player + فلترة بالأسبوع.

**الـ Features:**
- فلترة بالكورس والسنة
- Video thumbnail مع play button
- زرار لفتح الـ Live lecture

**الـ API المطلوبة:**
```javascript
GET /api/lecture?course_id={id}
Authorization: Bearer <token>

GET /api/lecture_materials?lecture_id={id}
// Response: ملفات PDF, Videos, الخ

GET /api/live?student_id={id}
// للـ live sessions
```

---

#### 🎯 3.3 ActivitiesComponent

**الوصف:** الأنشطة والفعاليات الجامعية.

**الـ Data Structure:**
```javascript
{
  id, title, date, status: 'upcoming | completed',
  category: 'Competitions | Workshops | Celebrations | Guest Lectures',
  description
}
```

**الـ API المطلوبة:**
```javascript
// مفيش route محدد لها في الـ Backend حالياً
// المقترح: POST /api/news?type=activity
// أو إنشاء route جديد /api/activities
```

---

#### 📈 3.4 StatisticsComponent

**الوصف:** إحصائيات أكاديمية بـ Recharts charts.

**الـ Charts الموجودة:**
- GPA Trend (Line Chart)
- Attendance Rate (Progress bar)
- Subject Grades (Bar Chart)
- Activity Distribution (Pie Chart — Assignments Submitted/Pending/Missed)

**الـ Data المطلوبة:**
```javascript
// من عدة endpoints:
GET /api/grade?student_id={id}           // للـ GPA
GET /api/attendance?student_id={id}      // للحضور
GET /api/assignment?student_id={id}      // للتكليفات
```

---

#### ✅ 3.5 AssignmentsComponent

**الوصف:** قائمة التكليفات مع الحالة.

**الـ Statuses:** `pending` | `submitted` | `graded` | `late`

**الـ API المطلوبة:**
```javascript
GET /api/assignment?student_id={id}
Response: [
  {
    id, title, subject, dueDate,
    status, submittedDate, grade,
    description, points
  }
]
```

---

#### 🗺️ 3.6 RoadmapComponent

**الوصف:** خريطة الدراسة الكاملة من السنة الأولى للرابعة — timeline تفاعلية.

**الـ Statuses:**
- `completed` — أخضر
- `in-progress` — أزرق مع progress bar
- `upcoming` — رمادي

**الـ API المطلوبة:**
```javascript
GET /api/study_plan?spec_id={id}
GET /api/enrollments?student_id={id}
Response: [
  {
    id, termName, year, semester,
    courses: [
      { id, name, code, credits, status, progress }
    ]
  }
]
```

---

#### 💳 3.7 PaymentsComponent

**الوصف:** حالة المدفوعات الدراسية.

**المعروض:**
- إجمالي الرسوم / المدفوع / المتبقي
- جدول الفواتير مع الحالة

**الـ API المطلوبة:**
```javascript
// مفيش route للـ payments في الـ Backend حالياً
// المقترح: GET /api/payments?student_id={id}
// أو استخدام /api/student_request بالـ type "payment"
```

---

#### 👤 3.8 ProfileComponent

**الوصف:** بطاقة البروفايل الشخصي.

**الـ Props المستلمة:**
```javascript
{
  name, specialty, studentId, phone, address, image
}
```

**الـ API المطلوبة:**
```javascript
GET /api/students/:id
Authorization: Bearer <token>
```

---

### 📡 4. Live Lecture — `(pages)/student-page/live-lecture/[id]/page.js`

**الوصف:** غرفة المحاضرة المباشرة للطالب.

**الـ Features:**
- عرض الـ live stream (placeholder حالياً)
- Live chat مع المحاضر والطلاب
- إرسال ملفات في الـ chat
- زرار Back للرجوع

**الـ Route Parameter:** `[id]` = lecture ID

**الـ API المطلوبة:**
```javascript
GET /api/live/:id              // بيانات الجلسة
GET /api/messages?lec_id={id} // رسائل الـ chat
POST /api/messages             // ابعت رسالة
POST /api/attendance           // سجّل حضور تلقائياً
```

---

### 🩺 5. Doctor Dashboard — `(pages)/doctor/page.js`

**الوصف:** لوحة تحكم الدكتور.

**الأقسام:**
| القسم | الوصف |
|-------|-------|
| **Doctor Profile Banner** | صورة + اسم + تخصص + إحصائيات (rating, students, lectures) |
| **Active Lecture Bar** | المحاضرة الحالية + زرار Start Live + upload file سريع |
| **Today's Timeline** | جدول اليوم بالمحاضرات |
| **Doctor Information** | Bio + Research Areas + Contact Info + Social Links |
| **Quick Action Cards** | Videos / Assignments / Statistics |
| **Weekly Schedule Modal** | جدول الأسبوع الكامل في modal |

**الـ API المطلوبة:**
```javascript
GET /api/doctor/:id           // بيانات الدكتور
GET /api/lecture?doctor_id={id}&date=today  // محاضرات اليوم
GET /api/lecture?doctor_id={id}             // جدول الأسبوع
POST /api/lecture_materials    // رفع ملف
```

---

### 📹 6. Doctor — Videos — `(pages)/doctor/videos/page.js`

**الوصف:** إدارة الفيديوهات المسجلة.

**الـ Features:**
- فلترة بالقسم والسنة والمادة
- Drag & Drop لرفع الفيديوهات
- قائمة بالفيديوهات المرفوعة

**الـ API المطلوبة:**
```javascript
GET /api/lecture_materials?doctor_id={id}&file_type=video
POST /api/lecture_materials    // رفع فيديو جديد
DELETE /api/lecture_materials/:id
```

---

### 📝 7. Doctor — Assignments — `(pages)/doctor/assignments/page.js`

**الوصف:** إدارة التكليفات.

**الـ Features:**
- رفع ملفات تكليفات (PDF, DOC, DOCX, XLSX, ZIP)
- قائمة بالملفات المرفوعة مع الاسم والحجم والتاريخ
- Drag & Drop support

**الـ API المطلوبة:**
```javascript
GET /api/assignment?doctor_id={id}
POST /api/assignment           // إضافة تكليف جديد
DELETE /api/assignment/:id
POST /api/lecture_materials    // رفع ملف التكليف
```

---

### 📊 8. Doctor — Statistics — `(pages)/doctor/statistics/page.js`

**الوصف:** إحصائيات الدكتور عن طلابه.

**الـ Charts الموجودة:**
- Attendance Bar Chart (حضور الطلاب يومياً)
- Grades Distribution Bar Chart
- Activity Line Chart (محاضرات/تكليفات/كويزات أسبوعياً)
- Class Distribution Pie Chart (توزيع الطلاب بالسنة)

**الـ Data المطلوبة:**
```javascript
GET /api/attendance?lecture_id={id}    // حضور كل محاضرة
GET /api/grade?course_id={id}          // توزيع الدرجات
GET /api/students?doctor_id={id}       // عدد الطلاب
```

---

### 📡 9. Doctor — Live Lecture — `(pages)/doctor/live-lecture/[id]/page.js`

**نفس صفحة الـ Student Live Lecture** بالضبط — نفس الكود، نفس الـ features، بس الـ sender هو الدكتور.

**الـ API المطلوبة:**
```javascript
GET /api/live/:id
POST /api/messages     // الدكتور يبعت رسالة
GET /api/messages?lec_id={id}
```

---

### 📰 10. News Page — `(pages)/news/page.js`

**الوصف:** صفحة الأخبار العامة.

**الـ Features:**
- عرض الأخبار في grid layout
- بحث نصي (Search)
- فلترة بالـ Category
- فلترة بالتاريخ (Recent / Older)
- زرار "+ Add News" للـ Admin

**الـ State:**
```javascript
searchTerm: string
activeCategory: 'All' | category
activeDate: 'All' | 'Recent' | 'Older'
```

**الـ API المطلوبة:**
```javascript
// حالياً بتقرأ من newsStore (local state)
// المفروض:
GET /api/news
Authorization: Bearer <token>
Response: [
  { id, title, description, date, category, image, videoLink, sourceLink }
]
```

---

### ➕ 11. News Admin — `(pages)/news/admin/page.js`

**الوصف:** لوحة إضافة الأخبار للأدمن.

**Login:** بـ كلمة مرور هاردكودد `"hitu2025"` (مؤقتاً).

**الـ Form Fields:**
```javascript
{ title, date, image (URL), description, category, videoLink, sourceLink }
```

**الـ API المطلوبة:**
```javascript
POST /api/news
Authorization: Bearer <admin_token>
Body: { user_id, title, content, img_url, type_size, created_at, author }
```

---

### 📚 12. Library Page — `(pages)/library/page.js`

**الوصف:** المكتبة الرقمية للجامعة.

**الـ Features:**
- عرض الكتب في grid (240px × 220px cover)
- بحث بالعنوان
- فلترة بالقسم (Dropdown مع Notification dot)
- زرار "Read" (يفتح PDF في Google Docs Viewer)
- زرار "Download"

**الأقسام المتاحة:**
All, Data Science, Cybersecurity, Artificial Intelligence, Mechatronics, Electrical, Mechanical, Production & Industrial, Energy, Operation & Maintenance

**الـ API المطلوبة:**
```javascript
// حالياً الكتب hardcoded
// المفروض:
GET /api/library
GET /api/library?category={cat}
Authorization: Bearer <token>
```

---

### ❓ 13. FAQ Page — `(pages)/faq/page.js`

**الوصف:** صفحة الأسئلة الشائعة.

**الـ Features:**
- عرض الأسئلة المجاب عليها (Accordion)
- بحث في الأسئلة والإجابات
- إضافة سؤال جديد من الطالب (Pending)
- **Admin Mode:** زرار إجابة/رفض الأسئلة المعلقة

**الـ State Storage:**
- حالياً بيتخزن في `localStorage` بـ key `'evo_faqs'`
- الـ Admin mode بيتحول بزرار مؤقت

**الـ API المطلوبة:**
```javascript
// الـ GET
GET /api/faq
→ [ { id, question, answer, is_active, status: 'answered|pending' } ]

// الطالب يضيف سؤال
POST /api/faq
Body: { question, student_id, is_active: false }

// الأدمن يجيب
PUT /api/faq/:id
Body: { answer, is_active: true, status: 'answered' }

// حذف
DELETE /api/faq/:id
```

---

### 🗺️ 14. GPS / Campus Map — `(pages)/gps/page.js`

**الوصف:** خريطة الحرم الجامعي التفاعلية.

**الـ Features:**
- Sidebar مع list المباني والغرف
- Tabs: Buildings / Search
- خريطة 3D placeholder (جاهز للـ Three.js أو Mapbox)
- فلترة سريعة بنوع الغرفة (lecture, lab, office, library)
- Building dots على الخريطة بتـ pulse animation

**المباني الموجودة:**
| Building | اللون | الغرف |
|----------|-------|-------|
| A | ذهبي `#c9860a` | Lecture Halls, Classrooms, Labs, Seminar Rooms, Offices |
| C | أزرق فاتح `#4fc3f7` | Lecture Hall, Classrooms, Labs |
| D | أخضر `#81c784` | Auditorium, Classrooms, Computer Lab |
| F | بنفسجي `#ce93d8` | Library, Study Rooms, Admin |
| G | برتقالي `#ff8a65` | Cafeteria, Student Services, Sports Hall |

**ملاحظة مهمة:** الخريطة 3D placeholder لسه ما اتربطتش بـ 3D engine. مكتوب عليها "3D Engine Integration Coming Soon".

**الـ API المطلوبة:**
```javascript
GET /api/building    // جيب المباني والغرف
Response: [ { id, building_loc, room_num } ]
```

---

### 📋 15. Documents Page — `(pages)/documents/page.js`

**الوصف:** صفحة الطلبات الرسمية وإدارتها.

**الـ Roles:**
- **Student View:** تقديم طلب + عرض طلباتي السابقة
- **Admin View:** لوحة تحكم بكل الطلبات

**الـ Request Types (7 أنواع):**
| الكود | الاسم | المستندات المطلوبة |
|-------|-------|------------------|
| `enrollment` | شهادة قيد | رقم قومي طالب + ولي أمر + إيصال + كود الطالب |
| `metro` | اشتراك مترو | بطاقة + رقم ولي أمر + صورة + شهادة قيد + نموذج |
| `military` | موقف التجنيد | رقم قومي + شهادة ميلاد + 3 صور + شهادة قيد |
| `transcript` | كشف درجات | رقم قومي + كارت + إيصال + نموذج رسمي |
| `idcard` | بطاقة طالب | صورة شخصية + رقم قومي + إيصال + نموذج |
| `transfer` | انتقال | بيان قيد + كشف درجات + رقم قومي + نموذج |
| `excuse` | عذر فصل | طلب رسمي + رقم قومي + وثيقة العذر + بيان قيد |

**الـ Admin Features:**
- إحصائيات (Total/Pending/Approved/Rejected)
- Expand/Collapse للطلبات بـ animation
- عرض المستندات المرفوعة
- تعيين موعد الاستلام + Approve/Reject
- طباعة الطلب

**الـ API المطلوبة:**
```javascript
// تقديم طلب
POST /api/student_request
Body: { student_id, type_request_id, status: 'pending', create_at }

// جيب طلبات طالب معين
GET /api/student_request?student_id={id}

// الأدمن يعدل حالة الطلب
PUT /api/student_request/:id
Body: { status: 'approved | rejected', viewed_by: admin_id }

// أنواع الطلبات
GET /api/request_type
```

---

### ⚙️ 16. Control Panel — `(pages)/control/page.js`

**الوصف:** لوحة رفع كشوف الدرجات للجان المراقبة.

**الـ Features:**
- اختيار المادة + السنة + القسم (Dropdowns)
- رفع ملف XLSX أو CSV بـ Drag & Drop
- **Preview تفاعلي:** بيقرأ الـ Excel أو CSV وبيعرضه في جدول
- SheetJS مدمج (بيتلود من CDN)

**كيف بيشتغل:**
1. تختار المادة والسنة والقسم
2. ترفع الملف (XLSX / CSV)
3. بيعرضك preview للبيانات قبل الإرسال

**الـ API المطلوبة:**
```javascript
// رفع كشف الدرجات
POST /api/upload_grades
Body: { course_id, doctor_id, control_id, spec_id, file_name, folder, year_level, status: 'pending' }

// اللجنة تعتمد الكشف
PUT /api/upload_grades/:id
Body: { status: 'approved', approval: true }

// الدرجات الفردية
POST /api/grade (لكل صف في الـ Excel)
```

---

## 🔗 ربط الصفحات بعضها (Navigation Map)

```
/ (Landing Page)
    └── [Login Button] → /login
                            └── [After Login by role]
                                ├── student → /student-page
                                ├── doctor  → /doctor
                                ├── admin   → /news/admin أو /documents (admin view)
                                └── control → /control

/student-page
    ├── /student-page/live-lecture/[id]  ← من اللحظات اللايف
    └── [CircularMenu] → أي صفحة تانية

/doctor
    ├── /doctor/videos
    ├── /doctor/assignments
    ├── /doctor/statistics
    └── /doctor/live-lecture/[id]

/news
    └── /news/admin  ← إضافة أخبار

Global Pages (من CircularMenu):
    /library, /faq, /gps, /documents, /control
```

---

## 🎨 الـ Design System

**الألوان الأساسية:**
| الاسم | الكود | الاستخدام |
|-------|-------|----------|
| Navy Blue | `#0b3a6e` | Primary color |
| Gold | `#caa13c / #e4bd63` | Accent / Buttons |
| Dark Blue | `#2b3a55` | Doctor theme |
| Light Blue | `#6fc3ff` | Student theme |
| Campus Gold | `#c9860a` | GPS / Documents theme |

**الـ Fonts:**
- **عام:** Segoe UI, Tahoma
- **GPS / Documents:** Outfit (Google Fonts)

**الـ CSS Files:**
| الملف | يخص |
|-------|-----|
| `globals.css` | Global styles |
| `student.css` | Student portal |
| `doctor.css` | Doctor dashboard |
| `news.css` + `news1.css` | صفحة الأخبار |
| `login.css` | صفحة Login |
| `forms.css` | الفورمات |
| `animations.css` | Animations |
| `CircularBottomNav.css` | الـ Circular Menu |
| `theme.css` + `zeus.css` | Global themes |
| `bootstrap.min.css` | Bootstrap 5 |

---

## 📦 الـ Dependencies الأساسية

```json
{
  "next": "14.x",
  "react": "18.x",
  "recharts": "latest",
  "next/image": "built-in",
  "tailwindcss": "3.x"
}

// External CDN:
// SheetJS (xlsx) - control page
// Bootstrap Icons (bi-*) - doctor, library pages
```

---

## ⚠️ مشاكل في الفرونت تحتاج Fix

| المشكلة | الملف | التفصيل |
|---------|-------|---------|
| لا يوجد JWT integration حقيقي | login/page.js | الـ login بيعمل mock response بس |
| الأخبار في memory وليس API | newsStore.js | لازم تتربط بـ `/api/news` |
| الكتب hardcoded | library/page.js | لازم تتجيب من `/api/library` |
| Student data hardcoded | student-page/page.js | لازم تتجيب من API بـ JWT |
| Admin password hardcoded | news/admin/page.js | `"hitu2025"` — لازم يتغير |
| Live stream placeholder | live-lecture/[id] | محتاج WebRTC أو Zoom SDK |
| 3D Map placeholder | gps/page.js | محتاج Three.js أو Mapbox integration |
| Payments لها مش موجود في الـ Backend | PaymentsComponent.js | لازم يتعمل route جديد |

---

## 🚀 تشغيل الـ Frontend

```bash
cd front
npm install

# عمل ملف .env.local:
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local

npm run dev
```

التطبيق هيشتغل على: `http://localhost:3000`

---

*تم توثيقه بواسطة Claude | مشروع EVO — HITU*
