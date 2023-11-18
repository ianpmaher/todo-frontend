import Post from "../components/Post";
import { Link } from "react-router-dom";

// const AllPosts = (props) => {

//     return (
//         <div>
//             <Link to='/new'>
//                 <button>New Post</button>
//             </Link>
//             {props.posts.map((post) => (
//                 <Post key={post.id} post={post} />
//             ))}
//         </div>
//     );
// };

const AllPosts = (props) => (
    <div>
        <Link to="/new">
            <button>New Post</button>
        </Link>
        {props.posts.map((post) => (
            <Post key={post.id} post={post} deleteTodo={props.deleteTodo} />
        ))}
    </div>
);

export default AllPosts;
