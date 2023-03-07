import { Play } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod" //importa tudo da lib com o nome de zod
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";


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

interface Cycle  {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

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

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    //variavel se baseando nas props do ts
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    reset() //apos enviar reseta os campos aos valores padrao
  }


  //percorre o array de cycle e verifica se o id do cycle é igual ao cycle ativo  
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  //para evitar divisao quebrada
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60


  //padStart a variabel tera 2 posicoes caso nao tenha inicia com 0
  const minutes = String(minutesAmount).padStart(2, "0")
  const seconds = String(secondsAmount).padStart(2, "0")


  console.log(activeCycle)

  const task = watch('task')
  const isSubmitDisabled = !task



  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            placeholder="Nome do projeto"
            list="task-suggestions" //usa as props abaixo
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
            {...register('minutesAmount', {valueAsNumber: true})} 
          />
          
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24}/>
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
