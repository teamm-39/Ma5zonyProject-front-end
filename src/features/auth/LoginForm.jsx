import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import { Password } from "primereact/password";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "./services/login";
import { useNavigate } from "react-router-dom";
import AppLoadingSpinner from "../../components/AppLoadingSpinner";
import { ToastContext } from "../../App";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();
    const toast = useContext(ToastContext);
  useEffect(() => {
    if (email.length > 0) {
      const exp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValid(exp.test(email));
    }
  }, [email]);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await login(email, password);
    },
    onSuccess: async (data) => {
      if (data.isSuccess) {
        queryClient.setQueryData(["isLogedIn"], { data: true });
      }
      if (data.isSuccess) {
        toast.current.show({
          severity: "success",
          summary: "نجاح",
          detail: "تم تسجيل الدخول بنجاح",
          life: 1000,
        });
          navigate("/");
      } else {
        toast.current.show({
          severity: "error",
          summary: "خطأ",
          detail: "البريد الالكترونى غير صحيح او كلمة السر غير صحيحه",
          life: 3000,
        });
      }
    },
  });
  const handelSubmit = (e) => {
    e.preventDefault();
    if (email.length > 0 && password.length > 0) {
      mutation.mutate();
    } else {
      setIsValid(false);
    }
  };
  return (
    <>
      <div className="login-form p-relative">
        <p className="form-title">تسجيل الدخول</p>
        <div className="form mt-4 pt-3">
          <form onSubmit={handelSubmit}>
            <div className="p-relative w-100 d-flex justify-content-center">
              <FloatLabel className="w-75 text-end">
                <InputText
                  id="email"
                  invalid={!isValid}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-100"
                />
                <label htmlFor="email" className="text-Start input-label">
                  البريد الالكترونى
                </label>
              </FloatLabel>
            </div>
            <div className="p-relative w-100 mt-4 d-flex justify-content-center">
              <FloatLabel className="w-75 mt-1 text-end">
                <Password
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-100 "
                  toggleMask
                  feedback={false}
                />
                <label htmlFor="password" className="text-Start password-label">
                  كلمة السر
                </label>
              </FloatLabel>
            </div>
            <div className="text-end w-75 mx-auto">
              <a href="" className="reset-pass">
                هل نسيت كلمة السر؟
              </a>
            </div>
            <div className="mt-4">
              <Button
                label="تسجيل"
                disabled={!isValid}
                severity="info"
                className="w-75 mt-2 mx-auto rounded-4"
              />
            </div>
          </form>
        </div>
        <AppLoadingSpinner isLoading={mutation.isPending} />
      </div>
    </>
  );
}

export default LoginForm;
