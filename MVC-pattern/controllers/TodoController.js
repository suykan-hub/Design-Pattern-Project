class TodoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // 显示初始待办事项
        this.onTodoListChanged(this.model.todos);

        // 绑定视图监听器
        this.view.bindAddTodo(this.handleAddTodo.bind(this));
        this.view.bindEditTodo(this.handleEditTodo.bind(this));
        this.view.bindDeleteTodo(this.handleDeleteTodo.bind(this));
        this.view.bindToggleTodo(this.handleToggleTodo.bind(this));

        // 绑定模型监听器
        this.model.bindTodoListChanged(this.onTodoListChanged.bind(this));
    }

    onTodoListChanged = todos => {
        this.view.displayTodos(todos);
    }

    handleAddTodo = todoText => {
        this.model.addTodo(todoText);
    }

    handleEditTodo = (id, todoText) => {
        this.model.editTodo(id, todoText);
    }

    handleDeleteTodo = id => {
        this.model.deleteTodo(id);
    }

    handleToggleTodo = id => {
        this.model.toggleTodo(id);
    }
}

export default TodoController; 