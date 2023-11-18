import { Link, useNavigate } from 'react-router-dom';

const divStyle = {
    textAlign: 'center',
    border: '3px solid',
    margin: '10px auto',
    width: '80%'
  }
  
  const titleStyle = {
    color: '#006643',
    fontSize: '4em'
  }

// const Post = ( {props} ) => {
//     return( 
//         <div style={divStyle}>
//             <Link to={`/post/${props.post.id}`}>
//                 <h1 style={titleStyle}>{props.post.subject}</h1>
//             </Link>
//             <h2>{props.post.detail}</h2>
//         </div>
//     )
// };

// SAME AS

const Post = ( {post, deleteTodo} ) => {

    const navigate = useNavigate();
    
    const handleDelete = async (event) => {
        event.preventDefault();
        deleteTodo(post.id)
        navigate("/");
    }

    return( 
        <div style={divStyle}>
            <Link to={`/post/${post.id}`}>
                <h1 style={titleStyle}>{post.subject}</h1>
            </Link>
            <h2>{post.detail}</h2>
            <form onSubmit={handleDelete}>
                <input type="submit" value="Delete" />
            </form>
        </div>
    )
}

export default Post;