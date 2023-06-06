import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";

const View = () =>{
    let [data, setRecord]= useState([])
    let[search, setNewSearch] = useState("");

    let [state, setState] = useState({
        isActive:''
    });

    useEffect(()=>{
        fetch("http://localhost:3001/todo")
        .then(res=>{
            res.json().then(record=>{
                setRecord(record)
                
            })
        })
        .catch(err=>{
            console.log(err)
        })
    },[search])

    const deleteData = (id) =>{
        console.log(id)
        fetch("http://localhost:3001/todo/"+id,{
            method : 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res=>{console.log("deleted");}).catch(err=>{console.log(err);});
    }

    const handleSearchChange = (e) => {
        setNewSearch(e.target.value);
    };

    const setStrikethrough = (event) =>{
        // fetch("http://localhost:3001/todolist", {
        //     method : 'POST',
        //     body : JSON.stringify(state),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // }).then(res=>{alert("data inserted successfully");}).catch(err=>{console.log("data not found");})

        if (event.target.style.textDecoration) {
            event.target.style.removeProperty('text-decoration');
            console.log("error")
          } 
        //   else {
        //     event.target.style.setProperty('text-decoration', 'line-through');
        //   }


        console.log(event)
    }

    return(
        <div>
            <br/>
            <h2>Todo</h2>
                <div className="container">
                    <div className="mb-4">
                    <input type="text" value={search} onChange={handleSearchChange} placeholder="Search Task" className='searchData m-3'/>
                    <NavLink to='/'><button className='btn btn-success'>Add Task</button></NavLink>
                    
                    </div>
                    <div className="row">
                    {data !=null?data.filter((v,i)=>{
                            if(search ===''){
                                return v;
                            }
                            else if(v.task.includes(search))
                            {
                                return v;
                                
                            }   
                        }).map((v,i)=>{
                            var colorName = 'green';
                            if(v.type=='home'){
                                colorName ='green'
                            }
                            else if(v.type == 'office'){
                                colorName ='pink';
                            }
                            else if(v.type == "other"){
                                colorName ='yellow';
                            }

                            var colorName = 'pink';
                            if(v.type=='office'){
                                colorName ='pink'
                                textColor = 'blue'
                            }
                            else if(v.type == 'home'){
                                colorName ='green';
                            }
                            else if(v.type == "other"){
                                colorName ='yellow';
                            }

                            var colorName = 'yellow'
                            var textColor = 'white';
                            if(v.type=='other'){
                                colorName ='yellow'
                                textColor ='black'
                            }else if(v.type == 'home'){
                                colorName ='green';
                            }
                            else if(v.type == "office"){
                                colorName ='pink';
                            }

                        return(
                            <div className="col-md-6">
                                <div style={{backgroundColor : colorName}} className="to-do-bg py-5 px-4 mb-4 text-start"id="to-do">

                                    <div style={{color : textColor}}>
                                        <h3>Task : - <span>{v.task}</span></h3>
                                        <h3>Date : - <span>{v.date}</span></h3>
                                        <h3>Type : - <span>{v.type}</span></h3>
                                    </div>

                                    <div className=" justify-content-center">
                                        <input type="checkbox" value={v.isActive} />
                                        <button className="btn btn-Danger m-3 mb-4" onClick={(e)=>deleteData(v.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }):"NOT FOUND"}
                </div>
            </div>
            
        </div>
    )
}

export default View;