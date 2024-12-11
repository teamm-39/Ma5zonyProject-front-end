import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
function LoginForm() {
  return (
    <>
      <div className="login-form">
        <p className="form-title">تسجيل الدخول</p>
        <div className="form mt-5">
          <form>
            <div className="p-relative w-100 d-flex justify-content-center">
              <FloatLabel className="w-75 text-end">
                <InputText id="username" className="w-100" />
                <label htmlFor="username" className="text-Start input-label">البريد الالكترونى</label>
              </FloatLabel>
            </div>
            <div className="p-relative w-100 mt-4 d-flex justify-content-center">
              <FloatLabel className="w-75 mt-1 text-end">
                <InputText id="username" className="w-100" />
                <label htmlFor="username" className="text-Start input-label">كلمة السر</label>
              </FloatLabel>
            </div>
            <div className="text-start w-75 mx-auto">
              <a href="" className="reset-pass">هل نسيت كلمة السر؟</a>
            </div>
            <div className="mt-4">
            <Button label="تسجيل" severity="info" className="w-75 mt-2 mx-auto rounded-4" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
