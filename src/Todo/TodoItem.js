import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Context from '../context';


const styles = {
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    border: '1px solid #ccc',
    marginBottom: '0.5 rem',
    borderRadius: '4px'
  },
  input: {
    marginRight: '1rem',
    color: '#3c5858',
    fontWeight: '700',
    fontSize: '12px',
  },
  index: {
    marginRight: '0.4rem'
  },
  span: {
    color: '#3c5858',
    fontWeight: '700',
    fontSize: '16px',
  }
}


function TodoItem({ todo, index, onChange }) {
  const { removeTodo } = useContext(Context);
  const classes = [];
  if (todo.completed) {
    classes.push('done');
  }
  return (
    <div>
      <li style={styles.li}>
        <span className={classes.join(' ')} style={styles.span}>
          <input 
            type="checkbox"
            checked={todo.completed} 
            style={styles.input} 
            onChange={()=> onChange(todo.id)}
          />
            <strong style={styles.index}>{ index + 1 }</strong>
            {todo.title}
        </span>
        <button className="close" onClick={removeTodo.bind(null, todo.id)}>&times;</button>
      
      </li>
      
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired
}

export default TodoItem;