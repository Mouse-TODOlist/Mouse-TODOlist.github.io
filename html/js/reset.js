import { changePassword , setSupabaseSession} from '/js/supabase.js';
    
        window.addEventListener('DOMContentLoaded', async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('token')) {
      const accessToken = urlParams.get('token');
      await setSupabaseSession(accessToken);
    } else {
      window.location.href = '/';
    }
  } catch (error) {
    console.error('An error occurred:', error);
    window.location.href = '/';
  }
});

    
        document.getElementById('set-password-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const newPassword = document.getElementById('new-password').value;
          if (!newPassword) {
            document.getElementById("message").innerHTML='新しいパスワードを入力してください。';
            return;
          }
          if(changePassword(newPassword).success)
          {
            document.getElementById("message").innerHTML='パスワードを変更しました。';
            window.location.href = '/';
          }else{

          }
        });