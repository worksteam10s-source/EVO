document.addEventListener('DOMContentLoaded', () => {
    // Handle file input label change
    const chooseFileInput = document.getElementById('gradesFile');
    const chooseFileLabel = document.querySelector('.choose-file-label');

    if (chooseFileInput && chooseFileLabel) {
        chooseFileInput.addEventListener('change', (event) => {
            if (event.target.files.length > 0) {
                // يعرض اسم الملف المختار
                chooseFileLabel.textContent = event.target.files[0].name;
            } else {
                chooseFileLabel.textContent = 'Choose File';
            }
        });
    }

    // Handle bottom navigation active state (للتفاعل البصري)
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // منع سلوك الرابط الافتراضي
            // إزالة حالة النشاط من الجميع
            navItems.forEach(nav => nav.classList.remove('active'));
            // إضافة حالة النشاط للعنصر الذي تم النقر عليه
            item.classList.add('active');
            console.log(`Nav item clicked: ${item.querySelector('i').className}`);
        });
    });

    // Basic form submission (للتجربة - لن يرسل بيانات حقيقية)
    const uploadBtn = document.querySelector('.upload-btn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            const textInputValue = document.querySelector('.text-input').value;
            console.log('Submit button clicked!');
            console.log('Text Input Value:', textInputValue);
            alert(`Submitting: ${textInputValue || 'No text entered'}`);
            // هنا يتم إرسال البيانات إلى الخادم (Backend)
        });
    }

    const submitFileBtn = document.querySelector('.choose-file-btn');
    if (submitFileBtn) {
        submitFileBtn.addEventListener('click', () => {
            const selectedFile = chooseFileInput.files[0];
            if (selectedFile) {
                console.log('File submit button clicked!');
                console.log('Selected File:', selectedFile.name, selectedFile.type, selectedFile.size);
                alert(`Submitting file: ${selectedFile.name}`);
                // هنا يتم تحميل الملف إلى الخادم (Backend)
            } else {
                alert('Please choose a file first!');
            }
        });
    }
});
    const zone = document.getElementById('uploadZone');
    const input = document.getElementById('gradesFile');
    const status = document.getElementById('uploadStatus');

    zone.addEventListener('click', () => input.click());
    input.addEventListener('change', e => {
      if (e.target.files[0]) {
        status.innerHTML = `<div class="alert alert-success mt-3">تم اختيار: ${e.target.files[0].name}</div>`;
      }
    });

    ['dragover', 'dragenter'].forEach(evt => {
      zone.addEventListener(evt, e => {
        e.preventDefault();
        zone.classList.add('dragover');
      });
    });

    ['dragleave', 'dragend', 'drop'].forEach(evt => {
      zone.addEventListener(evt, e => {
        e.preventDefault();
        zone.classList.remove('dragover');
      });
    });

    zone.addEventListener('drop', e => {
      const file = e.dataTransfer.files[0];
      if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.csv'))) {
        status.innerHTML = `<div class="alert alert-success">جاري رفع ${file.name}... تم بنجاح!</div>`;
      } else {
        status.innerHTML = `<div class="alert alert-danger">يرجى رفع ملف Excel أو CSV فقط</div>`;
      }
    });