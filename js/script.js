var list = [];
var listc = [];
var kategori_k = [];
var kategori_kt = [];
var kategoris = [];
var kategori_list = [];
var datetime=[];
var kateggori_id=[]
var kateggori_ID_trash=[]
var new_kateggori_id;
var darkmode="";
var a;
var b;
const urlParams = new URLSearchParams(window.location.search);
window.onload = () => {
    for(let i=0;i<2;i++){
    requestNotificationPermission();
    
    window.addEventListener('online', () => {
        pop_up("#fff","#00ff00",'オンラインになりました');
    });
    
    window.addEventListener('offline', () => {
        pop_up("#fff","#ff0000",'オフラインになりました');
    });
    document.getElementById("tuika").style.display="none";
    if (localStorage.getItem('seve') == null) {
        windows(`<h1 class="f" style="color: black;"><img src="img/TODOlist_ico.jpg" class="img" alt="ねずみTODOlistのアイコン">ネズミTODOlist<br>へようこそ</h1><br><a href="user-terms-privacy.html">利用規約/プライバシーポリシー</a><input type="button" value="閉じる" onclick='windows_close();'>`);
        reset();
        seve();
    }
    (async () => {
    await load();
    drawing();

    const selectElement = document.getElementById('select_search');
    selectElement.selectedIndex = 0;

    const selectElementQuery = document.querySelector('select');
    selectElementQuery.selectedIndex = 0;

    drawing();

    setInterval(() => {
        time_drawing();
    }, 1000);

    selectElement.addEventListener("change", function() {
      drawing();
    });
    document.getElementById('sort').addEventListener("change",function(){drawing();});
    document.getElementById('search').addEventListener("change",function(){drawing();});
    document.getElementById('select_search').addEventListener("change",function(){drawing();});
})();
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('js/sw.js').then(() => {
            console.log('Service Worker登録成功チュー！');
        });
    }
}
}
function sanitize(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\//g, "&#x2F;");
}

function seve() {
    const seve=JSON.stringify
    ({
        list:list,
        listk:kategori_k,
        listkt:kategori_kt,
        listc:listc,
        kategoris:kategoris,
        kategori_list:kategori_list,
        datetime:datetime,
        kateggori_id:kateggori_id,
        kateggori_ID_trash:kateggori_ID_trash,
        new_kateggori_id:new_kateggori_id,
        darkmode:darkmode,
    })
    localStorage.setItem('seve', seve);
    getLoggedInUser().then(userInfo => {
        if (userInfo) {
            updateUserData(userInfo.id,seve)
        } else {
        }
      });
}

async function load() {
    try {
        const userInfo = await getLoggedInUser();
        let seve;

        if (userInfo) {
            const userData = await getUserData(userInfo.id);
            seve = JSON.parse(userData.data);
        } else {
            console.log('ユーザーがログインしていません');
            seve = JSON.parse(localStorage.getItem('seve'));
        }

        localStorage.setItem('seve', JSON.stringify(seve));
        list = seve.list;
        kategori_k = seve.listk;
        kategori_kt = seve.listkt;
        listc = seve.listc;
        kategoris = seve.kategoris;
        kategori_list = seve.kategori_list;
        datetime = seve.datetime;
        kateggori_id = seve.kateggori_id;
        kateggori_ID_trash = seve.kateggori_ID_trash;
        new_kateggori_id = seve.new_kateggori_id;
        darkmode = seve.darkmode;

    } catch (error) {
        console.error('エラーが発生しました', error);
    }
}


