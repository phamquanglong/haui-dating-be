export interface ITodo {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface IAppState {
  todos: Array<ITodo>;
  editing: string;
  typeShow: string;
}

export interface IInputProp {
  addTodo(text: string);
  completedAllTodos();
}

export interface ITodoListProp {
  todos: Array<ITodo>;
  editing: string;
  deleteTodo(id: string);
  setEditing(id: string);
  updateTodo(id: string, text: string);
  checkTodo(id: string);
}

export interface ITodoItemProp {
  key: string;
  todo: ITodo;
  editing: string;
  deleteTodo(id: string);
  setEditing(id: string);
  updateTodo(id: string, text: string);
  checkTodo(id: string);
}

export interface IFooterProps {
  countTodo: number;
  typeShow: string;
  setTypeShow(type: string);
  clearCompletedTodo();
  showBtn();
}
