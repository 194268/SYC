document.addEventListener('DOMContentLoaded', () => {
    // --- 0. 主题初始化与切换 (保持原样) ---
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

    // --- 1. 标题动画 (保持原样) ---
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

    // --- 2. 导航栏滚动检测 (保持原样) ---
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

    // --- 3. 搜索交互逻辑 & 全自动化文章抓取 ---
    let allPosts = []; 

    window.toggleSearch = () => {
        const overlay = document.getElementById('search-overlay');
        const input = document.getElementById('search-input');
        if (!overlay) return;

        const isActive = overlay.classList.toggle('active');
        if (isActive) {
            input.focus();
            document.body.style.overflow = 'hidden';
        } else {
            input.value = '';
            renderPosts(allPosts, 'search-results');
            document.body.style.overflow = 'auto';
        }
    };

    window.addEventListener('keydown', (e) => {
        const overlay = document.getElementById('search-overlay');
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            toggleSearch();
        }
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
            toggleSearch();
        }
    });

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const filtered = allPosts.filter(name => {
                const formattedName = name.replace(/-/g, ' ').toLowerCase();
                return name.toLowerCase().includes(term) || formattedName.includes(term);
            });
            renderPosts(filtered, 'search-results');
        });
    }

    // --- 【关键修改点】核心渲染函数：改用静态路径 ---
    function renderPosts(files, targetId) {
        const container = document.getElementById(targetId);
        if (!container) return;
        container.innerHTML = ''; 

        if (files.length === 0) {
            container.innerHTML = `<div class="loading" style="grid-column: 1/-1;">NULL_POINTER_EXCEPTION: NO_MATCHING_DATA</div>`;
            return;
        }

        files.forEach((fileName, i) => {
            // 提取文件名（去掉 .md），用于生成 /posts/xxx 路径
            const cleanName = fileName.replace('.md', '');
            // 生成用于显示的标题
            const title = cleanName.replace(/-/g, ' ').toUpperCase();
            
            const card = document.createElement('a');
            card.className = 'post-card';
            
            // 修改链接地址：不再指向 article.html?post=...
            // 而是配合 vercel.json 指向静态路径
            card.href = `/p/${cleanName}`; 
            
            card.innerHTML = `
                <div class="card-tag">// NODE_0${String(i + 1).padStart(2, '0')}</div>
                <h2>${title}</h2>
                <div class="line-divider"></div>
                <div style="font-size: 11px; font-family: 'Fira Code'; opacity: 0.6;">DECODE_DOCUMENT -></div>
            `;
            container.appendChild(card);
        });
    }

    async function fetchPosts() {
        const container = document.getElementById('article-list');
        if(!container) return;

        try {
            const res = await fetch(`https://raw.githubusercontent.com/194268/SYC/main/list.json`);
            if (!res.ok) throw new Error("INDEX_LINK_FAILED");
            allPosts = await res.json(); 
            
            renderPosts(allPosts, 'article-list');
            renderPosts(allPosts, 'search-results');
        } catch (e) {
            container.innerHTML = `<div class="loading">ERROR_LOG: ${e.message}</div>`;
        }
    }
    fetchPosts();

    // --- 4. Canvas 背景引擎 (保持原样) ---
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
