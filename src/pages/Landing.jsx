import { useNavigate } from 'react-router';
import paths from '../types/paths';
import Button from '../components/Button';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-around h-screen items-center" >
      <h1 className="text-center text-6xl text-violet-600">Hello, Welcome</h1>
      <Button
        onClick={() => {
          navigate(paths.PLAY);
        }}
        className="btn-primary btn"
      >
        START GAME
      </Button>
    </div>
  );
}
