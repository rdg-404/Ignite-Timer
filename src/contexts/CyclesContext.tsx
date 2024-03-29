import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";



interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number,
  markCurrentCycleAsFinished: () => void 
  setSecondsPassed: (seconds: number) => void 
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void

}


export const CycleContext = createContext({} as CycleContextType)

interface CyclesContextProviderProps {
  children: ReactNode //aceita qualquer html valido dentro da tag
}



export function CyclesContextProvider({children}: CyclesContextProviderProps){
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  }, (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.1.0'
      )

      if (storedStateAsJSON){
        return JSON.parse(storedStateAsJSON)
      }
      
      return initialState
    },
  )


  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if(activeCycle) {
      return differenceInSeconds( 
        new Date(), 
        new Date(activeCycle.startDate)
      )
    }
    return 0
  }
  )
  
  useEffect(() =>{
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state-1.1.0', stateJSON)
  }, [cyclesState])


  function setSecondsPassed(seconds: number){
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished(){

    //action executa o que esta em payload
    dispatch(markCurrentCycleAsFinishedAction())
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


    dispatch(addNewCycleAction(newCycle))


    setAmountSecondsPassed(0) //zerar a comtagem de segundos
    
  }

  //funcao para salvar o ciclo atual interrompido
  function interruptCurrentCycle(){
    dispatch(interruptCurrentCycleAction())
  }
  
  return (
          <CycleContext.Provider 
            value={{ 
              cycles,
              activeCycle, 
              activeCycleId, 
              markCurrentCycleAsFinished, 
              amountSecondsPassed,
              setSecondsPassed,
              createNewCycle,
              interruptCurrentCycle
            }}
          > 
          {children}
          </CycleContext.Provider>
  )
}