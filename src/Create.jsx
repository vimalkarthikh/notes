import React, { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from './navbar'


function Create() {
    const[loading,setLoading]=useState(false);
    const navigate = useNavigate();
    
    
      const [data, setData] = useState({
        title: "",date:"",
        document: ""
      });
    
      const token = localStorage.getItem("token");
      //console.log(token);
    
      const config = {
        headers: {
          'x-auth-token': `${token}`,
        }
      };
    
      const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
      };
    
      const handleDocumentSave = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setLoading(true);
    
        try {
          let saveDoc = await axios.post('https://notes-be-r40t.onrender.com/notes/add', data, config);
          toast('Document Saved!');

          navigate('/view') // Access the response data
        } catch (error) {
          console.log(error);
        }
      }
    
    
  return (
    <div>
        <Navbar></Navbar>
        <br />
    <div className="container">
        <div className="row">
            <div className="col card home-card shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                <h1 className='text-center home-abt text-black'>Make Notes</h1>
                <form>
  <div className="mb-3">

    <input type="text" className="form-control text-black home-abt" name='title' value={data.title} onChange={handleChange} placeholder='Topics'/>
    </div>
  <div className="mb-3">
    </div>
  <div className="mb-3">
    <textarea type="text" className="form-control t-area" name='document' value={data.document} onChange={handleChange} placeholder='Important Notes'/>
    </div>
    <div className="row">
        <div className="col-sm-4 col"> <input type="date" className="form-control home-abts bg" name='date' value={data.date} onChange={handleChange} placeholder='Date'/>
   </div>
        <div className="col-sm-4 col">
    <Link className="btn btn-success bg form-control" onClick={handleDocumentSave}>
    {loading ? (
                        <span className="spinner-border text-light mx-2"></span>
                      ) : (
                        "Save"
                      )}
        </Link></div>
    <div className="col-sm-4 col">
        
    <Link className="btn btn-danger bg form-control" to='/view'>Cancel</Link>
    
    </div>
    </div>
 
</form>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Create