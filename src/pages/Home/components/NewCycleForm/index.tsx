import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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


export function NewCycleForm() {
  
  //register - funcao que retorna alguns metodos de input
  // handleSubmit - permite usar os dados do formulario
  // watch - observar algum elemento
  const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

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