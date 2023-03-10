import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { HandPalm, Play } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod" //importa tudo da lib com o nome de zod
import { differenceInSeconds } from "date-fns";
import {  HomeContainer,  StartCountdownButton, StopCountdownButton } from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";




interface Cycle  {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)



  //percorre o array de cycle e verifica se o id do cycle é igual ao cycle ativo  
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)


  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    //variavel se baseando nas props do ts
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
      
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0) //zerar a comtagem de segundos
    reset() //apos enviar reseta os campos aos valores padrao
  }

  //funcao para salvar o ciclo atual interrompido
  function handleInterruptCycle(){
    setCycles( (state) => 
      state.map((cycle) => {
        if(cycle.id === activeCycleId) {
          return {...cycle, interruptedDate: new Date()}
        }else {
          return cycle
        }
      }),
    )
    /// zera o cronometro
    setActiveCycleId(null)
  }

  


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


  console.log(activeCycle)

  const task = watch('task')
  const isSubmitDisabled = !task



  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
      <NewCycleForm/>
      <Countdown activeCycle={activeCycle} setCycles={setCycles}/>

        

      {activeCycle ? (
        <StopCountdownButton onClick={handleInterruptCycle} type="button">
          <HandPalm size={24}/>
          Interromper
        </StopCountdownButton>
      ) : (
        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24}/>
          Começar
        </StartCountdownButton>
      )}
       
      </form>
    </HomeContainer>
  )
}
