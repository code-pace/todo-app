import React from 'react'

const Form = ({getText, keepEventState, inputText, bgLight}) => {
    return (
        <div className = {`text-section ${bgLight? "text-section-light": ""}`}>
            <form onSubmit={keepEventState} className="textBox">
                <div>
                    <button type="submit">
                    <i className="fas fa-plus"></i>
                    </button>
                </div>
                <input placeholder="Create a new todo..." type="text" onChange={getText} value={inputText} />
            </form>
        </div>
    )
}

export default Form
