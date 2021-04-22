import React from 'react';
import './SmallerPostPreview.css';
import PropTypes from 'prop-types';

function SmallerPostPreview({ Data }) {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div className="SmallerPostPreview">
      <p>
        { Data.images.length > 0 && (
          <img src={Data.images[0].img_file} alt={Data.images[0].img_name} key={Data.images[0].id} className="Photo" />
        )}
        { Data.images.length <= 0 && (
          <div className="PhotoPlaceHolder" />
        )}
      </p>
      <p className="DatePosted">
        {new Date(Data.date).toLocaleDateString("en-US", dateOptions)}
      </p>
      <p className="Title">
        { Data.title }
      </p>
      <p className="PostContent">
        { `${Data.content.substr(0, 113)}...` }
      </p>
      <p className="Tags">
        {Data.tags.map (tag => (
          <a href="/" className="tagElemPost" key={tag.id}>{tag.name}</a>
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
