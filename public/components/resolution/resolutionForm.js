const resolutionForm = () => `<div class="container">
    <div class="card text-white bg-primary m-1">
        <div class="card-header p-1 d-flex justify-content-between">
            <div>
                Doctor
            </div>
            <div>
            <button type="button" id="doctorLogout" class="btn btn-danger m-2">
                Log out
            </button>
            </div>
        </div>
        <div class="card-body">
            <div id='doctor' class="card">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div class="d-flex flex-column justify-content-center">
                        <h5 class="m-2 text-dark">Current patient: </h5>
                        <h2 class="m-2 text-info" id='current'>
                        </h2>
                    </div>
                    <div class="d-flex align-items-center justify-content-end">
                        <button type="button" id="next" class="btn btn-success mt-2">Next</button>
                    </div>
                </div>
                <div class="add card-body d-flex justify-content-center align-items-start">
                    <h5 class="text-dark m-2">Set appointment resolution </h5>
                    <div class="d-flex justify-content-end align-items-start">
                        <div class="input__patient d-flex flex-column">
                            <div class="form-group has-success d-flex">
                                <div class="form-group m-2">
                                    <textarea class="form-control" name="doctorResolutionForm" id="doctorResolution" rows="3" cols="80"></textarea>
                                </div>
                                <div class="set__ttl d-flex flex-column justify-content-between align-items-center m-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" name="ttl" id="ttl" />
                                        <label class="form-check-label text-dark" for="ttl">
                                            Set expiration
                                        </label>
                                    </div>
                                    <div class="ttl__input ttl__div mt-2">
                                        <input type="text" class="form-control" name="ttlInput" id="ttlInput"
                                            placeholder="enter time (sec)" />
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex align-items-center justify-content-end">
                                <button type="button" id="newResolution" class="btn btn-success mt-2">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="delete card-body d-flex justify-content-center align-items-start">
                    <div class="d-flex justify-content-center">
                        <div class="d-flex align-items-center justify-content-start">
                            <button type="button" id="showResolutionDoctor" class="btn btn-success">Show resolution</button>
                        </div>
                        <div class="form-group m-2">
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-text"></span>
                                    <input type="text" id="patientName" class="form-control" value=""/>
                                    <span class="input-group-text"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <div class="form-group m-2">
                            <div id="doctorResolutionFound"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="hiddenPatientId" value="" />
`;

export default resolutionForm;
