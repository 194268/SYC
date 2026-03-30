document.addEventListener('DOMContentLoaded', () => {
    // --- 0. 主题初始化与切换 (与 article.html 深度同步) ---
    const root = document.documentElement;
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        root.setAttribute('data-theme', savedTheme);
    };
    initTheme();

    window.toggleTheme = () => {
        const target = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', target);
        localStorage.setItem('theme', target);
    };

    // --- 1. 标题动画 ---
    let baseTitle = "<<未来至上>>";
    let titleIdx = 0, isDel = false;
    function animateTitle() {
        document.title = isDel ? baseTitle.substring(0, titleIdx) : baseTitle.substring(0, titleIdx + 1);
        let speed = isDel ? 60 : 130;
        if (!isDel && titleIdx === baseTitle.length) { speed = 2000; isDel = true; }
        else if (isDel && titleIdx === 0) { isDel = false; }
        titleIdx = isDel ? titleIdx - 1 : titleIdx + 1;
        setTimeout(animateTitle, speed);
    }
    animateTitle();

    // --- 2. 导航栏滚动检测 ---
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if(nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- 3. 全自动化文章抓取 ---
    async function fetchPosts() {
        const container = document.getElementById('article-list');
        if(!container) return;

        try {
            const res = await fetch(`https://raw.githubusercontent.com/194268/SYC/main/list.json`);
            if (!res.ok) throw new Error("INDEX_LINK_FAILED");
            const files = await res.json();
            container.innerHTML = ''; 

            files.forEach((fileName, i) => {
                const title = fileName.replace('.md', '').replace(/-/g, ' ').toUpperCase();
                const card = document.createElement('a');
                card.className = 'post-card';
                card.href = `article.html?post=${fileName}`;
                card.innerHTML = `
                    <div class="card-tag">// NODE_0${i + 1}</div>
                    <h2>${title}</h2>
                    <div class="line-divider"></div>
                    <div style="font-size: 11px; font-family: 'Fira Code'; opacity: 0.6;">DECODE_DOCUMENT -></div>
                `;
                container.appendChild(card);
            });
        } catch (e) {
            container.innerHTML = `<div class="loading">ERROR: ${e.message}</div>`;
        }
    }
    fetchPosts();

    // --- 4. Canvas 背景引擎 ---
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [], fluidNodes = [];
        const mouse = { x: -500, y: -500 };

        window.onresize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            fluidNodes = Array.from({length: 3}, () => ({
                x: Math.random() * canvas.width, y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * (canvas.width * 0.4) + canvas.width * 0.2
            }));
        };

        window.onmousemove = (e) => {
            mouse.x = e.clientX; mouse.y = e.clientY;
            const isDark = root.getAttribute('data-theme') === 'dark';
            const color = isDark ? "255, 255, 255" : "0, 0, 0";
            for(let i=0; i<2; i++) particles.push({
                x: mouse.x, y: mouse.y,
                vx: (Math.random()-0.5)*2, vy: (Math.random()-0.5)*2,
                life: 1.0, color: color, size: Math.random()*2
            });
        };

        function draw() {
            const isDark = root.getAttribute('data-theme') === 'dark';
            ctx.fillStyle = isDark ? "rgba(5,5,5,0.15)" : "rgba(253,253,253,0.15)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 绘制背景光影
            ctx.globalCompositeOperation = isDark ? "lighter" : "multiply";
            const flowColor = isDark ? "30, 35, 50" : "210, 220, 240";
            fluidNodes.forEach(node => {
                node.x += node.vx; node.y += node.vy;
                if(node.x<0 || node.x>canvas.width) node.vx*=-1;
                if(node.y<0 || node.y>canvas.height) node.vy*=-1;
                const g = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size);
                g.addColorStop(0, `rgba(${flowColor}, 0.15)`);
                g.addColorStop(1, "transparent");
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(node.x, node.y, node.size, 0, Math.PI*2); ctx.fill();
            });

            // 绘制粒子
            ctx.globalCompositeOperation = "source-over";
            particles.forEach((p, i) => {
                p.x += p.vx; p.y += p.vy; p.life -= 0.02;
                ctx.fillStyle = `rgba(${p.color}, ${p.life * 0.3})`;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
                if(p.life <= 0) particles.splice(i, 1);
            });
            requestAnimationFrame(draw);
        }
        window.onresize();
        draw();
    }
});
