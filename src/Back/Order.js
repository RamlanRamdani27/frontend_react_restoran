import React, { useState } from 'react';
import useGet from '../Hook/useGet';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { link } from '../Axios/link';

Modal.setAppElement('#root');
const Order = () => {
  const tanggal = new Date();
  let today = tanggal.toISOString().slice(0, 10);

  const [mopen, setMopen] = useState(false);
  const [total, setTotal] = useState(0);
  const [pelanggan, setPelanggan] = useState('');
  const [idorder, setIdorder] = useState('');

  const [awal, setAwal] = useState(
    `${tanggal.getFullYear()}-${tanggal.getMonth()}-01`
  );
  const [akhir, setAkhir] = useState(today);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const [isi] = useGet(`/order/${awal}/${akhir}`);

  function cari(data) {
    setAwal(data.tawal);
    setAkhir(data.takhir);
  }

  function filterData(id) {
    const data = isi.filter((val) => val.idorder === id);

    setPelanggan(data[0].pelanggan.pelanggan);
    setTotal(data[0].total);
    setIdorder(data[0].idorder);
    setMopen(true);
  }

  function isiForm() {
    setValue('total', total);
  }

  async function simpan(data) {
    let hasil = {
      bayar: data.bayar,
      kembali: data.bayar - data.total,
      status: 1,
    };
    await link.put('/order/' + idorder, hasil);
    reset();
    setMopen(false);
  }

  let no = 1;
  return (
    <div>
      <Modal
        isOpen={mopen}
        onAfterOpen={isiForm}
        onRequestClose={() => setMopen(false) && reset()}
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
          <h2>Pembayaran Order {pelanggan}</h2>
        </div>
        <div className="row">
          <div className="col">
            <form onSubmit={handleSubmit(simpan)}>
              <div className="form-group">
                <label htmlFor="total" className="form-label">
                  Total
                </label>
                <input
                  type="number"
                  className="form-control"
                  {...register('total', { required: true })}
                  placeholder="total"
                />
              </div>
              <div className="form-group">
                <label htmlFor="bayar" className="form-label">
                  Bayar
                </label>
                <input
                  type="number"
                  className="form-control"
                  {...register('bayar', { required: true, min: total })}
                  placeholder="bayar"
                />
                {errors.bayar && `Pembayaran kurang !`}
              </div>
              <div className="mb-3">
                <input
                  type="submit"
                  className="btn btn-danger mr-2"
                  name="batal"
                  value="Batal"
                  onClick={() => setMopen(false)}
                />
                <input
                  type="submit"
                  className="btn btn-primary"
                  name="submit"
                  value="Bayar"
                />
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <div className="row">
        <h2>Data Order</h2>
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
              <th>Pelanggan</th>
              <th>Tanggal Order</th>
              <th>Total</th>
              <th>Bayar</th>
              <th>Kembali</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {isi.map((val, index) => (
              <tr key={index}>
                <td>{no++}</td>
                <td>{val.idorder}</td>
                <td>{val.pelanggan.pelanggan}</td>
                <td>{val.tgl_order}</td>
                <td>{val.total}</td>
                <td>{val.bayar}</td>
                <td>{val.kembali}</td>
                <td>
                  {val.status === 0 ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => filterData(val.idorder)}
                    >
                      Belum Bayar
                    </button>
                  ) : (
                    <p>Lunas</p>
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

export default Order;
