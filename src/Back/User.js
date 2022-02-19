import React, { useState } from 'react';

import useGet from '../Hook/useGet';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { link } from '../Axios/link';

const User = () => {
  const [mopen, setMopen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    // setValue,
  } = useForm();

  const [isi] = useGet('/user');

  function tambah() {
    setMopen(true);
  }

  async function simpan(data) {
    let user = {
      email: data.email,
      password: data.password,
      level: data.level,
      relasi: 'back',
    };
    await link.post('/register', user);
    setMopen(false);
    reset();
  }

  async function status(id) {
    const data = isi.filter((val) => val.id === id);

    let stat = data[0].status === 1 ? 0 : 1; 

    let kirim = {
      status: stat,
    };

    await link.put('/user/' + id, kirim);
  }

  let no = 1;
  return (
    <div>
      <Modal
        isOpen={mopen}
        // onAfterOpen={isiForm}
        onRequestClose={() => setMopen(false)}
        style={{
          overlay: {
            background: 'transparent !important',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '40%',
          },
        }}
      >
        <div className="row">
          <div className="ml-2">
            <h2>Input Data user</h2>
          </div>
        </div>
        <div className="row">
          <div className="ml-2 col">
            <form onSubmit={handleSubmit(simpan)}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  {...register('email', { required: true })}
                  placeholder="email@email.com"
                />
                {errors.email && 'Email Harus di isi!'}
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  {...register('password', { required: true })}
                  placeholder="password"
                />
                {errors.password && 'Password Harus di isi!'}
              </div>
              <div className="form-group">
                <label htmlFor="level" className="form-label">
                  Level
                </label>
                <select
                  className="form-control"
                  name="level"
                  {...register('level')}
                >
                  <option value="admin">admin</option>
                  <option value="kasir">kasir</option>
                  <option value="koki">koki</option>
                </select>
              </div>
              <div className="mb-3">
                <input type="submit" className="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <div className="row">
        <div>
          <h2>Menu User</h2>
        </div>
      </div>
      <div className="row">
        <div>
          <input
            onClick={() => tambah()}
            className="btn btn-primary"
            type="submit"
            value="Tambah"
          />
        </div>
      </div>
      <div className="row">
        <table className="table mt-4">
          <thead>
            <tr>
              <th>No</th>
              <th>User</th>
              <th>Level</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {isi.map((val, index) => (
              <tr key={index}>
                <td>{no++}</td>
                <td>{val.email}</td>
                <td>{val.level}</td>
                <td>
                  {val.status === 1 ? (
                    <input
                      className="btn btn-success"
                      type="submit"
                      value="AKTIF"
                      onClick={() => status(val.id)}
                    />
                  ) : (
                    <input
                      className="btn btn-danger"
                      type="submit"
                      value="BANNED"
                      onClick={() => status(val.id)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
