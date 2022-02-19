import React, { useState } from 'react';

import useGet from '../Hook/useGet';
import { useForm } from 'react-hook-form';

const Detail = () => {
  const tanggal = new Date();
  let today = tanggal.toISOString().slice(0, 10);

  const [awal, setAwal] = useState(
    `${tanggal.getFullYear()}-${tanggal.getMonth()}-01`
  );
  const [akhir, setAkhir] = useState(today);

  const { register, handleSubmit } = useForm();

  const [isi] = useGet(`/detail/${awal}/${akhir}`);

  function cari(data) {
    setAwal(data.tawal);
    setAkhir(data.takhir);
  }

  let no = 1;
  return (
    <div>
      <div className="row">
        <h2>Data Penjualan</h2>
      </div>
      <div className="row">
        <form onSubmit={handleSubmit(cari)}>
          <div className="form-group">
            <label htmlFor="tawal" className="form-label">
              Tanggal Awal
            </label>
            <input
              type="date"
              className="form-control"
              {...register('tawal')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="takhir" className="form-label">
              Tanggal Akhir
            </label>
            <input
              type="date"
              className="form-control"
              {...register('takhir')}
            />
          </div>
          <div className="mb-3">
            <input type="submit" className="btn btn-primary" name="submit" />
          </div>
        </form>
      </div>
      <div className="row">
        <table className="table mt-4">
          <thead>
            <tr>
              <th>No</th>
              <th>Faktur</th>
              <th>Tanggal Order</th>
              <th>Menu</th>
              <th>Harga</th>
              <th>Jumlah</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {isi.map((val, index) => (
              <tr key={index}>
                <td>{no++}</td>
                <td>{val.idorder}</td>
                <td>{val.tgl_order}</td>
                <td>{val.menu}</td>
                <td>{val.hargajual}</td>
                <td>{val.jumlah}</td>
                <td>{val.jumlah * val.hargajual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Detail;
