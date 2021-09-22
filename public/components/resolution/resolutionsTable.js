import Roles from '../../src/utils/roles.js';
import { deleteResolution } from './resolution.js';

const addListener = (table) => {
  table.removeEventListener('click', (e) => {});
  table.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.classList.contains('btn__delete')) {
      return;
    }
    const resolutionId = target.dataset.id;
    deleteResolution(resolutionId);
  });
};

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
    const {
      id,
      resolution: oneResolution,
      created_at: created,
      doctor_name: doctorName,
      doctor_specialization: spec,
      expire,
    } = resolution;

    const tr = document.createElement('tr');
    tr.classList.add('table-light');

    const resolutionTd = document.createElement('td');
    resolutionTd.innerText = oneResolution;

    const createdTd = document.createElement('td');
    createdTd.innerText = new Date(created).toLocaleDateString();

    const doctorTd = document.createElement('td');
    doctorTd.innerText = doctorName;

    const doctorSpecTd = document.createElement('td');
    doctorSpecTd.innerText = spec;

    const expireTd = document.createElement('td');
    expireTd.innerText = expire ? new Date(expire).toLocaleTimeString() : '-';

    tr.append(resolutionTd, createdTd, doctorTd, doctorSpecTd, expireTd);

    if (role === Roles.DOCTOR) {
      const tdDelete = document.createElement('td');
      const deleteBtn = document.createElement('div');

      deleteBtn.id = `resolution_${id}`;
      deleteBtn.innerText = 'DELETE';
      deleteBtn.dataset.id = id;
      deleteBtn.classList.add('btn', 'btn-warning', 'btn__delete');

      tdDelete.appendChild(deleteBtn);

      tr.appendChild(tdDelete);
    }

    tableBody.appendChild(tr);
  });
  table.appendChild(tableBody);
  table.classList.add('table', 'table-hover', 'resolution__table');

  area.appendChild(table);

  addListener(table);
};

export default createTable;
