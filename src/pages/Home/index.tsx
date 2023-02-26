import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            placeholder="Nome do projeto"
            list="task-suggestions" //usa as props abaixo
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
          />
          
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled type="submit">
          <Play size={24}/>
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
