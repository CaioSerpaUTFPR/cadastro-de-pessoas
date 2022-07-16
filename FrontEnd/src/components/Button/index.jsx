import { Button } from './styles';

export const CustomButton = ({ onClick, children }) => {

    return (
        <div style={{ width: '50px' }}>
            <Button onClick={onClick}>
                <span>{children}</span>
            </Button>
        </div>

    )
}



