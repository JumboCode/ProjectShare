// import React from 'react';

// You will be building a component that can take a title and a list of posts, and render 
// that right half of all of these pages. That way, this component will be used for all of 
// these pages - for the search page, for example, we might create this component but pass it
// "Search Result for ABC..." as a title prop and a list of posts that fit the ABC query as another prop.

// Deliverable:
// A component called PostFeed that takes two props: a string title and an array of objects posts. 
// Display the first post in that list as a PostPreview and the rest of the posts as a 
// SmallerPostPreview (these components should already exist in the src folder). Display the title at 
// the top, as per the design. Then, use your component in the Home.jsx component to display the posts
// there.

// function PostFeed (props){
//   return (
//     <h1>
//       {' '}
//       Title:
//       {/* {props.title}  */}
//     </h1>
//   );
// }
// function App(){
//   return (
//     <div className="title"> 
//       <PostFeed title="Home" />
//       <PostFeed title="Category" />
//       <PostFeed title="Search" />
//     </div>
//   );
// }
// export default PostFeed;

// post preview and post preview component 

// https://reactjs.org/docs/components-and-props.html