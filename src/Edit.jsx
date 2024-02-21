import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from './navbar';

function Edit() {

    const { id } = useParams();
    const[loading,setLoading]=useState(false);
    const navigate =useNavigate();
  
    const [data, setData] = useState({
      title: '',date:"",
      document: '',
    });
  
    const token = localStorage.getItem('token');
  
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://notes-be-r40t.onrender.com/notes/edit/${id}`, config);
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData(); // 
    }, []); 
    const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    };
  
    const handleDocumentUpdate = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const saveDoc = await axios.put(`https://notes-be-r40t.onrender.com/notes/edit/${id}`, data, config);
        // You might want to use a toast library here to show a success message.
        console.log('Document Saved!', saveDoc.data);
        toast("Document Updated Successfully");
        navigate('/view')
      } catch (error) {
        console.error(error);
      }
    };
  
  return (
    <div>
        <Navbar></Navbar>
    <br />
<div className="container">
    <div className="row">
        <div className="col card home-card shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            <h1 className='text-center home-abt text-black'>Update Notes</h1>
            <form>
<div className="mb-3">

<input type="text" className="form-control text-black home-abt" name='title' value={data.title} onChange={handleChange} placeholder='Highlights of the Day'/>
</div>
<div className="mb-3">
</div>
<div className="mb-3">
<textarea type="text" className="form-control t-area" name='document' value={data.document} onChange={handleChange} placeholder='What Happened Today'/>
</div>
<div className="row">
    <div className="col-sm-4 col"> <input type="date" className="form-control home-abts bg" name='date' value={data.date} onChange={handleChange} placeholder='Date'/>
</div>
    <div className="col-sm-4 col">
<Link className="btn btn-success bg form-control" onClick={handleDocumentUpdate}>
{loading ? (
                        <span className="spinner-border text-light mx-2"></span>
                      ) : (
                        "Update"
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

export default Edit