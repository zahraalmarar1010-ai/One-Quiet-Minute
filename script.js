document.addEventListener("DOMContentLoaded", () => {
    const beginBtn = document.getElementById("begin-btn");
    const introScreen = document.getElementById("intro-screen");
    const textContainer = document.getElementById("text-container");
    const bgMusic = document.getElementById("bg-music");

    const vids = {
        galaxy: document.getElementById("vid-galaxy"),
        stars: document.getElementById("vid-stars"),
        earth: document.getElementById("vid-earth"),
        city: document.getElementById("vid-city"),
        sea: document.getElementById("vid-sea")
    };

    // تهيئة الفيديوهات وتبطيئها كما في كودكِ الأصلي
    Object.values(vids).forEach(vid => {
        if (vid) {
            vid.load();
            vid.playbackRate = 0.55;
        }
    });

    if (bgMusic) bgMusic.load();

    function changeText(htmlContent, delayTime = 1000) {
        textContainer.innerHTML = "";
        if (htmlContent === "") return;
        textContainer.innerHTML = htmlContent;

        setTimeout(() => {
            const elements = textContainer.querySelectorAll(".project-text, .line-1, .line-2");
            elements.forEach(el => el.classList.add("show-text"));
        }, delayTime);
    }

    function playScene(activeVid) {
        Object.values(vids).forEach(vid => {
            if (vid && vid !== activeVid) {
                vid.style.opacity = "0";
                vid.style.zIndex = "5";
                vid.pause();
            }
        });

        if (activeVid) {
            activeVid.currentTime = 0;
            activeVid.style.zIndex = "10";
            activeVid.style.opacity = "1";
            activeVid.playbackRate = 0.55;
            
            var playPromise = activeVid.play();
            if (playPromise !== undefined) {
                playPromise.catch(err => console.log("Video play error:", err));
            }
        }
    }

    beginBtn.addEventListener("click", () => {
        introScreen.style.opacity = "0";
        setTimeout(() => {
            introScreen.style.display = "none";
        }, 2500);

        // تشغيل صوت الموسيقى الخلفية فوراً عند الضغط لتخطي حظر الآيفون
        if (bgMusic) {
            bgMusic.muted = false;
            bgMusic.play().catch(err => console.log("Music play blocked:", err));
        }

        // تسلسل المشاهد والأوقات
        playScene(vids.galaxy);
        changeText("Look up...", 1000);

        setTimeout(() => {
            playScene(vids.stars);
            changeText("The universe is moving.", 1000);
        }, 6000);

        setTimeout(() => {
            playScene(vids.earth);
            changeText("And so are you.", 1000);
        }, 12000);

        setTimeout(() => {
            playScene(vids.city);
            changeText("", 1000);
        }, 18000);

        setTimeout(() => {
            playScene(vids.sea);
            changeText(`
                <div class="final-stack">
                    <p class="line-1">Sometimes... silence says more than words</p>
                    <p class="line-2">13 July</p>
                </div>
            `, 1000);
        }, 23000);
    });

    // تلاشي الصوت تدريجياً عند نهاية فيديو البحر كما في كودكِ الأصلي
    if (vids.sea) {
        vids.sea.onended = () => {
            let fadeAudio = setInterval(() => {
                if (bgMusic && bgMusic.volume > 0.1) {
                    bgMusic.volume -= 0.1;
                } else {
                    if (bgMusic) {
                        bgMusic.pause();
                        bgMusic.volume = 1.0;
                    }
                    clearInterval(fadeAudio);
                }
            }, 200);
        };
    }
}); 