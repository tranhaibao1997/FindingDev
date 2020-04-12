import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { getProfileById } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'


const ProfileDetail = ({ match, getProfileById, profile: { profile, loading }, auth }) => {
    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById])
    return <Fragment>{loading || profile === null ? <Spinner></Spinner> : <Fragment>
        <section className="container">
            <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
            {/* {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id ? <Link to="/edit-profile" className="btn btn-dark"></Link> : {}} */}

            <div className="profile-grid my-1">
                {/* Top */}
                <div className="profile-top bg-primary p-2">
                    <img className="round-img my-1" src={profile.user.avatar} alt="" />
                    <h1 className="large">{profile.user.name}</h1>
                    <p className="lead">{profile.status} at {profile.company}</p>
                    <p>{profile.location}</p>
                    <div className="icons my-1">
                        {profile.website ? <a href={profile.website} target="_blank" rel="noopener noreferrer"> <i className="fas fa-globe fa-2x" /> </a> : ""}

                        {profile.twitter ? <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter fa-2x" /></a> : ""}
                        {profile.facebook ? <a href={profile.facebook} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook fa-2x" />
                        </a> : ""}
                        {profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin fa-2x" />
                        </a> : ""}
                        {profile.youtube ? <a href={profile.youtube} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-youtube fa-2x" />
                        </a> : ""}
                        {profile.instagram ? <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram fa-2x" />
                        </a> : ""}
                    </div>
                </div>
                {/* About */}
                <div className="profile-about bg-light p-2">
                    <h2 className="text-primary">{profile.user.name}'s Bio</h2>
                    <p>
                        {profile.bio}
                    </p>
                    <div className="line" />
                    <h2 className="text-primary">Skill Set</h2>
                    <div className="skills">

                        {profile.skills.map(skill => {
                            return (
                                <div className="p-1"><i className="fa fa-check" /> {skill}</div>
                            )
                        })}
                    </div>
                </div>
                {/* Experience */}
                <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Experience</h2>
                    {
                        profile.experience.map((exp,index) => {
                            return (
                                <div>
                                    <h3 className="text-dark">{exp.company}</h3>
                                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{""}
                                    {exp.to === null ? (' Now') : (
                                        <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                                    )}
                                    <p><strong>Position: </strong>{exp.title}</p>
                                    <p>
                                        <strong>Description: </strong>{exp.description}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
                {/* Education */}
                <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Education</h2>
                    {
                        profile.education.map((edu,index) => {
                            return (
                                <div>
                                    <div>
                                        <h3>{edu.school}</h3>
                                        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{""}
                                        {edu.to === null ? (' Now') : (
                                            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                                        )}
                                        <p><strong>Degree: </strong>{edu.degree}</p>
                                        <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                                        <p>
                                            <strong>Description: </strong>{edu.description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                  
                </div>
                {/* Github */}
                {/* <div className="profile-github">
                    <h2 className="text-primary my-1">
                        <i className="fab fa-github" /> Github Repos
            </h2>
                    <div className="repo bg-white p-1 my-1">
                        <div>
                            <h4><a href="#" target="_blank" rel="noopener noreferrer">Repo One</a></h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Repellat, laborum!
                </p>
                        </div>
                        <div>
                            <ul>
                                <li className="badge badge-primary">Stars: 44</li>
                                <li className="badge badge-dark">Watchers: 21</li>
                                <li className="badge badge-light">Forks: 25</li>
                            </ul>
                        </div>
                    </div>
                    <div className="repo bg-white p-1 my-1">
                        <div>
                            <h4><a href="#" target="_blank" rel="noopener noreferrer">Repo Two</a></h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Repellat, laborum!
                </p>
                        </div>
                        <div>
                            <ul>
                                <li className="badge badge-primary">Stars: 44</li>
                                <li className="badge badge-dark">Watchers: 21</li>
                                <li className="badge badge-light">Forks: 25</li>
                            </ul>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    </Fragment>}
    </Fragment>

}
const mapStateToProps = (state) => (
    {
        profile: state.profile,
        auth: state.auth
    }
)
export default connect(mapStateToProps, { getProfileById })(ProfileDetail)