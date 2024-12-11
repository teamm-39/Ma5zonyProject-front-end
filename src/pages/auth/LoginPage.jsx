import LoginBuner from "../../features/auth/LoginBuner";
import "../../assets/css/loginPage.css";
import LoginForm from "../../features/auth/LoginForm";
function LoginPage() {
  return (
    <>
      <div className="row p-0 m-0 login-page">
        <div className="col-5 m-0 p-0">
          <LoginForm />
        </div>
        <div className="col-7 m-0 p-0">
          <LoginBuner />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
