# 📦 EVO — شرح الـ Backend بالكامل

> **المشروع:** EVO (منصة جامعية متكاملة لجامعة HITU)
> **التقنيات:** Node.js + Express.js + PostgreSQL (Neon Cloud) + JWT Authentication
> **البورت الافتراضي:** `5000`
> **Base URL:** `http://localhost:5000/api`

---

## 🏗️ نظرة عامة على المشروع

EVO هو نظام إدارة جامعي متكامل (University Management System) مبني لجامعة **Helwan International Technological University (HITU)**. الـ Backend مبني على Express.js ويتصل بـ PostgreSQL عبر Neon Cloud (Serverless PostgreSQL). النظام بيخدم 4 أنواع من المستخدمين: **الطالب، الدكتور، الإدارة، ولجنة المراقبة (Control)**.

---

## ⚙️ Server Configuration — `server.js`

### Middleware المستخدمة:
- **CORS** — مفتوح لـ `localhost:3000`, `localhost:3001`, Vercel, Netlify deployments
- **bodyParser.json()** + **bodyParser.urlencoded()** — لقراءة الـ request body
- **Request Logger** — بيطبع كل request في الـ console مع الـ timestamp والـ method والـ path
- **Static Files** — بيخدم ملفات من `/public`

### Route Mounting (ديناميكي):
الـ server بيقرأ كل ملفات الـ routes من مجلد `/routes` أوتوماتيكياً ويعمل mount لكل واحدة على:
```
/api/<اسم الملف بدون .js>
```
**مثال:** ملف `students.js` → Route: `/api/students`

### Endpoints الثابتة:
| Endpoint | Method | الوصف |
|----------|--------|-------|
| `/health` | GET | Health check — يرجع status: OK |
| `/api` | GET | Welcome message |
| `/api/tabels` | GET | Test DB connection |

---

## 🔐 نظام Authentication — `middleware/auth.js`

كل الـ routes محمية بـ **JWT (JSON Web Token)**.

### كيف بيشتغل:
1. الكلاينت بيبعت الـ token في الـ `Authorization` header:
   ```
   Authorization: Bearer <token>
   ```
2. الـ middleware بيعمل `jwt.verify()` على الـ token
3. لو الـ token صح → بيضيف `req.user` ويكمل للـ route
4. لو مفيش token → **401 Unauthorized**
5. لو الـ token غلط أو منتهي → **403 Forbidden**

### المتغيرات المطلوبة في `.env`:
```env
JWT_SECRET=your_super_secret_key
DATABASE_URL=postgresql://...
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://...
```

---

## 🗄️ قاعدة البيانات — `config/db.js`

**PostgreSQL** عبر Neon Cloud بـ connection pooling.

### Helper Functions المتاحة:
| Function | الاستخدام |
|----------|-----------|
| `getAll(sql, params)` | جيب كل الـ rows اللي بترجعها الـ query |
| `getOne(sql, params)` | جيب row واحدة بس |
| `runQuery(sql, params)` | نفّذ INSERT / UPDATE / DELETE |

**ملاحظة مهمة:** الـ db.js فيه `convertPlaceholders` — بيحوّل `?` لـ `$1, $2` تلقائياً (ده لو في كود قديم بيستخدم SQLite syntax).

---

## 📡 جميع الـ API Routes بالتفصيل

> **ملاحظة:** كل الـ routes محتاجة JWT token في الـ header ما عدا تسجيل الدخول.
> الـ Response دايماً في الشكل ده:
> - نجاح: `{ "status": "success", "data": {...} }`
> - فشل: `{ "status": "error", "error": "..." }`

---

### 1. 👤 `/api/USER` — إدارة المستخدمين

