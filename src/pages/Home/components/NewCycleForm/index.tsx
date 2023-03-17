import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

import { useContext } from "react";
import { CycleContext } from "../..";
import { useFormContext } from "react-hook-form/dist/useFormContext";




export function NewCycleForm() {
  const {activeCycle} = useContext(CycleContext)
  const {register} = useFormContext()


  return (
      <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput 
          id="task" 
          placeholder="Nome do projeto"
          list="task-suggestions" //usa as props abaixo
          disabled={!!activeCycle}
          {...register('task')} //utiliza alguns metodos do input no campo task
        />

        <datalist id="task-suggestions">
          <option value="Projeto 01"/>
          <option value="Projeto 02"/>
          <option value="Projeto 03"/>
          <option value="Projeto 04"/>
        </datalist>


        <label htmlFor="minutesAmount">Durante</label>
        <MinutesAmountInput 
          type="Number" 
          id="minutesAmount" 
          placeholder="00" 
          step={5} //pula de 5 em 5
          min={5}
          max={60}
          disabled={!!activeCycle}
          {...register('minutesAmount', {valueAsNumber: true})} 
        />
      
        <span>minutos.</span>
    </FormContainer>
  )
 
}