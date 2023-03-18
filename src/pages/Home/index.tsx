import { createContext, useState } from "react";
import { useForm, FormProvider } from "react-hook-form"
import { HandPalm, Play } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod" //importa tudo da lib com o nome de zod
import {  HomeContainer,  StartCountdownButton, StopCountdownButton } from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";








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
  
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })
  const {handleSubmit, watch, reset} = newCycleForm




  // console.log(activeCycle)

  const task = watch('task')
  const isSubmitDisabled = !task


  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormProvider {...newCycleForm}> 
            <NewCycleForm/>
          </FormProvider>
          <Countdown />
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
