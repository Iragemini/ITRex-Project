import Roles from '../../src/utils/roles.js';

const createTable = (area, resolutions, role) => {
  if (resolutions.length === 0) {
    return;
  }
  const resolutionTable = document.querySelector('.resolution__table');
  if (resolutionTable) {
    area.removeChild(resolutionTable);
  }
  const table = document.createElement('table');
  const tableBody = document.createElement('tbody');

  resolutions.forEach((resolution) => {
    const tr = document.createElement('tr');
    tr.classList.add('table-light');
    const resolutionTd = document.createElement('td');
    resolutionTd.innerText = resolution.resolution;
    const createdTd = document.createElement('td');
    createdTd.innerText = resolution.created_at;
    const doctorTd = document.createElement('td');
    doctorTd.innerText = resolution.doctor_name;
    const doctorSpecTd = document.createElement('td');
    doctorSpecTd.innerText = resolution.doctor_specialization;
    const expireTd = document.createElement('td');
    expireTd.innerText = resolution.expire || '-';

    tr.append(resolutionTd, createdTd, doctorTd, doctorSpecTd, expireTd);

    if (role === Roles.DOCTOR) {
      const tdDelete = document.createElement('td');
      const deleteBtn = document.createElement('div');
      deleteBtn.id = `resolution_${resolution.id}`;
      deleteBtn.innerText = 'DELETE';
      deleteBtn.dataset.id = resolution.id;
      deleteBtn.classList.add('btn', 'btn-warning', 'btn__delete');

      tdDelete.appendChild(deleteBtn);

      tr.appendChild(tdDelete);
    }

    tableBody.appendChild(tr);
  });
  table.appendChild(tableBody);
  table.classList.add('table', 'table-hover', 'resolution__table');

  area.appendChild(table);
};

export default createTable;
