import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CycleContext } from "../..";
import { CountdownContainer, Separator } from "./styles";


export function Countdown( ){
  const { activeCycle, activeCycleId } = useContext(CycleContext)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  //funcao para diminuir o time
  useEffect(()=> {

    let interval: number

    /// funcao para parar o cronometro ao chegar a 0
    if(activeCycle){
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds( 
          new Date(), 
          activeCycle.startDate
        )

        
        if(secondsDifference >= totalSeconds){
          setCycles(state => state.map((cycle) => {
            if(cycle.id === activeCycleId) {
              return {...cycle, finishedDate: new Date()}
            }else {
              return cycle
            }
          }),
        )    
        setAmountSecondsPassed(totalSeconds) //zera o cronometro em 0
        clearInterval(interval)
        }else {
          setAmountSecondsPassed(secondsDifference)
        }

      }, 1000)
    }

    //limpar o set interval anterior
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])


  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  //para evitar divisao quebrada
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60


  //padStart a variabel tera 2 posicoes caso nao tenha inicia com 0
  const minutes = String(minutesAmount).padStart(2, "0")
  const seconds = String(secondsAmount).padStart(2, "0")


  //funcao para deixar o time no titulo ao mudar de aba
  useEffect(() => {
    if(activeCycle){
      document.title= `${minutes}:${seconds}`
    }
  },[minutes, seconds, activeCycle])

  return(
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}