import '../css/Home.css'
import globe from '../images/globe.jpg'
import {useEffect, useState} from "react";

const getCountries = (data) => Object.keys(data);
const getCapitals = (data) => Object.values(data);

const Home = ({data}) => {
  // I made options and optionsList separate so the user can click the "restart game" button and re-apply optionsList values to options
  const optionsList = [...getCountries(data), ...getCapitals(data)]
    .sort(() => Math.random() - 0.5)
    .map((value) => ({
      value,
      state: 'DEFAULT'
    }));
  const [options, setOptions] = useState(optionsList);
  const [selected, setSelected] = useState();
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.getItem('highscore') ?? 0);
  let isGameOver = options.length === 0;


  const restartGame = () => {
    setOptions(optionsList.sort(() => Math.random - 0.5));
    setScore(0);
    isGameOver = 0;
  }
  const onButtonClick = (option) => {
    if (!selected) {
      setSelected(option);
      setOptions(options.map(opt => ({
        ...opt,
        state: opt === option ? 'SELECTED' : 'DEFAULT'
      })));
    } else {
      setSelected(null);
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
        setScore(score => score + 10);
      }
      else {
        // wrong combo
        setScore(score => score - 10);
        setOptions(
          options.map((opt) => {
            return opt.value === selected.value ||
            opt.value === option.value
              ? {...opt, state: 'WRONG'}
              : opt
          })
        )
      }
    }
  }

  useEffect(() => {
    if (isGameOver && score > highScore) {
      localStorage.setItem('highscore', score);
      setHighScore(score);
    }
  }, [isGameOver])

  return (
    <div className='wrapper'>
      <div>
        <div className='title'>
          <img src={globe} alt="Logo"/>
          <h1>Capital Guesser</h1>
        </div>
        <div className='options'>
          {options.map((option) => (
              <button
                key={option.value}
                className={option.state.toLowerCase() ?? 'default'}
                onClick={() => onButtonClick(option)}
              >
                {option.value}
              </button>
          ))}
        </div>
        {isGameOver && <h1>Congratulations!</h1>}
        <div className='scoreboard'>
          <div>
            {isGameOver && <button onClick={() => restartGame()}>Restart</button>}
          </div>
          <div>
            <p>Score: {score}</p>
            <p>High score: {highScore} </p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Home;
