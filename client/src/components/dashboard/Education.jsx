import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment'
import { deleteEducation } from "../../actions/profile"


function Education({ profile: { profile }, deleteEducation }) {

    const deleteEdu = (id) => {
        deleteEducation(id)
    }
    return (
        <>
            <h2 className="my-2">Education</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th className="hide-sm">Field Of Study</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                    {
                        profile.education.map(exp => (

                            <tr key={exp._id}>
                                <td>{exp.school}</td>
                                <td className="hide-sm">{exp.degree}</td>
                                <td className="hide-sm">{exp.fieldofstudy}</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{""}
                                    {exp.to === null ? ('Now') : (
                                        <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                                    )}
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={e => deleteEdu(exp._id)}>Delete</button>
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
export default connect(mapStateToProps, { deleteEducation })(Education);