function reset() {
    list = [];
console.log(list);
    listc = [];
    console.log(listc);
    kategori_k = ["#afafaf"];
    kategori_kt = ["#000000"];
    kategoris = [];
    kategori_list = ["通常"];
    datetime=[];
    kateggori_id=[1];
    console.log(kateggori_id);
    kateggori_ID_trash=[];
    new_kateggori_id=1;
    darkmode="";
    a="";
    b="";
}
function allTrueInList(a) {
    if (listc.length === 0) {
        return false;
    }
    return listc.every(value => value === a);
}
function getSortedIndices(dates) {
    return dates
      .map((date, index) => ({ date, index }))
      .sort((a, b) => {
            if (a.date === "" && b.date === "") return 0;
        if (a.date === "") return 1;
        if (b.date === "") return -1;
        return new Date(a.date) - new Date(b.date);
      })
      .map(item => item.index);
}
function drawing() {
    b=document.getElementById('select').value;
    a='';
    for (let i = 0; i < kategori_list.length; i++)
    {
        a=a+`<option value="${kateggori_id[i]}">${kategori_list[i]}</option>`
        document.getElementById('select').innerHTML=a;
    }
    document.getElementById('select').value=b;
    const selectedOptions = document.getElementById('select_search').selectedOptions;
    const select_search = Array.from(selectedOptions).map(option => option.value);
    console.log(select_search);
    a='<option value="s">すべてのカテゴリー</option>';
    for (let i = 0; i < kategori_list.length; i++)
    {
        a=a+`<option value="${kateggori_id[i]}">${kategori_list[i]}</option>`
        document.getElementById('select_search').innerHTML=a;
    }
    const selectElement = document.getElementById('select_search');
  const options = selectElement.options;
  for (let i = 0; i < options.length; i++) {
    options[i].selected = select_search.includes(options[i].value);
  }

    a =``;
  if(list.length===0){
        document.getElementById('list').classList.add("list");
        a=a+"タスクがありません「タスクを追加」からタスクを追加しましょう。";
document.getElementById('list').innerHTML = a;
return;
    }else
    {
        document.getElementById('list').classList.remove("list");
    }
   
    switch (document.getElementById("search").value) {
        case "a":
            if(allTrueInList(true))
            {
                document.getElementById('list').classList.add("list");
                a=a+"すべてのタスクは完了しました！"
                document.getElementById('list').innerHTML = a;
                return;
            }
            break;
    
        case"b":
            if(allTrueInList(false))
            {
                document.getElementById('list').classList.add("list");
                a=a+"完了したタスクはありません。"
                document.getElementById('list').innerHTML = a;   
                return; 
            }
            break;

        default:
            break;
    }
    let x;
    if(document.getElementById('sort').value==="a"){
    for (let i = 0; i < list.length; i++) {
        x = kateggori_id.indexOf(Number(kategoris[i]));
        a = a + `<div class="content" id="${i}" style="background-color:${kategori_k[x]};color:${kategori_kt[x]};">
            ${i + 1}${"  カテゴリ:"+kategori_list[x]}
            <div id="time${i}"></div>
            <p style="color:${kategori_kt[x]};">${list[i]}
            <input type="checkbox" id="check${i}" onclick="check(${i});">
            </p>
            <input type="button" onclick="removeItem(${i});" value="削除" class="s">
            <input type="button" value="編集"onclick="edit(${i});" >
            </div>
            `
    }
    }else
    {
        var kari;
        let x;
        const abc=getSortedIndices(datetime)
        console.log(abc);
        kari = new Date(datetime[abc[0]]).toLocaleDateString('ja-JP');
        a += `<h1>${kari}</h1>`;
        for (let i = 0; i < list.length; i++)
        {
            const currentDate = new Date(datetime[abc[i]]).toLocaleDateString('ja-JP');
            if (kari !== currentDate) {
                kari = currentDate;
                if(kari="Invalid Date")
                {
                    a += `<h1>日付が指定されていないタスク</h1>`;   
                }else
                {
                    a += `<h1>${kari}</h1>`;
                }
            }
        x = kateggori_id.indexOf(Number(kategoris[abc[i]]));
        a = a + `<div class="content" id="${abc[i]}" style="background-color:${kategori_k[x]};color:${kategori_kt[x]};">
        ${abc[i] + 1}${"  カテゴリ:"+kategori_list[x]}
        <div id="time${abc[i]}"></div>
        <p style="color:${kategori_kt[x]};">${list[abc[i]]}
        <input type="checkbox" id="check${abc[i]}" onclick="check(${abc[i]});">
            </p>
            <input type="button" onclick="removeItem(${abc[i]});" value="削除" class="s">
            <input type="button" value="編集"onclick="edit(${abc[i]});" >
            </div>
            `
        }
    }
   document.getElementById('list').innerHTML = a;
    for (let i = 0; i < list.length; i++) {
        document.getElementById('check' + i).checked = listc[i]
    }
    document.getElementById('select').value=b;
    var aaa=0;
    switch (document.getElementById("search").value) {
            case "a":
                for (let i = 0; i < list.length; i++) {if (listc[i]===true) {
                    aaa++;
                    document.getElementById(i).remove();
                }}
            break;
            case "b":
                for (let i = 0; i < list.length; i++) {if (listc[i]===false) {
                    aaa++;
                    document.getElementById(i).remove();
                }}
            break;
    
        default:
            aaa++;
            break;
    }
    console.log(document.getElementById('select_search').value === "s");
if (document.getElementById('select_search').value === "s") {
} else {
    a=0;
    console.log(select_search);
    for (let i = 0; i < kategoris.length; i++) {
        const excludeItems = select_search
        if (!excludeItems.includes(kategoris[i])) {
            a++;
            const element = document.getElementById(i);
            if (element) {
                element.remove();
            }
        }
    }
    if (kategoris.length==a) {
        document.getElementById('list').classList.add("list");
        a="";
        for (let i = 0; i < select_search.length; i++) {
            a=a+kategori_list[kateggori_id.indexOf(Number(select_search[i]))]+"," 
        }
        document.getElementById('list').innerHTML = "カテゴリ"+a+"は見つかりませんでした。";
    }
}
    const divElement = document.getElementById('uenonannka');
    const targetElement = document.getElementById("offsetHeight");
    targetElement.style.height = `${divElement.offsetHeight}px`;
    time_drawing();
}

