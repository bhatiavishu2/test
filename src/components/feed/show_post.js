import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const ShowPost = ({post}) =>{
    return (
      <li className="list-group-item" key={post.id}>
        <Link to={`/posts/${post.id}`}>
          {post.name}
        </Link>
      </li>
    );
};
export default ShowPost;
