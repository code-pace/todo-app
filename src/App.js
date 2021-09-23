import './App.css';
import React, {useState, useEffect} from "react";
import Form from "./components/Form";
import DoItems from './components/DoItems';

function App() {
  const [inputText, setInputText] = useState("");
  const [todoList, setTodolist] = useState([]);
  const [checkTodo, setCheckTodo] = useState("all");
  const [showTodo, setShowTodo] = useState([]);
  const [identifyCount, setIdentifyCount] = useState("");
  const [bgLight, setBglight] = useState(false);
  const [dragTodo, setDragTodo] = useState([]);

  useEffect(()=> {
    setUpTodo();
  },[todoList, checkTodo]);
  
  useEffect(()=> {
    setDragTodo(showTodo);
  }, [showTodo]);
  
  useEffect(()=> {
    getTodo();
  }, []);

  useEffect(()=> {
    saveTodo();
  }, [dragTodo]);

  const saveTodo=()=> {
    localStorage.setItem("todo", JSON.stringify(dragTodo));
  }
  const getTodo =()=> {
    const getSavedTodo = JSON.parse(localStorage.getItem("todo"));
    console.log(getSavedTodo)
    if(getSavedTodo && getSavedTodo.length > 0) {
      setTodolist(getSavedTodo)
      console.log(dragTodo);
    }
    else {
      localStorage.setItem("todo", JSON.stringify(dragTodo));
      console.log("nothing dey there");
    }
  }

  const handleDragEvent =(result) => {
    console.log(result);
    if(!result.destination) return;
    const dragNdrop = [...dragTodo];
    console.log(dragNdrop)
    const drag = dragNdrop.splice(result.source.index, 1);
    console.log(drag)
    dragNdrop.splice(result.destination.index, 0, ...drag);
    console.log(dragNdrop);
    setDragTodo(dragNdrop)
  }
  const clearCompleted =()=> {
    setTodolist(todoList.filter(item => item.status !== true));
  }
  const getText =(e)=> {
    let write = e.target.value;
    setInputText(write);
  }
  const keepEventState = (e)=> {
    e.preventDefault();
    if(inputText === null || inputText === undefined || inputText.length === 0) {
      alert("add something now")
    }
    else {
      const day = new Date().getDate();
      const hour = new Date().getHours();
      const mins = new Date().getMinutes()
      const fullYear = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const timeInterval =()=> {
        if(hour === 0 || hour <= 11) {
          return "AM"
        } else {
          return "PM"
        }
      }
      const setHour =()=> {
        switch (hour) {
          case 13: 
            return 1
            break;
          case 14:
            return 2
            break;
          case 15:
            return 3
            break;
          case 16:
            return 4
            break;
          case 17:
            return 5
            break;
          case 18:
            return 6
            break;
          case 19:
            return 7
            break;
          case 20:
            return 8
            break;
          case 21:
            return 9
            break;
          case 22:
            return 10
            break;
          case 23:
            return 11
            break;
          default:
            return hour
            break
        }
      }
      setTodolist([{todo: inputText, status: false, timeInterval: timeInterval(), day: day, hour: setHour(), month: month, mins: mins, fullYear: fullYear, id: Math.random()*1000}, ...todoList])
      setInputText("");
      e.target.value = "";
    }
  }
  
  const checkTodoStatus =(e)=> {  
    setCheckTodo(e.target.value);
  }
  const setUpTodo =()=> {
    switch(checkTodo) {
      case "active" :
        setShowTodo(todoList.filter(item => item.status === false));
        setIdentifyCount("active");
        break;
      case "completed" :
        setShowTodo(todoList.filter(item => item.status === true));
        setIdentifyCount("completed");
        break;
      default: 
        setShowTodo(todoList);
        setIdentifyCount("left");
        break;
    }
  }
  const changeBg =()=> {
    setBglight(!bgLight);
  }
  

  return (
    <div className={`App ${bgLight?"bg-light":""}`}>
      <div className="container">
        <header className={`todo-header ${bgLight? "todo-headerII": ""}`}>
          <div className="set-bg">
            <div className="bg-mode">
              <h1>TODO</h1>
              <button onClick={changeBg} className="bg-btn">
                {bgLight? <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>}
              </button>
            </div>
            <Form getText={getText} keepEventState={keepEventState} inputText={inputText} bgLight={bgLight} />
          </div>
          
        </header>
        <div className="todo-container">
        <DoItems dragTodo={dragTodo} todoList={todoList} setTodolist={setTodolist} checkTodoStatus={checkTodoStatus} clearCompleted={clearCompleted} showTodo={showTodo} identifyCount={identifyCount} checkTodo={checkTodo} bgLight={bgLight} handleDragEvent={handleDragEvent} />
        <p className="text">Drag and drop to reorder list</p>
        </div>
      </div>
    </div>
  );
}

export default App;
