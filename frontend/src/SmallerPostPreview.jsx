import React from 'react';
import './SmallerPostPreview.css';
import PropTypes from 'prop-types';
import { Link} from 'react-router-dom';

function SmallerPostPreview({ Data }) {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div className="SmallerPostPreview">
      <div className="post-info">
        <h5 className="DatePosted">
          {new Date(Data.date).toLocaleDateString("en-US", dateOptions)}
        </h5>
        <Link to={`/post/${Data.id}`} className="Title">
          {Data.title}
        </Link>
        <p className="PostContent">
          {`${Data.content.substr(0, 113).replace(/#/g, "")}...`}
        </p>
        <div className="Tags">
          {Data.tags.map(tag => (
            <Link
              to={{ pathname: `/tag/${tag.id}`, state: { pageName: tag.name } }}
              className="tagElemPostLarge"
              key={tag.id}
            >
              {tag.name}

            </Link>
          ))}
        </div>
      </div>
      { Data.images.length > 0 && (
        <div className="Photo">
          <img src={Data.images[0].img_file} alt={Data.images[0].img_name} key={Data.images[0].id} />
        </div>
      )}
    </div>
  )
}

SmallerPostPreview.propTypes = {
  Data: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))),
    date: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))),
  }).isRequired
}

export default SmallerPostPreview;
