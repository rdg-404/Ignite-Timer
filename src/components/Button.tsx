// import styles from './Button.module.css'


// interface ButtonProps {
//     color?: 'primary' | 'secondary' | 'danger' | 'success'; ///classes 

// }

// export function Button({color = 'primary'}: ButtonProps) {
//     return (
//         <button className={`${styles.button} ${styles[color]}`}>Enviar</button>
//     )
// }






/////////////////////////styled components /////////////////////////

import { ButtonContainer, ButtonVariant } from './Button.styles';


interface ButtonProps {
    variant?: ButtonVariant; ///classes 

}


///se nao for definida nenhuma cor ela assume primary
export function Button({variant = 'primary'}: ButtonProps) {
    return (
        <ButtonContainer variant={variant}>Enviar</ButtonContainer>
    )
}