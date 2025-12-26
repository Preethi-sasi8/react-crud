
import { useState , useEffect} from 'react';
import './App.css';

function App() {

   const [users,setusers] = useState([]);
   const [name,setname] = useState([]);
   const [email,setemail] = useState([]);
   const [website,setwebsite] = useState([]);
   useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users").then(resp => resp.json()).then(data => setusers(data))}, []);


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
                  <td  contenteditable="true">{user.email}</td>
                  <td  contenteditable="true">{user.website}</td>
                <td>
                 <button>UPDATE</button> 
                 <button>DELETE</button> 
                  </td></tr>
                )}
              </tbody>
              <tfoot>
                <td><input type="text" placeholder='enter name...' /></td>
              </tfoot>
             </table>
    </div>
  );
}

export default App;
