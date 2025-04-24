# MVC 模式示例 - 待办事项应用

这是一个使用 MVC（Model-View-Controller）设计模式实现的待办事项应用。该项目旨在展示 MVC 模式的核心概念和最佳实践。

## 项目结构

```
MVC-pattern/
├── models/
│   └── TodoModel.js      # 数据模型，处理数据逻辑
├── views/
│   └── TodoView.js       # 视图，处理用户界面
├── controllers/
│   └── TodoController.js # 控制器，协调模型和视图
├── public/
│   ├── css/
│   │   └── styles.css    # 样式文件
│   └── js/
│       └── app.js        # 应用入口文件
├── index.html            # 主页面
├── server.js            # Express 服务器
└── README.md            # 项目文档
```

## MVC 模式说明

### Model（模型）
- 负责数据的存储和业务逻辑
- 管理待办事项数据
- 处理数据的增删改查操作
- 使用 LocalStorage 实现数据持久化
- 通过观察者模式通知视图更新

### View（视图）
- 负责用户界面的显示
- 渲染待办事项列表
- 处理用户输入
- 触发用户事件
- 不直接操作数据，通过控制器进行通信

### Controller（控制器）
- 负责协调 Model 和 View
- 响应用户操作
- 更新 Model 数据
- 刷新 View 显示
- 处理业务逻辑

## 功能特点

1. 添加待办事项
2. 编辑待办事项
3. 删除待办事项
4. 标记待办事项为完成/未完成
5. 数据本地持久化
6. 响应式设计

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- Express.js
- LocalStorage API

## 如何运行

1. 确保已安装 Node.js（推荐 v12.0.0 或更高版本）

2. 安装依赖：
```bash
npm install
```

3. 启动服务器：
```bash
npm start
```

4. 在浏览器中访问：
```
http://localhost:3000
```

## 代码示例

### 模型（Model）示例
```javascript
class TodoModel {
    addTodo(todoText) {
        const todo = {
            id: Date.now(),
            text: todoText,
            complete: false
        };
        this._commit([...this.todos, todo]);
    }
}
```

### 视图（View）示例
```javascript
class TodoView {
    bindAddTodo(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            if (this._todoText) {
                handler(this._todoText);
                this._resetInput();
            }
        });
    }
}
```

### 控制器（Controller）示例
```javascript
class TodoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.bindAddTodo(this.handleAddTodo.bind(this));
        this.model.bindTodoListChanged(this.onTodoListChanged.bind(this));
    }
}
```

## 设计考虑

1. **关注点分离**：通过 MVC 模式将数据、展示和业务逻辑清晰分离。

2. **可维护性**：每个组件都有明确的职责，便于维护和扩展。

3. **可测试性**：组件之间松耦合，便于单元测试。

4. **代码复用**：通过模块化设计，提高代码复用性。

5. **响应式设计**：适配不同屏幕尺寸的设备。

## 最佳实践

1. 使用 ES6+ 特性
2. 实现观察者模式
3. 使用事件委托
4. 实现数据持久化
5. 遵循单一职责原则

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

MIT License - 详见 LICENSE 文件 