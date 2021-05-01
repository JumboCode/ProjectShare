import React from 'react';
import './PostPreview.css';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function PostPreview({ Data }) {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div className="PostPreview">
      <div>
        { Data.images.length > 0 && (
          <img src={Data.images[0].img_file} alt={Data.images[0].img_name} key={Data.images[0].id} className="Photo" />
        )}
      </div>
      <h5 className="DatePostedLarge">
        {new Date(Data.date).toLocaleDateString("en-US", dateOptions)}
      </h5>
      <Link className="TitleLarge" to={`/post/${Data.id}`}>
        { Data.title }
      </Link>
      <p className="PostContentLarge">
        {
          `${Data.content.substr(0, 113).replace(/#/g, "")}...`
        }
      </p>
      <p className="TagsLarge">
        {Data.tags.map(tag => (
          <Link 
            to={{ pathname: `/tag/${tag.id}`, state: { tagName: tag.name } }} 
            className="tagElemPostLarge" 
            key={tag.id}
          >
            {tag.name}

          </Link>
        ))}
      </p>
    </div>
  )
}

PostPreview.propTypes = {
  Data: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))),
    date: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))),
  }).isRequired
}

export default PostPreview;
