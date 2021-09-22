import React from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const DoItems = ({todoList, setTodolist, checkTodoStatus, clearCompleted, showTodo, identifyCount, checkTodo, bgLight, dragTodo, handleDragEvent}) => {
    
    return (
        <DragDropContext onDragEnd={handleDragEvent}>
            <Droppable droppableId={`todo-section ${bgLight? "todo-section-light": ""}`}>
                {(provided) => 
                    <div className={`todo-section ${bgLight? "todo-section-light": ""}`} {...provided.droppableProps} ref={provided.innerRef}>
                    {dragTodo.map((list,index) => {
                        const {todo, status, id, hour, mins, day, fullYear, month, timeInterval} = list;
                        const changeStatus =()=> {
                            setTodolist(todoList.map((doList) => {
                                if(doList.id === id) {
                                    return {...doList, status: !status}
                                }
                                return doList
                            }))
                        }
                        
                        return (
                            <Draggable draggableId={`${id}`} key={id} index={index}>
                                {(provided) => 
                                    <div className="list" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <div className="todo-items">
                                        <div>
                                            <button className={`${status?"btn-check":""}`} onClick={changeStatus}>
                                                {status? <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg>: ""}
                                            </button>
                                            <p className={`${status?"todo-stroke":""}`}>{todo}</p>
                                        </div>
                                        
                                        <div>
                                            <button className="del" onClick={()=> {
                                                setTodolist(todoList.filter(todo => todo.id !== id))
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="todo-time">
                                        <p><i className="far fa-clock"></i> {` ${hour}:${mins} ${timeInterval}`}</p>
                                        <p>{`${day}/${month}/${fullYear}`}</p>
                                    </div>
                                </div>
                                }
                            </Draggable>
                        )
                    })}
                    <div className="todo-options">
                        <div className="items-left">
                            {`${showTodo.length} items ${identifyCount}`}
                        </div>
                        <div className="todo-action">
                            <div className="all">
                                <button className={`${checkTodo === "all" ? "status": ""}`} value="all" onClick={checkTodoStatus}>All</button>
                            </div>
                            <div className="active">
                                <button className={`${checkTodo === "active" ? "status": ""}`} value="active" onClick={checkTodoStatus}>Active</button>
                            </div>
                            <div className="completed">
                                <button className={`${checkTodo === "completed" ? "status": ""}`} value="completed" onClick={checkTodoStatus}>Completed</button>
                            </div>
                        </div>
                        <div className="clear-completed">
                            <button value="clear-completed" onClick={clearCompleted}>Clear Completed</button>
                        </div>
                    </div>
                    {provided.placeholder}
                </div>
                }
            </Droppable>
        </DragDropContext>
        
    )
}

export default DoItems
