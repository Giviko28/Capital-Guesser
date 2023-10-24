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
  const [selected, setSelected] = useState();
  const isGameOver = options.length === 0;

  return (
    <div className='wrapper'>
      <div>
        <h1>Capital Guesser</h1>
        <div className='options'>
          {options.map((option) => (
              <button
                key={option.value}
                className={option.state.toLowerCase() ?? ''}
                onClick={() => {
                  if (!selected) {
                    setSelected(option);
                    setOptions(options.map(opt => {
                      return opt === option
                        ? {
                          ...opt,
                          state: 'SELECTED'
                        }
                        : {...opt, state: 'DEFAULT'};
                    }))
                  } else {
                    // correct combo
                    if (
                      selected.value === data[option.value] ||
                      data[selected.value] === option.value
                    ) {
                      setOptions(
                        options.filter((opt) => {
                          return !(
                            opt.value === selected.value || opt.value === option.value
                          )
                        })
                      )
                    }
                    else {
                      // wrong combo
                      setOptions(
                        options.map((opt) => {
                          return opt.value === selected.value ||
                            opt.value === option.value
                            ? {...opt, state: 'WRONG'}
                            : opt
                        })
                      )
                    }
                    setSelected(null);
                  }
                }}
              >
                {option.value}
              </button>
          ))}
        </div>
        {isGameOver && <h1>Congratulations!</h1>}
      </div>
    </div>
  )
}

export default Home;