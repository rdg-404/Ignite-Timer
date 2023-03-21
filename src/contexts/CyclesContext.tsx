import { createContext, ReactNode, useReducer, useState } from "react";

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
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    if(action.type === "ADD_NEW_CYCLE"){
      return[...state, action.payload.newCycle]
    }

    return state
  }, [])


  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  //percorre o array de cycle e verifica se o id do cycle é igual ao cycle ativo  
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)


  function setSecondsPassed(seconds: number){
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished(){

    //action executa o que esta em payload
    dispatch({
      type: "MARK_CURRENT_CYCLE_AS_FINISHED",
      payload: {
        activeCycleId,
      }
    })
    // setCycles((state) => 
    //   state.map((cycle) => {
    //     if(cycle.id === activeCycleId) {
    //       return {...cycle, finishedDate: new Date()}
    //     }else {
    //       return cycle
    //     }
    //   }),
    // )
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


    dispatch({
      type: "ADD_NEW_CYCLE",
      payload: {
        newCycle,
      }  
    })
    // setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0) //zerar a comtagem de segundos
    
  }

  //funcao para salvar o ciclo atual interrompido
  function interruptCurrentCycle(){
    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload: {
        activeCycleId,
      }
    })
    // setCycles( (state) => 
    //   state.map((cycle) => {
    //     if(cycle.id === activeCycleId) {
    //       return {...cycle, interruptedDate: new Date()}
    //     }else {
    //       return cycle
    //     }
    //   }),
    // )
    /// zera o cronometro
    setActiveCycleId(null)
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