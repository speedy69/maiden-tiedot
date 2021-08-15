import { useEffect, useState } from "react";
import axios from "axios";

const Countries = ({filsu, lista}) => {
  const temp = lista.filter(a => a.name.toLowerCase().includes(filsu.toLowerCase()))

  if(temp.length === 1){
    const test = temp[0]
    return(
      <div>
        <h2>{test.name}</h2>
        <p>capital {test.capital} <br/>
        population {test.population}</p>
        <h3>languages</h3>
        <ul>
          {test.languages.map(a => <li key={a.name}>{a.name}</li>)}
        </ul>
        <img alt='' src={test.flag} width='100' height='75'/>
      </div>
    )
  }
  if(temp.length < 20){
    return(
      <div>
        {temp.map(a => <p key={a.name}>{a.name}<button>show</button></p>)}
      </div>
    )
  }

  return(
    <div>Too many matches, specify another filter</div>
  )
}

function App() {
  const [maat, setMaat] = useState([])
  const [filtteri, setFiltteri] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(r => setMaat(r.data))
  }, [])

  const handleChange = (e) => setFiltteri(e.target.value)

  return (
    <div >
      find countries <input value={filtteri} onChange={handleChange} />
      <Countries filsu={filtteri} lista={maat} />
    </div>
  );
}

export default App;
