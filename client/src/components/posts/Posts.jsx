import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getPosts,addPost } from '../../actions/post'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'

const Posts = ({ post: { posts, loading },auth, getPosts,addPost }) => {
    useEffect(() => {
        getPosts()
    }, [getPosts])


    const [text,setPost]=useState("")
    const onChange=(e)=>{
        setPost(e.target.value)
    }
    const onSubmit=e=>{
        e.preventDefault();
        addPost({text})
    }
    return <Fragment>{loading || posts === null ? <Spinner></Spinner> : <Fragment>
        <section className="container">
            <h1 className="large text-primary">
                Posts
        </h1>
            <p className="lead"><i className="fas fa-user" /> Welcome {auth.user.name} to the community!</p>
            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Say Something...</h3>
                </div>
                <form className="form my-1" onSubmit={e=>onSubmit(e)}>
                    <textarea name="text" cols={30} rows={5} placeholder="Create a post" required onChange={e=>onChange(e)} />
                    <input type="submit" className="btn btn-dark my-1" defaultValue="Submit" />
                </form>
            </div>
            <div className="posts">
                {
                    posts.map(post => {
                        return (
                            <div className="post bg-white p-1 my-1">
                                <div>
                                    <Link to={`profile/${post.user}`}>
                                        <img className="round-img" src={post.avatar} alt="" />
                                        <h4>{post.name}</h4>
                                    </Link>
                                </div>
                                <div>
                                    <p className="my-1">
                                        {post.text}
                                    </p>
                                    <p className="post-date">
                                        {`Posted on ${post.date}`}
                                    </p>
                                    <button type="button" className="btn btn-light">
                                        <i className="fas fa-thumbs-up" />
                                        <span>{' '}{post.likes.length}</span>
                                    </button>
                                    <button type="button" className="btn btn-light">
                                        <i className="fas fa-thumbs-down" />
                                    </button>
                                    <a href="post.html" className="btn btn-primary">
                                        Discussion <span className="comment-count">{post.comments.length}</span>
                                    </a>
                                    {
                                    auth.user._id===post.user ? <button type="button" className="btn btn-danger">
                                    <i className="fas fa-times" />
                                </button> :""
                                    }
                                   
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </section>
    </Fragment>}</Fragment>

}
const mapStateToProps = state => ({
    post: state.post,
    auth:state.auth
})

export default connect(mapStateToProps, { getPosts,addPost })(Posts)