function time_drawing()
{
    for(let i=0; i < datetime.length; i++)
    {
        if(listc[i]!=true){
        let date = new Date();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let targetDate = new Date(datetime[i]);
        let ato = targetDate - date;
        let element = document.getElementById('time'+i);
        if (ato>0) {
            let day = Math.floor(ato / (1000 * 60 * 60 * 24)); 
        hour = Math.floor((ato % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); 
        min = Math.floor((ato % (1000 * 60 * 60)) / (1000 * 60)); 
        sec = Math.floor((ato % (1000 * 60)) / 1000);
        if (element) {
            document.getElementById('time'+i).innerHTML = `残り${day}日${hour}時間${min}分${sec}秒`;
         }
        }else
        {
            if (element) {
                document.getElementById('time'+i).innerHTML=`このタスクの期限は切れました。`;
                if(listc[i]==""){
                    document.getElementById('time'+i).innerHTML=``;
                }
            }
        }
            }
    }
}
function delay(ms) {
    return new Promise(function(resolve) {
      setTimeout(resolve, ms);
    });
  }
  async function removeItem(la) {
    document.getElementById(la).classList.add("hide");
    await delay(500);
    list.splice(la, 1);
    listc.splice(la, 1);
    kategoris.splice(la, 1);
    datetime.splice(la, 1);
    drawing();
    seve();
}
function indx() {
    if(document.getElementById('select').value){
    const a = document.getElementById('t').value;
    list.push(sanitize(a));
    listc.push(false);
    kategoris.push((document.getElementById('select').value));
    console.log((document.getElementById('select').value));
    if(document.getElementById('datetime').value=="")
    {
        datetime.push("");
    }else
    {
        datetime.push(document.getElementById('datetime').value);
    }
    seve();
    drawing();
    document.getElementById("tuika").style.display="none";
    }else
    {
        windows(`カテゴリを選んでください<br><input type="button" value="OK" onclick='windows_close();'>`);
        document.getElementById('tuika').style.display = 'block';
        document.getElementById('tuika').style.display = 'flex';
    }
}
function reset_button() {
    windows("<p>リセットしますか？</p><br><input type='button' value='はい' onclick='windows_close();reset();seve();drawing();setting();'><input type='button' value='キャンセル' onclick='windows_close();'>")
}
function edit(ac) {
    a="";
    for (let i = 0; i < kategori_list.length; i++) 
    {
        a=a+`<option value="${kateggori_id[i]}">${kategori_list[i]}</option>`
    }
    document.getElementById(ac).innerHTML = `
    ${ac + 1}
    <input type="text" value="${list[ac]}" id="h${ac}" ><select id="se${ac}" class="input">${a}</select><input type="datetime-local" id="dd${ac}" value="${datetime[ac]}">
    <br><input type="button" onclick="drawing();" value="キャンセル" class="s">
    <input type="button" value="保存"onclick="Saving_changes(${ac});">`;
    document.getElementById('se'+ac).value=kategoris[ac];
}
function Saving_changes(ok) {
    list[ok] = sanitize(document.getElementById(`h${ok}`).value);
    kategoris[ok] = document.getElementById(`se${ok}`).value;
    datetime[ok]=document.getElementById(`dd${ok}`).value
    seve(); drawing();
}
async function check(c) {
    listc[c] = document.getElementById(`check${c}`).checked;
    seve();
    if(listc[c]===true)
    {
        document.getElementById(c).innerHTML="<label style='font-size: 20px;'>タスクを完了にしました。</label>";
    }else
    {
        document.getElementById(c).innerHTML="<label style='font-size: 20px;'>タスクを未完了にしました。</label>"; 
    }
    await delay(500);
    document.getElementById(c).classList.add("check");
    await delay(500);
    drawing();
}

function mmm()
{
    windows(`<P>メールアドレス変更</P><br><input type="email" id="mm"><input type="button" value="変更" onclick="changeEmail(document.getElementById('mm').value);"><input type="button" value="キャンセル" onclick="windows_close()">`);
}

function ppp()
{
    windows(`<P>メールアドレス変更</P><br><input type="password" id="mm"><input type="button" value="変更" onclick="changePassword(document.getElementById('mm').value);"><input type="button" value="キャンセル" onclick="windows_close()">`);
}

async function setting() {
    const divElement = document.getElementById('uenonannka');
    const targetElement = document.getElementById("offsetHeight");
    targetElement.style.height = `${divElement.offsetHeight}px`;
    await getLoggedInUser().then(userInfo => {
        if (userInfo) {
            const bb = userInfo.email;
            document.getElementById('list').innerHTML = `
    <h1>設定</h1><br>
    <button onclick="shareButton();">
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z"/></svg>
    ネズミTODOlistを共有する
  </button>
    <p>デザイン</p>
    <button id="toggle-btn" onclick="toggleMode();">ダークモード切替</button>
    <p>カテゴリ</p>
    <div class="t" id="kateggori">
    <input type="button" value="追加 +" onclick="kategoriss();kategori();">
    </div>
    <br>
    <input type="button" value="リセット" onclick="reset_button();" style="display: flex;">
    <p>アカウント</p>
    <p>${bb}</p>
    <input type="button" value="サインアウト" onclick="signOutUser();load();setting();"><br>
    <input type="button" value="メールアドレス変更" onclick="mmm();"><br>
    <input type="button" value="パスワード変更" onclick="ppp();">
    <h1>インポート</h1>
    <form id="importForm" style="padding: 5px;" class="form">
    <label for="file">データファイルをインポート:</label>
    <input type="file" id="file" accept=".json"><br><br>
    <button type="button" class="btn" onclick="importJSON()">インポート</button>
</form>
<h1>エクスポート</h1>
<form id="exportForm" style="padding: 5px;" class="form">
    <button type="button" class="btn" onclick="exportJSON()">JSONエクスポート</button>
</form>
<a href="user-terms-privacy.html">利用規約/プライバシーポリシー</a>`;
        } else {
            const bb = "ログインしていません";
            document.getElementById('list').innerHTML = `
    <h1>設定</h1><br>
    <button onclick="shareButton();">
    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z"/></svg>
    ネズミTODOlistを共有する
  </button>
  <p>デザイン</p>
    <button id="toggle-btn" onclick="toggleMode();">ダークモード切替</button>
    <p>カテゴリ</p>
    <div class="t" id="kateggori">
    <input type="button" value="追加 +" onclick="kategoriss();kategori();">
    </div>
    <br>
    <input type="button" value="リセット" onclick="reset_button();" style="display: flex;">
    <p>アカウント</p>
    <p>${bb}</p>
    <input value="ログイン" onclick="window.location.href = 'login.html';" type="button"><input type="button" value="サインアップ" onclick="window.location.href = 'signUp.html';">
    <h1>インポート</h1>
    <form id="importForm" style="padding: 5px;" class="form">
    <label for="file">データファイルをインポート:</label>
    <input type="file" id="file" accept=".json"><br><br>
    <button type="button" class="btn" onclick="importJSON()">インポート</button>
</form>
<h1>エクスポート</h1>
<form id="exportForm" style="padding: 5px;" class="form">
    <button type="button" class="btn" onclick="exportJSON()">JSONエクスポート</button>
</form>
<a href="user-terms-privacy.html">利用規約/プライバシーポリシー</a>`;
        }
        kategorig();
      });
      document.getElementById('list').classList.remove("list");
    document.getElementById('button').style.display="none";
    document.getElementById('setting').style.display = 'block';
        window.scroll({
            top: 0,
            behavior: "smooth",
          });
          if (darkmode!=="") {
            document.getElementById('toggle-btn').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>ライトモード切替';
          } else {
            document.getElementById('toggle-btn').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>ダークモード切替';
          }
}

async function shareButton()
{
    if (navigator.share) {
        try {
          await navigator.share({
            title: 'ネズミTODOlist',
            text: 'シンプルなタスク管理ツールです。',
            url: "https://foyon4.sytes.net/mouse/js/TODOlist/",
          });
          pop_up("#000","#00ff00",'共有ありがとうございます。');
        } catch (err) {
        }
      } else {
        pop_up("#fff","#ff0000",'このブラウザは共有機能に対応していませんチュー');
      }
}

function setting_close()
{
    kategoriss();
    drawing();
    seve();
    document.getElementById('button').style.display = 'block';
    document.getElementById('setting').style.display = 'none';
    drawing();
}

function requestNotificationPermission() {
    if (!("Notification" in window)) {
        console.error("このブラウザは通知をサポートしていませんチュー。");
        return;
    }

    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            console.log("通知が許可されましたチュー！");
        } else if (permission === "denied") {
            console.log("通知が拒否されましたチュー...");
        } else {
            console.log("通知が保留中ですチュー。");
        }
    });
}
function sendNotification(title, options) {
    if (Notification.permission === "granted") {
        new Notification(title, options);
    } else {
        console.error("通知が許可されていないチュー。");
    }
}

