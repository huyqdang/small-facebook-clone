import React, {Component} from 'react'
import { deletImg } from '../actions'
import { connect } from 'react-redux'
import Comment from './comment'

class ImgPosts extends Component {
  constructor(props){
    super(props)

    var copy = this.props.content;

    this.state = {
      like: false,
      copy: copy,
      times: '',
      comment:[],
      editinput: ''
    }

    this.onEditChange = this.onEditChange.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onCommentEditSubmit = this.onCommentEditSubmit.bind(this);
  }

  onCommentEditSubmit(index, value){
    console.log(value, index,'thisone')
    var newComment = this.state.comment.slice();
    newComment[index] = value

    this.setState({
      comment: newComment
    })
  }

  onEditChange(e){

    this.setState({
      copy: e.target.value
    })
  }


  onEditSubmit(){
    this.props.editPost(this.props.index, this.state.copy)
  }

  onLikeHandle(){
    this.setState({
      like: !this.state.like
    })
    !this.state.like ? this.setState({ times : '1'}) : this.setState({ times : ''})
  }

  onDel(){
    this.props.deletImg(this.props.index)
  }

  postComment(event){
    this.setState({
      comment: [...this.state.comment, event]
    })
  }

  deleteComment(index){
    this.setState({
      comment: this.state.comment.filter((item, i) => {return i !== index })
    })
  }


  render(){
    console.log( this.state.editinput )
    return(
      <div>
        <img src={this.props.imgurl} alt='failed to upload'/>
        <button
          onClick={this.onLikeHandle.bind(this)}>
          {`${this.state.times} Like`}
        </button>
        <button>Edit</button>
        <button>Comment</button>
        <button onClick={this.onDel.bind(this)}>Delete</button>
        <Comment
          editComment={this.onCommentEditSubmit}
          deleteComment={this.deleteComment.bind(this)}
          mainComment={this.state.comment}
          changeComment={this.postComment.bind(this)}/>
    </div>
    )
  }
}

export default connect(null, {deletImg} )(ImgPosts)
