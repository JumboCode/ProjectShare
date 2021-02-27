import React from 'react';

function TopicList(props) {
  // eslint-disable-next-line react/prop-types
  const {topics} = props;
  // eslint-disable-next-line react/prop-types
  const listItems = topics.map((topic) => (
    <li key={topic.toString()}>
      {topic}
    </li>
  )
  );
  return (
    <ul>{listItems}</ul>
  );
}
  
const topics = ["Access", "Education", "Environment", "Equality", "Food Insecurity", "Gender Equality", "Maternal & Child Health", 
  "Mental Health", "Sharewood Project", "Women's Health", "Vulnerable Groups (at risk)"];
// eslint-disable-next-line no-undef
ReactDOM.render(
  <TopicList topics={topics} />,
  document.getElementById('root')
);

export default TopicList;


