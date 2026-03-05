// Cursor Glow لكل الصفحات
document.addEventListener('mousemove', (e) => {
  const glow = document.getElementById('cursor-glow');
  if (glow) {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }
});

// Drag & Drop للرفع (للصفحات اللي فيها)
function setupUpload(zoneId, inputId, statusId) {
  const zone = document.getElementById(zoneId);
  const input = document.getElementById(inputId);
  const status = document.getElementById(statusId);

  zone.addEventListener('click', () => input.click());
  input.addEventListener('change', e => {
    if (e.target.files[0]) simulateUpload(e.target.files[0].name, status);
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
      simulateUpload(file.name, status);
    } else {
      status.innerHTML = `<div class="alert alert-danger">ملف غير مدعوم</div>`;
    }
  });
}

function simulateUpload(filename, status) {
  status.innerHTML = `<div class="alert alert-info">جاري رفع ${filename}...</div>`;
  let width = 0;
  const interval = setInterval(() => {
    width += 10;
    if (document.getElementById('progress')) document.getElementById('progress').style.width = width + '%';
    if (width >= 100) {
      clearInterval(interval);
      status.innerHTML = `<div class="alert alert-success">تم الرفع بنجاح!</div>`;
    }
  }, 300);
}

// تفعيل الـ Upload في الصفحات اللي فيها
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('uploadZone')) setupUpload('uploadZone', 'gradesFile', 'uploadStatus');
});