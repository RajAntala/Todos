import React,{useState} from 'react';
import {useNavigate} from "react-router-dom"
import "../asset/style.css"
import "../asset/bootstrap.min.css"

const Todo = () =>{

    const navigate = useNavigate();
    let [state, setState] = useState({
        task: "", date:"", type:""
    });

    const handleInputData =(e) =>{
        var name = e.target.name;
        var value = e.target.value;
        setState({
            ...state, [name] : value
        })
    }

    const submitData =(e) =>{
        e.preventDefault();
        fetch("http://localhost:3001/todo", {
            method : 'POST',
            body : JSON.stringify(state),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res=>{console.log("data inserted");}).catch(err=>{console.log("data not found");})
    }
    return (
      <div className='image'>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                <form method='post' className="slideDown" onSubmit={(e)=>submitData(e)}>
                    <h2>Todos</h2>
                        <div className="form-group">            
                            <label>Task</label>
                            <input type="text" className="form-control" name="task"  onChange={(e)=>handleInputData(e)}/>
                        </div>
                        <div className="form-group">           
                            <label>Date</label>
                            <input type="date" className="form-control" name="date"  onChange={(e)=>handleInputData(e)}/>
                        </div>
                        <div className="form-group">           
                            <label>Type</label>
                            <select className='form-control' name="type" onChange={(e)=>handleInputData(e)}>
                                <option>Select type</option>
                                <option value="office">Office</option>
                                <option value="home">Home</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <button type="submit" className="btn">Add Todo</button>
                    
                </form>
                    <button className="btn m-1" onClick={()=>navigate("/view")}>View Todos</button>
                </div>
            </div>
        </div>
      </div>
    );
}

export default Todo;