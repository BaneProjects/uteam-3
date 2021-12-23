import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="loginForm">
      <div className="emailLogin">
        <label>Email</label>
        <input placeholder="Email" />
      </div>
      <div className="passwordLogin">
        Password
        <input placeholder="Password" />
      </div>
      <div>
        <Link to={'register'}>Don&lsquo;t have an account?</Link>
        <button>Login</button>
      </div>
    </div>
  );
};

export default Login;
