import logo from '../../assets/imgs/baner/login-logo.png'
function LoginBuner() {
  return (
    <>
      <div className="d-flex gap-3 login-buner ">
        <img src={logo} alt="logo" width={60} />
        <div className="title text-center">
          <h1 className='login-buner-title'>مخزون</h1>
          <p className='login-buner-p'>ادارة المستودعات و المخازن</p>
      </div>
    </div>
    </>
   );
}
export default LoginBuner;