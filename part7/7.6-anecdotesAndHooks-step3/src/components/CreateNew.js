import React from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = (props) => {
  //Destructure the reset function from the useField hook's return value and spread
  //the rest into a props object. Reference the correct reset function in handleReset.
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          {/*<input
              type={content.type}
              name='content'
              value={content.value}
              onChange={content.onChange}
            />*/}
          <input {...content} />
        </div>
        <div>
          author
          {/*<input
              type={author.type}
              name='author'
              value={author.value}
              onChange={author.onChange}
            />*/}
          <input {...author} />
        </div>
        <div>
          url for more info
          {/*<input
              type={info.type}
              name='info'
              value={info.value}
              onChange={info.onChange}
            />*/}
          <input {...info} />
        </div>
        <button>create</button>
        <button type="reset" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
