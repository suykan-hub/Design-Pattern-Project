# 单例模式示例 - 主题管理器

这是一个使用单例模式实现的主题管理器示例项目。通过这个项目，你可以直观地理解单例模式的实现原理和应用场景。

## 功能特点

- 全局唯一的主题管理器实例
- 浅色/深色主题切换
- 主题状态自动同步
- 主题设置本地持久化
- 平滑的切换动画效果
- 响应式设计

## 项目结构

```
Singleton/
├── index.html      # 主页面
├── styles.css      # 样式文件
├── singleton.js    # 单例模式实现
└── README.md       # 项目说明
```

## 核心代码

```javascript
class ThemeManager {
    constructor() {
        if (ThemeManager.instance) {
            return ThemeManager.instance;
        }
        ThemeManager.instance = this;
        this.theme = 'light';
        this.observers = new Set();
    }

    static getInstance() {
        if (!ThemeManager.instance) {
            ThemeManager.instance = new ThemeManager();
        }
        return ThemeManager.instance;
    }
    
    // ... 其他方法
}
```

## 单例模式的实现要点

1. **私有实例**：使用静态属性 `ThemeManager.instance` 存储唯一实例
2. **构造函数检查**：在构造函数中检查实例是否存在
3. **静态访问方法**：提供 `getInstance()` 静态方法获取实例
4. **状态管理**：维护主题状态并确保全局同步
5. **观察者模式**：集成观察者模式实现状态变化通知

## 使用方法

1. 打开 `index.html` 文件
2. 点击任意"切换主题"按钮来切换主题
3. 观察所有组件的主题同步变化
4. 查看实例ID保持不变（证明是同一个实例）
5. 刷新页面后主题状态保持不变（本地存储）

## 技术特点

- **单例模式**：确保全局只有一个主题管理器实例
- **观察者模式**：实现主题变化的订阅和通知
- **本地存储**：使用 localStorage 持久化主题设置
- **CSS变量**：使用CSS变量实现主题切换
- **平滑过渡**：添加过渡动画提升用户体验

## 验证单例性

你可以通过以下方式验证单例模式的工作原理：

1. 查看页面底部显示的实例ID
2. 点击不同位置的主题切换按钮
3. 观察实例ID保持不变
4. 刷新页面，实例ID会改变，但之前的主题设置会保持

## 扩展性

这个示例可以轻松扩展：

1. 添加更多主题选项
2. 集成更多的主题相关设置
3. 添加主题自动切换功能
4. 扩展为完整的设置管理系统

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 其他现代浏览器

## 注意事项

1. 确保浏览器启用了 JavaScript
2. 确保浏览器支持 localStorage
3. 建议使用现代浏览器以获得最佳体验

## 学习要点

1. 单例模式的实现方法
2. 单例模式的应用场景
3. 观察者模式的集成
4. 主题切换的实现方案
5. localStorage 的使用
6. CSS 变量和动画 