function kategori() {
    kategori_k.push("#afafaf");
    kategori_kt.push("#000000");
    kategori_list.push("無名");
    if (kateggori_ID_trash.length > 0)
    {
        a = Number(kateggori_ID_trash[0]);
        kateggori_ID_trash.splice(0, 1);
    } else {
        new_kateggori_id++;
        a = new_kateggori_id;
    }
    kateggori_id.push(a)
    kategorig();
}
function kategorig() {
    a = "";
    for (let i = 0; i < kategori_list.length; i++) {
        a =a+`
    <div style="display: flex;justify-content: center;width: 100%;">
    <div style="border-radius: 15px;" class="box">
    <input value="${kategori_k[i]}" type="color" id="c${i}"">背景
    <input value="${kategori_kt[i]}" type="color" id="ck${i}">文字
    <input type="text" value="${kategori_list[i]}" id="t${i}" class="kategori">
    <input type="button" value="削除" onclick="kategorisss(${i});">
    </div>
    </div>
<br>
    `
    }
    a=a+'<input type="button" value="追加 +" onclick="kategoriss();kategori();">';
    document.getElementById('kateggori').innerHTML = a;
}
function kategoriss()
{
    for (let i = 0; i < kategori_list.length; i++){
    kategori_k[i]=document.getElementById('c'+i).value
    kategori_kt[i]=document.getElementById('ck'+i).value
    kategori_list[i]=document.getElementById('t'+i).value
    seve();}
}
function kategorisss(a)
{   
    if(kategori_list.length!=1)
    {
        let aa="";
        for (let i = 0; i < kategori_list.length; i++) 
        {
           aa=aa+`<option value="${kateggori_id[i]}" id="kate${i}">${kategori_list[i]}</option>`
        }
        b=0;
        kategoriss();
        const moo=`<p>削除しますか</p>
        <p>またこのカテゴリを使用したものはどのカテゴリに置き換えますか</p>
        <select id="mmm">${aa}</select>
        <input type="button" value="ok" onclick='b=1;kategorissss(${a});'>
        <input type="button" value="キャンセル" onclick='windows_close();b=0;'>`
        windows(moo);
        document.getElementById("kate" + a).remove();
    }else
    {
        const moo=`<p>カテゴリは一つ以上必要です。</p>
        <input type="button" value="OK" onclick='windows_close();'>`
        windows(moo);
    }
}

