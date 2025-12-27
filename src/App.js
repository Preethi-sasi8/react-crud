
import { useState , useEffect} from 'react';
import './App.css';

function App() {

   const [users,setusers] = useState([]);
   const [name,setname] = useState("");
   const [email,setemail] = useState("");
   const [website,setwebsite] = useState("");
   useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users").then(resp => resp.json()).then(data => setusers(data))}, []);

   function adduser(){
      const nam = name.trim();
      const ema = email.trim();
      const web = website.trim();
      if(nam && ema &&web){
        fetch("https://jsonplaceholder.typicode.com/users",
          {
            method : 'POST',
            body : JSON.stringify({
              name : nam,
              email : ema,
              website :web
            }),
            headers : {
              "Content-Type" : "application/json"
            }
          }
        ).then(response => response.json()).then(datas => setusers([...users,datas]))
        alert("USER ADDED SUCESSFULLY..")
        setname("")
        setemail("")
        setwebsite("")
      }
   }
   function onchangehandler(id,key,value){
           setusers(users => { 
            return  users.map(user =>{ return   user.id === id ?{...user, [key] :value}:user})
           }
           )
    
   }
   function updateuser(id){
    const user = users.find((user)=> user.id===id);
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
          {
            method : 'PUT',
            body : JSON.stringify({user}),
            headers : {
              "Content-Type" : "application/json"
            }
          }
        ).then(response => response.json()).then(datas => alert("USER UPDATED SUCESSFULLY.."))
        
      }
   
  return (
    <div >
             <table>
              <thead>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>WEBSITE</th>
                 <th>ACTION</th>
              </thead>
              <tbody>
                {users.map(user =>
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td  contenteditable="true" onChange={(e) => onchangehandler(user.id ,email,e.target.value)} >{user.email}</td>
                  <td  contenteditable="true">{user.website}</td>
                <td>
                 <button onClick={() => updateuser(user.id)} >UPDATE</button> </td>
                 <br/>
                 <td>
                 <button>DELETE</button> 
                  </td></tr>
                )}
              </tbody>
              <tfoot>
                <td></td>
                <td><input type="text" placeholder='enter name...' value={name} onChange = {(e) => setname(e.target.value)} /></td>
                <td><input type="text" placeholder='enter email...' value={email} onChange = {(e) => setemail(e.target.value)} /></td>
                <td><input type="text" placeholder='enter website...' value={website}onChange = {(e) => setwebsite(e.target.value)}/></td>
                <td><button onClick={adduser}>ADD USER</button></td>
              </tfoot>
             </table>
    </div>
  );
}

export default App;
