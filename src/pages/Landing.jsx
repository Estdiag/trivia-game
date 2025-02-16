
import { useNavigate } from "react-router";
import paths from '../types/paths';
import Button from '../components/Button';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Hola, bienvenido</h1>
      <Button onClick={() => {
          navigate(paths.PLAY)
        }}>START GAME</Button>
    </>
  );
}
