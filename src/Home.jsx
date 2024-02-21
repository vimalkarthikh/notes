import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    // <div className="container home-container">
    //     <div className="row">
    //        <div className="col">
    //        <h1 className='text-center app-heading m-2'>Dairy Days</h1>
    //        </div>
    //     </div>
        
    //         <div className='home-row'>
    //         <div className="row">
    //         <div className="col card home-card "><br />
    //             <h2 className='text-center home-abt'>Dairy Days</h2>
    //             <p className='home-abt'>A personal diary is meant to be private and is typically not shared with others.
    //                It is a safe and confidential space for individuals to express themselves without 
    //                fear of judgment. 
    //                Lets start it as a Digital Dairy.
    //                <ul>
    //                 <br />
    //                 <li>Expressing your emotions in a diary can be a form of emotional release, which can help reduce stress and promote mental well-being.</li>
    //                 <li>Journaling can help you work through problems and find solutions.</li>
    //                 <li>It's a way to reinforce what you've learned or experienced.</li>
    //                 </ul></p>
    //                   </div>
    //                   <div className=" col card home-card">

    //                   <h2 className='home-abt text-center'>Get Started !</h2>
    //                <Link to='/login' className='btn btn-outline-dark form-control home-btn'>L o g i n</Link><br />
    //                <Link to='/register' className='btn btn-info form-control home-btn'>R e g i s t e r</Link><br />
         
    //                   </div>
            
    //         </div>
    //     </div>
    // </div>
    <div class="container  text-center p-2">
      <div className="row " >
        
      <h1 className='text-center app-heading m-2'>NotesApp</h1>
      </div>
  <div class="row cont-home m-1">
    <div class="col-12 col-sm-6 home-abts rounded-3 text-light">
    <h2 className='text-center  '>NotesApp</h2>
                 <p className=''>A notes-taking application is a digital tool designed to help users capture, organize, and retrieve information efficiently. 
                    Lets start it as a NotesApp.
                    <ul>
                     <br />
                     <li>Notes-taking applications provide users with a systematic way to organize their notes and information.</li>
                     <li> These applications offer the convenience of accessing notes from any device with an internet connection.</li>
                     <li>With the ability to quickly jot down ideas, reminders, and tasks, notes-taking applications help users stay productive and efficient.</li>
                     </ul></p>
    </div>
    <div class="col-12 col-sm-6 home-abts text-light ml-2">
      <br />
                     <h2 className=' text-center '>Get Started !</h2>
                     <br />
                    <Link to='/login' className='btn btn-light form-control home-btn'>L o g i n</Link><br />
                    <br />
                    <Link to='/register' className='btn btn-success form-control home-btn'>R e g i s t e r</Link><br />
         
    </div>
  </div>
</div>
  )
}

export default Home