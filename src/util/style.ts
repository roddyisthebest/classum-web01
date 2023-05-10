import styled from 'styled-components';

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #e0e0e0;
  outline: none;
  &:focus {
    border-bottom: 2px solid #5b35aa;
  }
  padding: 10px 0;
  transition: all 300ms ease;
  &::placeholder {
    color: #6e7377;
  }
`;

const InputTitle = styled(Input)`
  font-size: 30px;
  font-weight: 600;
`;

const InputDescription = styled(Input)`
  font-size: 20px;
  font-weight: 400;
`;

export { InputTitle, InputDescription };
