export function showCopyToast(text: string, label?: string) {
  navigator.clipboard?.writeText(text).then(() => {
    const toast = document.getElementById('copy-toast');
    if (!toast) return;
    toast.textContent = label ?? text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  });
}