function kategorissss(a){
    console.log(a)
    let n = document.getElementById('mmm').value;
for (let i = 0; i < kategoris.length; i++) {
    if (kategoris[i] == kateggori_id[a]) {
        kategoris[i] = n;
    }
}

    kategoriss();
    kategori_k.splice(a, 1);
    kategori_kt.splice(a, 1);
    kategori_list.splice(a, 1);
    kateggori_ID_trash.push(Number(kateggori_id[a]));
    kateggori_id.splice(a,1);
    kategorig();
    seve();
    windows_close();
}

function debug(){
    document.getElementById('debug').innerHTML=`list:${list}<br>listc:${listc}<br>listk:${kategori_k}<br>listkt${kategori_kt}<br>kategors:${kategoris}<br>kategor_list:${kategori_list}<br>datetime:${datetime}`;
}

function windows(c)
{
    document.getElementById("windows").innerHTML=c;
    document.getElementById('window').style.display = 'block';document.getElementById('window').style.display = 'flex';
}

function windows_close()
{
    document.getElementById("window").style.display="none";
}

async function pop_up(c,bc,t)
{
    document.getElementById('pop_up').style.backgroundColor=bc;
    document.getElementById('pop_up').style.color=c;
    document.getElementById("pop_up").innerHTML=t;
    document.getElementById("pop_up").classList="pop_up"
    await delay(1000);
    document.getElementById("pop_up").classList="pop_up_none"
}

