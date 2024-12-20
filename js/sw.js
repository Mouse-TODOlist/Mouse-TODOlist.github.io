self.addEventListener('install', (event) => {
    console.log('Service Workerインストール中チュー...');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Workerアクティベートチュー！');
    function executeAtISO8601(dates, callback) {
        const now = new Date();
    
        dates.forEach((dateString, index) => {
            const targetTime = new Date(dateString);
    
            if (isNaN(targetTime)) {
                console.error(`無効な日時形式: ${dateString} チュー！`);
                return;
            }
    
            if (now > targetTime) {
                console.log(`指定日時 ${targetTime.toISOString()} は過去なのでスキップするチュー！`);
                return;
            }
    
            const timeUntilTarget = targetTime - now;
    
            setTimeout(() => {
                callback(targetTime, index);
            }, timeUntilTarget);
        });
    }
           const seve = JSON.parse(localStorage.getItem('seve'));
           var list=seve.list;
           var kategori_k=seve.listk;
           var kategori_kt=seve.listkt;
           var listc=seve.listc;
           var kategoris=seve.kategoris;
           var kategori_list=seve.kategori_list;
           var datetime=seve.datetime;
           var kateggori_id=seve.kateggori_id;
           var kateggori_ID_trash=seve.kateggori_ID_trash;
           var new_kateggori_id=seve.new_kateggori_id;
           var darkmode=seve.darkmode;
    executeAtISO8601(datetime, function(targetTime, index) {
        if (Notification.permission === "granted") {
            sendNotification("ネズミTODOlist", {
                body: `${list[index]}の期限の時間です。`,
                icon: "img/TODOlist_ico.jpg"
            });
        }
        console.log(`${index}行目 指定日時 ${targetTime.toLocaleString()} に処理を実行したチュー！`);
    });
});
const CACHE_NAME = 'mouse-TODOlist-v1';
const urlsToCache = [
    '/',

];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
