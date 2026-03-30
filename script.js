document.addEventListener('DOMContentLoaded', () => {
    // --- 0. 主题初始化与切换 ---
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
        if (nav) {
            if (window.scrollY > 20) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });

    // --- 3. 终端搜索逻辑 & 全自动化文章抓取 ---
    let allPosts = []; // 全局存储文章列表

    // 搜索开关
    window.toggleSearch = () => {
        const overlay = document.getElementById('search-overlay');
        const input = document.getElementById('search-input');
        if (!overlay) return;

        const isActive = overlay.classList.toggle('active');
        if (isActive) {
            input.focus();
            document.body.style.overflow = 'hidden'; // 搜索时禁止背景滚动
        } else {
            input.value = '';
            renderPosts(allPosts, 'search-results'); // 清空搜索展示
            document.body.style.overflow = 'auto';
        }
    };

    // 监听键盘 ESC 关闭搜索
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const overlay = document.getElementById('search-overlay');
            if (overlay && overlay.classList.contains('active')) toggleSearch();
        }
    });

    // 实时搜索过滤
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const filtered = allPosts.filter(name => 
                name.toLowerCase().includes(term) || 
                name.replace(/-/g, ' ').toLowerCase().includes(term)
            );
            renderPosts(filtered, 'search-results');
        });
    }

    // 核心渲染函数
    function renderPosts(files, targetId) {
        const container = document.getElementById(targetId);
        if (!container) return;
        container.innerHTML = ''; 

        if (files.length === 0) {
            container.innerHTML = `<div class="loading" style="grid-column: 1/-1;">NO_MATCHING_DATA_FOUND</div>`;
            return;
        }

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
    }

    // 抓取 GitHub 列表
    async function fetchPosts() {
        const container = document.getElementById('article-list');
        if(!container) return;

        try {
            const res = await fetch(`https://raw.githubusercontent.com/194268/SYC/main/list.json`);
            if (!res.ok) throw new Error("INDEX_LINK_FAILED");
            allPosts = await res.json(); 
            
            renderPosts(allPosts, 'article-list'); // 渲染主页列表
            renderPosts(allPosts, 'search-results'); // 预渲染搜索列表
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
