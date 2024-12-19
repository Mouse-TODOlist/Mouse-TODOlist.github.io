import { confirmAndDeleteAccount } from '/js/supabase.js';

document.getElementById('delete-account-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const resultMessage = document.getElementById('result-message');

  resultMessage.textContent = '';
  resultMessage.style.color = '';

  try {
    const result = await confirmAndDeleteAccount(password, email);

    resultMessage.textContent = result.message;
    resultMessage.style.color = result.success ? 'green' : 'red';

    if (result.success) {
      setTimeout(() => {
        window.location.href = '/'; 
      }, 2000);
    }
  } catch (error) {
    resultMessage.textContent = `エラーが発生しました: ${error.message}`;
    resultMessage.style.color = 'red';
  }
});
