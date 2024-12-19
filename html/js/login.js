import { loginUser } from '/js/supabase.js';

        async function l(event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (!username || !password) {
                alert("すべてのフィールドを入力してください！");
                return;
            }

            const ll= await loginUser(username, password);
            console.log(ll);
            if(ll.success)
            {
                document.getElementById("m").innerHTML="ログイン成功";
                window.location.href = '/';
            }else
            {
                if(ll.message="Invalid login credentials")
                {
                    document.getElementById("m").innerHTML="パスワードまたはメールアドレスが違います。";
                }else
                {
                    document.getElementById("m").innerHTML=ll.message;
                }
            }
        }
window.l=l;