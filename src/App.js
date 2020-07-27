import React, { useState} from 'react';
import { FaPlus,FaPen,FaTrash,FaBars } from 'react-icons/fa';
import './App.css';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [title,setTitle]=useState('');
  const [note,setNote]=useState('');
  const [toggle,setToggle]=useState(true)
  const [newDocument,setNewDocument]=useState(false)

  console.log(toggle)
  const screenWidth = window.screen.availWidth;

  const [myArray,setMyArray]=useState([])
  const [style,setStyle]=useState({display:'block'})
const toggleFun = () =>{

  setToggle(!toggle);
  
}
const mobilePlusFun=()=>{
    setNewDocument(true);
    setStyle({display:'none'})
}
 const onSave = (e) =>{
  e.preventDefault()
  const singleNote = {id:uuidv4(),title,note}
   setMyArray([...myArray,singleNote])
   console.log(myArray)
   setNote('')
   setTitle('')
   console.log('added');
 }

 const onDelete = (id) =>{
    const filteredItems=myArray.filter(item=>item.id!==id);
    setMyArray(filteredItems)
    console.log('deleted');
 }


 const onEdit = (id) =>{
   const editNote = myArray.find(item=>item.id===id);
   setTitle(editNote.title)
   setNote(editNote.note)
   onDelete(id);
   console.log('editing');
 }

 const onReject = ()=>{
   setNote('');
   setTitle('');
   setNewDocument(false);
   console.log('rejected');
 }
  return (
    
    <div className="App">
      
    {toggle && <div className="sidebar">
        <h2>My Notes</h2>
      
      <div className="icons-bar">
        <FaPlus className="icon" onClick={()=>setNewDocument(true)}/>
        <FaPen className="icon"/>
        
      </div>
      <hr></hr>
      
      {myArray.map(item=>{
        
         if(item.title!=="" && item.note!==""){
           
            return <div className="item-box" key={item.id}>
                
                <h3>{item.title}</h3>
                <p>{item.note}</p>
                <div className="options">
                  <FaPen className="option" onClick={()=>onEdit(item.id)}/>
                  <FaTrash className="option" onClick={()=>onDelete(item.id)}/>
                </div>
            </div>
        }
        })}
    </div>
}
   
    <div className="right-side-container">
     <div className="header">
      
      <FaBars className="bars" onClick={toggleFun}/>
      <h1>EK-NOTES</h1>
     </div>
    {newDocument && <div className="input-div">
    <form>
        <input type="text" placeholder="Title" className="title" value={title} onChange={e=>setTitle(e.target.value)}></input><br></br>
        <div className="textarea">
          <input type="message" placeholder="Type your note here..." className="note-type" value={note} onChange={e=>setNote(e.target.value)}></input>

        </div>
        </form>
      <div className="bottom-btns">
            <button className="reject" onClick={onReject}>REJECT</button>
            <button className="save" onClick={onSave}>SAVE</button>
      </div>
     </div>
}
<FaPlus className="mobile-plus" onClick={mobilePlusFun} style={style}/>

    </div>
 
    </div>
  );
}

export default App;
