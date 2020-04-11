import React from 'react';

const AddEducation = (props) => {return(
       <>
<section className="container">
        <h1 className="large text-primary">
          Add Your Education
        </h1>
        <p className="lead">
          <i className="fas fa-graduation-cap" /> Add any school, bootcamp, etc that
          you have attended
        </p>
        <small>* = required field</small>
        <form className="form">
          <div className="form-group">
            <input type="text" placeholder="* School or Bootcamp" name="school" required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="* Degree or Certificate" name="degree" required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Field Of Study" name="fieldofstudy" />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" />
          </div>
          <div className="form-group">
            <p>
              <input type="checkbox" name="current" defaultValue /> Current School or Bootcamp
            </p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to" />
          </div>
          <div className="form-group">
            <textarea name="description" cols={30} rows={5} placeholder="Program Description" defaultValue={""} />
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
        </form>
      </section>
       </>     
    )};

export default AddEducation;