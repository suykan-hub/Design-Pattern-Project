import TodoModel from '../../models/TodoModel.js';
import TodoView from '../../views/TodoView.js';
import TodoController from '../../controllers/TodoController.js';

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 创建应用实例
    const app = new TodoController(new TodoModel(), new TodoView());
}); 