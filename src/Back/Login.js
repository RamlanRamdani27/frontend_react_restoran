import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { link } from '../Axios/link';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const [pesan, setPesan] = useState('');

  const history = useHistory();

  async function login(data) {
    const res = await link.post('/login', data);
    console.log(res.data.token);

    let token = await res.data.token;
    let email = await res.data.data.email;
    let level = await res.data.data.level;

    sessionStorage.setItem('token', token);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('level', level);

    reset();

    if (gettoken() === 'undefined') {
      setPesan(res.data.pesan);
    } else {
      history.push('/admin');
      window.location.reload();
    }
  }

  const gettoken = () => sessionStorage.getItem('token');

  return (
    <div>
      <div className="row mt-5">
        <div className="mx-auto col-4">
          <form onSubmit={handleSubmit(login)}>
            {pesan ? (
              <div className="alert alert-danger" role="alert">
                {pesan}
              </div>
            ) : (
              ''
            )}
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="email anda"
                {...register('email', { required: true })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="password"
                {...register('password', { required: true })}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
