import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFeeds } from '../../actions';
import ShowPost from './show_post';


class FeedsIndex extends Component {
  componentDidMount() {
    this.props.fetchFeeds({page_no:1,page_size:10,screen_name:"feed",sub_type:"F"});
  }

  renderPosts() {

    return _.map(this.props.feeds, post => {

      return (
        <ShowPost key={post.id} post={post}/>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>

      </div>
    );
  }

}
function mapStateToProps(state) {
  return { feeds: state.feeds };
}

export default connect(mapStateToProps, { fetchFeeds })(FeedsIndex);
