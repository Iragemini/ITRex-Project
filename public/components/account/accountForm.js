const accountForm = (user) => {
  const { name, email, gender, birthDate } = user;
  const date = new Date(`${birthDate}`);
  const dateConvert = date.toLocaleDateString();

  return `
    <div class="container">
        <div class="card text-white bg-primary m-1">
            <div class="card-header p-1 d-flex justify-content-between">
                <div>
                    Account
                </div>
                <div>
                <button type="button" id="logout" class="btn btn-danger m-2">
                    Log out
                </button>
                </div>
            </div>
            <div class="card-body">
                <div class="card">
                    <div class="card text-white bg-primary m-1">
                        <div class="card-header">Personal information</div>
                        <div class="card-body">
                            <div class="card-body d-flex justify-content-start">
                                <p class="card-text me-2">Name:</p>
                                <p class="card-text" id="userName">${name}</p>
                            </div>
                            <div class="card-body d-flex justify-content-start">
                                <p class="card-text me-2">Email:</p>
                                <p class="card-text" id="userEmail">${email}</p>
                            </div>
                            <div class="card-body d-flex justify-content-start">
                                <p class="card-text me-2">Gender:</p>
                                <p class="card-text" id="userGender">${gender}</p>
                            </div>
                            <div class="card-body d-flex justify-content-start">
                                <p class="card-text me-2">Birth date:</p>
                                <p class="card-text" id="userBirthDate">${dateConvert}</p>
                            </div>
                        </div>
                    </div>
                    <div class="card text-white bg-primary m-1">
                        <div class="card-header">Appointment</div>
                        <div class="card-body">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <div class="form-group has-success">
                                        <select class="form-select" id='doctorSelect'>
                                        </select>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-end">
                                        <button type="button" id="makeAppointment" class="btn btn-success m-2">
                                            Make an appointment
                                        </button>
                                    </div>
                                </div>
                                <div class="search card-body d-flex justify-content-center align-items-center">
                                    <div class="form-group m-1">
                                        <button type="button" id="showResolution" class="btn btn-success m-2">
                                            Show my resolution
                                        </button>
                                    </div>
                                    <div class="form-group m-1">
                                        <div id="userResolution"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
};

export default accountForm;
