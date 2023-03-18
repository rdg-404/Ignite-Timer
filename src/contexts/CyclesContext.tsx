import { createContext, useState } from "react";

interface Cycle  {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CycleContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number,
  markCurrentCycleAsFinished: () => void 
  setSecondsPassed: (seconds: number) => void 
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void

}


export const CycleContext = createContext({} as CycleContextType)


export function CyclesContextProvider(){

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  //percorre o array de cycle e verifica se o id do cycle é igual ao cycle ativo  
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)


  function setSecondsPassed(seconds: number){
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished(){
    setCycles((state) => 
      state.map((cycle) => {
        if(cycle.id === activeCycleId) {
          return {...cycle, finishedDate: new Date()}
        }else {
          return cycle
        }
      }),
    )
  }


  function createNewCycle(data: CreateCycleData) {
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
    // reset() //apos enviar reseta os campos aos valores padrao
  }

  //funcao para salvar o ciclo atual interrompido
  function interruptCurrentCycle(){
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
  
  return (
          <CycleContext.Provider 
            value={{ 
              activeCycle, 
              activeCycleId, 
              markCurrentCycleAsFinished, 
              amountSecondsPassed,
              setSecondsPassed,
              createNewCycle,
              interruptCurrentCycle
            }}
          > 
          </CycleContext.Provider>
  )
}