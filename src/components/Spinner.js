import styled from 'styled-components';

const Spinner = styled.div`
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 0.5em solid rgba(255, 255, 255, 0.2);
  border-right: 0.5em solid rgba(255, 255, 255, 0.2);
  border-bottom: 0.5em solid rgba(255, 255, 255, 0.2);
  border-left: 0.5em solid #ffffff;
  transform: translateZ(0);
  animation: loading 1.1s infinite linear;

  &, &:after {
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
