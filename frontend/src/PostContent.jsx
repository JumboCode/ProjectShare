import React from 'react';
 
function PostContent(string) {
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{__html: string }} />;
}

export default PostContent; 