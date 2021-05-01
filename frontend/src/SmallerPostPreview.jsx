import React from 'react';
import './SmallerPostPreview.css';
import PropTypes from 'prop-types';
import { Link} from 'react-router-dom';

function SmallerPostPreview({ Data }) {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div className="SmallerPostPreview">
      <div>
        { Data.images.length > 0 && (
          <img src={Data.images[0].img_file} alt={Data.images[0].img_name} key={Data.images[0].id} className="Photo" />
        )}
        { Data.images.length <= 0 && (
          <p className="PhotoPlaceHolder" />
        )}
      </div>
      <p className="DatePosted">
        {new Date(Data.date).toLocaleDateString("en-US", dateOptions)}
      </p>
      <Link to={`/post/${Data.id}`} className="Title">
        {Data.title}
      </Link>
      <p className="PostContent">
        { `${Data.content.substr(0, 113)}...` }
      </p>
      <p className="Tags">
        {Data.tags.map (tag => (
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

SmallerPostPreview.propTypes = {
  Data: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))),
    date: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))),
  }).isRequired
}

export default SmallerPostPreview;
