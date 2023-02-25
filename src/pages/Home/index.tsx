import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput id="task" placeholder="Nome do projeto"/>

          <label htmlFor="minutesAmount">Durante</label>
          <MinutesAmountInput type="Number" id="minutesAmount" placeholder="00" />
          
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
