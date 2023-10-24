import '../css/Home.css'
import {useState} from "react";

const Home = ({data}) => {
  const countries = Object.keys(data);
  const capitals = Object.values(data);
  const [options, setOptions] = useState([...countries, ...capitals]
    .sort(() => Math.random() - 0.5)
    .map((value) => ({
    value,
    state: 'DEFAULT'
  })));

  console.log(options);

  return (
    <div className='wrapper'>
      <div>
        <h1>Capital Guesser</h1>
        <div className='options'>
          {options.map((option) => (
              <button
                className={option.state === 'SELECTED' ? 'selected' : ''}
                onClick={() => {
                  setOptions(options.map(opt => {
                    return opt === option
                    ? {
                        ...opt,
                        state: 'SELECTED'
                      }
                    : opt;
                  }))
                }}
              >
                {option.value}
              </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home;