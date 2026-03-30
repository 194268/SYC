document.addEventListener('DOMContentLoaded', () => {
    // 0. 主题初始化与切换逻辑
    const themeToggleBtn = document.getElementById('theme-toggle'); // 确保 HTML 中有这个 ID 的按钮
    
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // 在 script.js 中更新/替换 toggleTheme
window.toggleTheme = () => {
    const root = document.documentElement;
    const target = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', target);
    localStorage.setItem('theme', target);
    
    // 如果页面上有 highlight.js，同步更新样式
    const hljsStyle = document.getElementById('hljs-style');
    if (hljsStyle) {
        hljsStyle.href = target === 'dark' 
            ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css"
            : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css";
    }
};

// 初始化主题（放在 DOMContentLoaded 最前面）
document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
    
    initTheme();

    // 1. 网页标题动画 (支持自定义文件名动态更新)
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

    // 2. 导航栏滚动交互
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if(nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // 3. 全自动化文章抓取 (核心修改：切换至 list.json 模式)
    async function fetchPosts() {
        const GITHUB_USER = '194268', REPO_NAME = 'SYC';
        const container = document.getElementById('article-list');
        
        if(!container) return;
        container.innerHTML = '<div class="loading">SYSTEM: ACCESSING_CONTENT_NODES...</div>';

        try {
            // 使用 raw 链接绕过 GitHub API 频率限制
            const res = await fetch(`https://raw.githubusercontent.com/${GITHUB_USER}/${REPO_NAME}/main/list.json`);
            
            if (!res.ok) throw new Error("INDEX_NOT_FOUND");

            const files = await res.json();
            container.innerHTML = ''; 

            files.forEach((fileName, i) => {
                const title = fileName.replace('.md', '').replace(/-/g, ' ').toUpperCase();
                const card = document.createElement('a');
                card.className = 'post-card';
                card.href = `article.html?post=${fileName}`;
                card.style.animationDelay = `${i * 0.1}s`;
                card.innerHTML = `
                    <div class="card-tag">// NODE_0${i + 1}</div>
                    <h2>${title}</h2>
                    <div class="line-divider"></div>
                    <div class="enter-link-btn">DECODE_DOCUMENT -></div>
                `;
                container.appendChild(card);
            });
        } catch (e) {
            container.innerHTML = `
                <div class="loading" style="grid-column: 1/-1; border: 1px dashed var(--border-dim); padding: 40px;">
                    <span style="color: #ff4d4d;">[!] SYSTEM_ERROR: ${e.message}</span><br>
                    <small style="opacity: 0.6;">请检查 GitHub Actions 运行状态及是否生成了 list.json</small>
                </div>`;
        }
    }
    fetchPosts();

    // 4. Canvas 视觉引擎 (适配日夜模式 + 智能颜色反转)
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let trail = [], fluidNodes = [];
        const mouse = { x: -500, y: -500 };

        window.onresize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            fluidNodes = Array.from({length: 3}, () => new FluidNode());
        };

        window.onmousemove = (e) => {
            mouse.x = e.clientX; mouse.y = e.clientY;
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const pColor = isDark ? "255, 255, 255" : "0, 0, 0";
            for(let i=0; i<2; i++) trail.push(new Particle(mouse.x, mouse.y, pColor));
        };

        class FluidNode {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.size = Math.random() * (canvas.width * 0.4) + canvas.width * 0.3;
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
        }

        class Particle {
            constructor(x, y, color) {
                this.x = x; this.y = y;
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                this.life = 1.0;
                this.decay = 0.012 + Math.random() * 0.02;
                this.size = Math.random() * 2 + 0.5;
                this.color = color;
            }
            update() { this.x += this.vx; this.y += this.vy; this.life -= this.decay; }
            draw() {
                ctx.fillStyle = `rgba(${this.color}, ${this.life * 0.3})`;
                ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
            }
        }

        window.onresize();

        function animate() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            
            // 智能残影背景色
            ctx.fillStyle = isDark ? "rgba(5, 5, 5, 0.15)" : "rgba(253, 253, 253, 0.15)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 背景流体光幕
            ctx.globalCompositeOperation = isDark ? "lighter" : "multiply";
            const flowColor = isDark ? "30, 30, 40" : "200, 210, 230"; 
            
            fluidNodes.forEach(node => {
                node.update();
                const g = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size);
                g.addColorStop(0, `rgba(${flowColor}, 0.2)`);
                g.addColorStop(1, "transparent");
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(node.x, node.y, node.size, 0, Math.PI*2); ctx.fill();
            });

            // 鼠标交互渲染
            ctx.globalCompositeOperation = "source-over";
            trail.forEach((p, i) => {
                p.update(); p.draw();
                if(p.life <= 0) trail.splice(i, 1);
            });

            requestAnimationFrame(animate);
        }
        animate();
    }
});
