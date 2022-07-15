import styled from 'styled-components';

export const Input = styled.input`
    :focus{
        outline:${(props) => props.readOnly ? 'none' : 'default'}    
    }
    color:${(props) => props.readOnly ? 'gray' : 'default'}
`;

export const Span = styled.span`
    font-size: 10px;
    color: red;
`;

export const ContainerInput = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 60px;
`;