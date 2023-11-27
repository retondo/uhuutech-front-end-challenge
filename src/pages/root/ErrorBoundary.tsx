import { useNavigate, useRouteError } from "react-router-dom";
import Button from "@app/components/Button";

export default function ErrorBoundary() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex min-h-[100vh] items-center justify-center">
      <p>Algo deu errado!</p>
      <Button onClick={() => navigate(-2)}>Voltar</Button>
    </div>
  );
}
