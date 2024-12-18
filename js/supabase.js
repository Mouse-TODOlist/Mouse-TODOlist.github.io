import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://fczbyxmfigvoiccknbim.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjemJ5eG1maWd2b2ljY2tuYmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzOTU5NDYsImV4cCI6MjA0ODk3MTk0Nn0.cHAk5toMTlEAw2FZCb8tSXgjzzFfldlWqJwnbyBh51k';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function signUp(email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (error) {
        if (error.message === 'User already registered') {
          console.error('このメールアドレスは既に登録されています。');
          return { success: false, message: 'このメールアドレスは既に登録されています。' };
        }
        console.error('サインアップエラー:', error.message);
        return { success: false, message: error.message };
      }
  
      console.log('サインアップ成功:', data);
      return { success: true, message: 'サインアップ成功！メールを確認してください。' };
    } catch (err) {
      console.error('例外発生:', err.message);
      return { success: false, message: '例外発生: ' + err.message };
    }
}




export async function loginUser(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('ログインエラー:', error.message);
      return { success: false, message: error.message };
    }

    console.log('ログイン成功:', data.user);
    return { success: true, message: 'ログイン成功！', user: data.user };
  } catch (err) {
    console.error('例外発生:', err.message);
    return { success: false, message: '例外発生: ' + err.message };
  }
}

export async function getUserData(userId) {
  try {
    const { data, error } = await supabase
      .from('user_data')
      .select('data')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Get Error:', error.message);
      return null;
    }

    console.log('User Data:', data);
    return (data);

  } catch (error) {
    console.error('Error in getUserData:', error.message);
  }
}

export async function updateUserData(userId, newData) {
  try {
    const { data, error } = await supabase
      .from('user_data')
      .update({ data: newData })
      .eq('user_id', userId); 

    if (error) {
      console.error('Update Error:', error.message);
      return null;
    }

    console.log('Updated Data:', data);
    return data;

  } catch (error) {
    console.error('Error in updateUserData:', error.message);
  }
}

export async function signOutUser() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('SignOut Error:', error.message);
      return;
    }

    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error in signOutUser:', error.message);
  }
}

export async function deleteUserAccount() {
  try {
    const user = supabase.auth.user(); 

    if (!user) {
      console.error('No user is logged in.');
      return;
    }

    const { error } = await supabase.auth.api.deleteUser(user.id);

    if (error) {
      console.error('Delete Account Error:', error.message);
      return;
    }

    console.log('Account deleted successfully');
  } catch (error) {
    console.error('Error in deleteUserAccount:', error.message);
  }
}

export async function getLoggedInUser() {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      console.log('認証セッションがありません');
      return null;
    }

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    if (user) {
      return {
        id: user.id,
        email: user.email,
      };
    } else {
      console.log('No user is logged in.');
      return null;
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}

export async function sendPasswordResetEmail(email) {
  try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: 'https://mouse-todolist.github.io/reset.html'
      });
      if (error) {
          return { success: false, message: error.message };
      }
      return { success: true };
  } catch (err) {
      return { success: false, message: err.message };
  }
}



export async function changeEmail(newEmail) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      console.error('メールアドレスの変更に失敗しました:', error.message);
      return { success: false, error: error.message };
    }

    console.log('メールアドレスが変更されました:', data);
    return { success: true, data };
  } catch (error) {
    console.error('予期しないエラーが発生しました:', error);
    return { success: false, error: error.message };
  }
}

export async function changePassword(newPassword) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error('パスワードの変更に失敗しました:', error.message);
      return { success: false, error: error.message };
    }

    console.log('パスワードが変更されました:', data);
    return { success: true, data };
  } catch (error) {
    console.error('予期しないエラーが発生しました:', error);
    return { success: false, error: error.message };
  }
}

export async function setSupabaseSession(token) {
  const { error } = await supabase.auth.setSession({
    access_token: token,
    refresh_token: token,
  });
  if (error) {
    return{error:error.message, success:false};
  } else {
    return{success:true}
  }
}

window.getUserData=getUserData;
window.updateUserData=updateUserData;
window.signOutUser=signOutUser;
window.getLoggedInUser=getLoggedInUser;
window.changeEmail=changeEmail;
window.changePassword=changePassword;
