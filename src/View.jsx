import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from './navbar';
import { CgEyeAlt } from "react-icons/cg";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { MdBorderColor } from "react-icons/md";

function View() {
  const [display, setDisplay] = useState(false);
  const [btn, setBtn] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://notes-be-r40t.onrender.com/notes/delete/${id}`, config)
      .then((r) => {
        toast('Diary Page Deleted');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting markdown:', error);
      });
  };

  const [read, setRead] = useState([]);

  useEffect(() => {
    axios
      .get('https://notes-be-r40t.onrender.com/notes/all', config)
      .then((response) => {
        setRead(response.data);
        toast('Do Not Forget To read all the Notes and complete the Tasks');
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDecorationToggle = (index) => {
    const updatedRead = [...read];
    updatedRead[index].decorated = !updatedRead[index].decorated;
    setRead(updatedRead);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row ">
          <div className="col-sm-6 col text-center">
            {btn ? (
              <button
                className="btn w-75 view-btn btn-warning"
                onClick={() => {
                  setDisplay(false);
                  setBtn(false);
                }}
              >
                Table View
              </button>
            ) : (
              <button
                className="btn w-75 view-btn btn-warning"
                onClick={() => {
                  setDisplay(true);
                  setBtn(true);
                }}
              >
                Card View
              </button>
            )}
          </div>
          <div className="col-sm-6 col text-center">
            <Link to="/create" className="view-btn w-75 btn btn-success">
              + Add Notes 
            </Link>
          </div>
        </div>
        <div className="row">
          {display ? (
            <div className="container-fluid">
              <div className="container">
                <div className="row">
                  {read.map((e, index) => (
                    <div className="col-sm-6 mb-3 mb-sm-0" key={index}>
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title" style={{ textDecoration: e.decorated ? 'line-through' : 'none' }}>
                            {e.title}&ensp;-&ensp;-&ensp;-&ensp;
                            <CgEyeAlt
                              type="button"
                              data-bs-toggle="offcanvas"
                              data-bs-target={`#offcanvasScrolling-${index}`}
                              aria-controls={`offcanvasScrolling-${index}`}
                            />
                            <div
                              className="offcanvas offcanvas-start"
                              data-bs-scroll="true"
                              data-bs-backdrop="false"
                              tabIndex="-1"
                              id={`offcanvasScrolling-${index}`}
                              aria-labelledby={`offcanvasScrollingLabel-${index}`}
                            >
                              <div className="offcanvas-header">
                                <h5
                                  className="offcanvas-title"
                                  id={`offcanvasScrollingLabel-${index}`}
                                >
                                  {e.date}
                                </h5>
                                <h5
                                  className="offcanvas-title"
                                  id={`offcanvasScrollingLabel-${index}`}
                                >
                                  {e.title}
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="offcanvas"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="offcanvas-body">
                                <i>---Notes---</i>
                                <p>{e.document}.</p>
                              </div>
                            </div>
                            &ensp;&ensp;
                            <Link to={`/edit/${e._id}`}><MdBorderColor /></Link>
                            &ensp;&ensp;
                            <HiArchiveBoxXMark
                              className='danger-btn'
                              type='button'
                              onClick={() => handleDelete(e._id)}
                            />&ensp;&ensp;
                            <input
                              type="checkbox"
                              checked={e.decorated}
                              onChange={() => handleDecorationToggle(index)}
                            />
                          </h5>
                          <p className="card-text">{e.date}</p>
                          <div
                            className="offcanvas offcanvas-start"
                            data-bs-scroll="true"
                            data-bs-backdrop="false"
                            tabIndex="-1"
                            id={`offcanvasScrolling-${index}`}
                            aria-labelledby={`offcanvasScrollingLabel-${index}`}
                          >
                            <div className="offcanvas-header">
                              <h5
                                className="offcanvas-title"
                                id={`offcanvasScrollingLabel-${index}`}
                              >
                                {e.title}
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="offcanvas-body">
                              <p>{e.document}.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="container">
              <table className="table table-striped text-center table-hover">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Date</th>
                    <th scope="col">Notes</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {read.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.date}</td>
                      <td style={{ textDecoration: item.decorated ? 'line-through' : 'none' }}>{item.title}</td>
                      <td>
                        <CgEyeAlt
                          type="button"
                          data-bs-toggle="offcanvas"
                          data-bs-target={`#offcanvasScrolling-${index}`}
                          aria-controls={`offcanvasScrolling-${index}`}
                        />
                        <div
                          className="offcanvas offcanvas-start"
                          data-bs-scroll="true"
                          data-bs-backdrop="false"
                          tabIndex="-1"
                          id={`offcanvasScrolling-${index}`}
                          aria-labelledby={`offcanvasScrollingLabel-${index}`}
                        >
                          <div className="offcanvas-header">
                            <h5
                              className="offcanvas-title"
                              id={`offcanvasScrollingLabel-${index}`}
                            >
                              {item.title}
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="offcanvas"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="offcanvas-body">
                            <p>{item.document}.</p>
                          </div>
                        </div>
                        &ensp;&ensp;
                        <Link to={`/edit/${item._id}`}><MdBorderColor /></Link>
                        &ensp;&ensp;
                        <HiArchiveBoxXMark
                          className='danger-btn'
                          type='button'
                          onClick={() => handleDelete(item._id)}
                        /> &ensp;&ensp;
                        <input
                          type="checkbox"
                          checked={item.decorated}
                          onChange={() => handleDecorationToggle(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default View;
