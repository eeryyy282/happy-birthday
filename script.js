function initFireflies() {
            const container = document.getElementById('fireflies-container');
            const totalFireflies = window.innerWidth <= 768 ? 10 : 30; // Sangat dikurangi di HP agar tidak lag
            const fragment = document.createDocumentFragment();

            for (let i = 0; i < totalFireflies; i++) {
                let fly = document.createElement('div');
                fly.className = 'firefly';
                let size = Math.random() * 4 + 2; 
                fly.style.width = size + 'px'; fly.style.height = size + 'px';
                fly.style.left = Math.random() * 100 + 'vw';
                fly.style.animationDuration = (Math.random() * 8 + 6) + 's';
                fly.style.animationDelay = (Math.random() * 5) + 's';
                fragment.appendChild(fly);
            }
            container.appendChild(fragment);
        }
        initFireflies();

        function tampilkanAreaPassword() {
            const btnAwal = document.getElementById('btn-awal');
            const passArea = document.getElementById('password-area');
            btnAwal.style.opacity = '0'; btnAwal.style.transform = 'translateY(20px)'; btnAwal.style.pointerEvents = 'none';
            setTimeout(() => {
                btnAwal.style.display = 'none'; passArea.style.display = 'flex';
                setTimeout(() => { passArea.style.opacity = '1'; }, 50);
            }, 400); 
        }

        function cekPasswordPilihan(status) {
            const errorMsg = document.getElementById('error-msg');
            const passArea = document.getElementById('password-area');
            if (status === "benar") {
                passArea.style.opacity = '0';
                setTimeout(() => { passArea.style.display = 'none'; mulaiAnimasiCinematic(); }, 500);
            } else {
                errorMsg.style.opacity = '1'; passArea.classList.remove('shake');
                void passArea.offsetWidth; passArea.classList.add('shake');
            }
        }

        function mulaiAnimasiCinematic() {
            const coverPage = document.getElementById('cover-page');
            const bgMusic = document.getElementById('bg-music');
            const coverTitle = document.getElementById('cover-title');
            const coverDesc = document.getElementById('cover-desc');

            coverTitle.style.opacity = '0'; coverDesc.style.opacity = '0';

            setTimeout(() => {
                coverTitle.innerText = "Memasuki mesin waktu... ✨";
                coverTitle.style.fontFamily = "'Lora', serif"; 
                coverTitle.style.fontSize = "1.5rem"; coverTitle.style.opacity = '1';
            }, 500);

            if(bgMusic.getAttribute('src') !== "") {
                bgMusic.volume = 0; bgMusic.play().catch(e => console.log("Autoplay dicegah"));
                let vol = 0;
                const fadeAudio = setInterval(() => {
                    if (vol < 1.0) { vol += 0.05; bgMusic.volume = Math.min(vol, 1.0); } 
                    else { clearInterval(fadeAudio); }
                }, 150);
            }

            setTimeout(() => {
                coverPage.classList.add('opening'); 
                setTimeout(() => {
                    coverPage.style.display = 'none';
                    const mainContent = document.getElementById('main-content');
                    mainContent.style.display = 'block';
                    setTimeout(() => {
                        mainContent.style.opacity = '1';
                        document.getElementById('fireflies-container').classList.add('active'); 
                        jalankanAnimasiScrollSlow(); 
                    }, 100);
                    setTimeout(() => {
                        document.getElementById('penguin-companion').classList.add('show');
                        setTimeout(() => {
                            const bubble = document.getElementById('penguin-bubble');
                            bubble.innerText = "Selamat datang! ✨"; bubble.classList.add('show-bubble');
                            setTimeout(() => bubble.classList.remove('show-bubble'), 4000);
                        }, 1000);
                    }, 2000);
                }, 1500); 
            }, 2000); 
        }

        function jalankanAnimasiScrollSlow() {
            const slowFades = document.querySelectorAll('.slow-fade');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        if (entry.target.id === 'cake-section' && !window.lilinPernahMenyala) {
                            window.lilinPernahMenyala = true; setTimeout(nyalakanLilin, 800); 
                        }
                    }
                });
            }, { threshold: 0.2, rootMargin: "0px 0px -100px 0px" });
            slowFades.forEach(el => observer.observe(el));
        }

        function nyalakanLilin() {
            const flame = document.getElementById('flame');
            const instruction = document.getElementById('cake-instruction');
            flame.classList.add('lit');
            setTimeout(() => { instruction.style.opacity = '1'; }, 600);
        }

        function tiupLilin() {
            const flame = document.getElementById('flame');
            const smoke = document.getElementById('smoke');
            const instruction = document.getElementById('cake-instruction');
            const wishText = document.getElementById('wish-text');

            flame.classList.remove('lit'); flame.style.transform = 'scale(0)';
            flame.style.opacity = '0'; flame.style.pointerEvents = 'none'; 
            smoke.classList.add('active'); instruction.style.opacity = '0';
            
            setTimeout(() => {
                instruction.style.display = 'none'; wishText.style.display = 'block';
                setTimeout(() => wishText.style.opacity = '1', 50);
                setTimeout(() => smoke.style.opacity = '0', 1500);

                setTimeout(() => {
                    const hiddenArea = document.getElementById('hidden-after-cake');
                    
                    hiddenArea.style.display = 'block';
                    void hiddenArea.offsetWidth; 
                    
                    requestAnimationFrame(() => {
                        hiddenArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        setTimeout(() => {
                            hiddenArea.classList.add('revealed'); 
                        }, 800);
                    });

                }, 2500); 
            }, 500); 
        }

        function createStardustBurst(x, y) {
            const container = document.querySelector('.letter-interaction-area');
            const rect = container.getBoundingClientRect();
            const startX = x - rect.left; const startY = y - rect.top;
            const dustCount = window.innerWidth <= 768 ? 15 : 30;

            for(let i=0; i<dustCount; i++) {
                let dust = document.createElement('div');
                dust.className = 'stardust'; dust.style.left = startX + 'px'; dust.style.top = startY + 'px';
                container.appendChild(dust);

                let angle = Math.random() * Math.PI * 2; let velocity = 50 + Math.random() * 100;
                let dx = Math.cos(angle) * velocity; let dy = Math.sin(angle) * velocity;

                dust.animate([
                    { transform: 'translate3d(0,0,0) scale(1)', opacity: 1 },
                    { transform: `translate3d(${dx}px, ${dy}px, 0) scale(0)`, opacity: 0 }
                ], { duration: 800 + Math.random() * 400, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', fill: 'forwards' });
                setTimeout(() => dust.remove(), 1500);
            }
        }

        function bukaAmplop(event) {
            const container = document.getElementById('amplop-container');
            const surat = document.getElementById('surat-cinta');
            const glow = document.getElementById('amplop-glow');
            if (container.classList.contains('open')) return; 

            const clientX = event.clientX || (event.touches ? event.touches[0].clientX : window.innerWidth/2);
            const clientY = event.clientY || (event.touches ? event.touches[0].clientY : window.innerHeight/2);
            createStardustBurst(clientX, clientY);

            container.classList.add('open'); glow.style.opacity = '0'; 

            setTimeout(() => {
                container.classList.add('fade-out');
                setTimeout(() => {
                    container.style.display = 'none'; surat.classList.add('revealed'); 
                }, 800); 
            }, 1200); 
        }

        const companion = document.getElementById('penguin-companion');
        const penguinImg = document.getElementById('penguin-img');
        const penguinBubble = document.getElementById('penguin-bubble');

        let penguinX = (window.innerWidth / 2) - 50; 
        let penguinDir = 1; let isWalking = false; let penguinSpeed = 0.8; let isInteracting = false; 

        function gerakPenguin() {
            if (isWalking && !isInteracting && companion.classList.contains('show')) {
                penguinX += penguinSpeed * penguinDir;
                const maxW = window.innerWidth - companion.offsetWidth - 20; 
                if (penguinX > maxW) { penguinX = maxW; penguinDir = -1; penguinImg.style.transform = "scaleX(-1)"; } 
                else if (penguinX < 20) { penguinX = 20; penguinDir = 1; penguinImg.style.transform = "scaleX(1)"; }
                companion.style.left = penguinX + 'px';
            }
            requestAnimationFrame(gerakPenguin);
        }
        requestAnimationFrame(gerakPenguin);

        function otakPenguin() {
            if (!isInteracting && companion.classList.contains('show')) {
                isWalking = Math.random() > 0.3;
                if (isWalking) {
                    penguinImg.classList.add('walking'); 
                    if (Math.random() > 0.85) { penguinDir *= -1; penguinImg.style.transform = penguinDir === 1 ? "scaleX(1)" : "scaleX(-1)"; }
                } else {
                    penguinImg.classList.remove('walking'); 
                    if (Math.random() > 0.8) munculkanBubble(["Nyaman sekali di sini...", "Zzz...", "✨"]);
                }
            }
            setTimeout(otakPenguin, 2000 + Math.random() * 2000);
        }
        otakPenguin();

        let bubbleTimeout;
        function munculkanBubble(arrayPesan) {
            const randomMsg = arrayPesan[Math.floor(Math.random() * arrayPesan.length)];
            penguinBubble.innerText = randomMsg; penguinBubble.classList.add('show-bubble');
            clearTimeout(bubbleTimeout); bubbleTimeout = setTimeout(() => penguinBubble.classList.remove('show-bubble'), 3500);
        }

        function sapaPenguin() {
            if(isDragging) return;
            isInteracting = true; penguinImg.classList.remove('walking'); 
            const currentFlip = penguinDir === 1 ? "scaleX(1)" : "scaleX(-1)";
            penguinImg.style.transition = "transform 0.1s ease-out";
            penguinImg.style.transform = currentFlip + " translate3d(0, -40px, 0)";
            setTimeout(() => {
                penguinImg.style.transform = currentFlip + " translate3d(0, 0px, 0)";
                setTimeout(() => { penguinImg.style.transition = "transform 0.4s ease"; }, 150);
            }, 150);
            munculkanBubble(["Kaget aku! 🎂", "Jangan diganggu! 🐧", "Hehe... ✨"]);
            setTimeout(() => { isInteracting = false; }, 3500);
        }

        let isDragging = false; let wasDragged = false; let startPosX, startPosY;
        companion.addEventListener('mousedown', mulaiGeser); window.addEventListener('mousemove', saatDigeser); window.addEventListener('mouseup', selesaiGeser);
        companion.addEventListener('touchstart', mulaiGeser, {passive: false}); window.addEventListener('touchmove', saatDigeser, {passive: false}); window.addEventListener('touchend', selesaiGeser);

        function mulaiGeser(e) {
            if (!companion.classList.contains('show')) return; 
            isDragging = true; wasDragged = false; isInteracting = true; penguinImg.classList.remove('walking');
            const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX; const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
            const rect = companion.getBoundingClientRect(); startPosX = clientX - rect.left; startPosY = clientY - rect.top;
            companion.style.transition = 'none'; 
        }

        function saatDigeser(e) {
            if (!isDragging) return; e.preventDefault(); wasDragged = true;
            const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX; const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
            let newLeft = clientX - startPosX; let newTop = clientY - startPosY;
            const maxW = window.innerWidth - companion.offsetWidth; const maxH = window.innerHeight - companion.offsetHeight;
            newLeft = Math.max(0, Math.min(newLeft, maxW)); newTop = Math.max(0, Math.min(newTop, maxH));
            companion.style.left = newLeft + 'px'; companion.style.top = newTop + 'px'; companion.style.bottom = 'auto'; penguinX = newLeft; 
        }

        function selesaiGeser(e) {
            if (!isDragging) return; isDragging = false;
            if (!wasDragged) { sapaPenguin(); } else { jatuhkanPenguin(); }
        }

        function jatuhkanPenguin() {
            const floorTop = window.innerHeight - companion.offsetHeight - 20;
            void companion.offsetWidth; 
            companion.style.transition = 'top 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)';
            companion.style.top = floorTop + 'px';
            setTimeout(() => {
                companion.style.transition = 'none'; companion.style.top = 'auto'; companion.style.bottom = '20px';
                const currentFlip = penguinDir === 1 ? "scaleX(1)" : "scaleX(-1)";
                penguinImg.style.transition = "transform 0.15s ease-out";
                penguinImg.style.transform = currentFlip + " scaleY(0.7) translate3d(0, 15px, 0)";
                munculkanBubble(["Aduh! 💫", "Pendaratan aman! 🐧", "Dilempaar... ✨"]);
                setTimeout(() => {
                    penguinImg.style.transform = currentFlip + " scaleY(1) translate3d(0, 0, 0)";
                    setTimeout(() => { penguinImg.style.transition = "transform 0.4s ease"; isInteracting = false; }, 150);
                }, 150);
            }, 500); 
        }