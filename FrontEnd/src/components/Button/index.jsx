import { Button } from './styles';

export const CustomButton = ({onClick, children})=>{

    return(
        <Button onClick={onClick}>
            {children}
        </Button>
    )
}



