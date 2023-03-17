import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { HandPalm, Play } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod" //importa tudo da lib com o nome de zod
import { differenceInSeconds } from "date-fns";
import {  HomeContainer,  StartCountdownButton, StopCountdownButton } from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { FormProvider } from "react-hook-form/dist/useFormContext";




interface Cycle  {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}


interface CycleContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void 
}

export const CycleContext = createContext({} as CycleContextType)


//funcao de validacao dos campos
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
  .number()
  .min(5, "O ciclo precisa ser de no mínimo 5 minutos.")
  .max(60, "O ciclo precisa ser de no máximo 60 minutos.")
})


//referencia a variavel acima
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  //percorre o array de cycle e verifica se o id do cycle é igual ao cycle ativo  

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })



  const {handleSubmit, watch, reset} = newCycleForm

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

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



  console.log(activeCycle)

  const task = watch('task')
  const isSubmitDisabled = !task



  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CycleContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}>
          <FormProvider {...newCycleForm}> 
            <NewCycleForm/>
          </FormProvider>
          <Countdown />
        </CycleContext.Provider>

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
