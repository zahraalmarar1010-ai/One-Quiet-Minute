document.addEventListener("DOMContentLoaded", () => {
    // جلب عناصر الصفحة الخمسة من الصفحة
    const beginBtn = document.getElementById("begin-btn");
    const introScreen = document.getElementById("intro-screen");
    const textContainer = document.getElementById("text-container");
    const bgMusic = document.getElementById("bg-music");

    const videos = {
        galaxy: document.getElementById("vid-galaxy"),
        stars: document.getElementById("vid-stars"),
        earth: document.getElementById("vid-earth"),
        city: document.getElementById("vid-city"),
        sea: document.getElementById("vid-sea")
    };

    // تهيئة المتصفح وتحميل الفيديوهات مسبقاً في الخلفية
    Object.values(videos).forEach(vid => {
        if (vid) {
            vid.muted = true;
            vid.style.opacity = "0";
            vid.load();
        }
    });
    if (bgMusic) bgMusic.load();

    // دالة لتغيير النصوص وإضافة تأثير الانسيابية
    function changeText(htmlContent, delayTime = 0) {

    textContainer.innerHTML = "";

    if (htmlContent === "") return;

    textContainer.innerHTML = htmlContent;

    requestAnimationFrame(() => {
        const elements = textContainer.querySelectorAll(".project-text, .line-1, .line-2");
        elements.forEach(el => el.classList.add("show-text"));
    });

}

    // نظام الانتقال المتقاطع السلس القائم على الشفافية المستمرة
    function fadeInVideo(activeVid) {
        Object.values(videos).forEach(vid => {
            if (vid && vid !== activeVid) {
                vid.style.opacity = "0"; // التلاشي التدريجي للهبوط
                vid.style.zIndex = "5";
            }
        });

        if (activeVid) {
            activeVid.style.zIndex = "10"; // رفع الفيديو النشط للأعلى بنعومة
            activeVid.style.opacity = "1";
        }
    }

    // عند الضغط على زر البدء الرئيسي Begin
    beginBtn.addEventListener("click", () => {
        introScreen.style.opacity = "0";
        setTimeout(() => introScreen.style.display = "none", 2500);

        if (bgMusic) {
            bgMusic.play().catch(err => console.log("Audio error:", err));
        }

        // تشغيل كل الفيديوهات معاً في الخلفية لضمان السلاسة المطلقة
        Object.values(videos).forEach(vid => {
            if (vid) vid.play().catch(err => console.log("Video init play:", err));
        });

        // المشهد 1: المجرة الفخمة الجديدة
        fadeInVideo(videos.galaxy);
        changeText(""); 

        // المشهد 2: النجوم -> ONE LIGHT
        setTimeout(() => {
            fadeInVideo(videos.stars);
            changeText("<p class='project-text'>Every story begins with a single light.</p>", 1000);
        }, 9000);

        // المشهد 3: الأرض -> ONE JOURNEY
        setTimeout(() => {
            fadeInVideo(videos.earth);
            changeText("<p class='project-text'>Every journey begins with a choice.</p>", 1000);
        }, 19000);

        // المشهد 4: المدينة
        setTimeout(() => {
            fadeInVideo(videos.city);
            changeText("");
        }, 29000);

        // المشهد 5: البحر الختامي العبارة والتاريخ
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