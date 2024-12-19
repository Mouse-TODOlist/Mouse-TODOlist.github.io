import { signUp } from '/js/supabase.js';

        async function s(event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;

            if (!email || !password || !confirmPassword) {
                document.getElementById("m").innerHTML="すべてのフィールドを入力してくださいチュー！";
                return;
            }

            if (password !== confirmPassword) {
                document.getElementById("m").innerHTML="パスワードが一致しませんチュー！";
                return;
            }

            const ss = await signUp(email, password);
            console.log(ss)
            if(ss.success)
            {
                document.getElementById("m").innerHTML="サインアップ成功";
                window.location.href = '/html/login.html';
            }else
            {
                document.getElementById("m").innerHTML=ss.message
            }
        }
window.s=s;