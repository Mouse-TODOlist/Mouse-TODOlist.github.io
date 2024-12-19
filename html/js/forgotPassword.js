import { sendPasswordResetEmail } from '/js/supabase.js';

        async function resetPassword(event) {
            event.preventDefault();

            const email = document.getElementById("email").value;

            if (!email) {
                alert("メールアドレスを入力してください！");
                return;
            }

            const response = await sendPasswordResetEmail(email);

            if (response.success) {
                alert("パスワードリセットのリンクを送信しました。メールを確認してください。");
                window.location.href = 'login.html';
            } else {
                alert("エラーが発生しました: " + response.message);
            }
        }
        window.resetPassword = resetPassword;