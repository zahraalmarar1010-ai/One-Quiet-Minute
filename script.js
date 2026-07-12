document.addEventListener("DOMContentLoaded", () => {
    const beginBtn = document.getElementById("begin-btn");
    const introScreen = document.getElementById("intro-screen");
    const textContainer = document.getElementById("text-container");

    const videos = {
        galaxy: document.getElementById("vid-galaxy"),
        stars: document.getElementById("vid-stars"),
        earth: document.getElementById("vid-earth"),
        city: document.getElementById("vid-city"),
        sea: document.getElementById("vid-sea")
    };

    function changeText(htmlContent, duration) {
        textContainer.style.opacity = "0";
        setTimeout(() => {
            textContainer.innerHTML = htmlContent;
            textContainer.style.opacity = "1";
            
            const l1 = textContainer.querySelector('.line-1');
            const l2 = textContainer.querySelector('.line-2');
            if(l1) setTimeout(() => l1.classList.add('show-text'), 50);
            if(l2) setTimeout(() => l2.classList.add('show-text'), 1050);

            if (duration) {
                setTimeout(() => {
                    textContainer.style.opacity = "0";
                }, duration);
            }
        }, 1000);
    }

    // دالة التنقل الآمنة لحل مشكلة الآيفون داخل النطاق الصحيح
    function fadeInVideo(activeVid) {
        Object.values(videos).forEach(vid => {
            if (vid && vid !== activeVid) {
                vid.style.opacity = "0";
                vid.style.zIndex = "5";
                vid.pause(); 
            }
        });

        if (activeVid) {
            activeVid.style.zIndex = "10";
            activeVid.style.opacity = "1";
            
            var playPromise = activeVid.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Auto-play prevented, retrying muted:", error);
                    activeVid.muted = true;
                    activeVid.play();
                });
            }
        }
    }

    beginBtn.addEventListener("click", () => {
        introScreen.style.opacity = "0";
        setTimeout(() => {
            introScreen.style.display = "none";
        }, 2500);

        // المشهد 1: المجرة العبارة الأولى
        fadeInVideo(videos.galaxy);
        changeText("Look up...", 5000);

        // المشهد 2: النجوم والعبارة الثانية
        setTimeout(() => {
            fadeInVideo(videos.stars);
            changeText("The universe is moving.", 5000);
        }, 9000);

        // المشهد 3: كوكب الأرض والعبارة الثالثة
        setTimeout(() => {
            fadeInVideo(videos.earth);
            changeText("And so are you.", 5000);
        }, 19000);

        // المشهد 4: المدينة بدون عبارة
        setTimeout(() => {
            fadeInVideo(videos.city);
            changeText("", 29000);
        }, 29000);

        // المشهد 5: البحر والعبارة الختامية مع التاريخ
        setTimeout(() => {
            fadeInVideo(videos.sea);
            changeText(`
                <div class="final-stack">
                    <p class="line-1">Sometimes... silence says more than words</p>
                    <p class="line-2">13 July</p>
                </div>
            `, 3000);
        }, 38000);
    });
}); 