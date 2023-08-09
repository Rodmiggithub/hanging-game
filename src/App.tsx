import './App.css';
import { useEffect,useState } from 'react';
import { letters } from '../helpers/letters';
import { HangImage } from './components/HangImage';
import { getRandomWord } from '../helpers/getRandomWord';

function App() {

  const [word, setWord] = useState(getRandomWord());
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
  const [attempts, setAttempts] = useState(0);
  const [ lose , setLose ] = useState(false);
  const [won , setWon] = useState(false);

  useEffect( () => {
    if(attempts >= 9) {
      setLose(true);
    }
  },[attempts]);

  //Determinar si la persona gano
  useEffect( () => {
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if(currentHiddenWord === word){
      setWon(true);
    }
  },[hiddenWord]);

  const checkLetter = (letter:string) => {

    if(lose) return;
    if(!word.includes(letter)){
      setAttempts(Math.min(attempts + 1, 9));
      return;
    }
    const hiddenWordArray = hiddenWord.split(' ');

    for(let i = 0; i < word.length ; i++){
      if( word[i] === letter){
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(' '));
  }

  const newGame = () => {

    const newWord = getRandomWord();
    setWord(newWord);
    setHiddenWord('_ '.repeat(newWord.length));
    setAttempts(0);
    setLose(false);
    setWon(false);
  }

  return (
    <div className='App'>
      {/* Imagenes */}
      <HangImage imageNumber={attempts}/>
      {/* Palabra oculta */}
      <h3>{hiddenWord}</h3>
      {/* Contador de Intentos */}
      <h3>Intentos: {attempts}</h3>
      {/* Mensaje si pierde */}
      {
        (lose) 
        ? <h2>Perdio {word}</h2>
        : ''
      }
       {/* Mensaje si gano */}
       {
        (won) 
        ? <h2>Felicidades, usted gano</h2>
        : ''
      }


      {/* Botones de letras*/}
      {
        letters.map( (letter) => (
          <button onClick={ () =>checkLetter(letter) }
          key={ letter }>{ letter }</button>
        ))
      }

      <br /><br />
      <button onClick={newGame}>Jugar de Nuevo</button>

    </div>
  )
}

export default App;
