import { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

type Kerekpar = {
  id: number
  nev: string
  tipus: string
  napiDij: number
  szin: string
}

type KerekparProps = {
  kerekpar: Kerekpar
}

function App() {
  
  const [kerekparok, setKerekparok] = useState<Kerekpar[]>([])

  useEffect(()=>{
    async function AdatokBetoltese() {
            try{
              const response = await fetch("/kerekparok.json")
              const data = await response.json()
              setKerekparok(data)
            }catch(err){
              console.error(err)
            }
          }
    AdatokBetoltese()
    }, [])
  
  function KerekparLista() {
          
          return(
            <>
            {kerekparok.map(item => (
              <Kerekpar key={item.id} kerekpar={item}/>
            ))}
            </>
          )
    }

    function Kerekpar(props: KerekparProps){
        
      const [visible, setVisible] = useState(false)

      return (
          <>
            <div className='card'>
              <div className="card-body">
                <h3 className="card-title nev" style={{color: props.kerekpar.szin}}>{props.kerekpar.nev}</h3>
                <p className="card-text"><em>{visible?`A kerékpár típusa: ${props.kerekpar.tipus}`:""}</em></p>
                <p className="card-text"><u>{visible?`A napi bérleti díj: ${props.kerekpar.napiDij}ft`:""}</u></p>
                <button className='btn' onClick={()=>{setVisible(!visible)}}>részletek</button>
              </div>
            </div>
          </>
        )
    }

    const kerekparokSzama = kerekparok.length
    const legolcsobbKerekpar = kerekparok.toSorted((a,b) => a.napiDij - b.napiDij)[0]?.napiDij
    const legdragabbKerekpar = kerekparok.toSorted((a,b) => b.napiDij - a.napiDij)[0]?.napiDij

  return (
    <>
      <h1>Kiadó kerékpárok</h1>
      <p>Kerékpárok száma: {kerekparokSzama}</p>
      <p>A legolcsóbb kerékpár bérleti díja: {legolcsobbKerekpar ?? "N/A"}</p>
      <p>A legdrágább kerékpár bérleti díja: {legdragabbKerekpar ?? "N/A"}</p>
      <KerekparLista/>
    </>
  )
}

export default App
