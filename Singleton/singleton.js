// 主题管理器单例类
class ThemeManager {
    constructor() {
        // 如果实例已存在，返回该实例
        if (ThemeManager.instance) {
            return ThemeManager.instance;
        }

        // 如果是第一次创建实例
        ThemeManager.instance = this;
        
        // 初始化属性
        this.theme = 'light';
        this.observers = new Set();
        this.instanceId = Math.random().toString(36).substr(2, 9);
        
        // 初始化主题
        this.initTheme();
    }

    // 获取实例的静态方法
    static getInstance() {
        if (!ThemeManager.instance) {
            ThemeManager.instance = new ThemeManager();
        }
        return ThemeManager.instance;
    }

    // 初始化主题
    initTheme() {
        // 从本地存储中获取主题
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.theme = savedTheme;
            this.applyTheme();
        }
    }

    // 切换主题
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
        this.notifyObservers();
    }

    // 应用主题
    applyTheme() {
        document.body.setAttribute('data-theme', this.theme);
        document.getElementById('currentTheme').textContent = 
            this.theme === 'light' ? '浅色' : '深色';
    }

    // 订阅主题变化
    subscribe(callback) {
        this.observers.add(callback);
    }

    // 取消订阅
    unsubscribe(callback) {
        this.observers.delete(callback);
    }

    // 通知所有观察者
    notifyObservers() {
        this.observers.forEach(callback => callback(this.theme));
    }

    // 获取实例ID
    getInstanceId() {
        return this.instanceId;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 创建主题管理器实例
    const themeManager = new ThemeManager();
    
    // 显示实例ID
    document.getElementById('instanceId').textContent = themeManager.getInstanceId();

    // 为所有主题切换按钮添加事件监听
    const themeButtons = document.querySelectorAll('#themeToggle, .theme-toggle-btn');
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 创建新实例（实际上会返回同一个实例）
            const manager = new ThemeManager();
            manager.toggleTheme();
            
            // 展示实例ID（验证是同一个实例）
            document.getElementById('instanceId').textContent = manager.getInstanceId();
        });
    });

    // 添加主题变化的动画效果
    themeManager.subscribe((theme) => {
        document.body.style.animation = 'none';
        document.body.offsetHeight; // 触发重绘
        document.body.style.animation = 'themeTransition 0.3s ease-in-out';
    });
});

// 添加主题切换动画
const style = document.createElement('style');
style.textContent = `
    @keyframes themeTransition {
        0% {
            opacity: 0.8;
            transform: scale(0.98);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style); 