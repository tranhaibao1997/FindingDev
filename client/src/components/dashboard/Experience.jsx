import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profile'
import axios from 'axios'


function Experience({ profile: { profile } ,deleteExperience}) {

    const deleteExp = async (id) => {
        deleteExperience(id)
        
    }

    return (
        <>
            <h2 className="my-2">Experience</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                    {
                        profile.experience.map(exp => (

                            <tr key={exp._id}>
                                <td>{exp.company}</td>
                                <td className="hide-sm">{exp.title}</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{""}
                                    {exp.to === null ? ('Now') : (
                                        <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                                    )}
                                </td>
                                <td>
                                    <button onClick={e => deleteExp(exp._id)} className="btn btn-danger">Delete</button>
                                </td>



                            </tr>
                        ))
                    }
                </thead>

            </table>
        </>
    );

}

const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { deleteExperience })(Experience);