window.onerror = function (message, source, lineno, colno, error) {
    const params = new URLSearchParams(window.location.search);

    if (params.has('debug')) {
        windows(`エラーが発生しました:${message}<br>ソースファイル${source}<br>行番号${lineno}<br>エラーオブジェクト${error}<br><input type="button" value="閉じる" onclick='windows_close();'>`);
    } else {
        pop_up("#FFF","#FF0000","予期せぬエラーが発生しました。ご迷惑をおかけします。")
    }
  };
  
function importJSON() {
        const fileInput = document.getElementById('file');

        if (fileInput.files.length === 0) {
            windows(`ファイルを選択してください。<br><input type="button" value="閉じる" onclick='windows_close();'>`);
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            try {
                const jsonData = JSON.parse(event.target.result);
                localStorage.setItem('seve', JSON.stringify(jsonData));
                load();setting();
                windows(`JSONファイルを読み込みました。<br><input type="button" value="閉じる" onclick='windows_close();'>`);
            } catch (error) {
                windows(`無効なJSONファイルです。<br><input type="button" value="閉じる" onclick='windows_close();'>`);
            }
        };

        reader.readAsText(file);
    }

function exportJSON() {
        const seveData = localStorage.getItem('seve');
        if (!seveData) {
            windows(`データが保存されてません<br><input type="button" value="閉じる" onclick='windows_close();'>`);
            return;
        }

        const blob = new Blob([seveData], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'mouseTODOlist.json';
        link.click();
}

function toggleMode() {
    const toggleButton = document.getElementById('toggle-btn');
    const body = document.body;
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      darkmode="enabled";
      toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>ライトモード切替';
    } else {
      darkmode="";
      toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>ダークモード切替';
    }
    seve();
  }//40日
