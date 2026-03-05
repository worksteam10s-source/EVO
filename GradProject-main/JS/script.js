function toggleLecturesMenu() {
    // ❗ تم تعديل اسم الدالة هنا
    // إضافة/إزالة كلاس 'show' من القائمة المنسدلة التي لديها id="lecturesDropdown"
    document.getElementById("lecturesDropdown").classList.toggle("show");
}

// إغلاق القائمة عند النقر خارجها
window.onclick = function(event) {
    // التحقق من أن النقر لم يتم على زر Lectures أو أي عنصر بداخله
    if (!event.target.matches('.lectures-btn, .lectures-btn *')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            // إزالة كلاس 'show' لإخفاء القائمة
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
let b1 = document.getElementById("b1")
    let exit = document.getElementById("exit");
    let d2 = document.getElementById("d2");
    let text = document.getElementById("text")
    let file= document.getElementById("file")
function Fu1() {
      b1.style.display = "none";  
      exit.style.display = "block";
      d2.style.display = "block"; 
      text.style.display = "none";
        file.style.display = "none";  

 }
 function Fu2() {
      b1.style.display = "block";  
      exit.style.display = "none";
      d2.style.display = "none"; 
      text.style.display = "block";
        file.style.display = "block";  

 }
 
document.addEventListener('DOMContentLoaded', () => {
  const sel = document.getElementById('lecturesSelect');
  if (sel) {
    sel.addEventListener('change', function () {
      const val = this.value;
      if (!val) return;
      // إذا كانت قيمة خيار رابط صفحة، ننتقل إليها
      // عدّل القيم في الـ option إلى روابط فعلية حسب ملفاتك
      window.location.href = val;
    });
  }
});