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

    // تهيئة جميع الفيديوهات كخلفيات صامتة
    Object.values(vids).forEach(vid => {
        if (vid) {
            vid.muted = true;
            vid.style.opacity = "0";
            vid.style.zIndex = "1";
            vid.playbackRate = 0.55;
            vid.play().catch(e => console.log("Video prep:", e));
        }
    });

    if (bgMusic) bgMusic.load();

    function changeText(htmlContent) {
        textContainer.style.opacity = "0";
        
        setTimeout(() => {
            if (htmlContent === "") {
                textContainer.innerHTML = "";
                return;
            }

            if (!htmlContent.includes("<div") && !htmlContent.includes("<p")) {
                textContainer.innerHTML = `<p style="font-size: 1.8rem; font-weight: 300; color: #ffffff; margin: 0; text-align: center;">${htmlContent}</p>`;
            } else {
                textContainer.innerHTML = htmlContent;
            }

            // ضمان إظهار النصوص فوق جميع الفيديوهات
            textContainer.style.zIndex = "999"; 
            textContainer.style.opacity = "1";
        }, 400);
    }

    function playScene(activeVid) {
        Object.values(vids).forEach(vid => {
            if (vid && vid !== activeVid) {
                vid.style.opacity = "0";
                vid.style.zIndex = "1";
            }
        });

        if (activeVid) {
            activeVid.style.zIndex = "5";
            activeVid.style.opacity = "1";
            activeVid.muted = true;
            activeVid.playbackRate = 0.55;
            activeVid.play().catch(err => console.log("Active vid play error:", err));
        }
    }

    beginBtn.addEventListener("click", () => {
        introScreen.style.opacity = "0";
        setTimeout(() => {
            introScreen.style.display = "none";
        }, 1000);

        // تشغيل صوت الموسيقى عند ضغط زر البداية
        if (bgMusic) {
            bgMusic.muted = false;
            bgMusic.volume = 1.0;
            bgMusic.play().catch(err => console.log("Audio play error:", err));
        }

        // تسلسل المشاهد
        playScene(vids.galaxy);
        changeText(""); 
        setTimeout(() => {
            playScene(vids.stars);
            changeText("Every story begins with a single light.");
        }, 6000);

        setTimeout(() => {
            playScene(vids.earth);
            changeText("Every journey begins with a choice.");
        }, 12000);

        setTimeout(() => {
            playScene(vids.city);
            changeText("");
        }, 18000);

        setTimeout(() => {
            playScene(vids.sea);
            changeText(`
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;">
                <p style="font-size:1.8rem;font-weight:300;color:#ffffff;margin:0;text-align:center;">
                     Sometimes... silence says more than words.
                </p>

                <p style="font-size:1.4rem;font-weight:200;color:#ffffff;margin-top:18px;text-align:center;letter-spacing:4px;">
                    13 JULY
                </p>
            </div>
            `);
                
        }, 23000);
    });

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