جدول `USER` هو الجدول الأساسي لكل أنواع المستخدمين في النظام.

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/USER` | جيب كل المستخدمين |
| GET | `/api/USER/:id` | جيب مستخدم بـ ID معين |
| POST | `/api/USER` | أنشئ مستخدم جديد |
| PUT | `/api/USER/:id` | عدّل بيانات مستخدم |
| DELETE | `/api/USER/:id` | احذف مستخدم |

**Body لـ POST / PUT:**
```json
{
  "name": "Ahmed Ali",
  "password": "hashed_password",
  "role": "student | doctor | admin | control",
  "remember_token": "...",
  "last_login": "2024-01-01T10:00:00Z",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

---

### 2. 🛡️ `/api/admin` — إدارة الأدمن

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/admin` | جيب كل الأدمن |
| GET | `/api/admin/:id` | جيب أدمن بـ ID |
| POST | `/api/admin` | أضف أدمن جديد |
| PUT | `/api/admin/:id` | عدّل بيانات أدمن |
| DELETE | `/api/admin/:id` | احذف أدمن |

**Body لـ POST / PUT:**
```json
{
  "user_id": 1,
  "permission": "full | read | write",
  "created_date": "2024-01-01",
  "code": "ADM-001"
}
```

---

### 3. 🎓 `/api/students` — إدارة الطلاب

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/students` | جيب كل الطلاب |
| GET | `/api/students/:id` | جيب طالب بـ ID |
| POST | `/api/students` | أضف طالب جديد |
| PUT | `/api/students/:id` | عدّل بيانات طالب |
| DELETE | `/api/students/:id` | احذف طالب |

**Body لـ POST / PUT:**
```json
{
  "user_id": 1,
  "name": "Abdulrahman Reda",
  "code": "247818",
  "phone": "0155984249",
  "address": "10th of Ramadan",
  "department": "Data Science",
  "photo": "url_to_photo",
  "date_of_birth": "2003-05-15",
  "age": 21,
  "email": "student@hitu.edu.eg",
  "status": "active | inactive | suspended",
  "current_semester": 3,
  "year_level": 2
}
```

**⚠️ Bug موجود:** في الـ POST و PUT، الـ `age` بيتكرر مرتين في الـ query. محتاج تتصلح.

---

### 4. 🩺 `/api/doctor` — إدارة الدكاترة

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/doctor` | جيب كل الدكاترة |
| GET | `/api/doctor/:id` | جيب دكتور بـ ID |
| POST | `/api/doctor` | أضف دكتور جديد |
| PUT | `/api/doctor/:id` | عدّل بيانات دكتور |
| DELETE | `/api/doctor/:id` | احذف دكتور |

**Body لـ POST / PUT:**
```json
{
  "user_id": 5,
  "name": "Dr. Sherif Ibrahim",
  "department": "Mechatronics",
  "qualification": "Ph.D. Mechatronics",
  "officelocation": "Building A, Room 401",
  "email": "dr.sherif@evo.edu",
  "photo": "url_to_photo",
  "rating": 4.8
}
```

---

### 5. 📚 `/api/course` — إدارة المواد الدراسية

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/course` | جيب كل المواد |
| GET | `/api/course/:id` | جيب مادة بـ ID |
| POST | `/api/course` | أضف مادة جديدة |
| PUT | `/api/course/:id` | عدّل مادة |
| DELETE | `/api/course/:id` | احذف مادة |

**Body لـ POST / PUT:**
```json
{
  "name": "Data Science Fundamentals",
  "description": "وصف المادة",
  "credit_hours": 3,
  "specialization_id": 1,
  "doctor_id": 5,
  "year_level": 2
}
```

---

### 6. 🏫 `/api/lecture` — إدارة المحاضرات

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/lecture` | جيب كل المحاضرات |
| GET | `/api/lecture/:id` | جيب محاضرة بـ ID |
| POST | `/api/lecture` | أضف محاضرة جديدة |
| PUT | `/api/lecture/:id` | عدّل محاضرة |
| DELETE | `/api/lecture/:id` | احذف محاضرة |

**Body لـ POST / PUT:**
```json
{
  "doctor_id": 5,
  "course_id": 3,
  "name": "Lecture 2 - Control Systems",
  "schedule_day": "Saturday",
  "time_slot": "10:00 AM - 12:00 PM",
  "room": "301",
  "live_url": "https://meet.google.com/...",
  "status": "scheduled | live | completed | cancelled"
}
```

---

### 7. 📁 `/api/lecture_materials` — مواد المحاضرات

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/lecture_materials` | جيب كل الملفات |
| GET | `/api/lecture_materials/:id` | جيب ملف بـ ID |
| POST | `/api/lecture_materials` | رفع ملف جديد |
| PUT | `/api/lecture_materials/:id` | عدّل بيانات ملف |
| DELETE | `/api/lecture_materials/:id` | احذف ملف |

**Body لـ POST / PUT:**
```json
{
  "lecture_id": 2,
  "name": "Chapter 3 - PDF",
  "folder": "/uploads/lectures/",
  "file_type": "pdf | xlsx | docx | video",
  "file_size": 2048,
  "uploaded_by": 5
}
```

---

### 8. 📝 `/api/assignment` — التكليفات

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/assignment` | جيب كل التكليفات |
| GET | `/api/assignment/:id` | جيب تكليف بـ ID |
| POST | `/api/assignment` | أضف تكليف جديد |
| PUT | `/api/assignment/:id` | عدّل تكليف |
| DELETE | `/api/assignment/:id` | احذف تكليف |

**Body لـ POST / PUT:**
```json
{
  "lec_mat_id": 3,
  "student_id": 1,
  "start_date": "2024-03-20T00:00:00Z",
  "end_date": "2024-03-27T23:59:00Z"
}
```

---

### 9. 📊 `/api/grade` — الدرجات

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/grade` | جيب كل الدرجات |
| GET | `/api/grade/:id` | جيب درجة بـ ID |
| POST | `/api/grade` | أضف درجة |
| PUT | `/api/grade/:id` | عدّل درجة |
| DELETE | `/api/grade/:id` | احذف درجة |

**Body لـ POST / PUT:**
```json
{
  "student_id": 1,
  "course_id": 3,
  "semester_id": 2,
  "sup_grades": 18.5,
  "mid_grades": 45,
  "final_grades": 85,
  "letter_grades": "A+"
}
```

---

### 10. 📤 `/api/upload_grades` — رفع كشوف الدرجات

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/upload_grades` | جيب كل الكشوف المرفوعة |
| GET | `/api/upload_grades/:id` | جيب كشف بـ ID |
| POST | `/api/upload_grades` | ارفع كشف درجات |
| PUT | `/api/upload_grades/:id` | عدّل كشف |
| DELETE | `/api/upload_grades/:id` | احذف كشف |

**Body لـ POST / PUT:**
```json
{
  "course_id": 3,
  "doctor_id": 5,
  "control_id": 2,
  "spec_id": 1,
  "file_name": "grades_data_science_sem2.xlsx",
  "folder": "/uploads/grades/",
  "year_level": 2,
  "status": "pending | approved | rejected",
  "upload_date": "2024-03-20T10:00:00Z",
  "approval": true
}
```

---

### 11. 🎓 `/api/enrollments` — التسجيل في المواد

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/enrollments` | جيب كل التسجيلات |
| GET | `/api/enrollments/:id` | جيب تسجيل بـ ID |
| POST | `/api/enrollments` | سجّل طالب في مادة |
| PUT | `/api/enrollments/:id` | عدّل تسجيل |
| DELETE | `/api/enrollments/:id` | الغِ تسجيل |

**Body لـ POST / PUT:**
```json
{
  "student_id": 1,
  "course_id": 3,
  "spec_id": 1,
  "date_end": "2024-06-30"
}
```

---

### 12. 🗓️ `/api/semesters` — الفصول الدراسية

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/semesters` | جيب كل الفصول |
| GET | `/api/semesters/:id` | جيب فصل بـ ID |
| POST | `/api/semesters` | أضف فصل جديد |
| PUT | `/api/semesters/:id` | عدّل فصل |
| DELETE | `/api/semesters/:id` | احذف فصل |

**Body لـ POST / PUT:**
```json
{
  "spec_id": 1,
  "name": "Spring 2023-2024",
  "description": "الفصل الدراسي الثاني",
  "start_date": "2024-02-01",
  "end_date": "2024-06-30",
  "build_id": 1
}
```

---

### 13. 🏛️ `/api/specialization` — التخصصات

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/specialization` | جيب كل التخصصات |
| GET | `/api/specialization/:id` | جيب تخصص بـ ID |
| POST | `/api/specialization` | أضف تخصص |
| PUT | `/api/specialization/:id` | عدّل تخصص |
| DELETE | `/api/specialization/:id` | احذف تخصص |

**Body لـ POST / PUT:**
```json
{
  "name": "Data Science",
  "code": "DS",
  "description": "تخصص علوم البيانات"
}
```

---

### 14. 🗺️ `/api/study_plan` — خطة الدراسة

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/study_plan` | جيب كل خطط الدراسة |
| GET | `/api/study_plan/:id` | جيب خطة بـ ID |
| POST | `/api/study_plan` | أضف خطة دراسة |
| PUT | `/api/study_plan/:id` | عدّل خطة |
| DELETE | `/api/study_plan/:id` | احذف خطة |

**Body لـ POST / PUT:**
```json
{
  "spec_id": 1,
  "year_name": "Year 2 - Semester 1",
  "model": { ... }
}
```

---

### 15. 📡 `/api/live` — المحاضرات اللايف

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/live` | جيب كل الجلسات اللايف |
| GET | `/api/live/:id` | جيب جلسة لايف بـ ID |
| POST | `/api/live` | أنشئ جلسة لايف |
| PUT | `/api/live/:id` | عدّل جلسة |
| DELETE | `/api/live/:id` | احذف جلسة |

**Body لـ POST / PUT:**
```json
{
  "title": "Mechatronics Systems - Session 2",
  "student_id": 1,
  "doctor_id": 5,
  "lec_id": 3,
  "course_id": 2,
  "start_date": "2024-03-20T10:00:00Z",
  "end_date": "2024-03-20T12:00:00Z"
}
```

---

### 16. ✅ `/api/attendance` — الحضور والغياب

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/attendance` | جيب كل سجلات الحضور |
| GET | `/api/attendance/:id` | جيب سجل بـ ID |
| POST | `/api/attendance` | سجّل حضور |
| PUT | `/api/attendance/:id` | عدّل سجل |
| DELETE | `/api/attendance/:id` | احذف سجل |

**Body لـ POST / PUT:**
```json
{
  "student_id": 1,
  "lecture_id": 3,
  "join_time": "2024-03-20T10:05:00Z",
  "leave_time": "2024-03-20T12:00:00Z",
  "duration": 115,
  "status": "present | absent | late | excused"
}
```

---

### 17. 💬 `/api/messages` — الرسائل

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/messages` | جيب كل الرسائل |
| GET | `/api/messages/:id` | جيب رسالة بـ ID |
| POST | `/api/messages` | ابعت رسالة |
| PUT | `/api/messages/:id` | عدّل رسالة |
| DELETE | `/api/messages/:id` | احذف رسالة |

**Body لـ POST / PUT:**
```json
{
  "sender": "student",
  "receiver": "doctor",
  "user_id": 1,
  "content": "هل ممكن تشرح التكليف تاني مرة؟",
  "send_at": "2024-03-20T14:00:00Z",
  "is_read": false,
  "reply": null
}
```

---

### 18. 📰 `/api/news` — الأخبار

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/news` | جيب كل الأخبار |
| GET | `/api/news/:id` | جيب خبر بـ ID |
| POST | `/api/news` | أضف خبر جديد |
| PUT | `/api/news/:id` | عدّل خبر |
| DELETE | `/api/news/:id` | احذف خبر |

**Body لـ POST / PUT:**
```json
{
  "user_id": 2,
  "title": "HITU Launches New AI Lab",
  "content": "نص الخبر الكامل...",
  "img_url": "/images/news1.jpg",
  "type_size": "big | small",
  "created_at": "2024-03-20T09:00:00Z",
  "author": "Admin HITU"
}
```

---

### 19. ❓ `/api/faq` — الأسئلة الشائعة

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/faq` | جيب كل الأسئلة |
| GET | `/api/faq/:id` | جيب سؤال بـ ID |
| POST | `/api/faq` | أضف سؤال |
| PUT | `/api/faq/:id` | عدّل سؤال / أضف إجابة |
| DELETE | `/api/faq/:id` | احذف سؤال |

**Body لـ POST / PUT:**
```json
{
  "question": "أين مكتب شؤون الطلبة؟",
  "answer": "يقع في المبنى الرئيسي...",
  "is_active": true,
  "rating": 4.5,
  "student_id": 1,
  "doctor_id": null
}
```

---

### 20. 🏢 `/api/building` — المباني والقاعات

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/building` | جيب كل المباني |
| GET | `/api/building/:id` | جيب مبنى بـ ID |
| POST | `/api/building` | أضف مبنى |
| PUT | `/api/building/:id` | عدّل مبنى |
| DELETE | `/api/building/:id` | احذف مبنى |

**Body لـ POST / PUT:**
```json
{
  "building_loc": "Building A - Main Campus",
  "room_num": "A302"
}
```

---

### 21. 🎛️ `/api/control` — لجنة المراقبة

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/control` | جيب كل أعضاء اللجنة |
| GET | `/api/control/:id` | جيب عضو بـ ID |
| POST | `/api/control` | أضف عضو |
| PUT | `/api/control/:id` | عدّل بيانات |
| DELETE | `/api/control/:id` | احذف عضو |

**Body لـ POST / PUT:**
```json
{
  "user_id": 3,
  "grade_id": 1,
  "permission": "approve | view | full",
  "code": "CTRL-001"
}
```

---

### 22. 📋 `/api/student_request` — طلبات الطلاب الرسمية

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/student_request` | جيب كل الطلبات |
| GET | `/api/student_request/:id` | جيب طلب بـ ID |
| POST | `/api/student_request` | قدّم طلب جديد |
| PUT | `/api/student_request/:id` | عدّل / راجع طلب |
| DELETE | `/api/student_request/:id` | احذف طلب |

**Body لـ POST / PUT:**
```json
{
  "student_id": 1,
  "type_request_id": 2,
  "status": "pending | approved | rejected",
  "create_at": "2024-03-20T08:00:00Z",
  "viewed_by": 3
}
```

---

### 23. 📂 `/api/request_type` — أنواع الطلبات

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/request_type` | جيب كل أنواع الطلبات |
| GET | `/api/request_type/:id` | جيب نوع بـ ID |
| POST | `/api/request_type` | أضف نوع طلب |
| PUT | `/api/request_type/:id` | عدّل نوع |
| DELETE | `/api/request_type/:id` | احذف نوع |

**Body لـ POST / PUT:**
```json
{
  "type_key": "enrollment_cert",
  "title": "شهادة قيد"
}
```

**الأنواع الموجودة في الفرونت:**
- `enrollment` → شهادة قيد
- `metro` → اشتراك مترو
- `military` → وثيقة موقف التجنيد
- `transcript` → كشف درجات رسمي
- `idcard` → بطاقة الطالب
- `transfer` → انتقال لكلية أخرى
- `excuse` → عذر فصل دراسي

---

### 24. 🏫 `/api/student_affairs` — شؤون الطلاب

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/student_affairs` | جيب كل موظفي شؤون الطلاب |
| GET | `/api/student_affairs/:id` | جيب موظف بـ ID |
| POST | `/api/student_affairs` | أضف موظف |
| PUT | `/api/student_affairs/:id` | عدّل موظف |
| DELETE | `/api/student_affairs/:id` | احذف موظف |

**Body لـ POST / PUT:**
```json
{
  "user_id": 4,
  "request_id": 1,
  "responsibilities": "معالجة طلبات الطلاب",
  "code": "SA-001"
}
```

---

### 25. 📚 `/api/library` — المكتبة الرقمية

| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/library` | جيب كل الكتب |
| GET | `/api/library/:id` | جيب كتاب بـ ID |
| POST | `/api/library` | أضف كتاب |
| PUT | `/api/library/:id` | عدّل كتاب |
| DELETE | `/api/library/:id` | احذف كتاب |

**Body لـ POST / PUT:**
```json
{
  "doctor_id": 5,
  "title": "Data Science Fundamentals",
  "author": "John Smith",
  "isbn": "978-3-16-148410-0",
  "category": "Data Science",
  "description": "وصف الكتاب",
  "pdfurl": "https://...",
  "coverimage": "/images/book1.jpg",
  "updated_at": "2024-03-20"
}
```

---

## 🗺️ خريطة العلاقات بين الجداول

```
USER (الجدول الأساسي)
  ├── students (user_id → USER.id)
  ├── doctor (user_id → USER.id)
  ├── admin (user_id → USER.id)
  ├── control (user_id → USER.id)
  ├── student_affairs (user_id → USER.id)
  └── messages (user_id → USER.id)

specialization
  ├── course (specialization_id)
  ├── enrollments (spec_id)
  ├── semesters (spec_id)
  └── study_plan (spec_id)

course
  ├── lecture (course_id)
  ├── grade (course_id)
  ├── enrollments (course_id)
  └── upload_grades (course_id)

lecture
  ├── lecture_materials (lecture_id)
  ├── attendance (lecture_id)
  └── live (lec_id)

lecture_materials
  └── assignment (lec_mat_id)

students
  ├── grade (student_id)
  ├── attendance (student_id)
  ├── assignment (student_id)
  ├── enrollments (student_id)
  ├── student_request (student_id)
  └── live (student_id)

building
  └── semesters (build_id)
```

---

## ⚠️ مشاكل موجودة في الكود (يحتاج Fix)

| المشكلة | الملف | التفاصيل |
|---------|-------|----------|
| `age` متكرر في الـ query | `students.js` | في INSERT وUPDATE، `age` بتتكرر مرتين |
| لا يوجد Login endpoint | `server.js` | مفيش route لـ `/api/auth/login` لإنشاء JWT |
| Password بيتخزن plain text | `USER.js` | لازم يتعمل hashing بـ bcrypt قبل الحفظ |
| `lecture_materials` name mismatch | `lecture_materials.js` | الـ GET بيجيب من `lecture_materials` لكن INSERT و UPDATE بيكتبوا في `lecture_material` |

---

## 🔧 الـ Scripts المساعدة

| الملف | الوظيفة |
|-------|---------|
| `scripts/generateRoutes.js` | بيولّد ملفات routes أوتوماتيكياً من قاعدة البيانات |
| `scripts/update_routes.js` | بيعمل update للـ routes الموجودة |
| `utils/helpers.js` | helper functions مساعدة |
| `utils/sestem.sql` | ملف SQL الأصلي لإنشاء قاعدة البيانات |

---

## 🚀 تشغيل الـ Backend

```bash
cd back
npm install
# عمل ملف .env بالبيانات المطلوبة
npm start
# أو للـ development:
npm run dev
```

الـ server هيشتغل على: `http://localhost:5000`

---

*تم توثيقه بواسطة Claude | مشروع EVO — HITU*
